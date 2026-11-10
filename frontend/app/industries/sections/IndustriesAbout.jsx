'use client';

import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function IndustriesAbout({ dynamicOverview = null }) {
  const kicker = dynamicOverview?.kicker || 'Our Industries';
  const title =
    dynamicOverview?.title ||
    dynamicOverview?.heading ||
    'Understanding Industries. Uncovering Opportunities.';
  const desc = dynamicOverview?.description;
  const image =
    getStrapiMedia(dynamicOverview?.image) ||
    '/uploads/industries_worker_cutout_1aadd8e76c.webp';

  return (
    <section className="industries-about-section">
      <div className="srcn-container">
        <div className="industries-about-grid">
          <div className="industries-about-content">
            {kicker && (
              <span className="industries-about-kicker">{kicker}</span>
            )}
            {title && (
              <h2 className="industries-about-title">{title}</h2>
            )}
            <div className="industries-about-text">
              {desc ? (
                <p>{desc}</p>
              ) : (
                <>
                  <p>
                    Every industry operates within a unique ecosystem shaped by customer expectations, market trends, competition, technology and regulatory changes. Unimrkt Research helps organizations understand these dynamics through industry-focused research designed around specific business questions and objectives.
                  </p>
                  <p>
                    Our research explores market opportunities, customer behavior, competitive landscapes, emerging trends, product preferences and changing industry needs. By combining primary, qualitative, quantitative and business research capabilities, we provide a comprehensive view of the markets and audiences that matter most.
                  </p>
                  <p>
                    From established sectors to emerging markets, our approach can be adapted to different industries, geographies and audiences. We bring together industry context, reliable data and meaningful analysis to help businesses identify opportunities, understand challenges and make informed strategic decisions with greater confidence.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="industries-about-visual-wrap">
            <div className="industries-about-ring-outer">
              <div className="industries-about-ring-inner">
                <div className="industries-about-photo-wrap">
                  <img
                    src={image}
                    alt={title || 'Understanding Industries'}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
