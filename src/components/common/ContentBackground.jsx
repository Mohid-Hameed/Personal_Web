'use client';

import Box from '@mui/material/Box';

/**
 * Separate animated background for the scrollable content area.
 * Darker tone with subtle mesh/grid and drifting shapes (distinct from hero orbs).
 */
export default function ContentBackground() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0c0a 25%, #0d0d0d 50%, #0a0908 100%)',
      }}
    >
      {/* Subtle diagonal mesh */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(90deg, rgba(230,81,0,0.15) 1px, transparent 1px),
            linear-gradient(rgba(230,81,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          animation: 'contentMeshMove 40s linear infinite',
        }}
      />
      {/* Soft drifting blobs – different motion from hero */}
      <Box
        sx={{
          position: 'absolute',
          width: 'min(70%, 420px)',
          height: 'min(70%, 420px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,81,0,0.09) 0%, transparent 70%)',
          top: '-10%',
          right: '-5%',
          animation: 'contentFloat1 22s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 'min(50%, 280px)',
          height: 'min(50%, 280px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,152,0,0.06) 0%, transparent 70%)',
          bottom: '20%',
          left: '-8%',
          animation: 'contentFloat2 28s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 'min(60%, 340px)',
          height: 'min(60%, 340px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,81,0,0.05) 0%, transparent 65%)',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'contentPulse 12s ease-in-out infinite',
        }}
      />
      {/* Top edge glow */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(180deg, rgba(230,81,0,0.06) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}
