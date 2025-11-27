'use client';

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  dx: number;
  dy: number;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const totalHeight = window.innerHeight * 5;
      const count = Math.floor((canvas.width * totalHeight) / 8000); 
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * totalHeight,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          speed: (Math.random() * 0.01 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    const createShootingStar = () => {
      const scrollTop = container.scrollTop;
      const startX = Math.random() * canvas.width;
      
      const startY = scrollTop + Math.random() * (window.innerHeight / 2);
      
      
      const angle = Math.PI * 0.75 + (Math.random() * 0.2 - 0.1); 
      const speed = 15 + Math.random() * 10;
      
      shootingStars.push({
        x: startX,
        y: startY,
        length: 100 + Math.random() * 50,
        speed: speed,
        opacity: 1,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
      });
    };

    const animate = () => {
      const scrollTop = container.scrollTop;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      
      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.speed = -star.speed;
        }

        
        const drawY = star.y - scrollTop;
        if (drawY >= -10 && drawY <= canvas.height + 10) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.dx;
        s.y += s.dy;
        s.opacity -= 0.02;
        
        if (s.opacity <= 0 || s.x < 0 || s.x > canvas.width) {
          shootingStars.splice(i, 1);
          continue;
        }

        const drawY = s.y - scrollTop;
        
        if (drawY > -200 && drawY < canvas.height + 200) {
          const tailX = s.x - (s.dx / s.speed) * s.length;
          const tailY = drawY - (s.dy / s.speed) * s.length;

          const grad = ctx.createLinearGradient(s.x, drawY, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x, drawY);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          
          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
          ctx.beginPath();
          ctx.arc(s.x, drawY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (Math.random() < 0.015) {=
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-black text-white">
      
      <div className="absolute inset-x-0 top-0 z-0 h-[500vh] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0f0518] via-[#090118] via-[#05010e] to-[#000000]" />
      </div>

      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />

      <div className="absolute inset-x-0 top-0 z-0 h-[500vh] pointer-events-none overflow-hidden">
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
      </div>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Hero Section</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Featured Events</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Testimonials / Gallery</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Learn Astronomy</h1>
      </section>

      <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center">
        <h1 className="text-4xl font-bold text-slate-300 tracking-widest uppercase">Footer</h1>
      </section>

    </div>
  );
}
