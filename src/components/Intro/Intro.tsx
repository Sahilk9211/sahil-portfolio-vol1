"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import greetings from "./greetings";

gsap.registerPlugin(MotionPathPlugin);

export interface IntroProps {
  onComplete?: () => void;
}

// Ek jagah timing tune karo — poore intro ki speed yahin se control hogi
const ENTER_DURATION = 0.06;
const HOLD_DELAY = 0.1;
const EXIT_DURATION = 0.06;
const SLIDE_DURATION = 0.8;

const Intro = ({ onComplete = () => {} }: IntroProps) => {
  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const onCompleteRef = useRef(onComplete);

  // onComplete ka latest reference always ready rakho, bina effect ko
  // restart kiye — isse useEffect dependency se onComplete hata sakte hain
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: ENTER_DURATION, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    if (index >= greetings.length) return;

    const isLast = index === greetings.length - 1;
    const tl = gsap.timeline();

    // ---- entrance (sab greetings ke liye same) ----
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: ENTER_DURATION,
      ease: "power3.out",
    });

    if (isLast) {
      tl.to(textRef.current, {
        opacity: 0,
        duration: EXIT_DURATION,
        delay: HOLD_DELAY,
        y: -50,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: SLIDE_DURATION,
            ease: "power4.inOut",
            onComplete: () => onCompleteRef.current(),
          });
        },
      });
    } else {
      tl.to(textRef.current, {
        opacity: 0,
        duration: EXIT_DURATION,
        delay: HOLD_DELAY,
        y: -50,
        ease: "power3.inOut",
        onComplete: () => {
          setIndex((prev) => prev + 1);
        },
      });
    }

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]); // sirf index pe depend — onComplete ab ref se aayega, refire nahi hoga

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
    >
      <h1
        ref={textRef}
        className="text-5xl md:text-8xl font-bold tracking-wide opacity-0 text-white"
      >
        {greetings[index].text}
      </h1>
    </div>
  );
};

export default Intro;
