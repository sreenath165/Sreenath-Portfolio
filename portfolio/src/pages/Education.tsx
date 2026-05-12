import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { education } from '@/data/profile';

export function Education() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Education"
        subtitle="My academic journey and qualifications"
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-lg text-primary font-medium mb-3">
                      {edu.institution}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {edu.score}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
