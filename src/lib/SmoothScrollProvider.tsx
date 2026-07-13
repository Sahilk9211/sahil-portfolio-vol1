"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScrollProvider
 * Lenis ko gsap.ticker ke saath sync karta hai taaki scroll aur
 * GSAP animations perfectly in-sync rahein (no drift, no double RAF loop).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis instance banate hain — smoothness yahin control hoti hai
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Lenis scroll hote hi ScrollTrigger ko update karo
    lenis.on("scroll", ScrollTrigger.update);

    // gsap.ticker hi single RAF loop chalayega — Lenis apna khud ka RAF nahi chalayega
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // GSAP ka apna lag-smoothing off kar dete hain, Lenis already smooth hai
    gsap.ticker.lagSmoothing(0);

    // Fonts / images async load hone par layout shift hoti hai,
    // isliye load ke baad ek refresh zaroor karo
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
