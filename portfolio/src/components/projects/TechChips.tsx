import { cn } from '@/lib/utils';

interface TechChipsProps {
  items: string[];
  max?: number;
  className?: string;
  onSelect?: (tech: string) => void;
  selected?: string;
}

/** One neutral chip style, at most `max` shown (guide: 5). */
export function TechChips({ items, max = 5, className, onSelect, selected }: TechChipsProps) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label="Technologies">
      {shown.map(tech => (
        <li key={tech}>
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(tech)}
              aria-pressed={selected?.toLowerCase() === tech.toLowerCase()}
              title={`Show projects using ${tech}`}
              className={cn(
                'chip transition-colors hover:border-foreground/30',
                selected?.toLowerCase() === tech.toLowerCase() && 'border-foreground bg-foreground text-background'
              )}
            >
              {tech}
            </button>
          ) : (
            <span className="chip">{tech}</span>
          )}
        </li>
      ))}
      {rest > 0 && (
        <li>
          <span className="chip bg-transparent text-muted-foreground" title={items.slice(max).join(', ')}>
            +{rest}
          </span>
        </li>
      )}
    </ul>
  );
}
