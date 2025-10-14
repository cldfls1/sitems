import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'I offer full-stack web development, UI/UX design, mobile app development, and cloud deployment services. I specialize in React, Node.js, Python, and modern web technologies.',
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on scope and complexity. A simple website might take 2-3 weeks, while a complex web application could take 2-3 months. I provide detailed timelines after understanding your requirements.',
    },
    {
      question: 'What is your development process?',
      answer: 'I follow an agile methodology: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development & Testing, 4) Deployment & Launch, 5) Maintenance & Support. Regular communication and feedback loops ensure alignment.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes! I offer post-launch support and maintenance packages. This includes bug fixes, updates, performance monitoring, and feature enhancements to keep your application running smoothly.',
    },
    {
      question: 'What are your rates?',
      answer: 'Rates depend on project scope, complexity, and timeline. I offer both fixed-price and hourly arrangements. Contact me for a detailed quote based on your specific needs.',
    },
    {
      question: 'Can you work with my existing team?',
      answer: 'Absolutely! I have experience collaborating with existing development teams, designers, and stakeholders. I can integrate seamlessly into your workflow and processes.',
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary-500">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to know</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === i ? (
                    <FiMinus className="text-primary-500" size={20} />
                  ) : (
                    <FiPlus className="text-primary-500" size={20} />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
