import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiFolder, FiFileText, FiUser } from 'react-icons/fi';

const LiveSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mock search data - replace with actual API call
  const searchData = [
    { type: 'project', title: 'E-commerce Platform', path: '/projects', icon: FiFolder },
    { type: 'project', title: 'Portfolio Website', path: '/projects', icon: FiFolder },
    { type: 'blog', title: 'Getting Started with React', path: '/blog', icon: FiFileText },
    { type: 'page', title: 'About Me', path: '/about', icon: FiUser },
    { type: 'page', title: 'Contact', path: '/contact', icon: FiUser },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item) => {
    navigate(item.path);
    onClose();
    setQuery('');
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[151] px-4"
          >
            <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <FiSearch className="text-gray-400" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, blog posts, pages..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                />
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {query && results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                ) : (
                  results.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleSelect(item)}
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
                          <div className="text-white font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500 capitalize">{item.type}</div>
                        </div>
                      </motion.button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {results.length > 0 && (
                <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↓</kbd>
                      <span>navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">↵</kbd>
                      <span>select</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveSearch;
