import ClosingCta from "@/components/features/ClosingCta";
import FeaturesSection from "@/components/features/FeaturesSection";
import IntegrationsStrip from "@/components/features/IntegrationsStrip";
import Hero from "@/components/hero/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <IntegrationsStrip />
      <FeaturesSection />
      <ClosingCta />
    </div>
  );
}
