'use client';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function PricingSection({ data }) {
  if (!data) return null;

  const hourlyMin = data.hourlyMin ?? 35;
  const hourlyMax = data.hourlyMax ?? 75;
  const unit = data.unit || 'USD';
  const title = data.title || 'Pricing';
  const subtitle = data.subtitle || 'Hourly rate based on project complexity';
  const description = data.description;

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
          <AttachMoneyIcon />
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
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          textAlign: 'center',
          maxWidth: 480,
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography component="span" variant="h3" fontWeight={800} color="primary.main">
            ${hourlyMin}
          </Typography>
          <Typography component="span" variant="h5" color="text.secondary">
            –
          </Typography>
          <Typography component="span" variant="h3" fontWeight={800} color="primary.main">
            ${hourlyMax}
          </Typography>
          <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 0.5 }}>
            / hour {unit}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Depending on project complexity, scope, and timeline.
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
