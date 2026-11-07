import { Download, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { profile, RESUME_DOWNLOAD_NAME, RESUME_PATH } from '@/data/profile';

export function Resume() {
  return (
    <div className="section">
      <div className="container-custom">
        <PageHeader eyebrow="Resume" title={profile.name} subtitle={profile.roleLong}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={RESUME_PATH} download={RESUME_DOWNLOAD_NAME}>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open in new tab
              </a>
            </Button>
          </div>
        </PageHeader>

        {/* Phones often can't render PDFs inline, so the preview is desktop/tablet only. */}
        <Card className="hidden overflow-hidden sm:block">
          <iframe src={`${RESUME_PATH}#view=FitH`} className="h-[80vh] min-h-[600px] w-full border-0 bg-muted" title={`${profile.name} — resume preview`} />
        </Card>
        <p className="text-sm text-muted-foreground sm:hidden">
          Tip: on a phone, use “Open in new tab” to read the PDF in your browser’s viewer.
        </p>
      </div>
    </div>
  );
}
