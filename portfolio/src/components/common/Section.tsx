import { cn } from '@/lib/utils';
import { FadeIn } from './FadeIn';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

/** A home-page section: consistent spacing, max width and heading block. */
export function Section({ id, eyebrow, title, subtitle, action, children, className, muted }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn('section', muted && 'bg-muted/50 border-y border-border/60', className)}
    >
      <div className="container-custom">
        {(eyebrow || title) && (
          <FadeIn className="mb-10 md:mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
              {title && (
                <h2 id={headingId} className="text-3xl md:text-4xl font-bold">
                  {title}
                </h2>
              )}
              {subtitle && <p className="mt-3 text-muted-foreground md:text-lg">{subtitle}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  );
}
