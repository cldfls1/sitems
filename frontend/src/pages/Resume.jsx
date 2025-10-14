import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiBriefcase, FiAward, FiBook } from 'react-icons/fi';

const Resume = () => {
  const handleDownloadPDF = () => {
    // Implement PDF download logic
    alert('PDF download feature coming soon!');
  };

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading development of modern web applications using React, Node.js, and cloud technologies.',
      achievements: [
        'Increased application performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipeline',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies.',
      achievements: [
        'Built 10+ production applications',
        'Reduced load time by 50%',
        'Mentored junior developers',
      ],
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University Name',
      period: '2016 - 2020',
      description: 'Focused on software engineering and web development.',
    },
  ];

  const skills = {
    'Frontend': ['React', 'Vue.js', 'TypeScript', 'TailwindCSS', 'Next.js'],
    'Backend': ['Node.js', 'Python', 'Flask', 'PostgreSQL', 'MongoDB'],
    'Tools': ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
  };

  return (
    <div className="min-h-screen page-transition overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="text-primary-500">Resume</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Full Stack Developer with 5+ years of experience
          </p>

          {/* Download Button */}
          <motion.button
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 text-black font-medium shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
          >
            <FiDownload size={20} />
            Download PDF
          </motion.button>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-6 mb-8 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-400">
                <FiMail className="text-primary-500" size={20} />
                <span>email@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiPhone className="text-primary-500" size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiMapPin className="text-primary-500" size={20} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FiGithub className="text-primary-500" size={20} />
                <span>github.com/username</span>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiBriefcase className="text-primary-500" size={24} />
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>

            <div className="space-y-6">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong rounded-xl p-6 border border-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      <p className="text-primary-500">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{job.period}</span>
                  </div>
                  <p className="text-gray-400 mb-4">{job.description}</p>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiBook className="text-primary-500" size={24} />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-strong rounded-xl p-6 border border-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <p className="text-primary-500">{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </div>
                  <p className="text-gray-400">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FiAward className="text-primary-500" size={24} />
              <h2 className="text-3xl font-bold">Skills</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-bold text-primary-500 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-gray-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
