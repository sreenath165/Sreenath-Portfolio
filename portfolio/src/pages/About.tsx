import { motion } from 'framer-motion';
import { Target, Lightbulb, Heart, User } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { profile } from '@/data/profile';

export function About() {
  return (
    <SectionWrapper>
      <PageHeader
        title="About Me"
        subtitle="Get to know more about my journey and passion"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Introduction</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.about.introduction}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Career Objective</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.about.careerObjective}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Key Strengths</h3>
                  <div className="grid sm:grid-cols-2 gap-2 mt-4">
                    {profile.about.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Beyond Code</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.about.personalIntro}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
