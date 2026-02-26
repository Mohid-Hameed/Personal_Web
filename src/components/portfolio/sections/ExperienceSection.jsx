'use client';

import WorkIcon from '@mui/icons-material/Work';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ListSectionSkeleton } from '../../common/SectionSkeleton';

function ExperienceItem({ item, isLast }) {
  const title = item.title || item.role || item.position;
  const company = item.company || item.organization || item.employer;
  const period = item.period || item.dates || [item.startDate, item.endDate].filter(Boolean).join(' – ');
  const description = item.description || item.summary;

  return (
    <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, position: 'relative', pb: isLast ? 0 : 3 }}>
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: 36, sm: 44 },
          height: { xs: 36, sm: 44 },
          borderRadius: '50%',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <WorkIcon fontSize="small" />
      </Box>
      {!isLast && (
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 17, sm: 21 },
            top: { xs: 36, sm: 44 },
            bottom: -24,
            width: 2,
            bgcolor: 'divider',
            borderRadius: 1,
          }}
        />
      )}
      <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          {title}
        </Typography>
        <Typography variant="body2" color="primary.main" sx={{ mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
          {company}
          {period && ` · ${period}`}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default function ExperienceSection({ data, loading }) {
  if (loading) return <ListSectionSkeleton count={3} />;
  const items = data?.items ?? data?.experiences ?? data ?? [];
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
          <WorkIcon />
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {data?.title || 'Experience'}
        </Typography>
      </Box>
      <Box sx={{ pl: 0 }}>
        {items.map((item, i) => (
          <ExperienceItem key={item.id || i} item={item} isLast={i === items.length - 1} />
        ))}
      </Box>
    </Box>
  );
}
