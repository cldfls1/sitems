import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalLoader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const bootSequence = [
    '> Initializing system...',
    '> Loading modules...',
    '> [████████████████████] 100%',
    '> Connecting to database...',
    '> Connection established ✓',
    '> Loading assets...',
    '> [████████████████████] 100%',
    '> Parsing configuration...',
    '> Configuration loaded ✓',
    '> Starting application...',
    '> System ready ✓',
    '> Welcome!',
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => onComplete?.(), 500);
        }, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900 noise-bg"
        >
          <div className="glass-strong rounded-2xl p-8 md:p-12 max-w-2xl w-full mx-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="terminal text-sm text-primary-700">
                terminal@portfolio:~$
              </span>
            </div>
            
            <div className="space-y-2 font-mono text-sm md:text-base custom-scrollbar max-h-[60vh] overflow-y-auto">
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    line.includes('✓')
                      ? 'text-primary-700'
                      : line.includes('█')
                      ? 'text-primary-800'
                      : 'text-gray-400'
                  }`}
                >
                  {line}
                  {index === lines.length - 1 && (
                    <span className="terminal-cursor ml-1"></span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalLoader;
