import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ChatbotButton } from '@/components/common/ChatbotButton';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { AnimatedOutlet } from '@/components/common/AnimatedOutlet';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollProgress />
      <main className="flex-1 pt-16">
        <AnimatedOutlet />
      </main>
      <Footer />
      <ChatbotButton />
      <ScrollToTop />
    </div>
  );
}
