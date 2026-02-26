'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { NAV_SECTIONS, NAV_VISIBLE_IDS } from '../../constants';

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 24 });
  return React.cloneElement(children, {
    elevation: 0,
    sx: [
      children.props.sx,
      {
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: trigger ? 'rgba(13, 13, 13, 0.92)' : 'transparent',
        backdropFilter: trigger ? 'blur(12px)' : 'none',
        boxShadow: trigger ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
      },
    ],
  });
}

function scrollToSection(sectionId, onClose) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  onClose?.();
}

export default function Header({ title = 'Portfolio', logoUrl }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = NAV_VISIBLE_IDS
    .filter((id) => NAV_SECTIONS[id])
    .map((id) => ({ id, label: NAV_SECTIONS[id] }));

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" enableColorOnDark sx={{ color: 'text.primary', zIndex: 1200 }}>
          <Toolbar
            sx={{
              gap: { xs: 0.5, sm: 1 },
              flexWrap: 'wrap',
              minHeight: { xs: 56, sm: 64 },
              px: { xs: 2, sm: 3 },
            }}
          >
            {logoUrl ? (
              <Box
                component="img"
                src={logoUrl}
                alt={title}
                sx={{
                  height: "100px",
                  width: 'auto',
                  mr: { xs: 1, sm: 2 },
                  flexShrink: 0,
                  display: 'block',
                }}
              />
            ) : (
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mr: { xs: 1, sm: 2 },
                  flexShrink: 0,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                {title}
              </Typography>
            )}
            <Box sx={{ flexGrow: 1 }} />

            {isMobile ? (
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                sx={{ ml: 0.5 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: { xs: 0.25, sm: 0.5 },
                  justifyContent: 'flex-end',
                }}
              >
                {navItems.map(({ id, label }) => (
                  <Button
                    key={id}
                    color="inherit"
                    onClick={() => scrollToSection(id)}
                    sx={{
                      minWidth: 'auto',
                      px: { xs: 1, sm: 1.5 },
                      py: 0.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            },
          },
        }}
        PaperProps={{
          sx: {
            width: 280,
            maxWidth: '85vw',
            backgroundColor: 'rgba(13, 13, 13, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            mt: 0,
            boxShadow: '-8px 0 32px rgba(0,0,0,0.4)',
          },
        }}
      >
        <Box sx={{ py: 2, px: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ px: 2, mb: 1, color: 'text.secondary' }}
          >
            Menu
          </Typography>
          <List disablePadding>
            {navItems.map(({ id, label }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  onClick={() => scrollToSection(id, () => setDrawerOpen(false))}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.06)',
                    },
                  }}
                >
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
