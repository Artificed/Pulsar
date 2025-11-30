'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Astronomy Enthusiast",
    quote: "The Journey to the Edge of the Universe show literally brought tears to my eyes. I've never felt so small and yet so connected to everything around me.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "Science Teacher",
    quote: "I bring my students here every semester. The way Pulsar makes complex astronomical concepts accessible is nothing short of magical.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "First-time Visitor",
    quote: "The Aurora Borealis Experience was absolutely breathtaking. It felt like I was actually standing under the northern lights!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    id: "4",
    name: "David Park",
    role: "Astrophotographer",
    quote: "As someone who photographs the night sky professionally, I was blown away by the accuracy and beauty of their visualizations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Parent",
    quote: "My kids haven't stopped talking about their visit. The interactive exhibits sparked a genuine curiosity about space that I've never seen before.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  const avatarPositions = [
    { top: '18%', left: '15%', size: 100 },
    { top: '20%', right: '18%', size: 88 },
    { top: '55%', left: '12%', size: 80 },
    { top: '58%', right: '14%', size: 92 },
    { bottom: '18%', left: '22%', size: 80 },
  ];

  return (
    <section className="relative z-10 h-screen w-full snap-start flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <motion.div
            className="absolute inset-0 rounded-full border border-purple-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-purple-500/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-16 rounded-full border border-purple-500/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {testimonials.map((testimonial, index) => {
        const pos = avatarPositions[index];
        const isActive = index === activeIndex;
        
        return (
          <motion.button
            key={testimonial.id}
            className="absolute cursor-none"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
            }}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="rounded-full overflow-hidden"
                style={{ width: pos.size, height: pos.size }}
                animate={{
                  boxShadow: isActive 
                    ? '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(168, 85, 247, 0.3)'
                    : '0 0 20px rgba(168, 85, 247, 0.2)',
                  borderWidth: isActive ? 3 : 2,
                  borderColor: isActive ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.3)',
                }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  style={{
                    filter: isActive ? 'grayscale(0%)' : 'grayscale(50%)',
                    transition: 'filter 0.4s',
                  }}
                />
              </motion.div>
              
              {isActive && (
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-purple-400/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          </motion.button>
        );
      })}

      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg className="w-16 h-16 mx-auto text-purple-500/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-8">
              "{activeTestimonial.quote}"
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <div>
                <p className="text-white font-semibold">{activeTestimonial.name}</p>
                <p className="text-purple-400 text-sm">{activeTestimonial.role}</p>
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-18 left-1/2 -translate-x-1/2 flex items-center gap-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold text-white">50K+</div>
          <div className="text-slate-500 text-xs uppercase tracking-wider">Visitors</div>
        </motion.div>
        <div className="w-px h-8 bg-white/10" />
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold text-white">4.9</div>
          <div className="text-slate-500 text-xs uppercase tracking-wider">Rating</div>
        </motion.div>
        <div className="w-px h-8 bg-white/10" />
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold text-white">200+</div>
          <div className="text-slate-500 text-xs uppercase tracking-wider">Shows/Year</div>
        </motion.div>
      </div>
    </section>
  );
}
