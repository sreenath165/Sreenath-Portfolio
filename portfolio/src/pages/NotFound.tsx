import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center">
      <div className="container-custom max-w-lg text-center">
        <p className="font-display text-7xl font-bold text-muted-foreground/40 md:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold md:text-3xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
