import { motion } from 'framer-motion';
import { FiSearch, FiLayout, FiCode, FiCheckCircle } from 'react-icons/fi';

const Process = () => {
  const steps = [
    {
      icon: FiSearch,
      title: 'Discovery',
      description: 'Understanding your vision, goals, and requirements through detailed discussions',
      duration: '1-2 weeks',
    },
    {
      icon: FiLayout,
      title: 'Design',
      description: 'Creating wireframes, mockups, and prototypes to visualize the final product',
      duration: '2-3 weeks',
    },
    {
      icon: FiCode,
      title: 'Development',
      description: 'Building the solution with clean code, testing, and regular progress updates',
      duration: '4-8 weeks',
    },
    {
      icon: FiCheckCircle,
      title: 'Launch',
      description: 'Deploying to production, final testing, and providing documentation & training',
      duration: '1-2 weeks',
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How I <span className="text-primary-500">Work</span>
          </h2>
          <p className="text-gray-400 text-lg">A proven process for successful projects</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Connection line */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent origin-left"
                />
              )}

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-strong rounded-2xl p-6 border border-white/10 relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Number */}
                  <div className="text-primary-500/20 font-bold text-6xl mb-4">
                    0{i + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center mb-4"
                  >
                    <step.icon className="text-primary-500" size={28} />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{step.description}</p>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-xs text-primary-500">⏱️ {step.duration}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
