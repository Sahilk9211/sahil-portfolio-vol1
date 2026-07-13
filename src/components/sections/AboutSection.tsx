import ScrollRevealText from "@/components/ScrollRevealText";
import MarqueeSection from "../MarqueeSection";

export default function AboutSection() {
  return (
    //  px-8 py-14 text-white md:px-20 md:py-20
    <section className="min-h-screen w-full bg-black flex flex-col lg:gap-8 xl:gap-0 py-10">
      <MarqueeSection />

      <div className="flex-1 flex items-center justify-center">
        <ScrollRevealText
          className="text-3xl md:text-5xl xl:text-6xl text-center px-4 sm:px-[8vw] dm-sans leading-11 md:leading-16 xl:leading-20"
          text="I build fast, interactive and scalable web experiences that combine thoughtful design, smooth animations and clean code — creating products that people enjoy using and businesses can rely on."
        />
      </div>
    </section>
  );
}

//  I build fast
//           {/* <ThunderIcon /> */}, interactive
//           {/* <SmileIcon /> */}
//           and scalable web experiences that combine thoughtful design
//           {/* <HeartIcon /> */}, smooth animations
//           {/* <SparkleIcon /> */}
//           and clean code
//           {/* <CleanCodeIcon /> */}— creating products that people enjoy using
//           and businesses can rely on.
