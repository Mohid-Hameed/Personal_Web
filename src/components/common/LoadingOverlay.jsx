"use client";

import { useEffect, useState } from "react";
import { useAppReady } from "../../context/AppReadyContext";

const FILL_DURATION_MS = 1200;
const MAX_WAIT_MS = 2500;
const REVEAL_DURATION_MS = 950;

export default function LoadingOverlay() {
  const { setAppReady } = useAppReady();
  const [phase, setPhase] = useState("filling"); // 'filling' | 'revealing' | 'hidden'
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    let mounted = true;
    let timeoutId = null;

    const goToRevealing = () => {
      if (!mounted) return;
      const elapsed = Date.now() - startTime;
      const wait = Math.max(0, FILL_DURATION_MS - elapsed);
      timeoutId = setTimeout(() => {
        if (mounted) setPhase((p) => (p === "filling" ? "revealing" : p));
      }, wait);
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") goToRevealing();
      else window.addEventListener("load", goToRevealing);
    }

    const maxTimeout = setTimeout(() => {
      if (!mounted) return;
      setPhase((p) => (p === "filling" ? "revealing" : p));
    }, MAX_WAIT_MS);

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(maxTimeout);
      if (typeof window !== "undefined") window.removeEventListener("load", goToRevealing);
    };
  }, [startTime]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => {
      setAppReady(true);
      setPhase("hidden");
    }, REVEAL_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase, setAppReady]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`loading-overlay ${phase === "revealing" ? "loading-overlay--reveal" : ""}`}
      aria-hidden="true"
    >
      <div className={`loading-overlay__oval ${phase === "revealing" ? "loading-overlay__oval--hide" : ""}`}>
        <div className="loading-overlay__oval-fill" />
        <span className="loading-overlay__oval-text">Portfolio</span>
      </div>
    </div>
  );
}
