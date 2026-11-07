import { useState } from 'react';
import { BadgeCheck, ExternalLink, GraduationCap, Image as ImageIcon } from 'lucide-react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import { SiCoursera } from 'react-icons/si';
import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import { MediaModal } from '@/components/ui/media-modal';
import { certifications, education, isPlaceholderLink, type Certification } from '@/data/profile';

const issuerIcon = {
  'Amazon Web Services': FaAws,
  Microsoft: FaMicrosoft,
  Coursera: SiCoursera,
} as const;

function VerifyLink({ cert }: { cert: Certification }) {
  if (isPlaceholderLink(cert.verifyLink)) return null;
  return (
    <a
      href={cert.verifyLink}
      target="_blank"
      rel="noopener noreferrer"
      className="link-brand inline-flex items-center gap-1 text-sm"
      aria-label={`Verify ${cert.title}`}
    >
      Verify
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

export function CredentialsSection() {
  const [preview, setPreview] = useState<Certification | null>(null);
  const certs = certifications.filter(c => c.kind === 'certification');
  const courses = certifications.filter(c => c.kind === 'course');
  const degree = education.find(e => e.primary)!;
  const school = education.filter(e => !e.primary);

  return (
    <Section id="credentials" eyebrow="Credentials" title="Certifications & education" muted>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <FadeIn>
          <div id="certifications" className="h-full scroll-mt-24 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <BadgeCheck className="h-5 w-5 text-brand" aria-hidden="true" />
              Certifications
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {certs.map(cert => {
                const Icon = issuerIcon[cert.issuer];
                return (
                  <li key={cert.id} className="flex gap-4 py-4 first:pt-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-snug text-foreground">
                        {cert.title}
                        {cert.code && <span className="ml-2 chip align-middle">{cert.code}</span>}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {cert.issuer} · {cert.date}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4">
                        <VerifyLink cert={cert} />
                        {cert.image && (
                          <button
                            type="button"
                            onClick={() => setPreview(cert)}
                            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                          >
                            <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            View certificate
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Courses</h4>
            <ul className="mt-3 space-y-3">
              {courses.map(course => (
                <li key={course.id} className="flex items-start gap-3 text-sm">
                  <SiCoursera className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-foreground">{course.title}</span>
                    <span className="text-muted-foreground"> · {course.issuer}, {course.date}</span>
                    {!isPlaceholderLink(course.verifyLink) && (
                      <span className="ml-2">
                        <VerifyLink cert={course} />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div id="education" className="h-full scroll-mt-24 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <GraduationCap className="h-5 w-5 text-brand" aria-hidden="true" />
              Education
            </h3>
            <div className="mt-4">
              <p className="font-semibold text-foreground">{degree.degree}</p>
              <p className="text-sm text-foreground/80">
                {degree.institution}, {degree.location}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {degree.period} · {degree.score}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{degree.description}</p>
            </div>
            <ul className="mt-5 space-y-2 border-t border-border pt-4">
              {school.map(s => (
                <li key={s.id} className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{s.degree}</span> — {s.institution}, {s.location} · {s.period} · {s.score}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {preview?.image && (
        <MediaModal
          isOpen={!!preview}
          onClose={() => setPreview(null)}
          mediaType="image"
          mediaUrl={preview.image}
          title={preview.title}
        />
      )}
    </Section>
  );
}
