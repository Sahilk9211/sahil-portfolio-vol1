"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import TextPressure from "../TextPressure";
import RevealHeading from "../RevealHeading";

export interface ContactSectionProps {
  eyebrow?: string;
  headline?: [string, string];
  bigWord?: string;
  bookCallHref?: string;
  emailHref?: string;
  socials?: { label: string; href: string }[];
}

const defaultSocials = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/sahil-khan-developer/",
  },
  { label: "Instagram", href: "https://www.instagram.com/sahil_04.09" },
  { label: "TWITTER", href: "https://x.com/SahilKhan0409" },
];

export default function ContactSection({
  eyebrow,
  headline = ["Let's Build", "Something."],
  bigWord = "SAHIL'",
  bookCallHref = "https://cal.com/sahiil-khan-dev/30min", //https://cal.com/sahiil-khan-dev/30min
  emailHref = "mailto:sahilk.dev143@gmail.com",
  socials = defaultSocials,
}: ContactSectionProps) {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black px-6 pt-[40vw] md:pt-[65vw] lg:pt-[10vw] xl:pt-[3vw] text-white md:px-16">
      {/* ---------- Top row: headline (left) + socials (right) ---------- */}
      <div className="flex items-start justify-between gap-8 md:gap-4 relative">
        <div>
          {eyebrow && (
            <span className="mb-6 block font-mono text-xs uppercase tracking-[0.3em] opacity-60">
              {eyebrow}
            </span>
          )}

          <h2 className="text-[10vw] font-medium leading-none tracking-tight md:text-[5vw]">
            {headline[0]}
            <br />
            {headline[1]}
          </h2>

          {/* ---------- pill buttons ---------- */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              href={bookCallHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-tight transition-colors hover:bg-white hover:text-black"
            >
              Book a call
              <span aria-hidden="true">
                <FaArrowRightLong />
              </span>
            </a>

            <a
              href={emailHref}
              onClick={() => console.log("clicked")}
              className="flex items-center gap-3 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-tight transition-colors hover:bg-white hover:text-black"
            >
              Drop us an email
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px]"
              >
                @
              </span>
            </a>
          </div>
        </div>

        {/* ---------- socials, top-right ---------- */}
        <nav className="absolute -bottom-32 md:-bottom-20 lg:-bottom-10 right-0 lg:right-36 flex shrink-0 flex-col gap-1 text-right">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block w-fit self-end font- text-2xl"
            >
              {s.label}
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>
      </div>

      {/* ---------- Giant bottom word — deliberately oversized & cut off by
          the section's own edge (overflow-hidden + min-h-screen height) ---------- */}
      {/* <div className="pointer-events-none pb-10 select-none">
        <span
          className="block whitespace-nowrap font-black uppercase leading-[0.8] tracking-tight text-white"
          style={{ fontSize: "22vw" }}
        >
          {bigWord}
        </span>
        <div>©2026 — Founded by Sara Guedj</div>
      </div> */}
      <div className="pointer-events-none select-none mt-20 w-full">
        <TextPressure
          text={bigWord}
          fontFamily="Roboto Flex"
          fontUrl="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap"
          textColor="#ffffff"
          minFontSize={200}
          flex={true}
          width={true}
          weight={true}
          italic={false}
          alpha={false}
          stroke={false}
        />
      </div>
    </section>
  );
}
