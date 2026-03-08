'use client';

import { useCallback, useRef } from 'react';
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
import CustomCursorArea from '../common/CustomCursorArea';
import Footer from '../layout/Footer';
import { useAppReady } from '../../context/AppReadyContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { useScroll } from '../../context/ScrollContext';

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

function SectionRenderer({ type, data, profile, appReady }) {
  const Component = SECTION_MAP[type];
  if (!Component) return null;
  return (
    <Box
      className={appReady ? 'animate-fade-in-up' : 'section-entrance'}
      sx={{ mb: { xs: 4, md: 5 } }}
    >
      <Component data={data} loading={false} profile={type === 'summary' ? profile : undefined} />
    </Box>
  );
}

const SCROLL_PAST_HERO_THRESHOLD = 80;

export default function PortfolioContent({ profile, sections }) {
  const { appReady } = useAppReady();
  const { profile: contextProfile } = usePortfolio();
  const { setScrolledPastHero } = useScroll();
  const scrollRef = useRef(null);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop } = e.target;
      setScrolledPastHero(scrollTop > SCROLL_PAST_HERO_THRESHOLD);
    },
    [setScrolledPastHero]
  );

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
    <Box component="main" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
      {/* Hero: fixed so it never moves when scrolling */}
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

      {/* Scroll container: fixed size, scrollbar hidden, reports scroll for header */}
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box sx={{ minHeight: '100vh', height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always', flexShrink: 0 }} aria-hidden />
        <CustomCursorArea
          sx={{
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            borderTopLeftRadius: { xs: 32, md: 48 },
            borderTopRightRadius: { xs: 32, md: 48 },
            pb: 4,
          }}
        >
          <ContentBackground />
          <Container maxWidth="md" sx={{ position: 'relative', pt: { xs: 7, sm: 8, md: 18 }, px: { xs: 3, sm: 4, md: 5 }, pb: { xs: 4, md: 6 } }}>
            {sectionOrder.map((key) => (
              <Box
                key={key}
                id={key}
                component="section"
                sx={{
                  scrollMarginTop: { xs: 96, sm: 104, md: 120 },
                }}
              >
                <SectionRenderer type={key} data={sectionData[key]} loading={false} profile={profile} appReady={appReady} />
              </Box>
            ))}
          </Container>
          <Footer profile={contextProfile ?? profile} />
        </CustomCursorArea>
      </Box>
    </Box>
  );
}
