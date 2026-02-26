'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionSkeleton } from '../../common/SectionSkeleton';

export default function SummarySection({ data, loading, profile }) {
  if (loading) return <SectionSkeleton title lines={4} />;
  const text = data?.content || data?.summary || data?.bio || '';
  const workAuthorization = profile?.workAuthorization;
  if (!text && !workAuthorization) return null;

  return (
    <Box className="animate-fade-in-up">
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.08)',
          p: { xs: 3, sm: 4, md: 5 },
          transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            borderColor: 'rgba(230, 81, 0, 0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          },
        }}
      >
        {/* Top accent line */}
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            opacity: 0.9,
          })}
        />
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            mb: 2,
            letterSpacing: '0.15em',
            color: 'primary.main',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        >
          {data?.title || 'Summary'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.85,
            fontSize: { xs: '0.95rem', sm: '1.0625rem' },
            wordBreak: 'break-word',
            maxWidth: '72ch',
            fontWeight: 400,
          }}
        >
          {text}
        </Typography>
        {workAuthorization && (
          <Box
            sx={{
              mt: 2.5,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'rgba(255,255,255,0.08)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 1,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'primary.main',
              backgroundColor: 'rgba(230, 81, 0, 0.08)',
            }}
          >
            <Typography variant="body2" fontWeight={700} color="primary.main">
              ✓ {workAuthorization}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
