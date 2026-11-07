import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FadeIn } from '@/components/common/FadeIn';
import { Button } from '@/components/ui/button';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { TechChips } from '@/components/projects/TechChips';
import { featuredProjects, isPlaceholderLink } from '@/data/profile';
import { NotFound } from './NotFound';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeIn className="border-t border-border py-8 md:grid md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground md:mb-0">{title}</h2>
      <div className="min-w-0">{children}</div>
    </FadeIn>
  );
}

export function CaseStudy() {
  const { slug } = useParams();
  const index = featuredProjects.findIndex(p => p.slug === slug);
  const project = featuredProjects[index];
  if (!project?.caseStudy) return <NotFound />;

  const cs = project.caseStudy;
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const repo = isPlaceholderLink(project.github) ? undefined : project.github;
  const demo = isPlaceholderLink(project.demo) ? undefined : project.demo;

  return (
    <article className="section">
      <div className="container-custom max-w-[900px]">
        <Link to="/projects" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>

        <FadeIn>
          <p className="eyebrow mb-3">Case study{cs.context ? ` · ${cs.context}` : ''}</p>
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{cs.summary}</p>

          <div className="mt-8 flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <TrendingUp className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
            <p className="text-base text-foreground sm:text-lg">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Result · </span>
              {cs.resultMetric && <strong className="font-display text-2xl font-bold">{cs.resultMetric} </strong>}
              {cs.result}
            </p>
          </div>
        </FadeIn>

        <div className="mt-10">
          <Block title="Problem">
            <p className="leading-relaxed text-muted-foreground">{cs.problem}</p>
          </Block>

          <Block title="What I built">
            <ul className="space-y-3">
              {cs.built.map(item => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Architecture">
            <ArchitectureDiagram steps={cs.architecture} stores={cs.stores} title={project.title} />
          </Block>

          <Block title="Tech stack">
            <TechChips items={project.technologies} />
          </Block>

          <Block title="Links">
            {repo || demo ? (
              <div className="flex flex-wrap gap-3">
                {demo && (
                  <Button asChild>
                    <a href={demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live demo
                    </a>
                  </Button>
                )}
                {repo && (
                  <Button asChild variant="outline">
                    <a href={repo} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="h-4 w-4" />
                      View repository
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                The code and demo are not public yet. Happy to walk through the design in an interview —{' '}
                <Link to="/#contact" className="link-brand">
                  get in touch
                </Link>
                .
              </p>
            )}
          </Block>
        </div>

        {next && next.slug !== project.slug && (
          <Link
            to={`/projects/${next.slug}`}
            className="group mt-6 flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent"
          >
            <span>
              <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">Next case study</span>
              <span className="mt-1 block font-semibold text-foreground">{next.title}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
