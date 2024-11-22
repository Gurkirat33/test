"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  return (
    <div className="bg-primary-light">
    <div className="section-container lg:mb-6 flex items-center gap-2 text-secondary-light  py-1 ">
      <div>
        <Link
          href="/"
          className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-primary-light"
        >
          <Home size={16} />
          <span>Home</span>
        </Link>
      </div>

      {paths.map((path, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");
        const isLast = index === paths.length - 1;
        const formattedPath = path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight size={16} />
            {isLast ? (
              <span className="rounded-md px-2 py-1 font-medium text-secondary">
                {formattedPath}
              </span>
            ) : (
              <Link
                href={href}
                className="rounded-md px-2 py-1 transition-colors hover:bg-primary-light"
              >
                {formattedPath}
              </Link>
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Breadcrumb;
