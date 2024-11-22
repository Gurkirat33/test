import { getDbConnection } from "@/lib/auth";
import serviceModel from "@/models/service.model";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/UI/SectionHeading";
import { unstable_cache } from 'next/cache';

export const revalidate = 3600;

const serializeService = (service) => ({
  id: service._id.toString(),
  imageUrl: service.imageUrl || "",
  heading: service.heading || "",
  description: service.description || "",
  keyPoints: Array.isArray(service.keyPoints) ? service.keyPoints : [],
  slug: service.slug || "",
});

const getServices = unstable_cache(
  async () => {
    try {
      await getDbConnection();
      const services = await serviceModel.find({}).lean();
      return services.map(serializeService);
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  },
  ['services-data'],
  {
    revalidate: 3600,
    tags: ['services-data']
  }
);

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="relative bg-primary py-20">
        <SectionHeading 
          title="Services that drive growth" 
          description="We deliver cutting-edge solutions that transform businesses. Our expertise spans across digital landscapes, ensuring your success in the modern market." 
        />
      <div className="section-container">
      </div>

      <div className="relative mt-10">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`relative ${index !== services.length - 1 ? "mb-20" : ""}`}
          >
            <div className="section-container">
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative h-[300px] md:h-[420px] w-full overflow-hidden rounded-3xl bg-secondary/5">
                  <img
                    src={service.imageUrl}
                    alt={service.heading}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>

                <div className="relative">
                  <div className="">
                    <h3 className="mb-6 text-3xl font-semibold text-secondary lg:text-4xl">
                      {service.heading}
                    </h3>
                    <p className="mb-8 description-text leading-relaxed text-secondary-light">
                      {service.description}
                    </p>
                    <div className="mb-8 space-y-3">
                      {service.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <ArrowUpRight className="mt-1 size-4 text-secondary" />
                          <p className="flex-1 description-text text-secondary-light">{point}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 gradient-color text-white bg-primary-light px-5 py-2.5 text-sm tracking-wider font-medium"
                    >
                      Know More
                      <ArrowUpRight size={19} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
