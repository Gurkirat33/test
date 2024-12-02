import Breadcrumb from "@/components/UI/Breadcrumb";
import ServiceForm from "@/components/UI/ServiceForm";
import { notFound } from "next/navigation";
import { getDbConnection } from "@/lib/auth";
import serviceModel from "@/models/service.model";
import Image from "next/image";
import ServicesSidebar from "@/components/UI/ServicesSidebar";

export const revalidate = 2592000;

async function getServiceBySlug(slug) {
  try {
    await getDbConnection();
    const service = await serviceModel.findOne({ slug }).lean();
    if (!service) return null;
    
    return {
      id: service._id.toString(),
      title: service.heading || "",
      longDescription: service.longDescription || "",
      imageUrl: service.imageUrl || "",
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

async function getAllServices() {
  try {
    await getDbConnection();
    const services = await serviceModel.find({}, 'heading slug').lean();
    return services.map(service => ({
      id: service._id.toString(),
      heading: service.heading || "",
      slug: service.slug || "",
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }) {
  const { slug } = params;
  
  // const serviceData = servicesData.find(service => service.slug === slug);
  const dbService = await getServiceBySlug(slug);
  const allServices = await getAllServices();
  
  if (!dbService) {
    notFound();
  }

  return (
    <div className="pt-[72px]">
      <Breadcrumb/>
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-8">
          <ServicesSidebar services={allServices} />

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl lg:text-4xl font-semibold mt-6 mb-3">{dbService.title}</h1>
            
            {dbService?.imageUrl && (
              <div className="mb-8">
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '280px' }}>
                  <Image
                    src={dbService.imageUrl}
                    alt={`${dbService.title} illustration`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {dbService?.longDescription && (
              <div className="prose prose-lg max-w-none description-text text-justify">
                <div dangerouslySetInnerHTML={{ __html: dbService.longDescription }} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <ServiceForm />
          </div>
        </div>
      </div>
    </div>
  );
}
