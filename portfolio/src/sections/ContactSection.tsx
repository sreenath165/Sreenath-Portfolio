import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Clock, Mail, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { profile } from '@/data/profile';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // TODO: delivery is not wired up yet (mail routing to be added) — this only simulates sending.
  const onSubmit = async (data: ContactFormData) => {
    console.log('Form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk about your team."
      subtitle="Email, LinkedIn or the form below. I reply within 24 hours."
      muted
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        <FadeIn>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="justify-start">
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-5 w-5" />
                {profile.email}
              </a>
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild size="lg" variant="outline">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-5 w-5" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.location}
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              Usually replies within 24 hours
            </li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.05}>
          <Card className="p-5 sm:p-6">
            {isSubmitted ? (
              <div role="status" className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="mb-4 h-14 w-14 text-success" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-semibold">Message sent</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      {...register('name')}
                    />
                    <FieldError id="name-error" message={errors.name?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                    />
                    <FieldError id="email-error" message={errors.email?.message} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Role, team or opportunity"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    {...register('subject')}
                  />
                  <FieldError id="subject-error" message={errors.subject?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about the role and your team..."
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    {...register('message')}
                  />
                  <FieldError id="message-error" message={errors.message?.message} />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}
