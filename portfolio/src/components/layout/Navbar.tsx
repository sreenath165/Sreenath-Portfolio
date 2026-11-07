import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { profile, RESUME_DOWNLOAD_NAME, RESUME_PATH } from '@/data/profile';

type NavLink = { name: string; to: string; section?: string };

const navLinks: NavLink[] = [
  { name: 'About', to: '/#about', section: 'about' },
  { name: 'Experience', to: '/#experience', section: 'experience' },
  { name: 'Projects', to: '/projects' },
  { name: 'Contact', to: '/#contact', section: 'contact' },
];

/** Highlights the home-page section currently in view. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const ids = navLinks.map(l => l.section).filter(Boolean) as string[];
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // The contact section is short; treat reaching the bottom as "contact".
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);

  return active;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const activeSection = useActiveSection(isHome);

  useEffect(() => setIsOpen(false), [location.pathname, location.hash]);

  const isActive = (link: NavLink) =>
    link.section ? isHome && activeSection === link.section : location.pathname.startsWith(link.to);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-b border-border/70">
      <nav className="container-custom flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link to="/" onClick={handleLogoClick} className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground font-display text-sm font-bold text-background">
            {profile.initials}
          </span>
          <span className="sr-only sm:hidden">{profile.name}, home</span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="truncate font-display text-[15px] font-semibold text-foreground">{profile.name}</span>
            <span className="truncate text-xs text-muted-foreground">{profile.role}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              aria-current={isActive(link) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(link) ? 'text-foreground bg-accent' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={RESUME_PATH} download={RESUME_DOWNLOAD_NAME}>
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(o => !o)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/70 md:hidden"
          >
            <div className="container-custom flex flex-col gap-1 py-3">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium',
                    isActive(link) ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <a href={RESUME_PATH} download={RESUME_DOWNLOAD_NAME}>
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
