'use server';

import { getDbConnection } from "@/lib/auth";
import portfolioModel from "@/models/portfolio.model";

export async function getPortfolioItems() {
  try {
    await getDbConnection();
    const items = await portfolioModel.find({}).lean();
    return items.map(item => ({
      id: item._id.toString(),
      title: item.title || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      category: item.category || "",
      link: item.link || "",
    }));
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }
}
