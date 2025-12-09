'use client';

import { useEffect, useState } from "react";

const stars = [...Array(80)].map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.7 + 0.3,
  layer: Math.floor(Math.random() * 3),
}));

const nebulaClouds = [
  { x: '-5%', y: '-5%', size: 500, color: 'rgba(139, 92, 246, 0.12)', blur: 100 },
  { x: '85%', y: '60%', size: 450, color: 'rgba(168, 85, 247, 0.1)', blur: 90 },
];

export default function BookingsBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const layer0Stars = stars.filter(s => s.layer === 0);
  const layer1Stars = stars.filter(s => s.layer === 1);
  const layer2Stars = stars.filter(s => s.layer === 2);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0a0118] to-black" />
      
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      >
        {nebulaClouds.map((cloud, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: cloud.x,
              top: cloud.y,
              width: cloud.size,
              height: cloud.size,
              background: `radial-gradient(circle, ${cloud.color} 0%, transparent 70%)`,
              filter: `blur(${cloud.blur}px)`,
            }}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        {layer0Stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size * 0.8,
              height: star.size * 0.8,
            }}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.06}px)` }}
      >
        {layer1Stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/60"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        {layer2Stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size * 1.2,
              height: star.size * 1.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
