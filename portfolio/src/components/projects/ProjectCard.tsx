import { useState } from 'react';
import { ExternalLink, FileText, Play } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VideoThumbnail } from '@/components/ui/video-thumbnail';
import { isPlaceholderLink, type Project } from '@/data/profile';
import { TechChips } from './TechChips';

interface ProjectCardProps {
  project: Project;
  onOpenMedia: (project: Project) => void;
  onSelectTech?: (tech: string) => void;
  selectedTech?: string;
}

/** Media only renders when it exists: demo video/PDF, or an image that actually loads. */
function ProjectMedia({ project, onOpenMedia }: Pick<ProjectCardProps, 'project' | 'onOpenMedia'>) {
  const [imageFailed, setImageFailed] = useState(false);

  if ((project.mediaType === 'video' || project.mediaType === 'pdf') && project.mediaUrl) {
    return (
      <div className="aspect-video overflow-hidden border-b border-border bg-muted">
        <VideoThumbnail mediaType={project.mediaType} mediaUrl={project.mediaUrl} onClick={() => onOpenMedia(project)} />
      </div>
    );
  }
  if (!project.image || imageFailed) return null;
  return (
    <div className="aspect-video overflow-hidden border-b border-border bg-muted">
      <img
        src={project.image}
        alt={`${project.title} — project photo`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}

export function ProjectCard({ project, onOpenMedia, onSelectTech, selectedTech }: ProjectCardProps) {
  const hasMedia = project.mediaType && project.mediaUrl;
  const repo = !isPlaceholderLink(project.github) ? project.github : undefined;

  const primaryAction = hasMedia ? (
    <Button variant="outline" size="sm" onClick={() => onOpenMedia(project)}>
      {project.mediaType === 'video' ? <Play className="h-4 w-4" /> : project.mediaType === 'pdf' ? <FileText className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
      {project.mediaType === 'video' ? 'Watch demo' : project.mediaType === 'pdf' ? 'Read paper' : 'View details'}
    </Button>
  ) : repo ? (
    <Button asChild variant="outline" size="sm">
      <a href={repo} target="_blank" rel="noopener noreferrer">
        <FaGithub className="h-4 w-4" />
        View repo
      </a>
    </Button>
  ) : null;

  // Show the repo as a secondary text link when the main action is a demo.
  const showRepoLink = hasMedia && repo && repo !== project.mediaUrl && project.mediaType !== 'link';

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <ProjectMedia project={project} onOpenMedia={onOpenMedia} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <TechChips items={project.technologies} className="mt-4" onSelect={onSelectTech} selected={selectedTech} />
        {(primaryAction || showRepoLink) && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {primaryAction}
            {showRepoLink && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="link-brand inline-flex items-center gap-1.5 text-sm">
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                Repo
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
