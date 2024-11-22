import { getPortfolioById } from "../actions";
import PortfolioForm from "./portfolio-form";

export const dynamic = "force-dynamic";

export default async function PortfolioEditPage({ params }) {
  const portfolioData = params.id !== "new" 
    ? await getPortfolioById(params.id)
    : null;

  return <PortfolioForm initialData={portfolioData} />;
}