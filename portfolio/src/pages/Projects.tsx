import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Search, X, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MediaModal } from '@/components/ui/media-modal';
import { VideoThumbnail } from '@/components/ui/video-thumbnail';
import { projects } from '@/data/profile';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  github: string;
  demo?: string;
  featured?: boolean;
  viewDetails?: boolean;
  mediaType?: 'video' | 'pdf' | 'link';
  mediaUrl?: string;
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewDetails = (project: Project) => {
    if (project.mediaType === 'link' && project.mediaUrl) {
      window.open(project.mediaUrl, '_blank');
    } else if (project.mediaType && project.mediaUrl) {
      setSelectedProject(project);
      setModalOpen(true);
    } else {
      window.open(project.github, '_blank');
    }
  };

  const filteredProjects = useMemo(() => {
    let result = filter === 'featured' 
      ? projects.filter(p => p.featured) 
      : projects;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
        project.features.some(feature => feature.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [filter, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SectionWrapper>
      <PageHeader
        title="Projects"
        subtitle="Showcasing my work and the solutions I've built"
      />

      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects by name, technology, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Projects ({filter === 'all' && searchQuery ? filteredProjects.length : projects.length})
        </Button>
        <Button
          variant={filter === 'featured' ? 'default' : 'outline'}
          onClick={() => setFilter('featured')}
        >
          Featured ({projects.filter(p => p.featured).length})
        </Button>
      </div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">No projects found for "{searchQuery}"</p>
          <p className="text-sm text-muted-foreground mt-2">Try searching with different keywords</p>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <Card className="h-full flex flex-col card-hover overflow-hidden">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {(project as Project).mediaType && (project as Project).mediaType !== 'link' && (project as Project).mediaUrl ? (
                  <VideoThumbnail
                    mediaType={(project as Project).mediaType as 'video' | 'pdf'}
                    mediaUrl={(project as Project).mediaUrl!}
                    onClick={() => handleViewDetails(project as Project)}
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full text-muted-foreground p-4 bg-gradient-to-br from-primary/5 to-blue-500/5">
                          <svg class="h-16 w-16 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                )}
                {project.featured && (
                  <Badge className="absolute top-3 right-3">Featured</Badge>
                )}
              </div>

              <CardContent className="flex-1 p-6">
                <div className="flex items-start gap-3 mb-3">
                  <FolderGit2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-bold">{project.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Key Features:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 5}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                {(project as Project).mediaType && (project as Project).mediaUrl ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleViewDetails(project as Project)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                ) : (
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="mr-2 h-4 w-4" />
                      View Repo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Media Modal */}
      {selectedProject && selectedProject.mediaType && selectedProject.mediaType !== 'link' && (
        <MediaModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedProject(null);
          }}
          mediaType={selectedProject.mediaType as 'video' | 'pdf'}
          mediaUrl={selectedProject.mediaUrl!}
          title={selectedProject.title}
        />
      )}
    </SectionWrapper>
  );
}
