import { FadeIn } from './FadeIn';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

/** Header block for standalone pages (/projects, /resume, case studies). */
export function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  return (
    <FadeIn className="mb-10 md:mb-12 max-w-3xl">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h1>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-muted-foreground">{subtitle}</p>}
      {children}
    </FadeIn>
  );
}
