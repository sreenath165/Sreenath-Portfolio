import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';

export function Resume() {
  const resumePath = '/resume/SaiSreenath_Resume.pdf';

  return (
    <SectionWrapper>
      <PageHeader
        title="Resume"
        subtitle="View and download my professional resume"
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">Professional Resume</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Button asChild variant="outline" size="sm" className="sm:h-10 sm:px-4">
                      <a href={resumePath} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span className="hidden xs:inline">Open in </span>New Tab
                      </a>
                    </Button>
                    <Button asChild size="sm" className="sm:h-10 sm:px-4">
                      <a href={resumePath} download>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="h-[400px] sm:h-[600px] md:h-[800px] bg-muted">
                <iframe
                  src={resumePath}
                  className="w-full h-full border-0"
                  title="Resume Preview"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
