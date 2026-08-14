import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import {
  Home,
  About,
  Skills,
  Experience,
  Projects,
  Certifications,
  Education,
  Resume,
  Contact,
  NotFound,
} from '@/pages';
import { ScrollToTopOnNavigate } from '@/components/common/ScrollToTopOnNavigate';
import '@/styles/globals.css';

function App() {
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="education" element={<Education />} />
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
