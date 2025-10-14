import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';

const GitHubContributions = ({ username = 'github' }) => {
  const [contributions, setContributions] = useState([]);
  const [stats, setStats] = useState({ total: 0, streak: 0 });

  useEffect(() => {
    // Generate mock contribution data
    // In production, fetch from GitHub API
    const generateMockData = () => {
      const data = [];
      const today = new Date();
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const count = Math.floor(Math.random() * 10);
        data.push({
          date: date.toISOString().split('T')[0],
          count,
          level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4,
        });
      }
      
      return data;
    };

    const mockData = generateMockData();
    setContributions(mockData);
    
    const total = mockData.reduce((sum, day) => sum + day.count, 0);
    setStats({ total, streak: 42 });
  }, [username]);

  const getLevelColor = (level) => {
    const colors = [
      'bg-gray-800',
      'bg-primary-900/30',
      'bg-primary-700/50',
      'bg-primary-500/70',
      'bg-primary-400',
    ];
    return colors[level] || colors[0];
  };

  // Group by weeks
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section className="px-6 py-20 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiGithub className="text-primary-500" size={32} />
            <h2 className="text-4xl font-bold">GitHub Activity</h2>
          </div>
          <p className="text-gray-400">My contribution graph over the past year</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 border border-white/10"
        >
          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500">{stats.total}</div>
              <div className="text-sm text-gray-500">Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500">{stats.streak}</div>
              <div className="text-sm text-gray-500">Day Streak</div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto">
            <div className="inline-flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                      whileHover={{ scale: 1.5, zIndex: 10 }}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} cursor-pointer relative group`}
                      title={`${day.date}: ${day.count} contributions`}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                        {day.count} contributions on {day.date}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-6 text-xs text-gray-500">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributions;
