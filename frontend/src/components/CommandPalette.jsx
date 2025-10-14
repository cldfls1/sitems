import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHome, FiFolder, FiUser, FiMail, FiCommand, FiX } from 'react-icons/fi';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const commands = [
    { name: 'Home', path: '/', icon: FiHome, description: 'Go to homepage' },
    { name: 'Projects', path: '/projects', icon: FiFolder, description: 'View all projects' },
    { name: 'About', path: '/about', icon: FiUser, description: 'Learn more about me' },
    { name: 'Contact', path: '/contact', icon: FiMail, description: 'Get in touch' },
    { name: 'Admin', path: '/admin', icon: FiCommand, description: 'Admin panel' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      // Arrow navigation
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          e.preventDefault();
          navigate(filteredCommands[selectedIndex].path);
          setIsOpen(false);
          setSearch('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, navigate]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleCommandClick = (path) => {
    navigate(path);
    setIsOpen(false);
    setSearch('');
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4"
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <FiSearch className="text-gray-400" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                />
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">ESC</kbd>
                  <span>to close</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No commands found
                  </div>
                ) : (
                  filteredCommands.map((cmd, index) => {
                    const Icon = cmd.icon;
                    const isSelected = index === selectedIndex;

                    return (
                      <motion.button
                        key={cmd.path}
                        onClick={() => handleCommandClick(cmd.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                          isSelected
                            ? 'bg-primary-500/20 border-l-2 border-primary-500'
                            : 'hover:bg-white/5'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-primary-500/20 text-primary-400'
                              : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-white font-medium">{cmd.name}</div>
                          <div className="text-sm text-gray-500">{cmd.description}</div>
                        </div>
                        {isSelected && (
                          <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700 text-xs text-gray-400">
                            ↵
                          </kbd>
                        )}
                      </motion.button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↓</kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↵</kbd>
                    <span>to select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">K</kbd>
                  <span>to toggle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
