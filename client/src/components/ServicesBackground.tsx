import React from "react";

// Optimized background - pure CSS, no animations
export default function ServicesBackground({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-linear-to-br from-purple-500/12 via-violet-500/06 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-[450px] h-[450px] bg-linear-to-br from-blue-500/10 via-cyan-500/06 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-linear-to-br from-pink-500/06 via-purple-500/03 to-transparent rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
}
