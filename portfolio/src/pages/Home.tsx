import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Code, Brain, Cloud, Bot, Database, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';

export function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Hi, I'm{' '}
              <span className="gradient-text">{profile.shortName}</span>
            </h1>
            
            <p className="text-muted-foreground mb-6 max-w-xl leading-relaxed">
              {profile.summary}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button asChild size="sm" className="sm:h-11 sm:px-6 sm:text-base">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="sm" className="sm:h-11 sm:px-6 sm:text-base">
                <Link to="/resume">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
              
              <Button asChild variant="secondary" size="sm" className="sm:h-11 sm:px-6 sm:text-base">
                <Link to="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 dark:text-green-400 text-sm font-medium border border-green-500/20">
              ✓ Available for Projects
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-amber-500/40 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-4 bg-gradient-to-tr from-primary/30 to-orange-400/30 rounded-full blur-2xl" />
              
              <div className="relative w-full h-full rounded-full border-2 border-border/40 overflow-hidden bg-muted/50 flex items-center justify-center">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <span class="text-6xl font-bold gradient-text">${profile.shortName.charAt(0)}</span>
                        <span class="text-sm mt-2">[ADD PROFILE PHOTO]</span>
                      </div>
                    `;
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -8, 0],
                  x: [0, 4, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4,
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
                }}
                className="absolute -top-2 -right-2 w-16 h-16 flex flex-col items-center justify-center rounded-xl bg-card border border-border shadow-lg z-20"
              >
                <Brain className="h-6 w-6 text-primary" />
                <p className="text-[10px] mt-1 font-medium text-center">AI/ML</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 6, 0],
                  x: [0, -5, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5,
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  x: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute top-8 -left-6 w-16 h-16 flex flex-col items-center justify-center rounded-xl bg-card border border-border shadow-lg z-20"
              >
                <Bot className="h-6 w-6 text-primary" />
                <p className="text-[10px] mt-1 font-medium text-center">Agents</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -6, 0],
                  x: [0, 6, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6,
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                  x: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                }}
                className="absolute -bottom-2 -left-2 w-16 h-16 flex flex-col items-center justify-center rounded-xl bg-card border border-border shadow-lg z-20"
              >
                <Code className="h-6 w-6 text-primary" />
                <p className="text-[10px] mt-1 font-medium text-center">Python</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 7, 0],
                  x: [0, -4, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7,
                  y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                  x: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
                }}
                className="absolute top-1/3 -right-6 w-16 h-16 flex flex-col items-center justify-center rounded-xl bg-card border border-border shadow-lg z-20"
              >
                <Cloud className="h-6 w-6 text-primary" />
                <p className="text-[10px] mt-1 font-medium text-center">AWS</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -5, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8,
                  y: { duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                  x: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                }}
                className="absolute bottom-8 -right-4 w-16 h-16 flex flex-col items-center justify-center rounded-xl bg-card border border-border shadow-lg z-20"
              >
                <Database className="h-6 w-6 text-primary" />
                <p className="text-[10px] mt-1 font-medium text-center">RAG</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 8, 0],
                  x: [0, -6, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.9,
                  y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                  x: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }
                }}
                className="absolute bottom-1/4 left-0 w-16 h-16 flex flex-col items-center justify-center rounded-xl bg-card border border-border shadow-lg z-20"
              >
                <Sparkles className="h-6 w-6 text-primary" />
                <p className="text-[10px] mt-1 font-medium text-center">LLMs</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
