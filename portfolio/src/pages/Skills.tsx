import { motion } from 'framer-motion';
import { Code, Brain, Server, Wrench, Cloud, Database } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/data/profile';

const skillIcons: Record<string, React.ReactNode> = {
  programming: <Code className="h-6 w-6" />,
  ai: <Brain className="h-6 w-6" />,
  backend: <Server className="h-6 w-6" />,
  frameworks: <Wrench className="h-6 w-6" />,
  devops: <Cloud className="h-6 w-6" />,
  databases: <Database className="h-6 w-6" />,
};

export function Skills() {
  const skillCategories = Object.entries(skills);

  return (
    <SectionWrapper>
      <PageHeader
        title="Skills & Technologies"
        subtitle="A comprehensive overview of my technical expertise and tools I work with"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map(([key, category], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {skillIcons[key]}
                  </div>
                  <h3 className="font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
