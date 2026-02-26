'use client';

import ArticleIcon from '@mui/icons-material/Article';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ListSectionSkeleton } from '../../common/SectionSkeleton';

function BlogItem({ item }) {
  const title = item.title || item.name;
  const date = item.date;
  const excerpt = item.excerpt || item.description;
  const url = item.url || item.link || '#';

  return (
    <Paper
      elevation={0}
      component={Link}
      href={url}
      underline="none"
      sx={{
        display: 'block',
        p: 2.5,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Typography variant="caption" color="primary.main" sx={{ display: 'block', mb: 0.5 }}>
        {date}
      </Typography>
      <Typography variant="subtitle1" fontWeight={700} color="text.primary" gutterBottom>
        {title}
      </Typography>
      {excerpt && (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          {excerpt}
        </Typography>
      )}
    </Paper>
  );
}

export default function BlogSection({ data, loading }) {
  if (loading) return <ListSectionSkeleton count={2} />;
  const items = data?.items ?? data?.posts ?? data ?? [];
  if (!Array.isArray(items) || items.length === 0) return null;

  const title = data?.title || 'Blog';
  const subtitle = data?.subtitle;

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
          <ArticleIcon />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item, i) => (
          <BlogItem key={item.id || i} item={item} />
        ))}
      </Box>
    </Box>
  );
}
