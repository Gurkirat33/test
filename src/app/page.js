import HeroSection from "@/components/UI/HeroSection";
import TestimonialsSection from "@/components/UI/Testimonials";
import Services from "@/components/UI/Services";
// import FAQ from "@/components/UI/Faq";
import BentoGrid from "@/components/UI/BentoGrid";
import BlogSection from "@/components/UI/Blog";
import ScrollingBanner from "@/components/ScrollingBanner";
import BgGrid from "@/components/UI/BgGrid";

export default function Home() {
  return (
    <>
    <div className="relative">
      <BgGrid/>
      <HeroSection />
      <BentoGrid />
    </div>
      <Services />
      <TestimonialsSection />
      <BlogSection />
      {/* <FAQ /> */}
      <ScrollingBanner />
    </>
  );
}
