import { Component } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/30 mb-8"
              >
                <FiAlertTriangle className="text-red-500" size={48} />
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-400 mb-8">
                We're sorry for the inconvenience. An unexpected error has occurred.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass-strong rounded-xl p-6 mb-8 text-left border border-red-500/20"
                >
                  <h3 className="text-red-500 font-bold mb-2">Error Details:</h3>
                  <pre className="text-xs text-gray-400 overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleReset}
                  className="px-8 py-4 rounded-xl bg-primary-500 text-black font-medium shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all flex items-center gap-2"
                >
                  <FiHome size={20} />
                  Go to Homepage
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleReload}
                  className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <FiRefreshCw size={20} />
                  Reload Page
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
