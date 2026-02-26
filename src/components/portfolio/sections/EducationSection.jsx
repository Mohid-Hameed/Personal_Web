'use client';

import SchoolIcon from '@mui/icons-material/School';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { ListSectionSkeleton } from '../../common/SectionSkeleton';

function EducationItem({ item }) {
  const degree = item.degree || item.program || item.title;
  const school = item.school || item.institution || item.organization;
  const period = item.period || item.dates || [item.startDate, item.endDate].filter(Boolean).join(' – ');
  const description = item.description || item.summary;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          opacity: 0.08,
        },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1.5,
        }}
      >
        <SchoolIcon />
      </Box>
      <Typography variant="h6" fontWeight={700}>
        {degree}
      </Typography>
      <Typography variant="body1" color="primary.main" fontWeight={600}>
        {school}
      </Typography>
      {period && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {period}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
    </Paper>
  );
}

export default function EducationSection({ data, loading }) {
  if (loading) return <ListSectionSkeleton count={2} />;
  const items = data?.items ?? data?.education ?? data ?? [];
  if (!Array.isArray(items) || items.length === 0) return null;

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
          <SchoolIcon />
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {data?.title || 'Education'}
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
        {items.map((item, i) => (
          <EducationItem key={item.id || i} item={item} />
        ))}
      </Box>
    </Box>
  );
}
