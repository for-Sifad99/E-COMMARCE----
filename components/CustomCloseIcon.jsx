'use client';

import { Minus } from "lucide-react";
import { useState } from "react";

export function CustomCloseIcon({ size = 32, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative w-${size} h-${size} cursor-pointer transform transition-transform duration-500 ${hovered ? 'rotate-180' : ''}`}
    >
      {/* First line - green */}
      <Minus
        size={size}
        color="#00a63e"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[45deg]"
      />

      {/* Second line - black */}
      <Minus
        size={size}
        color="black"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[45deg]"
      />
    </div>
  );
}
