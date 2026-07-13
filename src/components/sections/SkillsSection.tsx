"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGreensock,
  SiNodedotjs,
  SiGit,
  SiFigma,
  SiMongodb,
  SiFramer,
  SiGraphql,
  SiExpress,
} from "react-icons/si";
import ScrollVelocity from "../ScrollVelocity"; // apne project ke path ke hisaab se adjust karo
import RevealHeading from "../RevealHeading";

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { name: "Framer Motion", icon: SiFramer, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Expree Js", icon: SiExpress, color: "black" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".tech-card");

      // ---- scroll-triggered stagger reveal (same blur+rise language as
      //      your ScrollRevealText, so it feels consistent site-wide) ----
      gsap.set(cards, { opacity: 0, y: 40, filter: "blur(6px)" });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          each: 0.06,
          grid: "auto",
          from: "start",
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  // ---- per-card hover tilt, driven by cursor position inside the card ----
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateY = (x / (rect.width / 2)) * 10; // max ~10deg
    const rotateX = -(y / (rect.height / 2)) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.05,
      transformPerspective: 700,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#e7e6e3] px-4 pb-20 md:pb-20 lg:py-20 text-[#202020] md:px-14"
    >
      {/* Heading — same reusable component you already use elsewhere */}
      <div className="overflow-hidden">
        <RevealHeading
          containerClassName=""
          className="text-4xl font-medium uppercase tracking-tight md:text-6xl dm-sans"
        >
          Technologies
        </RevealHeading>
      </div>

      {/* thin marquee strip — reuses your existing ScrollVelocity component,
          gives a bit of motion/texture without competing with the grid */}
      <div className="my-10 border-y border-black/10 py-3">
        <ScrollVelocity
          texts={["TOOLS I WORK WITH •"]}
          velocity={35}
          numCopies={50}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-black/40 mx-6"
        />
      </div>

      {/* Grid of tech cards with hover tilt */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6"
        style={{ perspective: "1000px" }}
      >
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="tech-card group flex flex-col items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white/40 px-4 py-10 backdrop-blur-sm will-change-transform"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <Icon
                className="text-4xl transition-transform duration-300 md:text-5xl"
                style={{ color: tech.color }}
              />
              <span className="text-sm font-medium uppercase tracking-wide md:text-base">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
