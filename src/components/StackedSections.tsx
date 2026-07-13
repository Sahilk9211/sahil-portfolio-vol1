"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type StackItem = {
  id: string;
  content: React.ReactNode;
  speed?: number;
};

export default function StackedSections({ items }: { items: StackItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pages = gsap.utils.toArray<HTMLElement>(".stack-page");
      const total = pages.length;

      pages.forEach((page, i) => {
        const isLast = i === total - 1;
        const speed = items[i]?.speed ?? 30;
     
        gsap
          .timeline({
            scrollTrigger: {
              trigger: page,
              start: "clamp(top bottom)",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(page, {
            yPercent: isLast ? 0 : speed,
            // scale: isLast ? 1 : 0.94,
            ease: "none",
            startAt: { filter: "brightness(100%)" },
            // filter: isLast ? "none" : "brightness(45%)",
          });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <div ref={containerRef} className="relative">
      {items.map((item, i) => (
        <section
          key={item.id}
          className="stack-page relative min-h-full w-full"
          style={{ zIndex: i + 1 }}
        >
          {item.content}
        </section>
      ))}
    </div>
  );
}
