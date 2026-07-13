import React from "react";
import ScrollVelocity from "./ScrollVelocity";

const MarqueeSection = () => {
  return (
    <section className="w-full bg-black overflow-hidden">
      <ScrollVelocity
        texts={[
          "Fullstack developer -",
          // "SELECTED PROJECTS -",
          // "SCROLL EXPERIENCES •",
          // "MODERN INTERFACES •",
        ]}
        velocity={60}
        numCopies={6}
        className="text-white/25 uppercase font-normal!"
        parallaxClassName=""
      />
    </section>
  );
};

export default MarqueeSection;
