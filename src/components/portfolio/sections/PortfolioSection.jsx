'use client';

import { useState, useEffect } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ListSectionSkeleton } from '../../common/SectionSkeleton';

const CARD_DESCRIPTION_MAX_LENGTH = 100;
const SLIDESHOW_INTERVAL_MS = 4500;

/** Slideshow for modal only – with prev/next arrows and dots */
function ModalSlideshow({ images, title }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), SLIDESHOW_INTERVAL_MS);
    return () => clearInterval(t);
  }, [count]);

  const go = (delta) => () => setIndex((i) => (i + delta + count) % count);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 200, borderRadius: 2, overflow: 'hidden', bgcolor: 'action.hover' }}>
      {images.map((src, i) => (
        <Box
          key={src}
          component="img"
          src={src}
          alt={`${title} screenshot ${i + 1}`}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />
      ))}
      {count > 1 && (
        <>
          <IconButton size="small" onClick={go(-1)} sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton size="small" onClick={go(1)} sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
            <ChevronRightIcon />
          </IconButton>
          <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.5 }}>
            {images.map((_, i) => (
              <Box
                key={i}
                onClick={() => setIndex(i)}
                sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: i === index ? 'primary.main' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'background-color 0.2s' }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

function truncate(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + '…';
}

function PortfolioCard({ item, onOpenModal }) {
  const title = item.title || item.name;
  const company = item.company || item.organization;
  const fullDescription = item.description || item.summary;
  const descriptionPreview = truncate(fullDescription, CARD_DESCRIPTION_MAX_LENGTH);
  const imageUrl = item.imageUrl;
  const images = item.images;
  const logoUrl = item.logoUrl;
  // On home/card: show project logo when provided (home page only), else first screenshot
  const cardImage = logoUrl || (Array.isArray(images) && images.length > 0 ? images[0] : imageUrl);

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          borderColor: 'primary.main',
        },
      }}
      onClick={() => onOpenModal(item)}
    >
      <CardActionArea component="div" sx={{ height: '100%', alignItems: 'stretch' }} disableRipple>
        {cardImage ? (
          <Box
            component="img"
            src={cardImage}
            alt={title}
            sx={{
              width: '100%',
              height: 180,
              objectFit: logoUrl ? 'contain' : 'cover',
              bgcolor: 'action.hover',
              p: logoUrl ? 1.5 : 0,
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: 160,
              background: 'linear-gradient(145deg, rgba(230,81,0,0.15) 0%, rgba(255,152,0,0.08) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GridViewIcon sx={{ fontSize: 48, opacity: 0.4 }} />
          </Box>
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            {title}
          </Typography>
          {company && (
            <Typography variant="caption" color="primary.main" sx={{ display: 'block', mb: 0.5 }}>
              {company}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            {descriptionPreview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function ProjectModal({ item, open, onClose }) {
  // Disable background scroll when modal is open (body + html, touch-friendly)
  useEffect(() => {
    if (open) {
      const prevBody = document.body.style.overflow;
      const prevHtml = document.documentElement.style.overflow;
      const prevTouch = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBody;
        document.body.style.touchAction = prevTouch;
        document.documentElement.style.overflow = prevHtml;
      };
    }
  }, [open]);

  if (!item) return null;
  const title = item.title || item.name;
  const company = item.company || item.organization;
  const role = item.role;
  const description = item.description || item.summary;
  const url = item.url || item.link;
  const images = item.images;
  const tags = item.tags;
  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableScrollLock={false}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0,0,0,0.6)',
            animation: 'modalBackdropIn 0.25s ease-out forwards',
          },
          transitionDuration: 300,
        },
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        className="animate-modal-panel"
        onClick={(e) => e.stopPropagation()}
        sx={{
          maxHeight: '90vh',
          width: '100%',
          maxWidth: 560,
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.dark})`,
            opacity: 0.9,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pt: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small" aria-label="Close" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2, overflow: 'auto' }}>
          {company && (
            <Typography variant="caption" color="primary.main" sx={{ display: 'block', mb: 0.5 }}>
              {company}
            </Typography>
          )}
          {role && (
            <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>
              My role: {role}
            </Typography>
          )}
          {hasImages && (
            <Box sx={{ width: '100%', height: 280, mb: 2 }}>
              <ModalSlideshow images={images} title={title} />
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {description}
          </Typography>
          {Array.isArray(tags) && tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
              {tags.map((tag, i) => (
                <Typography key={i} variant="caption" sx={{ px: 1, py: 0.25, borderRadius: 1, bgcolor: 'action.selected', color: 'text.secondary' }}>
                  {tag}
                </Typography>
              ))}
            </Box>
          )}
          {url && (
            <Button
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<OpenInNewIcon />}
              variant="outlined"
              color="primary"
              size="small"
              sx={{ mt: 2 }}
            >
              View project
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default function PortfolioSection({ data, loading }) {
  const [modalItem, setModalItem] = useState(null);
  if (loading) return <ListSectionSkeleton count={2} />;
  const items = data?.items ?? data?.projects ?? data ?? [];
  if (!Array.isArray(items) || items.length === 0) return null;

  const title = data?.title || 'Portfolio';
  const subtitle = data?.subtitle;

  return (
    <Box className="animate-fade-in-up">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
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
          <GridViewIcon />
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {items.map((item, i) => (
          <PortfolioCard key={item.id || i} item={item} onOpenModal={setModalItem} />
        ))}
      </Box>
      <ProjectModal item={modalItem} open={!!modalItem} onClose={() => setModalItem(null)} />
    </Box>
  );
}
