import { cloneElement, Suspense } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/** Route outlet with a short fade between pages; lazy pages suspend here so the header and footer stay put. */
export function AnimatedOutlet() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait">
      {outlet && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
            {cloneElement(outlet, { key: location.pathname })}
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
