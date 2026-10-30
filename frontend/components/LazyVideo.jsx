'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyVideo
 * Defers loading video media until the element is within rootMargin of the viewport.
 * Saves ~140 MB bandwidth on initial page load and drastically speeds up LCP and FCP.
 */
export default function LazyVideo({
  src,
  poster,
  className = '',
  id,
  style,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  rootMargin = '350px',
  playbackRate,
  children,
  ...props
}) {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (inView && videoRef.current) {
      const vid = videoRef.current;
      vid.muted = true;
      vid.defaultMuted = true;
      if (playbackRate) {
        vid.playbackRate = playbackRate;
      }
      try {
        vid.load();
        if (autoPlay) {
          const p = vid.play();
          if (p && typeof p.catch === 'function') {
            p.catch(() => {});
          }
        }
      } catch (err) {}
    }
  }, [inView, autoPlay, playbackRate]);

  return (
    <video
      ref={videoRef}
      id={id}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="none"
      poster={poster}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {inView && (
        <>
          {src && <source src={src} type="video/mp4" />}
          {children}
        </>
      )}
    </video>
  );
}
