"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function MobileNav({
  navData,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transform overflow-y-auto bg-primary transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col justify-between p-6">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-secondary">
              Giftechies
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-secondary"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-3">
            {navData.map((item) => (
              <div key={item.name} className="space-y-2">
                <Link
                  href={item.href}
                  className="text-lg font-medium text-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>

                {item.submenu && (
                  <div className="space-y-2 pl-4">
                    {/* Column One Services */}
                    {item.submenu.columnOne?.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="block text-secondary-light"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                    
                    {/* Column Two Services */}
                    {item.submenu.columnTwo?.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="block text-secondary-light"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                    
                    {/* Additional Services */}
                    {item.submenu.additionalServices?.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="block text-secondary-light"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/contact"
          className="gradient-color block w-full rounded-full px-6 py-3 text-center text-tertiary-text"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Start a project
        </Link>
      </div>
    </div>
  );
}
