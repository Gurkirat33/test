import { getPortfolioItems } from "./actions";
import PortfolioClient from "./portfolio-client";

// Force dynamic rendering to ensure fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable static generation

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();
  
  return (
    <div className="bg-primary">
      <PortfolioClient initialPortfolio={portfolioItems} />
    </div>
  );
}
