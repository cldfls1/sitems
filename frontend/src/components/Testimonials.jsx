import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO at TechCorp',
      content: 'Exceptional work! The project was delivered on time and exceeded all expectations. Highly recommend!',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Jane Smith',
      role: 'Product Manager',
      content: 'Great communication and technical skills. Turned our vision into reality with beautiful code.',
      rating: 5,
      avatar: '👩‍💻',
    },
    {
      name: 'Mike Johnson',
      role: 'Startup Founder',
      content: 'Professional, reliable, and incredibly talented. Will definitely work together again!',
      rating: 5,
      avatar: '👨‍🚀',
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
            What <span className="text-primary-500">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-lg">Don't just take my word for it</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-strong rounded-2xl p-6 border border-white/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
