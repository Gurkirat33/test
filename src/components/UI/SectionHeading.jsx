import Breadcrumb from "./Breadcrumb";

export const SectionHeading = ({ 
  title, 
  description, 
  showBreadcrumb = true,
  className = ""
}) => {
  return (
    <div className={`relative mb-2 lg:mb-10 ${className}`}>
        {showBreadcrumb && <Breadcrumb />}
      <div className="section-container">
        
        <div className="relative mt-4 lg:mt-6 grid gap-6  md:grid-cols-[1fr,1fr] lg:gap-16">
          <div className="relative">
            <h1 className="relative text-left text-5xl font-medium lg:leading-[1.1] tracking-tight text-secondary md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>

          <div className="relative flex items-center justify-center">
            <p className="text-lg text-secondary-light md:text-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};