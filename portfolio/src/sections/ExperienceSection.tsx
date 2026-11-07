import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import { TechChips } from '@/components/projects/TechChips';
import { experience, type ExperienceBullet } from '@/data/profile';
import { cn } from '@/lib/utils';

function Bullet({ bullet }: { bullet: ExperienceBullet }) {
  if (!bullet.highlight || !bullet.text.includes(bullet.highlight)) return <>{bullet.text}</>;
  const [before, after] = bullet.text.split(bullet.highlight);
  return (
    <>
      {before}
      <strong className="font-semibold text-foreground">{bullet.highlight}</strong>
      {after}
    </>
  );
}

function RoleProjects({ job }: { job: (typeof experience)[number] }) {
  const [open, setOpen] = useState(false);
  const panelId = `role-${job.id}-projects`;
  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
      >
        {open ? 'Hide' : 'Show'} project details ({job.projects.length})
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      {open && (
        <div id={panelId} className="mt-4 grid gap-4 sm:grid-cols-2">
          {job.projects.map(p => (
            <div key={p.name} className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="font-semibold text-foreground">{p.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.client}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <p className="mt-3 text-sm">
                <span className="font-semibold text-foreground">Result: </span>
                <span className="text-muted-foreground">{p.keyAchievement}</span>
              </p>
              <TechChips items={p.tools} max={7} className="mt-3" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've shipped AI" muted>
      <ol className="relative space-y-8 border-l border-border pl-6 md:pl-8">
        {experience.map((job, i) => (
          <li key={job.id} className="relative">
            <span
              aria-hidden="true"
              className={cn(
                'absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background md:-left-[39px]',
                i === 0 ? 'bg-primary' : 'bg-muted-foreground/50'
              )}
            />
            <FadeIn>
              <article className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="font-medium text-foreground/80">{job.company}</p>
                  </div>
                  <div className="text-sm text-muted-foreground sm:text-right">
                    <p className="font-medium text-foreground">{job.period}</p>
                    <p className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.location} · {job.type}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map(b => (
                    <li key={b.text} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" aria-hidden="true" />
                      <span>
                        <Bullet bullet={b} />
                      </span>
                    </li>
                  ))}
                </ul>
                <TechChips items={job.technologies} max={6} className="mt-5" />
                <RoleProjects job={job} />
              </article>
            </FadeIn>
          </li>
        ))}
      </ol>
    </Section>
  );
}
