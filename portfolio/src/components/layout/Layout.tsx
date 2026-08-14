import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ChatbotButton } from '@/components/common/ChatbotButton';
import { ScrollProgress } from '@/components/common/ScrollProgress';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollProgress />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ChatbotButton />
      <ScrollToTop />
    </div>
  );
}
