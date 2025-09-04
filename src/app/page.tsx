import Hero from "@/components/hero";
import Methodology from "@/components/methodology";
import ProjectsGrid from "@/components/projects-grid";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Services from "@/components/services";
import ResponsiveShowcase from "@/components/responsive-showcase";
import CtaBand from "@/components/cta-band";



export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      {/* Crie também a seção "Desenvolvimento de sites" e "Design Responsivo" depois */}
      <Methodology />
      <ResponsiveShowcase/>
      <CtaBand />
      <ProjectsGrid />
      <FAQ />
      <CTA />
    </>
  );
}
