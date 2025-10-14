import { motion } from 'framer-motion';
import { FiCode, FiLayout, FiSmartphone, FiDatabase, FiCloud, FiZap } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: FiCode,
      title: 'Web Development',
      description: 'Building responsive and scalable web applications with modern frameworks',
      features: ['React', 'Next.js', 'Vue'],
    },
    {
      icon: FiLayout,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces with great user experience',
      features: ['Figma', 'Prototyping', 'User Testing'],
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Development',
      description: 'Developing cross-platform mobile applications for iOS and Android',
      features: ['React Native', 'Flutter', 'PWA'],
    },
    {
      icon: FiDatabase,
      title: 'Backend Development',
      description: 'Building robust and secure backend systems with RESTful APIs',
      features: ['Node.js', 'Python', 'PostgreSQL'],
    },
    {
      icon: FiCloud,
      title: 'Cloud Solutions',
      description: 'Deploying and managing applications on cloud platforms',
      features: ['AWS', 'Vercel', 'Docker'],
    },
    {
      icon: FiZap,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed, SEO, and better user experience',
      features: ['Lighthouse', 'Analytics', 'CDN'],
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What I <span className="text-primary-500">Offer</span>
          </h2>
          <p className="text-gray-400 text-lg">Comprehensive solutions for your digital needs</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-strong rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center mb-4"
                >
                  <service.icon className="text-primary-500" size={28} />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
