import { motion } from 'framer-motion';

const TechStack = () => {
  const technologies = [
    { name: 'React', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { name: 'Python', icon: '🐍', color: 'from-blue-400 to-yellow-500' },
    { name: 'TypeScript', icon: '📘', color: 'from-blue-600 to-blue-400' },
    { name: 'Flask', icon: '🧪', color: 'from-gray-400 to-gray-600' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-700 to-blue-500' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-600 to-green-400' },
    { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-blue-700' },
    { name: 'AWS', icon: '☁️', color: 'from-orange-500 to-yellow-500' },
    { name: 'Git', icon: '📦', color: 'from-orange-600 to-red-600' },
    { name: 'Tailwind', icon: '🎨', color: 'from-cyan-500 to-blue-500' },
    { name: 'Redux', icon: '💜', color: 'from-purple-600 to-purple-400' },
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="text-primary-500">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg">Technologies I love working with</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass-hover rounded-xl p-6 text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {tech.icon}
              </div>
              <h3 className="font-semibold text-white text-sm">{tech.name}</h3>
              <div className={`mt-2 h-1 rounded-full bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
