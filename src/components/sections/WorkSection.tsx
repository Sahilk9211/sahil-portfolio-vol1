"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import RevealHeading from "../RevealHeading";

const projects = [
  {
    number: "01",
    title: "ThikgesTalt Tech", //thinkgestalt.tech
    category: "Frontend",
    year: "2024",
    link: "https://thinkgestalt.tech/",
    image: "/Images/tgTech.png",
  },
  {
    number: "02",
    title: "ThikgesTalt Design", //https://thinkgestalt.design/
    category: "Frontend",
    year: "2025",
    link: "https://thinkgestalt.design/",
    image: "/Images/tgDesign.png",
  },
  {
    number: "03",
    title: "ThikgesTalt Media", //https://thinkgestalt.media/
    category: "Frontend",
    year: "2025",
    link: "https://thinkgestalt.media/",
    image: "/Images/tgMedia.png",
  },
  {
    number: "04",
    title: "SocialOut", //https://socialout.co/
    category: "Frontend",
    year: "2026",
    link: "https://socialout.co",
    image: "/Images/SocialOut.png",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null); 
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDistance = () => track.scrollWidth - section.clientWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full px-4 py-4 md:px-14 md:py-5 text-[#202020] bg-[#e7e6e3] overflow-hidden"
    >
      {/* Heading */}
      <div className="overflow-hidden py-10">
        <RevealHeading>
          {" "}
          <h2
            className="flex whitespace-nowrap text-center font-sans text-4xl dm-sans font-normal! tracking-[-0.02em] drop-shadow md:text-[4rem] md:leading-20
          "
          >
            SELECTED WORKS
          </h2>
        </RevealHeading>
      </div>

      {/* Projects row*/}
      <div ref={trackRef} className="flex items-center gap-10 w-max pr-24">
        {projects.map((project) => (
          <div
            key={project.number}
            className={`flex w-105 shrink-0 flex-col justify-between gap-10 px-4`}
          >
            <span className="uppercase text-xs tracking-[0.4em] text-black hibur-regular">
              {project.number} / {project.title}
            </span>

            {/* image */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              data-cursor-text="Visit"
              className="relative block h-[60dvh] w-full overflow-hidden"
            >
              {/* Blurred Background */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/25" />

              {/* Main Image */}
              <div className="relative z-10 flex h-full w-full items-center justify-center p-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
