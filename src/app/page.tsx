import StackedSections from "@/components/StackedSections";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <StackedSections
        items={[
          {
            id: "hero",
            speed: 45,
            content: <HeroSection />,
          },
          {
            id: "about",
            speed: 0,
            content: <AboutSection />,
          },
        ]}
      />

      <WorkSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
