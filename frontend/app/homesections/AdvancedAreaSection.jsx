'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AdvancedAreaSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playbackRate = 0.5;

    const handlePlay = () => {
      vid.playbackRate = 0.5;
    };
    vid.addEventListener('play', handlePlay);
    vid.addEventListener('loadedmetadata', handlePlay);

    const playVid = () => {
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          const trigger = () => {
            vid.play().catch(() => {});
            ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
              window.removeEventListener(evt, trigger);
            });
          };
          ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
            window.addEventListener(evt, trigger, { once: true, passive: true });
          });
        });
      }
    };

    playVid();

    const handleVisibility = () => {
      if (!document.hidden && vid.paused) {
        vid.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      vid.removeEventListener('play', handlePlay);
      vid.removeEventListener('loadedmetadata', handlePlay);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <section className="advanced-area">
      <div className="cati-showcase-box-area">
        <div className="cati-video-backdrop-wrap">
          <video
            ref={videoRef}
            className="cati-wave-video"
            id="catiWaveVideo"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/asstes/images/advanced-banner-video2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="srcn-container">
          <div className="cati-showcase-row">
            <div className="cati-image-col">
              <div className="cati-cutout-wrap">
                <img
                  src="/asstes/images/advanced-banner-img.png"
                  alt="500+ Advanced CATI Workstations"
                  className="cati-cutout-img"
                />
              </div>
            </div>
            <div className="cati-text-col">
              <h2 className="cati-heading">
                500+ Advanced<br />CATI Workstations
              </h2>
              <p className="cati-desc">
                Equipped to deliver high-volume, accurate, and efficient telephone research nationwide, supported by
                advanced technology, skilled interviewers, and robust quality control processes.
              </p>
              <Link href="/contact" className="btn-burgundy">
                <span>GET STARTED TODAY</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
