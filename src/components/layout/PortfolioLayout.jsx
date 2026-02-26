'use client';

import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import PortfolioContent from '../portfolio/PortfolioContent';
import AnimatedBackground from '../common/AnimatedBackground';
import { usePortfolio } from '../../context/PortfolioContext';

export default function PortfolioLayout() {
  const { profile, sections } = usePortfolio();
  const sectionOrder = sections?.order ?? [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      <Header title={profile?.name || 'Portfolio'} logoUrl="/name.png" />
      <PortfolioContent profile={profile} sections={sections} />
      <Footer profile={profile} />
    </Box>
  );
}
