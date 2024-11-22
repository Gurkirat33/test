"use server";

import { getDbConnection } from "@/lib/auth";
import Hero from "@/models/hero.model";
import { revalidatePath, revalidateTag } from "next/cache";

export async function getHeroSection() {
    try {
        await getDbConnection();
        const data = await Hero.find({}).lean();
        return data.map(hero => ({
            ...hero,
            _id: hero._id.toString()
        }));
    } catch (error) {
        console.error("Error fetching hero sections:", error);
        throw new Error("Failed to fetch hero sections");
    }
}

export async function createHeroSection(data) {
    try {
        await getDbConnection();
        
        if (data.images.some(img => !img || typeof img !== 'string' || !img.startsWith('http'))) {
            return { success: false, error: "Invalid image URLs detected" };
        }

        const heroData = {
            subHeading: data.subHeading?.trim(),
            heading: data.heading?.trim(),
            description: data.description?.trim(),
            serviceName: data.serviceName?.trim(),
            serviceUrl: data.serviceUrl?.trim(),
            browserOutcome: data.browserOutcome?.trim() || "",
            images: data.images
        };

        const hero = await Hero.create(heroData);

        revalidateTag('hero-data');
        revalidatePath('/backend/hero-section');
        revalidatePath('/');
        
        return {
            success: true,
            data: {
                ...hero.toJSON(),
                _id: hero._id.toString()
            }
        };
    } catch (error) {
        console.error("Error creating hero section:", error);
        return { success: false, error: error.message };
    }
}

export async function updateHeroSection(id, data) {
    try {
        await getDbConnection();

        const updateData = {
            subHeading: data.subHeading?.trim(),
            heading: data.heading?.trim(),
            description: data.description?.trim(),
            serviceName: data.serviceName?.trim(),
            serviceUrl: data.serviceUrl?.trim(),
            browserOutcome: data.browserOutcome?.trim() || ""
        };

        if (data.images) {
            if (!Array.isArray(data.images)) {
                return { success: false, error: "Images must be an array" };
            }

            if (data.images.length !== 4) {
                return { success: false, error: "Exactly 4 images are required" };
            }

            if (data.images.some(img => !img || typeof img !== 'string' || !img.startsWith('http'))) {
                return { success: false, error: "Invalid image URLs detected" };
            }

            updateData.images = data.images;
        }

        const hero = await Hero.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!hero) {
            return { success: false, error: "Hero section not found" };
        }

        revalidateTag('hero-data');
        revalidatePath('/backend/hero-section');
        revalidatePath('/');
        
        return {
            success: true,
            data: {
                ...hero.toJSON(),
                _id: hero._id.toString()
            }
        };
    } catch (error) {
        console.error("Error updating hero section:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteHeroSection(id) {
    try {
        await getDbConnection();
        
        const hero = await Hero.findByIdAndDelete(id);
        
        if (!hero) {
            return { success: false, error: "Hero section not found" };
        }

        revalidateTag('hero-data');
        revalidatePath('/backend/hero-section');
        revalidatePath('/');
        
        return { success: true };
    } catch (error) {
        console.error("Error deleting hero section:", error);
        return { success: false, error: error.message };
    }
}