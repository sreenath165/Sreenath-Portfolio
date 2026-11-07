import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 left-0 right-0 h-[2px] z-50 origin-left"
    >
      <motion.div
        className="h-full origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
