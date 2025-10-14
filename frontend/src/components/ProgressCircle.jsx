import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const ProgressCircle = ({ 
  percentage = 75, 
  size = 120, 
  strokeWidth = 8,
  color = '#10b981',
  label = '',
  showPercentage = true 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 50, damping: 20 });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isInView) {
      progress.set(percentage);
    }
  }, [isInView, percentage, progress]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              strokeDashoffset: smoothProgress.get()
                ? circumference - (circumference * smoothProgress.get()) / 100
                : circumference,
            }}
            animate={{
              strokeDashoffset: isInView
                ? circumference - (circumference * percentage) / 100
                : circumference,
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>

        {/* Percentage Text */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl font-bold text-white"
            >
              {percentage}%
            </motion.span>
          </div>
        )}
      </div>

      {/* Label */}
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-sm text-gray-400 text-center"
        >
          {label}
        </motion.p>
      )}
    </div>
  );
};

export default ProgressCircle;
