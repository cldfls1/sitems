import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCode, FiZap, FiTrendingUp, FiAward } from 'react-icons/fi';
import { getAboutSections, getSkills } from '../utils/api';
import TechStack from '../components/TechStack';
import Services from '../components/Services';
import Process from '../components/Process';
import CTA from '../components/CTA';
import Timeline from '../components/Timeline';
import ProgressCircle from '../components/ProgressCircle';
import GitHubContributions from '../components/GitHubContributions';
import SEO from '../components/SEO';

const About = () => {
  const [sections, setSections] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, skillsData] = await Promise.all([
          getAboutSections(),
          getSkills(),
        ]);
        setSections(aboutData);
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

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

  // Mock timeline data
  const timelineItems = [
    {
      type: 'work',
      date: '2022 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      description: 'Leading development of modern web applications using React, Node.js, and cloud technologies.',
      current: true,
      skills: ['React', 'Node.js', 'AWS', 'Docker'],
    },
    {
      type: 'work',
      date: '2020 - 2022',
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      description: 'Developed and maintained multiple client projects using modern web technologies.',
      skills: ['Vue.js', 'Python', 'PostgreSQL'],
    },
    {
      type: 'education',
      date: '2016 - 2020',
      title: 'Bachelor of Computer Science',
      company: 'University Name',
      description: 'Focused on software engineering and web development.',
      skills: ['Algorithms', 'Data Structures', 'Web Development'],
    },
  ];

  return (
    <>
      <SEO
        title="About - Full Stack Developer"
        description="Learn more about my journey, skills, and experience as a Full Stack Developer."
        keywords="about, developer, experience, skills, portfolio"
      />
      
      <div className="min-h-screen page-transition overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 pt-32 pb-20">
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
            <FiCode className="text-primary-500" />
            <span className="text-sm text-gray-400">About Me</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Crafting Digital
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Passionate developer building modern solutions with creativity and precision
          </p>
        </motion.div>
      </section>

      {/* About Sections */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-strong rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {section.icon && (
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center mb-4 relative z-10">
                  <span className="text-3xl">{section.icon}</span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3 text-white relative z-10">
                {section.title}
              </h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line relative z-10">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="text-primary-500">Technologies</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Tools I use to build amazing experiences
            </p>
          </motion.div>

          {Object.entries(skillsByCategory).map(([category, categorySkills], catIndex) => (
            <div key={category} className="mb-12">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold mb-6 text-primary-500"
              >
                {category}
              </motion.h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass-hover rounded-xl p-4 flex flex-col items-center text-center"
                  >
                    {skill.icon && (
                      <div className="w-12 h-12 rounded-lg glass-strong flex items-center justify-center mb-3">
                        <span className="text-2xl">{skill.icon}</span>
                      </div>
                    )}
                    <h4 className="font-semibold text-white text-sm mb-2">{skill.name}</h4>
                    <div className="w-full bg-dark-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-primary-500 mt-2">{skill.level}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">My Journey</h2>
            <p className="text-gray-400">Experience and education timeline</p>
          </motion.div>
          
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* GitHub Contributions */}
      <GitHubContributions username="your-github-username" />

      {/* Tech Stack */}
      <TechStack />

      {/* Services */}
      <Services />

      {/* Process */}
      <Process />

      {/* CTA */}
      <CTA />
      </div>
    </>
  );
};

export default About;
