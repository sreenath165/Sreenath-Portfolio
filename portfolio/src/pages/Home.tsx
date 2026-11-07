import { Hero } from '@/sections/Hero';
import { FeaturedWork } from '@/sections/FeaturedWork';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { CredentialsSection } from '@/sections/CredentialsSection';
import { AboutSection } from '@/sections/AboutSection';
import { ContactSection } from '@/sections/ContactSection';

/** Single scrolling page: a recruiter can reach every key fact without leaving it. */
export function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ExperienceSection />
      <SkillsSection />
      <CredentialsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
