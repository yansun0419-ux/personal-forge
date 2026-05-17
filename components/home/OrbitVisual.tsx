"use client";

import { motion } from "framer-motion";

const rings = [160, 230, 300] as const;

export default function OrbitVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(222,255,154,0.26)_0%,_rgba(10,10,10,0)_66%)]" />
      {rings.map((size, index) => (
        <motion.div
          key={size}
          className="absolute left-1/2 top-1/2 rounded-full border border-accent/20"
          style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
          animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 24 + index * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
