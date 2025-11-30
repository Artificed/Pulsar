'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

type FeaturedEvent = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  datetime: string;
  location: string;
  price: number;
};

const mockEvents: FeaturedEvent[] = [
  {
    id: "1",
    title: "Journey to the Edge of the Universe",
    description: "Experience a breathtaking voyage through billions of light-years, witnessing the birth and death of stars.",
    image_url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    datetime: "2025-12-15T19:00:00",
    location: "Main Dome",
    price: 25,
  },
  {
    id: "2",
    title: "The Aurora Borealis Experience",
    description: "Immerse yourself in the dancing lights of the polar skies in this stunning 360° projection show.",
    image_url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    datetime: "2025-12-18T20:30:00",
    location: "Immersion Theater",
    price: 30,
  },
  {
    id: "3",
    title: "Mars: The Next Frontier",
    description: "Explore humanity's plans to colonize the Red Planet with cutting-edge visualization technology.",
    image_url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80",
    datetime: "2025-12-20T18:00:00",
    location: "Discovery Hall",
    price: 20,
  },
  {
    id: "4",
    title: "Black Holes: Monsters of the Cosmos",
    description: "Dive into the most mysterious objects in the universe and witness the power of singularities.",
    image_url: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80",
    datetime: "2025-12-22T19:30:00",
    location: "Main Dome",
    price: 25,
  },
  {
    id: "5",
    title: "Stargazing Night: Winter Constellations",
    description: "Join our astronomers for a live telescope viewing session of Orion, Taurus, and more.",
    image_url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    datetime: "2025-12-25T21:00:00",
    location: "Observatory Deck",
    price: 15,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
};

export default function FeaturedEvents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mockEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const totalCards = mockEvents.length;
    
    let adjustedDiff = diff;
    if (diff > totalCards / 2) adjustedDiff = diff - totalCards;
    if (diff < -totalCards / 2) adjustedDiff = diff + totalCards;

    const isActive = adjustedDiff === 0;
    const absPos = Math.abs(adjustedDiff);

    return {
      x: adjustedDiff * 380,
      scale: isActive ? 1 : Math.max(0.75, 1 - absPos * 0.12),
      zIndex: 10 - absPos,
      opacity: absPos > 2 ? 0 : 1 - absPos * 0.25,
      rotateY: adjustedDiff * -8,
      filter: isActive ? 'blur(0px)' : `blur(${absPos * 2}px)`,
    };
  };

  const activeEvent = mockEvents[activeIndex];
  const formattedDate = formatDate(activeEvent.datetime);

  return (
    <section className="relative z-10 h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <motion.div
        className="text-center mb-16 z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="text-purple-400/70 text-sm tracking-[0.3em] uppercase mb-4"
        >
          Don't Miss Out
        </motion.p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Featured <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Events</span>
        </h2>
      </motion.div>

      <div 
        className="relative w-full h-[520px] flex items-center justify-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="popLayout">
          {mockEvents.map((event, index) => {
            const style = getCardStyle(index);
            const date = formatDate(event.datetime);
            
            return (
              <motion.div
                key={event.id}
                className="absolute cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  rotateY: style.rotateY,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                onClick={() => setActiveIndex(index)}
                style={{ perspective: 1000 }}
                data-hover
              >
                <div 
                  className="relative w-[340px] h-[460px] rounded-2xl overflow-hidden group"
                  style={{
                    boxShadow: index === activeIndex 
                      ? '0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)'
                      : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${event.image_url})` }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        border: '2px solid transparent',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.5)) border-box',
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                    <div className="text-purple-400 text-xs font-medium">{date.month}</div>
                    <div className="text-white text-xl font-bold">{date.date}</div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                    
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold">${event.price}</span>
                      <span className="text-slate-500 text-sm">{date.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-3 z-20">
        {mockEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative p-1"
            data-hover
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{
                scale: index === activeIndex ? 1.5 : 1,
                backgroundColor: index === activeIndex ? 'rgb(167, 139, 250)' : 'rgb(71, 85, 105)',
              }}
              transition={{ duration: 0.3 }}
            />
            {index === activeIndex && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        className="mt-8 z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Link href="/event">
          <motion.button
            className="px-8 py-3 border border-purple-500/40 rounded-full text-purple-300 font-medium hover:bg-purple-500/10 hover:border-purple-400/60 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-hover
          >
            View All Events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute bottom-20 left-0 right-0 text-center px-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-slate-400 max-w-lg mx-auto text-sm line-clamp-2">
            {activeEvent.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
