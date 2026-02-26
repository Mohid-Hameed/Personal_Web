'use client';

import { useState, useEffect, useRef } from 'react';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { ListSectionSkeleton } from '../../common/SectionSkeleton';

/**
 * Renders PDF as canvas (image-like) with no browser PDF toolbar – no download/print.
 * Scale to fit entire document in container – no scroll.
 */
function PdfCanvasViewer({ pdfUrl, containerRef }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfUrl || !containerRef?.current) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setPages([]);

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const numPages = pdf.numPages;
        const container = containerRef.current;
        const containerWidth = Math.max(container.clientWidth || 0, 400);
        const containerHeight = Math.max(container.clientHeight || 0, 400);

        const firstPage = await pdf.getPage(1);
        if (cancelled) return;
        const v1 = firstPage.getViewport({ scale: 1 });
        let totalHeight = v1.height;
        if (numPages > 1) {
          for (let i = 2; i <= numPages; i++) {
            const p = await pdf.getPage(i);
            if (cancelled) return;
            totalHeight += p.getViewport({ scale: 1 }).height;
          }
        }

        const scaleW = containerWidth / v1.width;
        const scaleH = containerHeight / totalHeight;
        const scale = Math.min(scaleW, scaleH, 2);

        const pageCanvases = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          if (cancelled) return;
          const viewport = page.getViewport({ scale });
          pageCanvases.push({
            page,
            width: viewport.width,
            height: viewport.height,
            scale,
          });
        }

        if (!cancelled) setPages(pageCanvases);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load PDF');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [pdfUrl, containerRef]);

  useEffect(() => {
    if (pages.length === 0) return;

    const canvasList = containerRef?.current?.querySelectorAll('canvas');
    if (!canvasList) return;

    const renderTasks = [];
    pages.forEach(({ page, scale }, i) => {
      const canvas = canvasList[i];
      if (!canvas || !page) return;
      const ctx = canvas.getContext('2d');
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      renderTasks.push(page.render({ canvasContext: ctx, viewport }).promise);
    });

    return () => {
      renderTasks.forEach((t) => t.cancel?.());
    };
  }, [pages, containerRef]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, py: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 3, px: 2, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        py: 1,
        px: 1,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overflow: 'hidden',
        '& canvas': { display: 'block', flexShrink: 0 },
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {pages.map((_, i) => (
        <canvas key={i} />
      ))}
    </Box>
  );
}

function PdfModal({ open, onClose, pdfUrl, title }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (open) {
      const prevBody = document.body.style.overflow;
      const prevHtml = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBody;
        document.documentElement.style.overflow = prevHtml;
      };
    }
  }, [open]);

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
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
    >
      <Box
        className="animate-modal-panel"
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
            px: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PictureAsPdfIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              {title || 'Experience Letter'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            minHeight: 0,
            height: '75vh',
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {open && pdfUrl && <PdfCanvasViewer pdfUrl={pdfUrl} containerRef={containerRef} />}
        </Box>
      </Box>
    </Modal>
  );
}

function CertificationItem({ item, onOpenDocument }) {
  const name = item.name || item.title;
  const issuer = item.issuer || item.organization;
  const year = item.year || item.date;
  const imageUrl = item.imageUrl || item.badgeUrl || item.logoUrl;
  const documentUrl = item.documentUrl;
  const isClickable = !!documentUrl;

  const content = (
    <Paper
      elevation={0}
      component={isClickable ? 'button' : 'div'}
      onClick={isClickable ? () => onOpenDocument(item) : undefined}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: isClickable ? 'pointer' : 'default',
        width: '100%',
        textAlign: 'left',
        '&:hover': isClickable
          ? {
              borderColor: 'primary.main',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }
          : {
              borderColor: 'divider',
            },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: imageUrl ? 'transparent' : 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 0.5 }}
          />
        ) : (
          <CardMembershipIcon />
        )}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {issuer}
          {year ? ` · ${year}` : ''}
        </Typography>
        {isClickable && (
          <Typography variant="caption" color="primary.main" sx={{ display: 'block', mt: 0.5 }}>
            View experience letter →
          </Typography>
        )}
      </Box>
    </Paper>
  );

  return content;
}

export default function CertificationsSection({ data, loading }) {
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfConfig, setPdfConfig] = useState({ url: null, title: '' });

  if (loading) return <ListSectionSkeleton count={2} />;
  const items = data?.items ?? data?.certifications ?? data ?? [];
  if (!Array.isArray(items) || items.length === 0) return null;

  const handleOpenDocument = (item) => {
    if (item.documentUrl) {
      setPdfConfig({
        url: item.documentUrl,
        title: item.documentUrl.includes('experience-letter') ? 'Codenax Experience Letter' : `${item.name} – ${item.issuer}`,
      });
      setPdfModalOpen(true);
    }
  };

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
          <CardMembershipIcon />
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {data?.title || 'Certifications'}
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
        {items.map((item, i) => (
          <CertificationItem key={item.id || i} item={item} onOpenDocument={handleOpenDocument} />
        ))}
      </Box>
      <PdfModal
        open={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        pdfUrl={pdfConfig.url}
        title={pdfConfig.title}
      />
    </Box>
  );
}
