'use client';

import { motion, MotionValue, useSpring, AnimatePresence } from "framer-motion";
import { CursorTrail } from "./constants";

interface CustomCursorProps {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  cursorTrail: CursorTrail[];
  isClicking: boolean;
  isHovering: boolean;
}

export default function CustomCursor({
  cursorX,
  cursorY,
  cursorTrail,
  isClicking,
  isHovering,
}: CustomCursorProps) {
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const outerSpringConfig = { damping: 20, stiffness: 150 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  return (
    <>
      <AnimatePresence>
        {cursorTrail.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[60] rounded-full"
            initial={{ 
              x: particle.x - 6, 
              y: particle.y - 6, 
              scale: 1.2, 
              opacity: 1 
            }}
            animate={{ 
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: 12 - (index * 0.4),
              height: 12 - (index * 0.4),
              background: `radial-gradient(circle, rgba(255, 255, 255, ${0.9 - index * 0.04}) 0%, rgba(167, 139, 250, ${0.7 - index * 0.03}) 40%, rgba(139, 92, 246, ${0.5 - index * 0.02}) 70%, transparent 100%)`,
              boxShadow: `0 0 ${16 - index}px rgba(167, 139, 250, 0.8), 0 0 ${24 - index}px rgba(139, 92, 246, 0.5), 0 0 ${32 - index}px rgba(168, 85, 247, 0.3)`,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div 
        className="fixed pointer-events-none z-[51] rounded-full border-2 border-purple-400/50"
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 36 : isHovering ? 64 : 50,
          height: isClicking ? 36 : isHovering ? 64 : 50,
          borderColor: isClicking ? 'rgba(236, 72, 153, 0.8)' : isHovering ? 'rgba(139, 92, 246, 0.8)' : 'rgba(167, 139, 250, 0.5)',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      <motion.div 
        className="fixed pointer-events-none z-[52] rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 24 : isHovering ? 14 : 18,
          height: isClicking ? 24 : isHovering ? 14 : 18,
          backgroundColor: isClicking ? 'rgb(236, 72, 153)' : 'rgb(255, 255, 255)',
        }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[49] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.08) 30%, transparent 70%)',
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
