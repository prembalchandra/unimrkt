'use client';

import React from 'react';
import Link from 'next/link';

export default function ServicesQuestionCTA({ dynamicCta = null }) {
  if (!dynamicCta) return null;

  const title = dynamicCta.title || dynamicCta.heading;
  const desc = dynamicCta.description;
  const btnLabel = dynamicCta.button?.label;
  const btnUrl = dynamicCta.button?.url || '/contact';

  if (!title && !desc) return null;

  return (
    <section className="research-cta-section" id="cta">
      <div className="srcn-container">
        <div className="research-cta-banner-wrapper">
          <video
            className="research-cta-bg-image"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/asstes/images/video-banner-img.mp4" type="video/mp4" />
          </video>

          <div className="research-cta-overlay"></div>
          <div className="srcn-container research-cta-content">
            {title && <h2 className="section-main-heading research-cta-title">{title}</h2>}
            {desc && <p className="research-cta-desc hero-common-title">{desc}</p>}
            {btnLabel && (
              <Link href={btnUrl} className="btn-white">
                {btnLabel} <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
