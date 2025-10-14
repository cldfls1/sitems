import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate auth check
    setTimeout(() => {
      if (username === 'denchir' && password === 'admin123') {
        // Store auth token
        localStorage.setItem('admin_token', 'authenticated');
        localStorage.setItem('admin_user', username);
        localStorage.setItem('admin_login_time', new Date().toISOString());
        
        // Log to console
        console.log(`[AUTH] User "${username}" logged in at ${new Date().toLocaleString()}`);
        
        onSuccess();
        onClose();
      } else {
        setError('Invalid credentials');
        console.log(`[AUTH] Failed login attempt for user "${username}" at ${new Date().toLocaleString()}`);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-strong rounded-2xl max-w-md w-full p-8 border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 glass-hover p-2 rounded-lg text-gray-400 hover:text-white transition-colors z-10"
              >
                <FiX size={20} />
              </button>

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6 mx-auto"
                >
                  <FiLock size={28} className="text-white" />
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-2">Admin Access</h2>
                <p className="text-gray-400 text-center mb-8 text-sm">
                  Enter your credentials to continue
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <FiUser size={18} />
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <FiLock size={18} />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                    >
                      <FiAlertCircle size={16} />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>

                {/* Hint */}
                <p className="text-xs text-gray-600 text-center mt-6">
                  Default: denchir / admin123
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
