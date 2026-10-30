'use client';

import React from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';

export default function AdvancedAreaSection() {
  return (
    <section className="advanced-area">
      <div className="cati-showcase-box-area">
        <div className="cati-video-backdrop-wrap">
          <LazyVideo
            className="cati-wave-video"
            id="catiWaveVideo"
            src="/asstes/images/advanced-banner-video2.mp4"
            poster="/asstes/images/advanced-banner-img.webp"
            playbackRate={0.5}
          />
        </div>
        <div className="srcn-container">
          <div className="cati-showcase-row">
            <div className="cati-image-col">
              <div className="cati-cutout-wrap">
                <img
                  src="/asstes/images/advanced-banner-img.webp"
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
