'use client';

import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SectionSkeleton } from '../../common/SectionSkeleton';

export default function ResumeSection({ data, loading }) {
  if (loading) return <SectionSkeleton title lines={2} />;

  const title = data?.title ?? 'Resume';
  const subtitle = data?.subtitle ?? 'Download my resume';
  const downloadUrl = data?.downloadUrl ?? '/resume.pdf';
  const downloadLabel = data?.downloadLabel ?? 'Download Resume';

  return (
    <Box className="animate-fade-in-up">
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
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
      </Box>

      {/* Animated background container */}
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.08)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(230, 81, 0, 0.35)',
            boxShadow: '0 0 40px rgba(230, 81, 0, 0.08)',
          },
        }}
      >
        {/* Orange balls – smooth drifting movement only */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,81,0,0.2) 0%, rgba(230,81,0,0.06) 50%, transparent 70%)',
              top: -80,
              right: -60,
              opacity: 0.9,
              animation: 'resumeOrbMove1 22s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,152,0,0.18) 0%, rgba(255,152,0,0.05) 50%, transparent 70%)',
              bottom: -40,
              left: -40,
              opacity: 0.85,
              animation: 'resumeOrbMove2 18s ease-in-out infinite',
              animationDelay: '4s',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,81,0,0.15) 0%, rgba(230,81,0,0.04) 50%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.85,
              animation: 'resumeOrbMove3 20s ease-in-out infinite',
              animationDelay: '2s',
            }}
          />
        </Box>

        {/* Card content */}
        <Box
          sx={{
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            p: { xs: 3, sm: 4 },
            animation: 'resumeCardFloat 6s ease-in-out infinite',
          }}
        >
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 2.5,
                fontSize: '1.05rem',
              }}
            >
              {subtitle}
            </Typography>
          )}

          <Button
            component="a"
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            sx={{
              fontWeight: 600,
              px: 3.5,
              py: 1.75,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(230, 81, 0, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 8px 28px rgba(230, 81, 0, 0.35)',
              },
            }}
          >
            {downloadLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
