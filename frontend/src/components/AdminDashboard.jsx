import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiEye, FiUsers, FiFolder, FiActivity, FiClock } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalProjects: 0,
    totalVisitors: 0,
    activeUsers: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    setStats({
      totalViews: 12543,
      totalProjects: 24,
      totalVisitors: 3421,
      activeUsers: 42,
    });

    setRecentActivity([
      { action: 'New project created', time: '5 minutes ago', type: 'create' },
      { action: 'Project updated', time: '1 hour ago', type: 'update' },
      { action: 'New visitor from USA', time: '2 hours ago', type: 'visitor' },
      { action: 'Blog post published', time: '3 hours ago', type: 'publish' },
      { action: 'Contact form submitted', time: '5 hours ago', type: 'contact' },
    ]);
  }, []);

  const statCards = [
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: FiEye,
      color: 'from-blue-500 to-blue-600',
      change: '+12.5%',
    },
    {
      title: 'Projects',
      value: stats.totalProjects,
      icon: FiFolder,
      color: 'from-primary-500 to-primary-600',
      change: '+3',
    },
    {
      title: 'Visitors',
      value: stats.totalVisitors.toLocaleString(),
      icon: FiUsers,
      color: 'from-purple-500 to-purple-600',
      change: '+8.2%',
    },
    {
      title: 'Active Now',
      value: stats.activeUsers,
      icon: FiActivity,
      color: 'from-orange-500 to-orange-600',
      change: 'Live',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-strong rounded-xl p-6 border border-white/10 relative overflow-hidden group"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-xs text-primary-500 font-medium">{stat.change}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Views Overview</h3>
            <FiTrendingUp className="text-primary-500" size={20} />
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const height = Math.random() * 100;
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-12">{day}</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${height}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-end pr-3"
                    >
                      <span className="text-xs text-white font-medium">
                        {Math.floor(height * 50)}
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <FiClock className="text-primary-500" size={20} />
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-strong rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'New Project', color: 'primary' },
            { label: 'New Post', color: 'blue' },
            { label: 'View Analytics', color: 'purple' },
            { label: 'Settings', color: 'orange' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-3 rounded-xl bg-${action.color}-500/10 border border-${action.color}-500/20 text-${action.color}-500 hover:bg-${action.color}-500/20 transition-all text-sm font-medium`}
            >
              {action.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
