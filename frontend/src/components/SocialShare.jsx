import { motion } from 'framer-motion';
import { FiTwitter, FiLinkedin, FiFacebook, FiLink, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

const SocialShare = ({ url = window.location.href, title = 'Check this out!' }) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: FiTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:text-[#0A66C2]',
    },
    {
      name: 'Facebook',
      icon: FiFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:text-[#1877F2]',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">Share:</span>
      
      {/* Social Links */}
      {shareLinks.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-lg glass-hover flex items-center justify-center text-gray-400 transition-colors ${social.color}`}
            aria-label={`Share on ${social.name}`}
          >
            <Icon size={18} />
          </motion.a>
        );
      })}

      {/* Copy Link */}
      <motion.button
        onClick={copyToClipboard}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center text-gray-400 hover:text-primary-500 transition-colors relative"
        aria-label="Copy link"
      >
        {copied ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-primary-500"
          >
            <FiCheck size={18} />
          </motion.div>
        ) : (
          <FiLink size={18} />
        )}
      </motion.button>

      {/* Copied Tooltip */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-10 right-0 px-3 py-1 bg-primary-500 text-white text-xs rounded-lg"
        >
          Copied!
        </motion.div>
      )}
    </div>
  );
};

export default SocialShare;
