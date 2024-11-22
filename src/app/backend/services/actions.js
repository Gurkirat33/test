"use server";

import { getDbConnection } from "@/lib/auth";
import serviceModel from "@/models/service.model";
import { revalidatePath, revalidateTag } from "next/cache";

const serializeService = (service) => {
  const serialized = {
    id: service._id.toString(),
    heading: service.heading || "",
    description: service.description || "",
    longDescription: service.longDescription || "",
    imageUrl: service.imageUrl || "",
    keyPoints: Array.isArray(service.keyPoints) ? service.keyPoints : [],
    slug: service.slug || "",
  };
  console.log("Serialized service:", serialized);
  return serialized;
};

const validateService = (data) => {
  const errors = [];
  
  if (!data.heading?.trim()) {
    errors.push("Service heading is required");
  }
  
  if (!data.description?.trim()) {
    errors.push("Description is required");
  }

  if (!data.longDescription?.trim()) {
    errors.push("Long description is required");
  }
  
  if (!data.imageUrl?.trim()) {
    errors.push("Image is required");
  }
  
  if (!Array.isArray(data.keyPoints) || data.keyPoints.length === 0) {
    errors.push("At least one key point is required");
  }
  
  if (!data.slug?.trim()) {
    errors.push("URL slug is required");
  }
  
  return errors;
};

export async function getService(id) {
  try {
    await getDbConnection();
    const service = await serviceModel.findById(id).lean();
    if (!service) return null;
    return serializeService(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    throw new Error("Failed to fetch service");
  }
}

export async function deleteService(id) {
  try {
    await getDbConnection();
    const result = await serviceModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Service not found");
    }
    revalidatePath("/backend/services");
    revalidateTag('services-data');
    revalidateTag('service-detail');
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    throw new Error(error.message || "Failed to delete service");
  }
}

export async function updateService(id, data) {
  try {
    console.log("Updating service with ID:", id);
    console.log("Received data:", data);

    const errors = validateService(data);
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    await getDbConnection();
    
    const existingService = await serviceModel.findOne({ 
      slug: data.slug,
      _id: { $ne: id }
    });
    
    if (existingService) {
      throw new Error("URL slug is already taken");
    }

    const updateData = {
      $set: {
        heading: data.heading,
        description: data.description,
        longDescription: data.longDescription,
        imageUrl: data.imageUrl,
        keyPoints: data.keyPoints,
        slug: data.slug,
      }
    };

    console.log("Update data:", updateData);

    const service = await serviceModel
      .findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      )
      .lean();
      
    if (!service) {
      throw new Error("Service not found");
    }

    console.log("Updated service:", service);

    revalidatePath("/backend/services");
    revalidateTag('services-data');
    revalidateTag('service-detail');
    
    const serializedService = serializeService(service);
    console.log("Returning serialized service:", serializedService);
    
    return { success: true, service: serializedService };
  } catch (error) {
    console.error("Error updating service:", error);
    throw new Error(error.message || "Failed to update service");
  }
}

export async function createService(data) {
  try {
    const errors = validateService(data);
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    await getDbConnection();
    
    const existingService = await serviceModel.findOne({ slug: data.slug });
    if (existingService) {
      throw new Error("URL slug is already taken");
    }

    const createData = {
      heading: data.heading,
      description: data.description,
      longDescription: data.longDescription,
      imageUrl: data.imageUrl,
      keyPoints: data.keyPoints,
      slug: data.slug,
    };

    const service = await serviceModel.create(createData);
    revalidatePath("/backend/services");
    revalidateTag('services-data');
    revalidateTag('service-detail');
    
    return { success: true, service: serializeService(service.toObject()) };
  } catch (error) {
    console.error("Error creating service:", error);
    throw new Error(error.message || "Failed to create service");
  }
}

export async function getServices() {
  try {
    await getDbConnection();
    const services = await serviceModel.find().lean();
    return services.map(serializeService);
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
}
