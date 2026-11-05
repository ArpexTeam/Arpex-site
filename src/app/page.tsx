import Hero from "@/components/hero/hero";
import Need from "@/components/need/need";
import SolutionsShowcase from "@/components/solutions/solutions-showcase";
import PlaqueStory from "@/components/plaque/plaque-story";
import CrmStory from "@/components/crm/crm-story";
import Method from "@/components/method/method";
import SelectedProjects from "@/components/projects/selected-projects";
import Closing from "@/components/closing/closing";

/**
 * Ordem de leitura: o que a ArpeX faz (abertura) → isso se aplica a mim
 * (necessidade) → como ajuda (frentes, com placas e CRM) → como funciona
 * (método) → o que já entregou (cases) → como começar (encerramento).
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Need />
      <SolutionsShowcase />
      <PlaqueStory />
      <CrmStory />
      <Method />
      <SelectedProjects />
      <Closing />
    </main>
  );
}
