'use client';

import CodeIcon from '@mui/icons-material/Code';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { SectionSkeleton } from '../../common/SectionSkeleton';

export default function SkillsSection({ data, loading }) {
  if (loading) return <SectionSkeleton title lines={2} />;
  const items = data?.items ?? data?.skills ?? data ?? [];
  const flat = Array.isArray(items)
    ? items
    : data?.categories?.flatMap((c) => c.skills || c.items || [c.name].filter(Boolean)) ?? [];

  if (flat.length === 0) return null;

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
          <CodeIcon />
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {data?.title || 'Skills'}
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.25,
            justifyContent: 'center',
          }}
        >
          {flat.map((skill, i) => {
            const label = typeof skill === 'string' ? skill : skill.name || skill.label;
            const iconUrl = typeof skill === 'object' ? skill.iconUrl : null;
            if (!label) return null;
            return (
              <Chip
                key={skill.id || i}
                icon={
                  iconUrl ? (
                    <Box
                      component="img"
                      src={iconUrl}
                      alt=""
                      sx={{ width: 20, height: 20, objectFit: 'contain', ml: 0.5 }}
                    />
                  ) : undefined
                }
                label={label}
                size="medium"
                variant="outlined"
                color="primary"
                sx={{
                  fontWeight: 500,
                  padding: 1,
                  borderColor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' },
                  '& .MuiChip-icon': { color: 'inherit' },
                }}
              />
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
