import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheck, FiExternalLink } from 'react-icons/fi';
import FAQ from '../components/FAQ';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen page-transition overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-40 -right-40 w-96 h-96 bg-primary-500 rounded-full blur-[120px]"
        />
      </div>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-primary-500/20"
          >
            <FiMail className="text-primary-500" />
            <span className="text-sm text-gray-400">Contact</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Let's <span className="text-primary-500">Connect</span>
          </h1>
          <p className="text-xl text-gray-400">
            Have a project in mind? Let's make it happen
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-8 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent pointer-events-none" />
            
            <h2 className="text-2xl font-bold mb-6 text-white relative z-10">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-dark-800 border border-primary-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-700 transition-colors custom-scrollbar resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <FiSend />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl"
                >
                  <FiCheck className="text-primary-500" />
                  <p className="text-primary-500 font-medium">
                    Message sent successfully!
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Email */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-strong rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center">
                  <FiMail className="text-primary-500 text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Email</h3>
                  <p className="text-gray-500 text-sm">Direct contact</p>
                </div>
              </div>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-primary-500 transition-colors text-lg"
              >
                your.email@example.com
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-strong rounded-2xl p-8 border border-white/10"
            >
              <h3 className="font-semibold text-white mb-6 text-lg">Connect With Me</h3>
              <div className="space-y-3">
                {[
                  { icon: FiGithub, name: 'GitHub', handle: '@yourusername', url: 'https://github.com' },
                  { icon: FiLinkedin, name: 'LinkedIn', handle: '@yourusername', url: 'https://linkedin.com' },
                  { icon: FiTwitter, name: 'Twitter', handle: '@yourusername', url: 'https://twitter.com' },
                ].map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all border border-white/5 hover:border-white/10"
                  >
                    <social.icon className="text-2xl text-primary-500" />
                    <div>
                      <div className="font-medium text-white">{social.name}</div>
                      <div className="text-sm text-gray-400">{social.handle}</div>
                    </div>
                    <FiExternalLink className="ml-auto text-gray-600" size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-strong rounded-2xl p-8 border border-white/10"
            >
              <h3 className="font-semibold text-white mb-6 text-lg">Availability</h3>
              <div className="space-y-3">
                {[
                  'Available for freelance',
                  'Open to new opportunities',
                  'Response within 24 hours'
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-primary-500"
                    />
                    <span className="text-gray-400">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Contact;
