"use client";

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ServicesSidebar({ services }) {
    const pathname = usePathname();

    return (
        <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-primary-light rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 relative"><span className="absolute left-0 -bottom-1 h-0.5 w-12 bg-secondary"></span> Our Services</h3>
                <ul className="space-y-2 flex flex-col">
                    {services.map((service) => (
                        <li key={service.id}>
                        <Link
                            href={`/services/${service.slug}`}
                            className={`inline-flex items-center tracking-wider py-2 text-sm transition-colors ${
                                pathname === `/services/${service.slug}`
                                ? "gradient-color-text"
                                : "hover:bg-secondary/5"
                            }`}
                        >
                         <span><ChevronRight size={16} className={`${pathname === `/services/${service.slug}` ? "text-[#d92662]" : ""}`} /></span>   {service.heading}
                        </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
