import { lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Home, NotFound } from '@/pages';
import { ScrollToTopOnNavigate } from '@/components/common/ScrollToTopOnNavigate';
import '@/styles/globals.css';

// Secondary pages load on demand to keep the first paint small.
const Projects = lazy(() => import('@/pages/Projects').then(m => ({ default: m.Projects })));
const CaseStudy = lazy(() => import('@/pages/CaseStudy').then(m => ({ default: m.CaseStudy })));
const Resume = lazy(() => import('@/pages/Resume').then(m => ({ default: m.Resume })));

// Old standalone pages now live as sections of the home page.
// Keeping these URLs working protects links already shared on the resume and LinkedIn.
const sectionRedirects: Record<string, string> = {
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  certifications: 'certifications',
  education: 'education',
  contact: 'contact',
};

function App() {
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<CaseStudy />} />
          <Route path="resume" element={<Resume />} />
          {Object.entries(sectionRedirects).map(([path, id]) => (
            <Route key={path} path={path} element={<Navigate to={`/#${id}`} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
