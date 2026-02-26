'use client';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import { SectionSkeleton } from '../../common/SectionSkeleton';

const iconMap = {
  email: EmailIcon,
  phone: PhoneIcon,
  linkedin: LinkedInIcon,
  website: LanguageIcon,
  url: LanguageIcon,
};

export default function ContactSection({ data, loading }) {
  if (loading) return <SectionSkeleton title lines={2} />;
  const items = data?.items ?? data?.links ?? data?.contacts ?? (data && !data.title ? [data] : []) ?? [];
  const flat = Array.isArray(items) ? items : [];
  const links = data?.email
    ? [{ type: 'email', href: `mailto:${data.email}`, label: data.email }, ...flat]
    : flat;

  if (flat.length === 0 && !data?.email) return null;

  return (
    <Box className="animate-fade-in-up">
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'primary.main',
          background: 'linear-gradient(135deg, rgba(230,81,0,0.08) 0%, rgba(255,152,0,0.04) 100%)',
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
          <ContactMailIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700}>
            {data?.title || 'Get in Touch'}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Open to new opportunities and collaboration.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
          {links.map((link, i) => {
            const type = (link.type || link.kind || '').toLowerCase();
            const href = link.href || link.url || (type === 'email' ? `mailto:${link.label || link.email}` : link.label);
            const label = link.label || link.email || link.url || href;
            const Icon = iconMap[type] || ContactMailIcon;
            return (
              <Button
                key={link.id || i}
                component="a"
                href={href}
                target={type === 'email' || type === 'phone' ? undefined : '_blank'}
                rel={type === 'email' || type === 'phone' ? undefined : 'noopener noreferrer'}
                startIcon={<Icon />}
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 2 }}
              >
                {label}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
