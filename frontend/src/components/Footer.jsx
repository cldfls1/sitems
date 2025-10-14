import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
      >
        <FiArrowUp size={20} />
      </motion.button>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-0 mb-4">
              <span className="text-2xl font-bold text-primary-500">m</span>
              <span className="text-xl font-medium text-white">iracle</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm">
              Building amazing digital experiences with modern technologies. 
              Let's create something extraordinary together.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiGithub, url: 'https://github.com' },
                { icon: FiLinkedin, url: 'https://linkedin.com' },
                { icon: FiTwitter, url: 'https://twitter.com' },
                { icon: FiMail, url: 'mailto:hello@miracle.dev' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: hello@miracle.dev</li>
              <li>Available for freelance</li>
              <li>Response within 24h</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Miracle. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <FiHeart className="text-primary-500" size={14} /> using React & Flask
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
