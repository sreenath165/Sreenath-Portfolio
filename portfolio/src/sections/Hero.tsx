import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile, proofStats, RESUME_DOWNLOAD_NAME, RESUME_PATH } from '@/data/profile';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-10 pb-12 md:pt-20 md:pb-20">
      <div className="container-custom">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center gap-4 lg:hidden">
              <img
                src={profile.headshotImage}
                alt={`Portrait of ${profile.name}`}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-full border border-border object-cover"
              />
              <p className="eyebrow">{profile.role}</p>
            </div>
            <p className="eyebrow mb-4 hidden lg:block">{profile.role}</p>

            <h1 id="hero-heading" className="text-4xl font-bold sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              {profile.name}
            </h1>

            <p className="mt-5 text-xl font-medium text-foreground sm:text-2xl">
              {profile.hero.subtitle}
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.hero.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/projects">
                  View projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={RESUME_PATH} download={RESUME_DOWNLOAD_NAME}>
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                {profile.hero.badge}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {profile.location}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-[340px]">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                <img
                  src={profile.profileImage}
                  alt={`Portrait of ${profile.name}`}
                  width={420}
                  height={525}
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-md">
                <Building2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div className="min-w-0 leading-tight">
                  <p className="text-xs text-muted-foreground">Currently at</p>
                  <p className="truncate text-sm font-semibold">{profile.currentEmployer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Proof strip */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:mt-16 lg:grid-cols-4"
        >
          {proofStats.map(stat => (
            <div key={stat.label} className="bg-card p-4 sm:p-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.context}</p>
              </dd>
            </div>
          ))}
          <div className="bg-card p-4 sm:p-5">
            <dt className="sr-only">Current employer</dt>
            <dd>
              <Building2 className="h-6 w-6 text-brand sm:h-7 sm:w-7" aria-hidden="true" />
              <p className="mt-2 text-sm font-medium text-foreground">{profile.currentEmployer}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Senior Associate · since Nov 2025</p>
            </dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
