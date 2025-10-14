import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiRefreshCw, FiDownload } from 'react-icons/fi';
import { getAllSettings, bulkUpdateSettings, initializeSettings } from '../utils/api';

const SiteSettings = ({ onSave }) => {
  const [settings, setSettings] = useState({
    // Hero Section
    heroTitle: 'Agentic Coding Platform',
    heroSubtitle: 'Full Stack Developer',
    heroDescription: 'Think Deeper. Build Better.',
    
    // About
    aboutTitle: 'About Me',
    aboutDescription: 'I\'m a passionate Full Stack Developer with expertise in modern web technologies.',
    
    // Contact
    contactEmail: 'hello@miracle.dev',
    contactPhone: '+1 (555) 123-4567',
    contactLocation: 'San Francisco, CA',
    
    // Social Links
    githubUrl: 'https://github.com/yourusername',
    linkedinUrl: 'https://linkedin.com/in/yourusername',
    twitterUrl: 'https://twitter.com/yourusername',
    
    // SEO
    siteTitle: 'Miracle - Full Stack Developer Portfolio',
    siteDescription: 'Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    siteKeywords: 'web developer, full stack, react, node.js, portfolio',
    
    // Footer
    footerText: 'Building amazing digital experiences with modern technologies.',
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getAllSettings();
      
      // Преобразуем grouped data в flat object
      const flatSettings = {};
      Object.values(data).flat().forEach(setting => {
        // Преобразуем snake_case в camelCase для ключей
        const camelKey = setting.key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        flatSettings[camelKey] = setting.value || '';
      });
      
      setSettings(prev => ({ ...prev, ...flatSettings }));
    } catch (error) {
      console.error('Error loading settings:', error);
      // Fallback to localStorage
      const savedSettings = localStorage.getItem('site_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Преобразуем camelCase обратно в snake_case для API
      const updates = Object.entries(settings).map(([key, value]) => {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        return { key: snakeKey, value };
      });
      
      // Сохраняем в БД через API
      await bulkUpdateSettings(updates);
      
      // Также сохраняем в localStorage как backup
      localStorage.setItem('site_settings', JSON.stringify(settings));
      
      // Call parent callback
      if (onSave) {
        await onSave(settings);
      }
      
      alert('✅ Settings saved successfully to database!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('❌ Error saving settings. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (!confirm('Initialize default settings in database? This will create default values if they don\'t exist.')) {
      return;
    }
    
    setInitializing(true);
    try {
      await initializeSettings();
      alert('✅ Default settings initialized!');
      await loadSettings(); // Reload settings
    } catch (error) {
      console.error('Error initializing settings:', error);
      alert('❌ Error initializing settings');
    } finally {
      setInitializing(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reload settings from database?')) {
      return;
    }
    await loadSettings();
  };

  const sections = [
    {
      title: 'Hero Section',
      fields: [
        { key: 'heroTitle', label: 'Main Title', type: 'text' },
        { key: 'heroSubtitle', label: 'Subtitle', type: 'text' },
        { key: 'heroDescription', label: 'Description', type: 'textarea' },
      ]
    },
    {
      title: 'About Section',
      fields: [
        { key: 'aboutTitle', label: 'Title', type: 'text' },
        { key: 'aboutDescription', label: 'Description', type: 'textarea' },
      ]
    },
    {
      title: 'Contact Information',
      fields: [
        { key: 'contactEmail', label: 'Email', type: 'email' },
        { key: 'contactPhone', label: 'Phone', type: 'text' },
        { key: 'contactLocation', label: 'Location', type: 'text' },
      ]
    },
    {
      title: 'Social Links',
      fields: [
        { key: 'githubUrl', label: 'GitHub URL', type: 'url' },
        { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'url' },
        { key: 'twitterUrl', label: 'Twitter URL', type: 'url' },
      ]
    },
    {
      title: 'SEO Settings',
      fields: [
        { key: 'siteTitle', label: 'Site Title', type: 'text' },
        { key: 'siteDescription', label: 'Site Description', type: 'textarea' },
        { key: 'siteKeywords', label: 'Keywords', type: 'text' },
      ]
    },
    {
      title: 'Footer',
      fields: [
        { key: 'footerText', label: 'Footer Text', type: 'textarea' },
      ]
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6 p-4 glass-strong rounded-xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white">Site Settings</h2>
          <p className="text-sm text-gray-400">Configure your portfolio content</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleInitialize}
            disabled={initializing}
            className="px-4 py-2 rounded-lg glass-hover text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <FiDownload size={18} />
            {initializing ? 'Initializing...' : 'Initialize DB'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-4 py-2 rounded-lg glass-hover text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
          >
            <FiRefreshCw size={18} />
            Reload
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving || loading}
            className="px-6 py-2 rounded-lg bg-primary-500 text-black font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <FiSave size={18} />
            {saving ? 'Saving...' : 'Save to DB'}
          </motion.button>
        </div>
      </div>

      {/* Settings Sections */}
      {sections.map((section, idx) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-lg font-bold text-white mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={settings[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg glass-strong border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-colors resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={settings[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg glass-strong border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SiteSettings;
