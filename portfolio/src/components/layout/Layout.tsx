import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { AnimatedOutlet } from '@/components/common/AnimatedOutlet';

// The assistant isn't needed for first paint, so its code loads after the page.
const ChatbotButton = lazy(() => import('@/components/common/ChatbotButton').then(m => ({ default: m.ChatbotButton })));

export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <ScrollProgress />
        <main id="main" className="flex-1 pt-16">
          <AnimatedOutlet />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <ChatbotButton />
        </Suspense>
        <ScrollToTop />
      </div>
    </MotionConfig>
  );
}
