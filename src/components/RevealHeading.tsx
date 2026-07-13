"use client";

import React, { useRef, ElementType, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ------------------------------------------------------------------ */
/*  Mask primitives — same technique as your reference: har word/icon  */
/*  ek overflow-hidden "mask" span ke andar hai, aur andar wala inner   */
/*  span neeche se upar slide karta hai. GSAP sirf .reveal-inner ko     */
/*  target karta hai.                                                   */
/* ------------------------------------------------------------------ */
const Word = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`reveal-mask inline-block overflow-hidden pb-1 align-bottom ${className}`}
  >
    <span className="reveal-inner inline-block will-change-transform">
      {children}
    </span>
  </span>
);

const IconWord = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`reveal-mask inline-block overflow-hidden pb-1 align-middle ${className}`}
  >
    <span className="reveal-inner inline-block will-change-transform">
      {children}
    </span>
  </span>
);

/* ------------------------------------------------------------------ */
/*  Auto-splitter — string children ko word-by-word <Word> me todta    */
/*  hai (spaces preserve karte hue), aur koi bhi non-string child       */
/*  (icon/JSX) ko poora ek <IconWord> me wrap kar deta hai. Isse aap    */
/*  plain text aur icons dono ko seedha children ke through pass kar    */
/*  sakte ho, bina manually <Word>/<IconWord> likhe.                    */
/* ------------------------------------------------------------------ */
function autoWrapChildren(children: ReactNode, wordClassName = "") {
  return React.Children.toArray(children).flatMap((child, idx) => {
    if (typeof child === "string") {
      // (\s+) capture group rakhta hai taaki spaces bhi array me aa jayein
      // aur unhe as-is render kiya ja sake (unwrapped, taaki spacing na tute).
      const parts = child.split(/(\s+)/);
      return parts.map((part, i) =>
        part.trim() === "" ? (
          part
        ) : (
          <Word key={`w-${idx}-${i}`} className={wordClassName}>
            {part}
          </Word>
        ),
      );
    }
    // Element / icon / any non-string node -> ek single reveal unit
    return (
      <IconWord key={`i-${idx}`} className={wordClassName}>
        {child}
      </IconWord>
    );
  });
}

/* ------------------------------------------------------------------ */
/*  RevealHeading — reusable component                                  */
/* ------------------------------------------------------------------ */
export interface RevealHeadingProps {
  /** Text/icons to reveal. Plain strings auto-split into words; any
   *  JSX child (e.g. an <Icon />) is treated as one reveal unit. */
  children: ReactNode;
  /** Tag rendered for the heading itself. Default: "h2" */
  as?: ElementType;
  /** Classes for the <section> wrapper (layout, min-h-screen, bg, etc). */
  containerClassName?: string;
  /** Classes for the heading element (font size, weight, tracking, etc). */
  className?: string;
  /** Extra class applied to every word/icon mask span, if you need it. */
  wordClassName?: string;

  /** ScrollTrigger tuning — all optional, sensible defaults match the reference. */
  start?: string;
  end?: string;
  toggleActions?: string;
  /** true => animation plays once and never reverses on scroll-up. */
  once?: boolean;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** Distance (in %) each word starts below its resting position. */
  yPercent?: number;
}

const RevealHeading = ({
  children,
  as: Tag = "h2",
  containerClassName = "",
  className = "",
  wordClassName = "",
  start = "top 80%",
  end = "top 30%",
  toggleActions,
  once = false,
  duration = 0.8,
  stagger = 0.03,
  ease = "power4.out",
  yPercent = 120,
}: RevealHeadingProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = headingRef.current?.querySelectorAll(".reveal-inner");
      if (!words || words.length === 0) return;

      gsap.set(words, { yPercent, opacity: 0 });

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: sectionRef.current,
          start,
          end,
          toggleActions:
            toggleActions ??
            (once ? "play none none none" : "play none none reverse"),
          invalidateOnRefresh: true,
          // markers: true, // debugging ke liye uncomment kar sakte ho
        },
      });
    },
    { scope: sectionRef, dependencies: [children] },
  );

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={containerClassName}
    >
      <Tag ref={headingRef} className={className}>
        {autoWrapChildren(children, wordClassName)}
      </Tag>
    </section>
  );
};

export default RevealHeading;
export { Word, IconWord };
