import { Fragment } from 'react';
import { ArrowDown, ArrowRight, Database } from 'lucide-react';
import type { ArchitectureStep } from '@/data/profile';

interface ArchitectureDiagramProps {
  steps: ArchitectureStep[];
  stores?: ArchitectureStep[];
  title: string;
}

/**
 * Request flow as boxes and arrows: horizontal on wide screens, vertical on phones.
 * Built from the project's data so it stays theme-aware and accessible as text.
 */
export function ArchitectureDiagram({ steps, stores, title }: ArchitectureDiagramProps) {
  return (
    <figure className="rounded-xl border border-border bg-muted/40 p-4 sm:p-6">
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center" aria-label={`${title} architecture, in request order`}>
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <li className="flex-1 rounded-lg border border-border bg-card px-3 py-3 text-center shadow-sm">
              <p className="text-sm font-semibold text-foreground">{step.label}</p>
              {step.detail && <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>}
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden="true" className="flex justify-center text-muted-foreground">
                <ArrowDown className="h-4 w-4 lg:hidden" />
                <ArrowRight className="hidden h-4 w-4 lg:block" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      {stores && stores.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-dashed border-border pt-4">
          <span className="text-xs font-medium text-muted-foreground">Reads from</span>
          {stores.map(store => (
            <span key={store.label} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs">
              <Database className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              <span className="font-semibold">{store.label}</span>
              {store.detail && <span className="text-muted-foreground">· {store.detail}</span>}
            </span>
          ))}
        </div>
      )}
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        Simplified request flow, in order.
      </figcaption>
    </figure>
  );
}
