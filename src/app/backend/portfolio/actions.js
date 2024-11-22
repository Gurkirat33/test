"use server";

import { getDbConnection } from "@/lib/auth";
import portfolioModel from "@/models/portfolio.model";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deletePortfolio(id) {
  if (!id) {
    return { success: false, error: "Portfolio ID is required" };
  }

  try {
    await getDbConnection();
    const portfolio = await portfolioModel.findById(id);
    
    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    await portfolioModel.findByIdAndDelete(id);
    revalidatePath("/backend/portfolio");
    revalidateTag('portfolio-items');
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return { 
      success: false, 
      error: error?.message || "Failed to delete portfolio" 
    };
  }
}

export async function getPortfolioItems() {
  try {
    await getDbConnection();
    const portfolios = await portfolioModel.find({}).lean();
    return portfolios.map(portfolio => ({
      id: portfolio._id.toString(),
      title: portfolio.title || '',
      description: portfolio.description || '',
      imageUrl: portfolio.imageUrl || '',
      tags: Array.isArray(portfolio.tags) ? portfolio.tags : [],
      slug: portfolio.slug || '',
    }));
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return [];
  }
}

export async function getPortfolioById(id) {
  try {
    await getDbConnection();
    const portfolio = await portfolioModel.findById(id).lean();
    if (!portfolio) return null;
    
    return {
      id: portfolio._id.toString(),
      title: portfolio.title || '',
      description: portfolio.description || '',
      imageUrl: portfolio.imageUrl || '',
      tags: Array.isArray(portfolio.tags) ? portfolio.tags : [],
      slug: portfolio.slug || '',
    };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

export async function updatePortfolio(id, data) {
  try {
    await getDbConnection();
    const portfolio = await portfolioModel.findById(id);
    
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    Object.assign(portfolio, data);
    await portfolio.save();
    
    const plainPortfolio = {
      id: portfolio._id.toString(),
      title: portfolio.title || '',
      description: portfolio.description || '',
      imageUrl: portfolio.imageUrl || '',
      tags: Array.isArray(portfolio.tags) ? portfolio.tags : [],
      slug: portfolio.slug || '',
    };
    
    revalidatePath("/backend/portfolio");
    revalidateTag('portfolio-items');
    return { success: true, data: plainPortfolio };
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return { success: false, error: error.message };
  }
}

export async function createPortfolio(data) {
  try {
    await getDbConnection();
    const portfolio = new portfolioModel(data);
    await portfolio.save();
    
    const plainPortfolio = {
      id: portfolio._id.toString(),
      title: portfolio.title || '',
      description: portfolio.description || '',
      imageUrl: portfolio.imageUrl || '',
      tags: Array.isArray(portfolio.tags) ? portfolio.tags : [],
      slug: portfolio.slug || '',
    };
    
    revalidatePath("/backend/portfolio");
    revalidateTag('portfolio-items');
    return { success: true, data: plainPortfolio };
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return { success: false, error: error.message };
  }
}
