"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  textClassName?: string;
}

export default function LiquidButton({
  children,
  className = "",
  overlayClassName = "",
  textClassName = "",
  type = "button",
  ...props
}: LiquidButtonProps) {
  return (
    <button
      type={type}
      className={`group relative overflow-hidden rounded-full bg-black px-14 py-4 text-lg transition-colors duration-300 ${className}`}
      {...props}
    >
      {/* Liquid Overlay */}
      <span
        className={`absolute left-0 bottom-0 h-48 w-full origin-bottom translate-y-full rounded-full bg-white/15 transition-transform duration-500 ease-out group-hover:translate-y-14 ${overlayClassName}`}
      />

      {/* Content */}
      <span
        className={`relative z-10 font-semibold text-purple-200 ${textClassName}`}
      >
        {children}
      </span>
    </button>
  );
}
