import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiArrowRight, FiCode, FiZap, FiStar } from 'react-icons/fi';
import { getContentBlocks, getProjects, getSettings } from '../utils/api';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import MagneticButton from '../components/MagneticButton';
import { ProjectGridSkeleton, TextSkeleton } from '../components/LoadingSkeleton';
import SEO from '../components/SEO';
import TypingAnimation from '../components/TypingAnimation';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [content, setContent] = useState({});
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blocks, projectsData, settingsData] = await Promise.all([
          getContentBlocks('home'),
          getProjects(),
          getSettings(),
        ]);

        const contentObj = {};
        blocks.forEach((block) => {
          contentObj[block.key] = block;
        });
        setContent(contentObj);
        setProjects(projectsData.slice(0, 6));
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Home - Full Stack Developer Portfolio"
        description="Welcome to my portfolio. I'm a Full Stack Developer specializing in React, Node.js, and modern web technologies."
        keywords="full stack developer, react developer, web development, portfolio"
      />
      
      <div className="min-h-screen page-transition overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <motion.div style={{ opacity }} className="text-center max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-primary-500/20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FiZap className="text-primary-500" size={16} />
            </motion.div>
            <span className="text-sm text-gray-400">
              {content.hero_greeting?.content || 'Start Your Free Trial & Get 50% Off'}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {content.hero_name?.content || 'Agentic Coding Platform'}
            </motion.span>
            <br />
            <TypingAnimation 
              texts={['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast']}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            {content.hero_description?.content || 'Think Deeper. Build Better.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/projects"
                className="bg-primary-500 hover:bg-primary-600 text-black px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 shadow-lg shadow-primary-500/30"
              >
                <FiCode size={20} />
                View Projects
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white px-8 py-4 rounded-lg font-medium inline-flex items-center gap-2 transition-all"
              >
                Contact Me
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: FiGithub, url: settings.github_url || "https://github.com" },
              { icon: FiLinkedin, url: settings.linkedin_url || "https://linkedin.com" },
              { icon: FiTwitter, url: "https://twitter.com" },
              { icon: FiMail, url: `mailto:${settings.contact_email || 'email@example.com'}` },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target={social.icon !== FiMail ? "_blank" : undefined}
                rel={social.icon !== FiMail ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="glass-hover p-3 rounded-lg text-gray-400 hover:text-primary-500 transition-colors"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Card Section */}
      <motion.section
        style={{ y: y1 }}
        className="relative px-6 pb-32"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden group"
          >
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left: Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 mb-4 text-primary-500"
                >
                  <FiCode size={24} />
                  <span className="text-sm font-medium">FEATURED</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Programming Through
                  <br />
                  <span className="text-primary-500">Conversation</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-400 mb-6 leading-relaxed"
                >
                  Build amazing projects with modern technologies and best practices.
                  From concept to deployment, I bring your ideas to life.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {['React', 'Node.js', 'Python', 'AI/ML'].map((tech, i) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-primary-500/50 hover:text-primary-500 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Right: Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-video bg-dark-900 rounded-xl border border-white/10 overflow-hidden">
                  <div className="p-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="overflow-hidden"
                      >
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-blue-400">portfolio</span>{' '}
                        <span className="text-white">=</span>{' '}
                        <span className="text-green-400">"amazing"</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="overflow-hidden"
                      >
                        <span className="text-purple-400">function</span>{' '}
                        <span className="text-yellow-400">build</span>
                        <span className="text-white">() {'{'}</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="overflow-hidden pl-4"
                      >
                        <span className="text-purple-400">return</span>{' '}
                        <span className="text-green-400">'success'</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="overflow-hidden"
                      >
                        <span className="text-white">{'}'}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-500/20 rounded-full blur-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        style={{ y: y2 }}
        className="px-6 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-primary-500">Projects</span>
            </h2>
            <p className="text-gray-400">Check out my latest work</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card-minimal group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-white group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <FiStar className="text-yellow-500" size={16} />
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.short_description || project.description}
                </p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tag-sm text-gray-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 font-medium"
            >
              View All Projects
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiArrowRight />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <Stats />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* CTA Section */}
      <CTA />
      </div>
    </>
  );
};

export default Home;
