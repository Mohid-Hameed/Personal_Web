'use client';

import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SectionSkeleton } from '../../common/SectionSkeleton';

export default function CoverLetterSection({ data, loading }) {
  if (loading) return <SectionSkeleton title lines={8} />;
  if (!data?.body && !data?.content) return null;

  const greeting = data.greeting || 'Dear Hiring Manager,';
  const body = data.body || data.content || '';
  const closing = data.closing || '';
  const signature = data.signature || '';

  return (
    <Box
      className="animate-fade-in-up"
      sx={{
        position: 'relative',
        maxWidth: 720,
        mx: 'auto',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 4, md: 5 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, primary.main, secondary.main)',
            opacity: 0.9,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.contrastText',
            }}
          >
            <DescriptionIcon />
          </Box>
          <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">
            {data.title || 'Cover Letter'}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: 'text.secondary' }}>
          {greeting}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            lineHeight: 1.8,
            color: 'text.primary',
            '& + &': { mt: 2 },
          }}
        >
          {body}
        </Typography>
        {closing && (
          <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>
            {closing}
          </Typography>
        )}
        {signature && (
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {signature}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
