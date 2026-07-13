import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import IntroGate from "@/components/IntroGate";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Sahil Khan — Portfolio",
  description: "Fullstack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <CustomCursor />
        <SmoothScrollProvider>
          <IntroGate>{children}</IntroGate>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
