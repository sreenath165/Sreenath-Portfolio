import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change: scroll to the #hash target if there is one (waiting for the
 * page transition to mount it), otherwise to the top.
 */
export function ScrollToTopOnNavigate() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer: number;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries++ < 20) {
        timer = window.setTimeout(attempt, 50);
      }
    };
    attempt();
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
