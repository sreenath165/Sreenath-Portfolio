import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';
import { profile } from '@/data/profile';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container-custom py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            <Link to="/" className="text-lg sm:text-xl font-bold gradient-text">
              Sai Sreenath Reddy Y
            </Link>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-xs sm:text-sm max-w-md">
              {profile.role}
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href={profile.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-muted-foreground hover:text-primary transition-colors">
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors truncate">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Sai Sreenath Reddy Y. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
