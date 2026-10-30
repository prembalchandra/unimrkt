'use client';

import React from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function QuestionCtaSection({ data = {} }) {
  if (!data) return null;

  const title = data.title || "Have A Question? Let's Find The Answer.";
  const description =
    data.description ||
    'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.';
  const btnLabel = data.button?.label || 'Talk to Our Experts';
  const btnUrl = data.button?.url || '/contact';

  const posterImg = getStrapiMediaUrl(
    data.visualImage,
    '/asstes/images/the-impact-banner-img.webp'
  );

  return (
    <section className="research-cta-section" id="cta">
      <div className="srcn-container">
        <div className="research-cta-banner-wrapper">
          <LazyVideo
            className="research-cta-bg-image"
            src="/asstes/images/video-banner-img.mp4"
            poster={posterImg}
          />

          <div className="research-cta-overlay"></div>
          <div className="srcn-container research-cta-content">
            <h2 className="section-main-heading research-cta-title">{title}</h2>
            <p className="research-cta-desc hero-common-title">{description}</p>
            <Link href={btnUrl} className="btn-white">
              {btnLabel} <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
