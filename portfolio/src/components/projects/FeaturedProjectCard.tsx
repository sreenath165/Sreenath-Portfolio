import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Project } from '@/data/profile';
import { TechChips } from './TechChips';

/** Case-study card: what it is, the result, the stack, and a link to the full write-up. */
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group relative flex h-full flex-col p-6 transition-colors hover:border-foreground/25">
      {project.caseStudy?.context && (
        <p className="mb-3 text-xs font-medium text-muted-foreground">{project.caseStudy.context}</p>
      )}
      <h3 className="text-lg font-semibold leading-snug">
        <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.caseStudy?.summary ?? project.description}
      </p>
      {project.resultLine && (
        <p className="mt-4 inline-flex items-start gap-2 text-sm font-semibold text-foreground">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          {project.resultLine}
        </p>
      )}
      <TechChips items={project.technologies} className="mt-4" />
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        Read case study
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Card>
  );
}
