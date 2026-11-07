import { CheckCircle2 } from 'lucide-react';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import { profile } from '@/data/profile';

export function AboutSection() {
  return (
    <Section id="about" eyebrow="About" title="Shipping AI that teams actually use">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <FadeIn>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{profile.about.summary}</p>
          <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5">
            <p className="text-sm font-semibold text-foreground">Beyond code</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{profile.about.beyondCode}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <a href={profile.youtube} target="_blank" rel="noopener noreferrer" className="link-brand inline-flex items-center gap-1.5">
                <FaYoutube className="h-4 w-4" aria-hidden="true" />
                YouTube
              </a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="link-brand inline-flex items-center gap-1.5">
                <FaInstagram className="h-4 w-4" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Key strengths</h3>
          <ul className="mt-4 space-y-4">
            {profile.about.strengths.map(s => (
              <li key={s.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.proof}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}
