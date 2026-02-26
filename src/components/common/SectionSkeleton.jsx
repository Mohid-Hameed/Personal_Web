'use client';

import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Generic section skeleton - used for Summary, Experience, Education, etc.
 */
export function SectionSkeleton({ title = true, lines = 3, avatar = false }) {
  return (
    <Card sx={{ overflow: 'hidden' }}>
      <CardContent>
        {title && (
          <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
        )}
        {avatar && (
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Skeleton variant="circular" width={56} height={56} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Box>
          </Box>
        )}
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} variant="text" width={i === lines - 1 ? '70%' : '100%'} sx={{ mb: 0.5 }} />
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * List section skeleton (Experience, Education - multiple items)
 */
export function ListSectionSkeleton({ count = 3 }) {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="35%" height={28} sx={{ mb: 2 }} />
        {Array.from({ length: count }).map((_, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Skeleton variant="text" width="50%" height={24} />
            <Skeleton variant="text" width="30%" height={20} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * Hero/Cover skeleton with profile image placeholder
 */
export function HeroSkeleton() {
  return (
    <Box sx={{ position: 'relative', height: 280, overflow: 'hidden' }}>
      <Skeleton
        variant="rectangular"
        height="100%"
        width="100%"
        sx={{ borderRadius: 0 }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -48,
          left: 24,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 2,
        }}
      >
        <Skeleton variant="circular" width={96} height={96} sx={{ border: 3, borderColor: 'background.paper', boxSizing: 'border-box' }} />
        <Box sx={{ pb: 0.5 }}>
          <Skeleton variant="text" width={180} height={36} />
          <Skeleton variant="text" width={120} height={24} />
        </Box>
      </Box>
    </Box>
  );
}

export default SectionSkeleton;
