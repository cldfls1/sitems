import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail } from 'react-icons/fi';

const CTA = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-12 md:p-16 border border-white/10 relative overflow-hidden text-center"
        >
          {/* Animated background */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-[120px]"
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-primary-500/20"
            >
              <FiMail className="text-primary-500" />
              <span className="text-sm text-gray-400">Let's Work Together</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with cutting-edge technology and creative solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="bg-primary-500 hover:bg-primary-600 text-black px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 transition-all duration-300 shadow-lg shadow-primary-500/30"
                >
                  Get Started
                  <FiArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="glass-hover px-8 py-4 rounded-xl font-medium inline-flex items-center gap-2 text-white"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
