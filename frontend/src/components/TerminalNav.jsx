import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiTerminal } from 'react-icons/fi';

const TerminalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('~');
  const location = useLocation();

  useEffect(() => {
    const pathMap = {
      '/': '~',
      '/about': '~/about',
      '/projects': '~/projects',
      '/contact': '~/contact',
      '/admin': '~/admin',
    };
    setCurrentPath(pathMap[location.pathname] || '~');
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'home', path: '/', command: 'cd ~' },
    { name: 'about', path: '/about', command: 'cd about' },
    { name: 'projects', path: '/projects', command: 'cd projects' },
    { name: 'contact', path: '/contact', command: 'cd contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-strong border-b border-primary-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Terminal Prompt */}
          <Link to="/" className="flex items-center gap-2 group">
            <FiTerminal className="text-primary-700 text-xl group-hover:text-primary-600 transition-colors" />
            <span className="terminal text-sm text-primary-700 hidden sm:block">
              user@portfolio:<span className="text-primary-800">{currentPath}</span>$
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`terminal px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-primary-900/30 text-primary-700 glow-green'
                    : 'text-gray-400 hover:text-primary-700 hover:bg-white/5'
                }`}
              >
                <span className="opacity-50">$ </span>
                {item.command}
              </Link>
            ))}
            <Link
              to="/admin"
              className="ml-4 btn-primary text-sm"
            >
              <span className="terminal">admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass-hover p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="text-primary-700 text-xl" />
            ) : (
              <FiMenu className="text-primary-700 text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-primary-900/20"
          >
            <div className="px-4 py-4 space-y-2 glass-strong">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`terminal block px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary-900/30 text-primary-700 glow-green'
                      : 'text-gray-400 hover:text-primary-700 hover:bg-white/5'
                  }`}
                >
                  <span className="opacity-50">$ </span>
                  {item.command}
                </Link>
              ))}
              <Link
                to="/admin"
                className="block px-4 py-3 rounded-lg text-sm terminal text-primary-700 bg-primary-900/20 hover:bg-primary-900/30 transition-all"
              >
                <span className="opacity-50">$ </span>
                cd admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TerminalNav;
