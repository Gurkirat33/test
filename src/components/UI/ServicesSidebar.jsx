"use client";

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ServicesSidebar({ services }) {
    const pathname = usePathname();

    return (
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-primary-light rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 relative"><span className="absolute left-0 -bottom-1 h-0.5 w-12 bg-secondary"></span> Our Services</h3>
                <div className="space-y-2">
                    {services.map((service) => (
                        
                        <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className={`inline-flex items-center tracking-wider py-2 text-sm transition-colors ${
                                pathname === `/services/${service.slug}`
                                ? "gradient-color-text"
                                : "hover:bg-secondary/5"
                            }`}
                        >
                         <span><ChevronRight size={16} className={`${pathname === `/services/${service.slug}` ? "text-[#d92662]" : ""}`} /></span>   {service.heading}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
