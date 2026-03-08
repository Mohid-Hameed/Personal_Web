'use client';

import Box from '@mui/material/Box';
import Header from './Header';
import PortfolioContent from '../portfolio/PortfolioContent';
import AnimatedBackground from '../common/AnimatedBackground';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScrollProvider } from '../../context/ScrollContext';

export default function PortfolioLayout() {
  const { profile, sections } = usePortfolio();

  return (
    <ScrollProvider>
      {/* Background outside overflow box so it is never clipped and animations stay visible */}
      <AnimatedBackground />
      <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', zIndex: 0 }}>
        <Header title={profile?.name || 'Portfolio'} logoUrl="./name.png" />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <PortfolioContent profile={profile} sections={sections} />
        </Box>
      </Box>
    </ScrollProvider>
  );
}
