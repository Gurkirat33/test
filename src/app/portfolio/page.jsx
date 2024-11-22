import { getPortfolioItems } from "./actions";
import PortfolioClient from "./portfolio-client";

export const revalidate = 3600;

async function getPortfolioData() {
  const data = await getPortfolioItems();
  return data;
}

export default async function Page() {
  const portfolioData = await getPortfolioData();
  return <PortfolioClient portfolioData={portfolioData} />;
}