import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import { coreSkills, skillGroups } from '@/data/profile';

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Skills" title="Core stack, with proof" subtitle="What I use day to day, and where I used it.">
      <FadeIn>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {coreSkills.map(skill => (
            <li key={skill.name} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="font-display font-semibold text-foreground">{skill.name}</p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{skill.proof}</p>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn className="mt-10">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              className={`grid gap-3 p-5 md:grid-cols-[180px_1fr] md:gap-6 ${i > 0 ? 'border-t border-border' : ''}`}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{group.title}</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="mr-2 text-xs font-semibold text-brand">Core</span>
                  <span className="font-medium text-foreground">{group.core.join(' · ')}</span>
                </p>
                <p className="text-sm">
                  <span className="mr-2 text-xs font-semibold text-muted-foreground">Also worked with</span>
                  <span className="text-muted-foreground">{group.also.join(' · ')}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
