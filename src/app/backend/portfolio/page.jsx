import { getPortfolioItems } from "./actions";
import PortfolioClient from "./portfolio-client";

export const dynamic = "force-dynamic";
export const revalidate = 0; 

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();
  
  return (
    <div className="bg-primary">
      <PortfolioClient initialPortfolio={portfolioItems} />
    </div>
  );
}
