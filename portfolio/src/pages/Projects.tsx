import { useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { FadeIn } from '@/components/common/FadeIn';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MediaModal } from '@/components/ui/media-modal';
import { FeaturedProjectCard } from '@/components/projects/FeaturedProjectCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projectCategories, projects, type Project, type ProjectCategory } from '@/data/profile';
import { cn } from '@/lib/utils';

type Filter = 'All' | ProjectCategory;
const filters: Filter[] = ['All', ...projectCategories];

function matches(project: Project, query: string) {
  const q = query.toLowerCase();
  return (
    project.title.toLowerCase().includes(q) ||
    project.description.toLowerCase().includes(q) ||
    project.technologies.some(t => t.toLowerCase().includes(q)) ||
    project.features.some(f => f.toLowerCase().includes(q))
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [mediaProject, setMediaProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim();
    return projects.filter(p => (filter === 'All' || p.categories.includes(filter)) && (!q || matches(p, q)));
  }, [filter, query]);

  const featured = filtered.filter(p => p.tier === 'featured');
  const main = filtered.filter(p => p.tier === 'main');
  const more = filtered.filter(p => p.tier === 'more');
  const isFiltering = filter !== 'All' || query.trim() !== '';
  const showMore = moreOpen || (isFiltering && main.length + featured.length === 0);

  const openMedia = (project: Project) => {
    if (project.mediaType === 'link' && project.mediaUrl) {
      window.open(project.mediaUrl, '_blank', 'noopener,noreferrer');
    } else if (project.mediaType && project.mediaUrl) {
      setMediaProject(project);
    }
  };

  const selectTech = (tech: string) => setQuery(q => (q.toLowerCase() === tech.toLowerCase() ? '' : tech));
  const clear = () => {
    setFilter('All');
    setQuery('');
  };

  const countFor = (f: Filter) => (f === 'All' ? projects.length : projects.filter(p => p.categories.includes(f)).length);

  return (
    <div className="section">
      <div className="container-custom">
        <PageHeader
          eyebrow="Projects"
          title="Work and case studies"
          subtitle="Production AI systems first, then other engineering and ML work. Older college projects and Unity games are under More projects."
        />

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  'rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors',
                  filter === f
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                {f} <span className={cn('ml-1 text-xs', filter === f ? 'opacity-80' : 'opacity-70')}>{countFor(f)}</span>
              </button>
            ))}
          </div>
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or technology"
              aria-label="Search projects"
              className="pl-9 pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} projects shown
        </p>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-lg font-medium">No projects match{query ? ` "${query}"` : ''}.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={clear}>
              Clear filters
            </Button>
          </div>
        )}

        {featured.length > 0 && (
          <section aria-labelledby="featured-heading" className="mb-14">
            <h2 id="featured-heading" className="mb-5 text-xl font-semibold">
              Featured case studies
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map(p => (
                <FadeIn key={p.id}>
                  <FeaturedProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {main.length > 0 && (
          <section aria-labelledby="other-heading" className="mb-14">
            <h2 id="other-heading" className="mb-5 text-xl font-semibold">
              Other projects
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {main.map(p => (
                <FadeIn key={p.id}>
                  <ProjectCard project={p} onOpenMedia={openMedia} onSelectTech={selectTech} selectedTech={query} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {more.length > 0 && (
          <section aria-labelledby="more-heading">
            <h2 id="more-heading">
              <button
                type="button"
                onClick={() => setMoreOpen(o => !o)}
                aria-expanded={showMore}
                aria-controls="more-projects"
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-5 py-4 text-left text-base font-semibold transition-colors hover:bg-accent"
              >
                <span>
                  More projects{' '}
                  <span className="font-normal text-muted-foreground">
                    ({more.length}) · college work and Unity games
                  </span>
                </span>
                <ChevronDown className={cn('h-5 w-5 transition-transform', showMore && 'rotate-180')} aria-hidden="true" />
              </button>
            </h2>
            {showMore && (
              <div id="more-projects" className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {more.map(p => (
                  <ProjectCard key={p.id} project={p} onOpenMedia={openMedia} onSelectTech={selectTech} selectedTech={query} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {mediaProject?.mediaUrl && (mediaProject.mediaType === 'video' || mediaProject.mediaType === 'pdf') && (
        <MediaModal
          isOpen
          onClose={() => setMediaProject(null)}
          mediaType={mediaProject.mediaType}
          mediaUrl={mediaProject.mediaUrl}
          title={mediaProject.title}
        />
      )}
    </div>
  );
}
