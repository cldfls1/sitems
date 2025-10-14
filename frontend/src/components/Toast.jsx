import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  const icons = {
    success: <FiCheckCircle className="text-green-500" size={20} />,
    error: <FiXCircle className="text-red-500" size={20} />,
    info: <FiInfo className="text-blue-500" size={20} />,
  };

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-6 left-1/2 z-[100] glass-strong rounded-xl px-6 py-4 border ${bgColors[type]} shadow-2xl`}
        >
          <div className="flex items-center gap-3">
            {icons[type]}
            <p className="text-white font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
