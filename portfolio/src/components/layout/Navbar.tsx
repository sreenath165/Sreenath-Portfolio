import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

// Custom Portfolio Icon matching the favicon
function PortfolioIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
    >
      <rect width="100" height="100" rx="16" className="fill-slate-900 dark:fill-slate-800"/>
      <path 
        d="M30 25 L50 15 L70 25 L70 50 L50 60 L30 50 Z" 
        stroke="url(#navGrad)" 
        strokeWidth="4"
        fill="none"
      />
      <path d="M50 60 L50 80" stroke="url(#navGrad)" strokeWidth="4"/>
      <path 
        d="M30 50 L30 65 L50 75 L70 65 L70 50" 
        stroke="url(#navGrad)" 
        strokeWidth="4"
        fill="none"
      />
      <circle cx="50" cy="38" r="8" fill="url(#navGrad)"/>
      <defs>
        <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9a825"/>
          <stop offset="100%" stopColor="#ff8f00"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Education', path: '/education' },
  { name: 'Resume', path: '/resume' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Force re-render by navigating away and back
      navigate('/temp-redirect', { replace: true });
      setTimeout(() => navigate('/', { replace: true }), 0);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={handleLogoClick} className="flex items-center space-x-2 group">
            <div className="rounded-lg group-hover:scale-105 transition-transform">
              <PortfolioIcon className="h-9 w-9" />
            </div>
            <span className="text-lg font-semibold gradient-text hidden sm:inline">Portfolio</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const isContact = link.name === 'Contact';
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative"
                >
                  <motion.div
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors relative z-10",
                      isContact
                        ? cn(
                            "bg-primary text-primary-foreground hover:bg-primary/90",
                            isActive && "contact-glow"
                          )
                        : isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link.name}
                  </motion.div>
                  {isActive && !isContact && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary/10 rounded-md"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full relative overflow-hidden hover:bg-primary/20 hover:text-primary"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, scale: 0, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/40"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const isContact = link.name === 'Contact';
                  
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="relative block"
                    >
                      <motion.div
                        className={cn(
                          "px-4 py-2 text-sm font-medium rounded-md transition-colors relative z-10",
                          isContact
                            ? cn(
                                "bg-primary text-primary-foreground hover:bg-primary/90",
                                isActive && "contact-glow"
                              )
                            : isActive
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground"
                        )}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {link.name}
                      </motion.div>
                      {isActive && !isContact && (
                        <motion.div
                          layoutId="navbar-mobile-indicator"
                          className="absolute inset-0 bg-primary/10 rounded-md"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
