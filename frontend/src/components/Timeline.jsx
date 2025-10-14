import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiBook } from 'react-icons/fi';

const Timeline = ({ items = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'work':
        return FiBriefcase;
      case 'education':
        return FiBook;
      case 'achievement':
        return FiAward;
      default:
        return FiBriefcase;
    }
  };

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-500/50 to-transparent" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {items.map((item, index) => {
          const Icon = getIcon(item.type);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: index * 0.1 + 0.2 }}
                className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30"
              >
                <Icon size={20} />
              </motion.div>

              {/* Content */}
              <div className="glass-strong rounded-xl p-6 border border-white/10 hover:border-primary-500/30 transition-colors">
                {/* Date */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-primary-500 font-medium">
                    {item.date}
                  </span>
                  {item.current && (
                    <span className="px-2 py-0.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-xs text-primary-400">
                      Current
                    </span>
                  )}
                </div>

                {/* Title & Company */}
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                {item.company && (
                  <p className="text-primary-500 mb-3">{item.company}</p>
                )}

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">
                  {item.description}
                </p>

                {/* Skills/Tags */}
                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-gray-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
