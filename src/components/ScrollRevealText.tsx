"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealTextProps = {
  text: string;
  className?: string;
  dimClassName?: string;
  revealClassName?: string;
  stagger?: number;
  start?: string;
  end?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
};

// text ko words me todta hai, aur har word ke andar characters me —
// isse word-wrapper ko whitespace-nowrap de sakte hain (koi mid-word
// break nahi), jabki words ke beech normal breakable space rehta hai.
function splitIntoWords(text: string) {
  return text.split(" ");
}

function CharLayer({
  words,
  charClassName,
}: {
  words: string[];
  charClassName: string;
}) {
  return (
    <>
      {words.map((word, wIdx) => (
        <Fragment key={wIdx}>
          {/* whitespace-nowrap = is word ke andar kabhi line-break nahi hoga,
              chahe letters alag-alag inline-block spans hi kyun na hoon */}
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, cIdx) => (
              <span key={cIdx} className={charClassName}>
                {char}
              </span>
            ))}
          </span>
          {/* words ke beech ek normal, breakable space — yahi line-wrap hone
              deta hai, lekin sirf word-boundary pe, kabhi word ke beech nahi */}
          {wIdx < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

export default function ScrollRevealText({
  text,
  className = "",
  dimClassName = "text-white/20",
  revealClassName = "text-white",
  stagger = 0.03,
  start = "top 80%",
  end = "top 20%",
  as: Tag = "div",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".sr-char");

      gsap.set(chars, {
        opacity: 0.15,
        y: 25,
        filter: "blur(8px)",
      });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "none",
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, stagger, start, end]);

  const words = splitIntoWords(text);

  return (
    <div ref={containerRef} className="relative w-fit">
      {/* Base Layer — dim/background pass */}
      <Tag className={`${className} ${dimClassName}`} aria-hidden="true">
        <CharLayer words={words} charClassName="inline-block whitespace-pre" />
      </Tag>

      {/* Reveal Layer — GSAP isi ke .sr-char spans ko animate karta hai */}
      <Tag className={`${className} ${revealClassName} absolute inset-0`}>
        <CharLayer
          words={words}
          charClassName="sr-char inline-block whitespace-pre will-change-transform"
        />
      </Tag>
    </div>
  );
}
