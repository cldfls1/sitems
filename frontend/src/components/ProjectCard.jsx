import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
    >
      {/* Project Image */}
      {project.image_url && (
        <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-dark-800">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60"></div>
        </div>
      )}

      {/* Featured Badge */}
      {project.featured && (
        <span className="inline-block mb-3 px-3 py-1 text-xs terminal text-primary-700 glass rounded-full">
          Featured
        </span>
      )}

      {/* Category */}
      {project.category && (
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {project.category}
        </p>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-700 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 mb-4 line-clamp-3">
        {project.short_description || project.description}
      </p>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs terminal text-primary-800 bg-primary-900/20 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-700 transition-colors"
          >
            <FiGithub />
            <span>Code</span>
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-700 transition-colors"
          >
            <FiExternalLink />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
