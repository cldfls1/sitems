import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi';
import { ProjectGridSkeleton } from '../components/LoadingSkeleton';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Tutorial', 'News'];

  // Mock data - replace with API call
  useEffect(() => {
    setTimeout(() => {
      const mockPosts = [
        {
          id: 1,
          title: 'Getting Started with React 18',
          excerpt: 'Learn about the new features and improvements in React 18, including automatic batching and concurrent rendering.',
          category: 'Development',
          date: '2024-01-15',
          readTime: '5 min read',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
          slug: 'getting-started-react-18',
        },
        {
          id: 2,
          title: 'Modern CSS Techniques',
          excerpt: 'Explore modern CSS features like Grid, Flexbox, and CSS Variables to create stunning layouts.',
          category: 'Design',
          date: '2024-01-10',
          readTime: '8 min read',
          image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
          slug: 'modern-css-techniques',
        },
        {
          id: 3,
          title: 'Building REST APIs with Flask',
          excerpt: 'A comprehensive guide to building scalable REST APIs using Python Flask framework.',
          category: 'Tutorial',
          date: '2024-01-05',
          readTime: '12 min read',
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
          slug: 'building-rest-apis-flask',
        },
      ];
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, posts]);

  if (loading) {
    return (
      <div className="min-h-screen page-transition overflow-hidden pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ProjectGridSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-transition overflow-hidden">
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
            <FiTag className="text-primary-500" />
            <span className="text-sm text-gray-400">Blog</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Latest <span className="text-primary-500">Articles</span>
          </h1>
          <p className="text-xl text-gray-400">
            Thoughts, tutorials, and insights about web development
          </p>
        </motion.div>
      </section>

      {/* Search & Filters */}
      <section className="px-6 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative max-w-md mx-auto">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-colors"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-black shadow-lg shadow-primary-500/30'
                    : 'glass-hover text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">No articles found</p>
              <p className="text-sm text-gray-600 mt-2">Try a different search or category</p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong rounded-2xl overflow-hidden border border-white/10 group hover:border-primary-500/30 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 rounded-lg text-xs bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 text-primary-400">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors text-sm font-medium"
                    >
                      Read More
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FiArrowRight size={16} />
                      </motion.div>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
