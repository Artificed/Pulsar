'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 500,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));
};

const floatingOrbs = [
  { id: 1, x: "10%", y: "10%", size: "25vw", color: "purple", duration: 20 },
  { id: 2, x: "70%", y: "60%", size: "20vw", color: "fuchsia", duration: 25 },
  { id: 3, x: "20%", y: "120%", size: "18vw", color: "indigo", duration: 18 },
  { id: 4, x: "80%", y: "180%", size: "15vw", color: "violet", duration: 22 },
  { id: 5, x: "15%", y: "220%", size: "20vw", color: "pink", duration: 30 },
  { id: 6, x: "60%", y: "280%", size: "18vw", color: "purple", duration: 24 },
  { id: 7, x: "30%", y: "350%", size: "25vw", color: "fuchsia", duration: 28 },
  { id: 8, x: "75%", y: "420%", size: "15vw", color: "indigo", duration: 20 },
  { id: 9, x: "50%", y: "50%", size: "30vw", color: "violet", duration: 35 },
  { id: 10, x: "90%", y: "10%", size: "12vw", color: "pink", duration: 15 },
  { id: 11, x: "5%", y: "90%", size: "15vw", color: "purple", duration: 28 },
  { id: 12, x: "40%", y: "150%", size: "18vw", color: "fuchsia", duration: 22 },
  { id: 13, x: "85%", y: "250%", size: "25vw", color: "indigo", duration: 32 },
  { id: 14, x: "10%", y: "320%", size: "12vw", color: "violet", duration: 19 },
  { id: 15, x: "60%", y: "400%", size: "20vw", color: "purple", duration: 26 },
  { id: 16, x: "20%", y: "445%", size: "18vw", color: "pink", duration: 24 },
  { id: 17, x: "70%", y: "470%", size: "18vw", color: "fuchsia", duration: 24 },
];

export default function Home() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars(800));
  }, []);

  return (
    <div className="relative h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-black text-white">
      <div className="absolute inset-x-0 top-0 z-0 h-[500vh] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0f0518] via-[#090118] via-[#05010e] to-[#000000]" />

        {floatingOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full pointer-events-none blur-[120px] opacity-50 mix-blend-screen ${
              orb.color === "purple" ? "bg-purple-600/20" :
              orb.color === "fuchsia" ? "bg-fuchsia-600/20" :
              orb.color === "indigo" ? "bg-indigo-600/20" :
              orb.color === "violet" ? "bg-violet-600/20" :
              "bg-pink-600/20"
            }`}
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
            }}
            animate={{
              x: [0, 100, -50, 80, 0],
              y: [0, -80, 50, -30, 0],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: "0 0 6px 2px rgba(11, 5, 5, 0.6), -100px 0 60px 8px rgba(255,255,255,0.3)",
          }}
          initial={{ left: "100%", top: "10%", opacity: 0 }}
          animate={{
            left: ["-10%"],
            top: ["30%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeOut",
          }}
        />

        <motion.div
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.6), -80px 0 50px 6px rgba(255,255,255,0.3)",
          }}
          initial={{ left: "80%", top: "150%", opacity: 0 }}
          animate={{
            left: ["-20%"],
            top: ["180%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 12,
            delay: 5,
            ease: "easeOut",
          }}
        />
      </div>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center border-b border-white/5">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Hero Section</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center border-b border-white/5">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Featured Events</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center border-b border-white/5">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Testimonials / Gallery</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center border-b border-white/5">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Learn Astronomy</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Footer</h1>
      </section>

    </div>
  );
}
