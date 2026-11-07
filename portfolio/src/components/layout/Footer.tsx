import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '@/data/profile';

const links = [
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin, external: true },
  { label: 'GitHub', href: profile.github, icon: FaGithub, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, external: false },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Extra bottom padding on small screens keeps text clear of the floating chat button.
    <footer id="site-footer" className="border-t border-border/70 bg-muted/40">
      <div className="container-custom flex flex-col gap-6 pb-28 pt-10 md:flex-row md:items-center md:justify-between md:pb-10">
        <div>
          <Link to="/" className="font-display text-base font-semibold text-foreground">
            {profile.name}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{profile.roleLong}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {year} {profile.name} ·{' '}
            <Link to="/resume" className="underline-offset-4 hover:underline">
              View resume online
            </Link>
          </p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {links.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
