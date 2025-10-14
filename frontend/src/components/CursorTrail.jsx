import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const newTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev, newTrail]);

      // Remove trail after animation
      setTimeout(() => {
        setTrails((prev) => prev.filter((trail) => trail.id !== newTrail.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-primary-500/50 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />

      {/* Cursor Ring */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-primary-500/30 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 100,
          mass: 0.8,
        }}
      />

      {/* Trail Particles */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="fixed w-2 h-2 rounded-full bg-primary-400 pointer-events-none z-[9998]"
            initial={{
              x: trail.x - 4,
              y: trail.y - 4,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorTrail;
