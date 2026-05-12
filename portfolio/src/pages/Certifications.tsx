import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { certifications } from '@/data/profile';

export function Certifications() {
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
        title="Certifications"
        subtitle="Professional certifications and credentials that validate my expertise"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certifications.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants}>
            <Card className="h-full card-hover overflow-hidden flex flex-col">
              <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="flex flex-col items-center justify-center h-full text-muted-foreground p-4 bg-gradient-to-br from-primary/5 to-blue-500/5">
                        <svg class="h-16 w-16 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    `;
                  }}
                />
              </div>

              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold leading-tight">{cert.title}</h3>
                    <p className="text-sm text-primary font-medium mt-1">{cert.issuer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{cert.date}</span>
                </div>

                <p className="text-sm text-muted-foreground flex-1">
                  {cert.description}
                </p>

                <Button asChild variant="outline" size="sm" className="w-full mt-4">
                  <a href={cert.verifyLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Verify Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
