'use client';

import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ListSectionSkeleton } from '../../common/SectionSkeleton';

function ProjectItem({ item }) {
  const title = item.title || item.name;
  const company = item.company || item.organization;
  const url = item.url || item.link || item.projectUrl;
  const description = item.description || item.summary;
  const stack = item.techStack || item.technologies || item.tags;

  return (
    <Paper
      elevation={0}
      component={url ? Link : Box}
      href={url || undefined}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined}
      underline="none"
      sx={{
        display: 'block',
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'border-color 0.2s, background-color 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <FolderIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {title}
          </Typography>
          {company && (
            <Typography variant="caption" color="primary.main" sx={{ display: 'block' }}>
              {company}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.5 }}>
              {description}
            </Typography>
          )}
          {Array.isArray(stack) && stack.length > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              {stack.join(' · ')}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default function ProjectsSection({ data, loading }) {
  if (loading) return <ListSectionSkeleton count={2} />;
  const items = data?.items ?? data?.projects ?? data ?? [];
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
          <FolderIcon />
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {data?.title || 'Projects'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {items.map((item, i) => (
          <ProjectItem key={item.id || i} item={item} />
        ))}
      </Box>
    </Box>
  );
}
