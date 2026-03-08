'use client';

import Box from '@mui/material/Box';

/**
 * Full-page gradient (orange & black) with subtle, smooth floating orbs.
 */
export default function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'linear-gradient(160deg, #0d0d0d 0%, #1a0f0a 40%, #0d0d0d 70%, #1f1208 100%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 'min(80vw, 480px)',
          height: 'min(80vw, 480px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,81,0,0.12) 0%, transparent 65%)',
          top: '8%',
          left: '2%',
          animation: 'float1 25s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 'min(60vw, 360px)',
          height: 'min(60vw, 360px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,152,0,0.08) 0%, transparent 65%)',
          top: '45%',
          right: '5%',
          animation: 'float2 30s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 'min(70vw, 400px)',
          height: 'min(70vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,81,0,0.06) 0%, transparent 60%)',
          bottom: '10%',
          left: '20%',
          animation: 'float3 28s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 'min(50vw, 300px)',
          height: 'min(50vw, 300px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,152,0,0.06) 0%, transparent 65%)',
          top: '65%',
          right: '20%',
          animation: 'float4 32s ease-in-out infinite',
        }}
      />
    </Box>
  );
}
