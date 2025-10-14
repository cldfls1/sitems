import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CountUpAnimation = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
};

const Stats = () => {
  const stats = [
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Happy Clients', value: 30, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
    { label: 'Years Experience', value: 5, suffix: '+' },
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="glass-strong rounded-3xl p-12 border border-white/10 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <CountUpAnimation end={stat.value} />
                  <span className="text-primary-500">{stat.suffix}</span>
                </motion.div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
