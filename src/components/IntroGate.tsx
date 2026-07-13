"use client";

import { useState } from "react";
import Intro from "./Intro/Intro";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      {children}
    </>
  );
}
 