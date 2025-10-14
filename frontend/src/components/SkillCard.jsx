import { motion } from 'framer-motion';

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-hover rounded-lg p-4 flex flex-col items-center text-center group"
    >
      {/* Skill Icon or Name Initial */}
      <div className="w-16 h-16 rounded-full glass-strong flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        {skill.icon ? (
          <span className="text-3xl">{skill.icon}</span>
        ) : (
          <span className="text-2xl font-bold text-primary-700">
            {skill.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Skill Name */}
      <h4 className="font-semibold text-white mb-2">{skill.name}</h4>

      {/* Skill Level Bar */}
      <div className="w-full bg-dark-800 rounded-full h-2 mb-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
          className="h-full bg-gradient-to-r from-primary-700 to-primary-600 rounded-full"
        ></motion.div>
      </div>

      {/* Level Percentage */}
      <span className="text-xs terminal text-primary-800">{skill.level}%</span>
    </motion.div>
  );
};

export default SkillCard;
