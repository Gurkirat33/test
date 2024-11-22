import { ArrowRight } from "lucide-react";
import BrowserForImages from "./BrowserForImages";
import Link from "next/link";

const BrowserMockup = ({
  headind1,
  headind2,
  description,
  buttonText,
  buttonLink,
  sectionElement,
  Browserdata,
}) => {
  return (
    <header className="relative min-h-screen bg-primary-900 text-white">
      <div className="section-container relative pt-28 sm:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              {headind1}
              <span className="mt-2 block text-tertiary-500">{headind2}</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 lg:justify-start">
              <Link
                href={buttonLink}
                className="inline-flex items-center rounded-lg bg-tertiary-600 px-8 py-4 font-bold text-white transition duration-300"
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            {sectionElement}
          </div>
            <BrowserForImages projectData={Browserdata} /> 
        </div>
      </div>
    </header>
  );
};

export default BrowserMockup;
