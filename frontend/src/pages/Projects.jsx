import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiFolder } from 'react-icons/fi';
import { getProjects } from '../utils/api';
import TiltCard from '../components/TiltCard';
import ImageLightbox from '../components/ImageLightbox';
import { ProjectGridSkeleton } from '../components/LoadingSkeleton';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filters = ['All', 'Web', 'Mobile', 'Design', 'Backend'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => 
          project.category && project.category.toLowerCase() === activeFilter.toLowerCase()
        )
      );
    }
  }, [activeFilter, projects]);

  const openLightbox = (images, index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

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
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-500 rounded-full blur-[120px]"
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
            <FiFolder className="text-primary-500" />
            <span className="text-sm text-gray-400">Portfolio</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="text-primary-500">Projects</span>
          </h1>
          <p className="text-xl text-gray-400">
            A collection of work I'm proud of
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-primary-500 text-black shadow-lg shadow-primary-500/30'
                    : 'glass-hover text-gray-400 hover:text-white'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <TiltCard
                key={project.id}
                className="glass-strong rounded-2xl p-6 border border-white/10 relative overflow-hidden group cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => project.image_url && openLightbox([project.image_url])}
                >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          >
                            <FiStar className="text-yellow-500" size={16} />
                          </motion.div>
                        )}
                      </div>
                      {project.category && (
                        <span className="text-xs text-gray-500">{project.category}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                      {project.github_url && (
                        <motion.a
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-hover p-2.5 rounded-lg text-gray-400 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub size={18} />
                        </motion.a>
                      )}
                      {project.demo_url && (
                        <motion.a
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-hover p-2.5 rounded-lg text-gray-400 hover:text-primary-500"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.short_description || project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-gray-400 hover:border-primary-500/50 hover:text-primary-500 transition-all"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">
                {activeFilter === 'All' ? 'No projects found' : `No ${activeFilter} projects found`}
              </p>
              <p className="text-sm text-gray-600 mt-2">Try another filter</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Projects;
