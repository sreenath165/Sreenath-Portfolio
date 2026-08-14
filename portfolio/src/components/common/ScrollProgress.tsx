import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-[3px] z-50 origin-left bg-primary/20"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-amber-400"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.div>
  );
}
