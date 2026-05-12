import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Calendar, X, Wrench, Users, Trophy, ChevronUp } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { experience } from '@/data/profile';

type ExperienceItem = typeof experience[0];

export function Experience() {
  const [selectedJob, setSelectedJob] = useState<ExperienceItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedJob(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedJob(null);
      }
    };

    if (selectedJob) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedJob]);

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setShowScrollTop(target.scrollTop > 100);
  };

  const scrollToTop = () => {
    modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SectionWrapper>
      <PageHeader
        title="Work Experience"
        subtitle="My professional journey and the impact I've made"
      />

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />

        <div className="space-y-12">
          {experience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative md:pl-20"
            >
              <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />

              <Card 
                className="card-hover cursor-pointer transition-all hover:border-primary/50"
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">{job.title}</h3>
                      </div>
                      <p className="text-lg text-primary font-medium">{job.company}</p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Calendar className="h-4 w-4" />
                        <span>{job.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {job.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-xs text-primary mt-4 font-medium">Click to view details →</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-card/95 backdrop-blur-md border-2 border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-card/95 backdrop-blur-md border-b border-border rounded-t-2xl">
                <div>
                  <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                  <p className="text-primary font-medium">{selectedJob.company}</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedJob(null)}
                    className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              <div 
                ref={modalContentRef}
                onScroll={handleModalScroll}
                className="p-6 space-y-6 overflow-y-auto flex-1"
              >
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedJob.period}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <Badge variant="outline">{selectedJob.type}</Badge>
                </div>

                {selectedJob.projects && selectedJob.projects.map((project, projectIdx) => (
                  <div key={projectIdx} className="border border-border rounded-xl p-5 bg-muted/20">
                    <h3 className="font-bold text-lg mb-3 text-primary">
                      Project {projectIdx + 1}: {project.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Tools Used</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tools.map((tool, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Key Achievement</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.keyAchievement}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">Client</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="absolute bottom-4 right-4 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                  >
                    <ChevronUp className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
