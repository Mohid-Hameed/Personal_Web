'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';

export default function Footer({ profile }) {
  const links = profile?.footerLinks ?? [];
  const email = profile?.email;
  const phone = profile?.phone;
  const address = profile?.address || profile?.location;

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: { xs: 4, sm: 5 },
        px: { xs: 3, sm: 4 },
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Get in touch
            </Typography>
            {email && (
              <Button
                component="a"
                href={`mailto:${email}`}
                startIcon={<EmailIcon />}
                color="primary"
                size="small"
                sx={{ justifyContent: 'flex-start', textTransform: 'none', px: 0, mb: 0.5 }}
              >
                {email}
              </Button>
            )}
            {phone && (
              <Button
                component="a"
                href={`tel:${phone.replace(/\s/g, '')}`}
                startIcon={<PhoneIcon />}
                color="primary"
                size="small"
                sx={{ justifyContent: 'flex-start', textTransform: 'none', px: 0, display: 'block', mb: 0.5 }}
              >
                {phone}
              </Button>
            )}
            {address && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {address}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Connect
            </Typography>
            {links.map((link, i) => {
              const isLinkedIn = link.label?.toLowerCase().includes('linkedin');
              const Icon = isLinkedIn ? LinkedInIcon : CodeIcon;
              return (
                <Button
                  key={i}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<Icon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
