'use client';

import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function QuestionCTA({ dynamicCta = null }) {
  const title =
    dynamicCta?.title ||
    dynamicCta?.heading ||
    "Have A Question? Let's Find The Answer.";
  const desc =
    dynamicCta?.description ||
    'A simple process designed to understand your requirement and connect you with the right research expert.';
  const btnLabel =
    dynamicCta?.button?.label ||
    dynamicCta?.btnLabel ||
    'Talk To Our Experts';
  const btnUrl = dynamicCta?.button?.url || dynamicCta?.btnUrl || '/contact';

  const coupleImage =
    getStrapiMedia(dynamicCta?.image) ||
    '/uploads/industries_couple_cutout_326ad2e1c1.webp';

  return (
    <section className="question-cta-section" id="question-cta">
      <div className="srcn-container">
        <div className="question-cta-container">
          <div className="question-cta-banner">
            <div className="question-cta-content">
              {title && (
                <h2 className="question-cta-title">
                  {title}
                </h2>
              )}
              {desc && (
                <p className="question-cta-description">
                  {desc}
                </p>
              )}
              {btnLabel && (
                <Link href={btnUrl} className="question-cta-button">
                  <span>{btnLabel}</span>
                  <i
                    className="fa fa-long-arrow-right"
                    aria-hidden="true"
                    style={{ marginLeft: 8 }}
                  />
                </Link>
              )}
            </div>

            <div className="question-cta-image">
              <img
                src={coupleImage}
                alt={title || 'Have a Question'}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
