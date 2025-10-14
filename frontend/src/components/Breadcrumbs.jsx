import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const breadcrumbNameMap = {
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    resume: 'Resume',
    admin: 'Admin',
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 pt-24 pb-4"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          {/* Home */}
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-400 hover:text-primary-500 transition-colors"
            >
              <FiHome size={16} />
              <span>Home</span>
            </Link>
          </li>

          {/* Path segments */}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNameMap[name] || name;

            return (
              <li key={routeTo} className="flex items-center gap-2">
                <FiChevronRight className="text-gray-600" size={16} />
                {isLast ? (
                  <span className="text-primary-500 font-medium capitalize">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-400 hover:text-primary-500 transition-colors capitalize"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
};

export default Breadcrumbs;
