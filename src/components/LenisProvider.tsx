"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import * as React from "react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children as unknown as React.ComponentProps<typeof ReactLenis>["children"]}
    </ReactLenis>
  );
}
