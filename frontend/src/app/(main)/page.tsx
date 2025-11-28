'use client';

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
};

type Meteor = {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  dx: number;
  dy: number;
};

type Constellation = {
  stars: { x: number; y: number }[];
  opacity: number;
  speed: number;
  pulseOffset: number;
  pulseDirection: number;
  totalLength: number;
  segmentLengths: number[];
};



const nebulaClouds = [
  
  { id: 1, x: "3%", y: "3%", width: "35vw", height: "2vw", rotation: 35, color: "purple", duration: 60, blur: 55, opacity: 15 },
  { id: 2, x: "55%", y: "6%", width: "22vw", height: "2.5vw", rotation: -15, color: "fuchsia", duration: 40, blur: 30, opacity: 5 },
  { id: 3, x: "25%", y: "12%", width: "28vw", height: "1.5vw", rotation: 50, color: "indigo", duration: 50, blur: 45, opacity: 25 },
  { id: 4, x: "70%", y: "16%", width: "18vw", height: "2vw", rotation: -40, color: "violet", duration: 55, blur: 50, opacity: 18 },
  
  { id: 5, x: "8%", y: "23%", width: "26vw", height: "3vw", rotation: 10, color: "pink", duration: 38, blur: 28, opacity: 4 },
  { id: 6, x: "60%", y: "28%", width: "40vw", height: "1.5vw", rotation: -60, color: "purple", duration: 65, blur: 60, opacity: 12 },
  { id: 7, x: "35%", y: "34%", width: "20vw", height: "2vw", rotation: 25, color: "indigo", duration: 48, blur: 40, opacity: 30 },
  
  { id: 8, x: "5%", y: "42%", width: "24vw", height: "2.5vw", rotation: -20, color: "fuchsia", duration: 42, blur: 32, opacity: 30 },
  { id: 9, x: "50%", y: "48%", width: "32vw", height: "1.5vw", rotation: 70, color: "violet", duration: 58, blur: 50, opacity: 20 },
  { id: 10, x: "75%", y: "52%", width: "15vw", height: "2vw", rotation: -25, color: "pink", duration: 70, blur: 65, opacity: 4 },
  { id: 11, x: "20%", y: "56%", width: "30vw", height: "2vw", rotation: -35, color: "purple", duration: 45, blur: 38, opacity: 32 },
  
  { id: 12, x: "65%", y: "62%", width: "20vw", height: "3vw", rotation: 15, color: "indigo", duration: 36, blur: 25, opacity: 25 },
  { id: 13, x: "10%", y: "68%", width: "38vw", height: "1.5vw", rotation: 80, color: "fuchsia", duration: 62, blur: 55, opacity: 15 },
  { id: 14, x: "40%", y: "74%", width: "25vw", height: "2vw", rotation: -50, color: "violet", duration: 52, blur: 42, opacity: 28 },
  
  { id: 15, x: "2%", y: "82%", width: "20vw", height: "2.5vw", rotation: -10, color: "pink", duration: 40, blur: 30, opacity: 5 },
  { id: 16, x: "55%", y: "86%", width: "35vw", height: "2vw", rotation: 45, color: "purple", duration: 55, blur: 48, opacity: 22 },
  { id: 17, x: "30%", y: "92%", width: "45vw", height: "1.5vw", rotation: -75, color: "indigo", duration: 68, blur: 58, opacity: 12 },
  { id: 18, x: "72%", y: "95%", width: "22vw", height: "2vw", rotation: 30, color: "fuchsia", duration: 44, blur: 35, opacity: 28 },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let constellations: Constellation[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initConstellations();
    };

    const initStars = () => {
      stars = [];
      const totalHeight = window.innerHeight * 5;
      const count = Math.floor((canvas.width * totalHeight) / 16000); 
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

    const initConstellations = () => {
      constellations = [];
      const totalHeight = window.innerHeight * 5;
      const count = Math.floor(totalHeight / 400); 
      const centers: {x: number, y: number}[] = [];

      for (let i = 0; i < count; i++) {
        let centerX = 0, centerY = 0;
        let valid = false;
        let attempts = 0;
        
        while (!valid && attempts < 50) {
          centerX = Math.random() * (canvas.width - 200) + 100;
          centerY = Math.random() * totalHeight;
          valid = true;
          for (const c of centers) {
            const dx = c.x - centerX;
            const dy = c.y - centerY;
            if (Math.sqrt(dx*dx + dy*dy) < 500) {
              valid = false;
              break;
            }
          }
          attempts++;
        }

        if (!valid) continue;
        centers.push({x: centerX, y: centerY});

        const numStars = Math.floor(Math.random() * 3) + 3; 
        
        const points: {x: number, y: number}[] = [];
        for(let j=0; j<numStars; j++) {
            points.push({
                x: centerX + (Math.random() * 300 - 150),
                y: centerY + (Math.random() * 300 - 150)
            });
        }
        
        const path: {x: number, y: number}[] = [points[0]];
        const unvisited = points.slice(1);
        
        while(unvisited.length > 0) {
            const current = path[path.length - 1];
            let nearestIdx = 0;
            let minDist = Number.MAX_VALUE;
            
            for(let k=0; k<unvisited.length; k++) {
                const dx = unvisited[k].x - current.x;
                const dy = unvisited[k].y - current.y;
                const dist = dx*dx + dy*dy;
                if(dist < minDist) {
                    minDist = dist;
                    nearestIdx = k;
                }
            }
            
            path.push(unvisited[nearestIdx]);
            unvisited.splice(nearestIdx, 1);
        }
        
        let totalLength = 0;
        const segmentLengths: number[] = [];
        for(let k=0; k<path.length-1; k++) {
            const dx = path[k+1].x - path[k].x;
            const dy = path[k+1].y - path[k].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            segmentLengths.push(dist);
            totalLength += dist;
        }

        constellations.push({
          stars: path,
          opacity: Math.random() * 0.5 + 0.4,
          speed: Math.random() * 0.005 + 0.001,
          pulseOffset: Math.random(),
          pulseDirection: 1,
          totalLength,
          segmentLengths,
        });
      }
    };

    const createMeteor = () => {
      const scrollTop = container.scrollTop;
      const startX = Math.random() * canvas.width;
      
      const startY = scrollTop + Math.random() * (window.innerHeight / 2);
      
      const angle = Math.PI * 0.75 + (Math.random() * 0.2 - 0.1); 
      const speed = 5 + Math.random() * 10;
      
      meteors.push({
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
      
      const mouse = mouseRef.current;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.x - 6}px, ${mouse.y - 6}px, 0)`;
      }

      const glowGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
      glowGradient.addColorStop(0, "rgba(100, 100, 255, 0.15)");
      glowGradient.addColorStop(1, "transparent");
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      constellations.forEach((c) => {
        
        c.pulseOffset += 0.003 * c.pulseDirection;
        if (c.pulseOffset > 1 || c.pulseOffset < 0) {
          c.pulseDirection *= -1;
        }
        
        const firstStarY = c.stars[0].y - scrollTop;
        if (firstStarY > -300 && firstStarY < canvas.height + 300) {
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
          ctx.lineWidth = 1;
          
          c.stars.forEach((star, index) => {
            const drawY = star.y - scrollTop;
            if (index === 0) {
              ctx.moveTo(star.x, drawY);
            } else {
              ctx.lineTo(star.x, drawY);
            }
          });
          ctx.stroke();
          
          const totalSegments = c.stars.length - 1;
          const stripPixelLength = 80; 
          
          const currentPixelPos = c.pulseOffset * c.totalLength;
          const startPixel = currentPixelPos - stripPixelLength / 2;
          const endPixel = currentPixelPos + stripPixelLength / 2;

          let currentSegmentStartPixel = 0;

          for (let i = 0; i < totalSegments; i++) {
            const segmentLength = c.segmentLengths[i];
            const currentSegmentEndPixel = currentSegmentStartPixel + segmentLength;
            
            const overlapStart = Math.max(startPixel, currentSegmentStartPixel);
            const overlapEnd = Math.min(endPixel, currentSegmentEndPixel);

            if (overlapStart < overlapEnd) {
              
              const localStartT = (overlapStart - currentSegmentStartPixel) / segmentLength;
              const localEndT = (overlapEnd - currentSegmentStartPixel) / segmentLength;

              const p1 = c.stars[i];
              const p2 = c.stars[i + 1];

              const x1 = p1.x + (p2.x - p1.x) * localStartT;
              const y1 = (p1.y - scrollTop) + ((p2.y - scrollTop) - (p1.y - scrollTop)) * localStartT;
              
              const x2 = p1.x + (p2.x - p1.x) * localEndT;
              const y2 = (p1.y - scrollTop) + ((p2.y - scrollTop) - (p1.y - scrollTop)) * localEndT;
    
              const grad = ctx.createLinearGradient(x1, y1, x2, y2);
              
              const getOpacity = (pixelPos: number) => {
                  const dist = Math.abs(pixelPos - currentPixelPos);
                  return Math.max(0, 1 - dist / (stripPixelLength / 2));
              };

              grad.addColorStop(0, `rgba(255, 255, 255, ${getOpacity(overlapStart)})`);
              
              
              if (currentPixelPos > overlapStart && currentPixelPos < overlapEnd) {
                  const peakPos = (currentPixelPos - overlapStart) / (overlapEnd - overlapStart);
                  grad.addColorStop(peakPos, `rgba(255, 255, 255, 1)`);
              }
              
              grad.addColorStop(1, `rgba(255, 255, 255, ${getOpacity(overlapEnd)})`);

              ctx.beginPath();
              ctx.strokeStyle = grad;
              ctx.lineWidth = 2;
              ctx.lineCap = 'round';
              ctx.shadowBlur = 5;
              ctx.shadowColor = "white";
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
            
            currentSegmentStartPixel += segmentLength;
          }
          
          c.stars.forEach((star) => {
             const drawY = star.y - scrollTop;
             ctx.fillStyle = `rgba(255, 255, 255, ${c.opacity})`;
             ctx.beginPath();
             ctx.arc(star.x, drawY, 2, 0, Math.PI * 2);
             ctx.fill();
          });
        }
      });

      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.speed = -star.speed;
        }
        
        const drawY = star.y - scrollTop;
        if (drawY >= -10 && drawY <= canvas.height + 10) {
          
          const dx = star.x - mouse.x;
          const dy = drawY - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          let size = star.size;
          let opacity = star.opacity;

          if (dist < 150) {
            opacity = Math.min(1, star.opacity + 0.5);
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, drawY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.opacity -= 0.02;
        if (m.opacity <= 0 || m.x < 0 || m.x > canvas.width) {
          meteors.splice(i, 1);
          continue;
        }

        const drawY = m.y - scrollTop;
        
        if (drawY > -200 && drawY < canvas.height + 200) {
          const tailX = m.x - (m.dx / m.speed) * m.length;
          const tailY = drawY - (m.dy / m.speed) * m.length;

          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(255, 255, 255, 0.6)";

          const grad = ctx.createLinearGradient(m.x, drawY, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(m.x, drawY);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          
          
          ctx.shadowBlur = 25;
          ctx.shadowColor = "rgba(255, 255, 255, 1)";
          ctx.fillStyle = `rgba(255, 255, 255, ${m.opacity})`;
          ctx.beginPath();
          ctx.arc(m.x, drawY, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (Math.random() < 0.03) {
        createMeteor();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-black text-white cursor-none">
      <div ref={cursorRef} className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-50 mix-blend-difference shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      
      <div className="absolute inset-x-0 top-0 z-0 h-[500vh] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0221] via-[#0f0518] via-[#090118] via-[#05010e] to-[#000000]" />
      </div>

      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />

      <div className="absolute inset-x-0 top-0 z-0 h-[500vh] pointer-events-none overflow-hidden">
        {nebulaClouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute rounded-full pointer-events-none mix-blend-screen"
            style={{
              width: cloud.width,
              height: cloud.height,
              left: cloud.x,
              top: cloud.y,
              filter: `blur(${cloud.blur}px)`,
              opacity: cloud.opacity / 100,
              backgroundColor: 
                cloud.color === "purple" ? "rgb(168, 85, 247)" :
                cloud.color === "fuchsia" ? "rgb(217, 70, 239)" :
                cloud.color === "indigo" ? "rgb(99, 102, 241)" :
                cloud.color === "violet" ? "rgb(139, 92, 246)" :
                "rgb(236, 72, 153)",
            }}
            initial={{ rotate: cloud.rotation }}
            animate={{
              x: [0, 30, -15, 20, 0],
              y: [0, -20, 12, -8, 0],
              scale: [1, 1.08, 0.95, 1.04, 1],
              rotate: [cloud.rotation, cloud.rotation + 5, cloud.rotation - 3, cloud.rotation + 2, cloud.rotation],
            }}
            transition={{
              duration: cloud.duration,
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
