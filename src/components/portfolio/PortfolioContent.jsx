'use client';

import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  SummarySection,
  CoverLetterSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  PortfolioSection,
  ProjectsSection,
  CertificationsSection,
  BlogSection,
  PricingSection,
  InterestsSection,
} from './sections';
import Hero from './Hero';
import ContentBackground from '../common/ContentBackground';

const SECTION_MAP = {
  summary: SummarySection,
  coverLetter: CoverLetterSection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  portfolio: PortfolioSection,
  projects: ProjectsSection,
  certifications: CertificationsSection,
  blog: BlogSection,
  pricing: PricingSection,
  interests: InterestsSection,
};

function SectionRenderer({ type, data, profile }) {
  const Component = SECTION_MAP[type];
  if (!Component) return null;
  return (
    <Box className="animate-fade-in-up" sx={{ mb: { xs: 4, md: 5 } }}>
      <Component data={data} loading={false} profile={type === 'summary' ? profile : undefined} />
    </Box>
  );
}

export default function PortfolioContent({ profile, sections }) {
  const sectionOrder = sections?.order ?? [
    'summary',
    'coverLetter',
    'experience',
    'education',
    'skills',
    'portfolio',
    'projects',
    'certifications',
    'blog',
    'pricing',
    'interests',
  ];
  const sectionData = sections?.data ?? sections ?? {};

  return (
    <Box component="main" sx={{ flex: 1, width: '100%', minWidth: 0, overflowX: 'hidden', position: 'relative' }}>
      {/* Fixed hero: 80% viewport height, stays in place on scroll */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ pointerEvents: 'auto', height: '100%' }}>
          <Hero profile={profile} loading={false} />
        </Box>
      </Box>
      {/* Spacer so content starts after hero (80vh) */}
      <Box sx={{ minHeight: '80vh', flexShrink: 0 }} aria-hidden />
      {/* Scrolling content: rounded top corners, own background animation */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          borderTopLeftRadius: { xs: 32, md: 48 },
          borderTopRightRadius: { xs: 32, md: 48 },
          pb: 4,
        }}
      >
        <ContentBackground />
        <Container maxWidth="md" sx={{ position: 'relative', pt: { xs: 5, sm: 6, md: 8 }, px: { xs: 3, sm: 4, md: 5 }, pb: { xs: 4, md: 6 } }}>
          {sectionOrder.map((key) => (
            <Box key={key} id={key} component="section" sx={{ scrollMarginTop: 80 }}>
              <SectionRenderer type={key} data={sectionData[key]} loading={false} profile={profile} />
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
}
