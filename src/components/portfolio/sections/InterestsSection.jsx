'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { SectionSkeleton } from '../../common/SectionSkeleton';

export default function InterestsSection({ data, loading }) {
  if (loading) return <SectionSkeleton title lines={2} />;
  const languages = data?.languages ?? [];
  const interests = data?.interests ?? data?.items ?? [];
  const hasLanguages = Array.isArray(languages) && languages.length > 0;
  const hasInterests = Array.isArray(interests) && interests.length > 0;
  if (!hasLanguages && !hasInterests) return null;

  return (
    <Box className="animate-fade-in-up">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'secondary.contrastText',
          }}
        >
          <FavoriteIcon />
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {data?.title || 'Languages & Interests'}
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {hasLanguages && (
          <Box sx={{ mb: hasInterests ? 2 : 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Languages
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {languages.map((lang, i) => (
                <Chip key={i} label={lang} size="small" color="primary" variant="filled" />
              ))}
            </Box>
          </Box>
        )}
        {hasInterests && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Interests
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {interests.map((interest, i) => (
                <Chip key={i} label={interest} size="small" color="secondary" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
