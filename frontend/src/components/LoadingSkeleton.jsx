import { motion } from 'framer-motion';

export const CardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl p-6 overflow-hidden">
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="space-y-4"
      >
        {/* Image */}
        <div className="w-full h-48 bg-white/5 rounded-xl" />

        {/* Title */}
        <div className="h-6 bg-white/5 rounded-lg w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-5/6" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-white/5 rounded-full" />
          <div className="h-6 w-20 bg-white/5 rounded-full" />
          <div className="h-6 w-16 bg-white/5 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          className="glass-card rounded-xl p-4 flex items-center gap-4"
        >
          <div className="w-16 h-16 bg-white/5 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-white/5 rounded w-1/2" />
            <div className="h-4 bg-white/5 rounded w-3/4" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const TextSkeleton = ({ lines = 3 }) => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="space-y-3"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-white/5 rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </motion.div>
  );
};

const LoadingSkeleton = CardSkeleton;
export default LoadingSkeleton;
