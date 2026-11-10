'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function AdvancedAreaSection({ dynamicCallout = null }) {
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

  const heading = dynamicCallout?.heading || dynamicCallout?.title;
  const desc = dynamicCallout?.description;
  const image = dynamicCallout?.image ? getStrapiMedia(dynamicCallout.image) : getStrapiMedia('/uploads/advanced-banner-img.png');

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
            {image && (
              <div className="cati-image-col">
                <div className="cati-cutout-wrap">
                  <img
                    src={image}
                    alt={heading || 'CATI Workstations'}
                    className="cati-cutout-img"
                  />
                </div>
              </div>
            )}
            <div className="cati-text-col">
              {heading && <h2 className="cati-heading">{heading}</h2>}
              {desc && <p className="cati-desc">{desc}</p>}
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
