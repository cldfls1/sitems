import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiCheck } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for subscribing! Check your email.');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <section className="px-6 py-20 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10 text-center relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-50" />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 border border-primary-500/30 mb-6"
            >
              <FiMail className="text-primary-500" size={28} />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Subscribe to my newsletter for the latest articles, tutorials, and updates on web development.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full px-4 py-3 rounded-xl glass-strong border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-colors disabled:opacity-50"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: status === 'idle' ? 1.05 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.95 : 1 }}
                  className="px-6 py-3 rounded-xl bg-primary-500 text-black font-medium shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                      Subscribing...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <FiCheck size={20} />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      Subscribe
                    </>
                  )}
                </motion.button>
              </div>

              {/* Status Message */}
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm ${
                    status === 'error' ? 'text-red-400' : 'text-primary-400'
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </form>

            {/* Privacy Note */}
            <p className="text-xs text-gray-600 mt-6">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
