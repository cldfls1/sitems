import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import TerminalLoader from './components/TerminalLoader';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminNew from './pages/AdminNew';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import Resume from './pages/Resume';
import CursorTrail from './components/CursorTrail';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import AnimatedGrid from './components/AnimatedGrid';
import NoiseTexture from './components/NoiseTexture';
import ScrollToTop from './components/ScrollToTop';

const ConditionalFooter = () => {
  const location = useLocation();
  const hideFooterOn = ['/admin'];
  
  if (hideFooterOn.includes(location.pathname)) {
    return null;
  }
  
  return <Footer />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            {isLoading && <TerminalLoader onComplete={handleLoadingComplete} />}
            
            <div className="min-h-screen bg-black">
              {/* Global Interactive Components */}
              {!isLoading && (
                <>
                  <CommandPalette />
                  <ScrollToTop />
                  <TopNav />
                </>
              )}
              
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/admin" element={<AdminNew />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {!isLoading && <ConditionalFooter />}
            </div>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
