import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiFolderPlus, FiMail, FiSettings, FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home', command: '/' },
    { path: '/about', icon: FiUser, label: 'About', command: '/about' },
    { path: '/projects', icon: FiFolderPlus, label: 'Projects', command: '/projects' },
    { path: '/contact', icon: FiMail, label: 'Contact', command: '/contact' },
    { path: '/admin', icon: FiSettings, label: 'Admin', command: '/admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden glass-hover p-3 rounded-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-64 glass-strong border-r border-white/[0.08] z-40 flex flex-col backdrop-blur-3xl"
          >
            {/* Logo/Brand */}
            <div className="p-8 border-b border-white/[0.08]">
              <Link to="/" className="block">
                <h1 className="text-2xl font-bold">
                  <span className="text-white">Well</span>
                  <span className="text-primary-500">Coded</span>
                </h1>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-1">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4 px-4">
                  • Navigation
                </p>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <span className="terminal text-gray-500">{item.command}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-white/[0.08]">
              <p className="text-xs text-gray-500 font-mono">
                © 2024 Portfolio
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
