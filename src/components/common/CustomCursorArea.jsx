'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDialogOpen } from '../../context/DialogOpenContext';

const TRAIL_LENGTH = 24;
const CURSOR_SIZE = 28;
const LERP_SPEED = 0.38;
const CATCH_UP_DELAY_MS = 18;
const TAIL_END_WIDTH = 6;
const TAIL_STROKE_OPACITY = 0.22;
const THEME_PRIMARY = '230, 81, 0';
const SPARK_COUNT = 32;
const SPARK_DURATION_MS = 480;
const CLICKABLE_SELECTOR = 'a, button, [role="button"], [data-clickable]';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function buildTaperedTailPath(points, tailEndWidth, headEndWidth) {
  if (points.length < 2) return '';
  const n = points.length - 1;
  const lefts = [];
  const rights = [];
  for (let i = 0; i < points.length; i++) {
    const t = n > 0 ? i / n : 0;
    const offset = tailEndWidth / 2 + (headEndWidth / 2 - tailEndWidth / 2) * t;
    let tangent;
    if (i < points.length - 1) {
      tangent = { x: points[i + 1].x - points[i].x, y: points[i + 1].y - points[i].y };
    } else {
      tangent = { x: points[i].x - points[i - 1].x, y: points[i].y - points[i - 1].y };
    }
    const len = Math.hypot(tangent.x, tangent.y) || 1;
    tangent.x /= len;
    tangent.y /= len;
    const perp = { x: -tangent.y, y: tangent.x };
    lefts.push({ x: points[i].x + perp.x * offset, y: points[i].y + perp.y * offset });
    rights.push({ x: points[i].x - perp.x * offset, y: points[i].y - perp.y * offset });
  }
  const pathR = rights
    .slice()
    .reverse()
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');
  const pathL = lefts.map((p) => `L ${p.x} ${p.y}`).join(' ');
  return `${pathR} ${pathL} Z`;
}

export default function CustomCursorArea({ children, sx = {} }) {
  const { dialogOpen } = useDialogOpen();
  const [hasHover, setHasHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isOverClickable, setIsOverClickable] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [sparks, setSparks] = useState([]);
  const trailRef = useRef([]);
  const posRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);
  const rafRef = useRef(null);
  const sparkIdRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    setHasHover(mq.matches);
    const fn = () => setHasHover(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    posRef.current = { x: clientX, y: clientY };
    setPos({ x: clientX, y: clientY });
    lastMoveTimeRef.current = Date.now();
    const clickable = e.target?.closest?.(CLICKABLE_SELECTOR);
    setIsOverClickable(Boolean(clickable));
    const prev = trailRef.current;
    const last = prev[prev.length - 1];
    if (!last || Math.hypot(clientX - last.x, clientY - last.y) > 3) {
      trailRef.current = [...prev.slice(1 - TRAIL_LENGTH), { x: clientX, y: clientY }];
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsActive(true);
    trailRef.current = [];
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setIsOverClickable(false);
    trailRef.current = [];
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (!hasHover || !isActive) return;
    const id = ++sparkIdRef.current;
    const particles = Array.from({ length: SPARK_COUNT }, () => {
      const angle = (Math.random() * 360 * Math.PI) / 180;
      const dist = 35 + Math.random() * 85;
      const gravity = 15 + Math.random() * 35;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist + gravity;
      return { tx, ty, delay: Math.random() * 45, size: 2 + Math.random() * 3 };
    });
    setSparks((s) => [...s, { id, x: e.clientX, y: e.clientY, particles }]);
    setTimeout(() => {
      setSparks((s) => s.filter((x) => x.id !== id));
    }, SPARK_DURATION_MS + 80);
  }, [hasHover, isActive]);

  useEffect(() => {
    if (!isActive || !hasHover) return;
    const tick = () => {
      const now = Date.now();
      const isCatchingUp = now - lastMoveTimeRef.current > CATCH_UP_DELAY_MS;
      const head = posRef.current;
      let t = trailRef.current;

      if (isCatchingUp && t.length > 0) {
        const next = t.map((p, i) => {
          const target = i === t.length - 1 ? head : t[i + 1];
          const nx = lerp(p.x, target.x, LERP_SPEED);
          const ny = lerp(p.y, target.y, LERP_SPEED);
          if (i < t.length - 1 && Math.hypot(nx - target.x, ny - target.y) < 2) return null;
          return { x: nx, y: ny };
        }).filter(Boolean);
        trailRef.current = next.length ? next : [];
        t = trailRef.current;
      }

      const points = [...t, head].filter((p) => p && typeof p.x === 'number');
      setTrail(points);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isActive, hasHover]);

  const showCursor = hasHover && isActive && !dialogOpen;
  const taperedPathD = trail.length >= 2
    ? buildTaperedTailPath(trail, TAIL_END_WIDTH, CURSOR_SIZE)
    : '';

  return (
    <Box
      className={showCursor ? 'custom-cursor-active' : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      sx={{
        position: 'relative',
        cursor: showCursor ? 'none' : undefined,
        ...sx,
      }}
    >
      {children}

      {showCursor && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        >
          {/* Snake tail: tapered path, same width as pointer at head, small at end */}
          {taperedPathD && (
            <svg
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              <path
                d={taperedPathD}
                fill={`rgba(${THEME_PRIMARY}, ${TAIL_STROKE_OPACITY})`}
              />
            </svg>
          )}

          {/* Main cursor circle; over clickable: scale + hand icon */}
          <Box
            sx={{
              position: 'fixed',
              left: pos.x,
              top: pos.y,
              width: CURSOR_SIZE,
              height: CURSOR_SIZE,
              borderRadius: '50%',
              transform: `translate(-50%, -50%) scale(${isOverClickable ? 1.18 : 1})`,
              border: `2px solid rgba(${THEME_PRIMARY}, ${isOverClickable ? 0.95 : 0.75})`,
              background: `rgba(${THEME_PRIMARY}, ${isOverClickable ? 0.14 : 0.06})`,
              boxShadow: isOverClickable ? `0 0 20px rgba(${THEME_PRIMARY}, 0.25)` : 'none',
              pointerEvents: 'none',
              transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isOverClickable && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={`rgba(${THEME_PRIMARY}, 0.9)`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: 'none' }}
              >
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a4 4 0 0 1-4 4h-2c-1.5 0-2.8-.7-3.5-1.7" />
              </svg>
            )}
          </Box>

          {/* Metal-collision sparks */}
          {sparks.map(({ id, x, y, particles }) => (
            <Box
              key={id}
              className="cursor-spark-burst"
              sx={{
                position: 'fixed',
                left: x,
                top: y,
                width: 1,
                height: 1,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              {particles?.map((p, i) => (
                <Box
                  key={i}
                  className="metal-spark-particle"
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: p.size,
                    height: p.size,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,220,150,0.9) 40%, rgba(255,140,50,0.7) 70%, rgba(${THEME_PRIMARY}, 0.4))`,
                    boxShadow: `0 0 ${p.size * 2}px rgba(255,180,80,0.6), 0 0 ${p.size}px rgba(255,255,255,0.8)`,
                    '--spark-tx': `${p.tx}px`,
                    '--spark-ty': `${p.ty}px`,
                    animation: `metalSpark ${SPARK_DURATION_MS}ms ease-out ${p.delay}ms forwards`,
                  }}
                />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
