'use client';

import { motion } from "framer-motion";

const stars = [...Array(80)].map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  opacity: Math.random() * 0.7 + 0.3,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 2,
}));

export default function CosmicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0a0118] to-black" />
      
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      <div 
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 60%)',
          filter: 'blur(100px)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 60%)',
          filter: 'blur(100px)',
          transform: 'translate(30%, 30%)',
        }}
      />
    </div>
  );
}
