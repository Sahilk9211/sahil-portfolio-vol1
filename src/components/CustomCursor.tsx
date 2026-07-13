"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.3,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.3,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest<HTMLElement>("[data-cursor-hover]");
      if (hoverEl) {
        setIsHovering(true);
        setLabel(hoverEl.getAttribute("data-cursor-text") ?? "");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest("[data-cursor-hover]");
      if (hoverEl) {
        setIsHovering(false);
        setLabel("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // hover pe size 20px se 96px tak expand hota hai
  useGSAP(() => {
    gsap.to(cursorRef.current, {
      width: isHovering ? 96 : 20,
      height: isHovering ? 96 : 20,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-300 ${
        isHovering
          ? "bg-black/30 backdrop-blur-md" // Visit state — solid blurred circle
          : "bg-white mix-blend-difference" // normal state — auto-invert dot
      }`}
    >
      {label && (
        <span className="whitespace-nowrap text-xs font-extralight uppercase tracking-widest text-white">
          {label}
        </span>
      )}
    </div>
  );
}
