// Old
"use client";

import { useRef } from "react";
import VariableProximity from "@/components/VariableProximity";
import TextMorphMotion from "../TextMorph";
import { SquigglyText } from "../squiggly-text";

export default function HeroSection() {
  // Poore hero block ka ref — VariableProximity isi ke relative
  // mouse position calculate karta hai, isliye saari headline
  // lines isi ek container ko share karti hain.
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

// "use client";

// import { useRef, useLayoutEffect } from "react";
// import gsap from "gsap";
// import VariableProximity from "@/components/VariableProximity";
// import TextMorphMotion from "../TextMorph";

// // Module scope me — component ke andar nahi. Isliye React Strict Mode ke
// // mount -> cleanup -> mount-again cycle ke dono effect calls ke beech
// // ye value survive karti hai (useRef component-instance ke saath fresh
// // hota, lekin remount pe bhi wahi instance rehta hai isliye theek se kaam
// // karta — dono approach chalte, module flag zyada explicit hai).
// let hasPlayedEntrance = false;

// export default function HeroSection() {
//   // Poore hero block ka ref — VariableProximity isi ke relative
//   // mouse position calculate karta hai, isliye saari headline
//   // lines isi ek container ko share karti hain.
//   const containerRef = useRef<HTMLDivElement>(null);

//   // ---- refs jo sirf GSAP entrance animation ke liye hain ----
//   const sectionRef = useRef<HTMLElement>(null);
//   const topBarRef = useRef<HTMLDivElement>(null);
//   const line1Ref = useRef<HTMLDivElement>(null);
//   const line2Ref = useRef<HTMLDivElement>(null);
//   const line3Ref = useRef<HTMLDivElement>(null);
//   const line4Ref = useRef<HTMLDivElement>(null);
//   const imageWrapRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     // gsap.context() -> sab tweens is component ke scope me register hote hain,
//     // isliye cleanup (revert) pe sab automatically hat jaate hain — koi memory leak nahi.
//     const ctx = gsap.context(() => {
//       const entranceTargets = [
//         topBarRef.current,
//         line1Ref.current,
//         line2Ref.current,
//         line3Ref.current,
//         line4Ref.current,
//         imageWrapRef.current,
//       ];

//       // ---- React Strict Mode dev-mode double-invoke guard ----
//       // Dev mode me React is effect ko mount -> cleanup -> mount again karke
//       // do baar chalata hai (bugs pakadne ke liye). Pehli baar timeline chalti
//       // hai, cleanup usse revert kar deta hai, aur dusri baar fir se poori
//       // timeline chalti hai — isi wajah se "ek baar normal load, fir dobara
//       // load" jaisa flash dikhta hai. Production build me ye sirf ek hi baar
//       // chalta hai, isliye ye guard sirf dev-mode ke iss extra invoke ko
//       // "skip" karta hai (final state seedha set kar deta hai, dobara animate
//       // nahi karta) — module-level flag hai isliye dono invocations ke beech
//       // survive karta hai.
//       if (hasPlayedEntrance) {
//         gsap.set(entranceTargets, { clearProps: "all" });
//         return;
//       }
//       hasPlayedEntrance = true;

//       const tl = gsap.timeline({
//         defaults: { ease: "power4.out" },
//       });

//       // 1. top bar — halka fade + thoda upar se aana
//       tl.from(topBarRef.current, {
//         y: -20,
//         opacity: 0,
//         duration: 0.7,
//       });

//       // 2. headline lines — har line neeche se upar aayegi, thoda stagger ke saath
//       //    (font-family / fontVariationSettings ko touch nahi kar rahe, sirf
//       //    wrapper <div> ka transform+opacity animate ho raha hai, isliye
//       //    VariableProximity ka mouse-proximity effect bilkul unaffected rahega)
//       tl.from(
//         [
//           line1Ref.current,
//           line2Ref.current,
//           line3Ref.current,
//           line4Ref.current,
//         ],
//         {
//           y: "100%",
//           opacity: 0,
//           duration: 1,
//           stagger: 0.12,
//         },
//         "-=0.3", // top bar ke thoda overlap me shuru ho jaye
//       );

//       // 3. image — scale + fade in, headline ke saath hi thoda overlap karte hue
//       tl.from(
//         imageWrapRef.current,
//         {
//           scale: 0.85,
//           opacity: 0,
//           duration: 1,
//         },
//         "-=0.6",
//       );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative min-h-screen w-full px-4 py-4 md:px-14 md:py-5 text-[#202020] bg-[#e7e6e3] overflow-hidden flex flex-col"
//     >
//       <style>{`
//         /* DM Sans ka VARIABLE range load kar rahe hain (sirf static weights nahi),
//            warna VariableProximity ka wght interpolation kaam nahi karega. */
//         @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:opsz,wght@9..40,100..1000&display=swap');

//         .headline {
//           font-family: 'Archivo Black', sans-serif;
//         }

//         .dm-sans {
//           font-family: 'DM Sans', sans-serif;
//         }

//         @keyframes badge-spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .badge-spin {
//           animation: badge-spin 14s linear infinite;
//         }
//       `}</style>

//       {/* ---------- Top Bar ---------- */}
//       <div
//         ref={topBarRef}
//         className="flex items-center justify-between text-xs md:text-base dm-sans leading-5"
//       >
//         <div className="font-semibold tracking-tighter">
//           <span className="block md:hidden">
//             Open for <br /> work —
//           </span>

//           <span className="hidden md:block">
//             Open for offers and <br /> collaborations —
//           </span>
//         </div>

//         <span className="font-bold text-sm md:text-lg uppercase cursor-pointer">
//           {/* <TextMorphMotion /> */}
//           SAHIL KHAN
//         </span>

//         <span className="text-end font-semibold tracking-tighter">
//           Mumbai
//           <br /> — Ind
//         </span>
//       </div>

//       {/* ---------- Hero Content (Vertically Centered) ---------- */}
//       <div className="flex-1 flex items-center">
//         <div ref={containerRef} className="relative w-full">
//           <div className="uppercase leading-[0.85] tracking-tight text-[14vw] sm:text-[11vw] md:text-[10vw] xl:text-[9vw] w-full font-medium dm-sans relative z-10">
//             {/* har line ko ek overflow-hidden wrapper me rakha hai taaki
//                 y:"100%" se enter hote waqt woh "reveal upward" jaisa dikhe,
//                 bina layout ke bahar overflow kiye */}
//             <div className="overflow-hidden">
//               <div ref={line1Ref}>
//                 <VariableProximity
//                   label="Crafting"
//                   fromFontVariationSettings="'wght' 400, 'opsz' 9"
//                   toFontVariationSettings="'wght' 900, 'opsz' 40"
//                   containerRef={
//                     containerRef as React.MutableRefObject<HTMLElement | null>
//                   }
//                   radius={220}
//                   falloff="linear"
//                   style={{ fontFamily: "'DM Sans', sans-serif" }}
//                 />
//               </div>
//             </div>

//             <div className="overflow-hidden text-center pl-[8vw] sm:pl-[10vw] xl:pl-[10vw]">
//               <div ref={line2Ref}>
//                 <VariableProximity
//                   label="Modern &"
//                   fromFontVariationSettings="'wght' 400, 'opsz' 9"
//                   toFontVariationSettings="'wght' 900, 'opsz' 40"
//                   containerRef={
//                     containerRef as React.MutableRefObject<HTMLElement | null>
//                   }
//                   radius={220}
//                   falloff="linear"
//                   style={{ fontFamily: "'DM Sans', sans-serif" }}
//                 />
//               </div>
//             </div>

//             <div className="overflow-hidden text-start sm:pl-[34vw] md:pl-[30vw] xl:pl-[15vw]">
//               <div ref={line3Ref}>
//                 <VariableProximity
//                   label="DIGITAL"
//                   fromFontVariationSettings="'wght' 400, 'opsz' 9"
//                   toFontVariationSettings="'wght' 900, 'opsz' 40"
//                   containerRef={
//                     containerRef as React.MutableRefObject<HTMLElement | null>
//                   }
//                   radius={220}
//                   falloff="linear"
//                   style={{ fontFamily: "'DM Sans', sans-serif" }}
//                 />
//               </div>
//             </div>

//             <div className="overflow-hidden text-end">
//               <div ref={line4Ref}>
//                 <VariableProximity
//                   label="Experiences"
//                   fromFontVariationSettings="'wght' 400, 'opsz' 9"
//                   toFontVariationSettings="'wght' 900, 'opsz' 40"
//                   containerRef={
//                     containerRef as React.MutableRefObject<HTMLElement | null>
//                   }
//                   radius={220}
//                   falloff="linear"
//                   style={{ fontFamily: "'DM Sans', sans-serif" }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Image */}
//           <div
//             ref={imageWrapRef}
//             className=" relative mt-6 w-[55vw] max-w-65 mx-auto sm:absolute sm:mt-0 sm:mx-0 sm:left-0 sm:-bottom-20 sm:w-[30vw] sm:max-w-none
//               md:w-[26vw] xl:w-[18vw] xl:max-w-95 xl:-bottom-8

//               z-0
//             "
//           >
//             <img
//               src="https://images.unsplash.com/photo-1770045517575-a90db8a4cabe?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODM3NzQ0Mjh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format"
//               alt="Sahil Khan portrait"
//               className="w-full aspect-3/4 object-cover"
//               style={{ imageRendering: "pixelated" }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
