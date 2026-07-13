// Old
"use client";

import { useRef } from "react";
import VariableProximity from "@/components/VariableProximity";
import TextMorphMotion from "../TextMorph";
import { SquigglyText } from "../squiggly-text";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen w-full px-4 py-4 md:px-14 md:py-5 text-[#202020] bg-[#e7e6e3] overflow-hidden flex flex-col">
      <style>{`
        /* DM Sans ka VARIABLE range load kar rahe hain (sirf static weights nahi),
           warna VariableProximity ka wght interpolation kaam nahi karega. */
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:opsz,wght@9..40,100..1000&display=swap');

        .headline {
          font-family: 'Archivo Black', sans-serif;
        }

        .dm-sans {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes badge-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .badge-spin {
          animation: badge-spin 14s linear infinite;
        }
      `}</style>

      {/* ---------- Top Bar ---------- */}
      <div className="flex items-center justify-between text-xs md:text-base dm-sans leading-5">
        <div className="font-semibold tracking-tighter">
          <span className="block md:hidden">
            Open for <br /> work —
          </span>

          <span className="hidden md:block">
            Open for offers and <br /> collaborations —
          </span>
        </div>

        <span className="font-bold text-sm md:text-lg uppercase cursor-pointer">
          {/* <TextMorphMotion /> */}
          SAHIL KHAN
          {/* <SquigglyText>SAHIL KHAN</SquigglyText> */}
        </span>

        <span className="text-end font-semibold tracking-tighter">
          Mumbai
          <br /> — Ind
        </span>
      </div>

      {/* ---------- Hero Content (Vertically Centered) ---------- */}
      <div className="flex-1 flex items-center">
        <div ref={containerRef} className="relative w-full">
          <div className="uppercase leading-[0.85] tracking-tight text-[14vw] sm:text-[11vw] md:text-[10vw] xl:text-[9vw] w-full font-medium dm-sans relative z-10">
            <div>
              <VariableProximity
                label="Crafting"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={
                  containerRef as React.MutableRefObject<HTMLElement | null>
                }
                radius={220}
                falloff="linear"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>

            <div className="text-center pl-[8vw] sm:pl-[10vw] xl:pl-[10vw]">
              <VariableProximity
                label="Modern &"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={
                  containerRef as React.MutableRefObject<HTMLElement | null>
                }
                radius={220}
                falloff="linear"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>

            <div className="text-start sm:pl-[34vw] md:pl-[30vw] xl:pl-[15vw]">
              <VariableProximity
                label="DIGITAL"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={
                  containerRef as React.MutableRefObject<HTMLElement | null>
                }
                radius={220}
                falloff="linear"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>

            <div className="text-end">
              <VariableProximity
                label="Experiences"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={
                  containerRef as React.MutableRefObject<HTMLElement | null>
                }
                radius={220}
                falloff="linear"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          </div>

          {/* Image */}
          <div
            className=" relative mt-6 w-[55vw] max-w-65 mx-auto sm:absolute sm:mt-0 sm:mx-0 sm:left-0 sm:-bottom-20 sm:w-[30vw] sm:max-w-none
              md:w-[26vw] xl:w-[18vw] xl:max-w-95 xl:-bottom-8

              z-0
            "
          >
            <img
              src="https://images.unsplash.com/photo-1770045517575-a90db8a4cabe?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODM3NzQ0Mjh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format"
              alt="Sahil Khan portrait"
              className="w-full aspect-3/4 object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
