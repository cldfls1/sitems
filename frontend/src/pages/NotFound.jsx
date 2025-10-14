import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-96 h-96 bg-primary-500 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary-500 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <motion.h1
            className="text-[200px] md:text-[300px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-primary-600 leading-none"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            404
          </motion.h1>

          {/* Floating Icons */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 text-primary-500/30"
          >
            <FiSearch size={60} />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-0 right-1/4 text-primary-500/30"
          >
            <FiHome size={60} />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all flex items-center gap-2"
            >
              <FiHome size={20} />
              Back to Home
            </motion.button>
          </Link>

          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <FiArrowLeft size={20} />
              View Projects
            </motion.button>
          </Link>
        </motion.div>

        {/* Suggestion Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => (
              <Link key={link.path} to={link.path}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-primary-500/50 transition-all text-sm"
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
