import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;

      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray={163.36}
              strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
              strokeLinecap="round"
              transition={{ duration: 0.1 }}
            />
          </svg>

          {/* Arrow Icon */}
          <FiArrowUp size={20} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
