import StackedSections from "@/components/StackedSections";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      {/* Sirf Hero + About pe stacking/lag effect — baaki normal scroll mein hain */}
      <StackedSections
        items={[
          {
            id: "hero",
            speed: 45, // slow lag
            content: <HeroSection />,
          },
          {
            id: "about",
            speed: 0, // is group ka last item, isliye normal rehta hai
            // content: <AboutSection />,
            content: <AboutSection />,
          },
        ]}
      />

      {/* Baki sections abhi plain hain — koi scrub/pin effect nahi.
          Baad mein inpe bhi kuch decide karenge. */}
      <WorkSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
