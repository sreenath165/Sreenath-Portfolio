import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import { FeaturedProjectCard } from '@/components/projects/FeaturedProjectCard';
import { featuredProjects } from '@/data/profile';

export function FeaturedWork() {
  return (
    <Section
      id="work"
      eyebrow="Featured work"
      title="AI systems in production"
      subtitle="Case studies with the problem, what I built, the architecture and the result."
      action={
        <Link to="/projects" className="link-brand inline-flex items-center gap-1.5 text-sm">
          All projects
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        {featuredProjects.slice(0, 3).map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.05}>
            <FeaturedProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
