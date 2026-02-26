'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * Wrapper for each portfolio section with icon and title.
 * iconComponent: MUI icon component (e.g. SummaryIcon, WorkIcon)
 */
export default function SectionCard({ title, icon: Icon, children, sx = {} }) {
  return (
    <Card
      className="animate-fade-in-up"
      sx={{
        overflow: 'hidden',
        ...sx,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          {Icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <Icon fontSize="small" />
            </Box>
          )}
          <Typography variant="h6" component="h2" fontWeight={600}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
