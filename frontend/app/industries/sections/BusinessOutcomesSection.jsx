'use client';

import React, { useState } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

const defaultOutcomes = [
  {
    id: 1,
    title: 'The Challenge',
    desc: 'The starting point of every research project is understanding the business challenge. We identify the key questions, market gaps, customer needs and decision-making challenges that require deeper clarity.',
    icon: '/uploads/industries_icon_case_cogwheel_92fdecc191.svg',
  },
  {
    id: 2,
    title: 'The Approach',
    desc: 'Designing and deploying the appropriate quantitative and qualitative research methodologies tailored to the target audience, industry dynamics, and geographic scope.',
    icon: '/uploads/industries_icon_case_connection_eb7a68ba63.svg',
  },
  {
    id: 3,
    title: 'The Insight',
    desc: 'Translating complex findings into clear, evidence-based recommendations, strategic market benchmarks, and actionable decision-making frameworks.',
    icon: '/uploads/industries_icon_case_insight_f3297cd056.svg',
  },
];

export default function BusinessOutcomesSection({
  outcomes = [],
  kicker = null,
  heading = null,
  description = null,
  dynamicSection = null,
}) {
  const [activeDot, setActiveDot] = useState(0);

  const displayKicker =
    dynamicSection?.kicker || kicker || 'Featured Case Studies';
  const displayHeading =
    dynamicSection?.heading ||
    dynamicSection?.title ||
    heading ||
    'From Business Questions to Meaningful Outcomes';
  const displayDesc =
    dynamicSection?.description ||
    description ||
    'Explore how Unimrkt helps businesses address complex challenges through focused research, deeper customer understanding and actionable insights.';

  const rawList =
    dynamicSection?.values ||
    dynamicSection?.cards ||
    (outcomes && outcomes.length > 0 ? outcomes : []);
  const list = rawList.length > 0 ? rawList : defaultOutcomes;

  return (
    <section className="business-outcomes-section" id="business-outcomes">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div
            className="section-header-area text-center"
            style={{ maxWidth: 980, margin: '0 auto 40px' }}
          >
            {displayKicker && (
              <span className="career-values-kicker">
                {displayKicker}
              </span>
            )}
            {displayHeading && (
              <h2 className="section-main-heading">
                {displayHeading}
              </h2>
            )}
            {displayDesc && (
              <p className="section-sub-text" style={{ margin: '0 auto' }}>
                {displayDesc}
              </p>
            )}
          </div>
        )}

        {list.length > 0 && (
          <div className="outcomes-grid">
            {list.map((item, index) => {
              const iconSrc =
                getStrapiMedia(item.icon || item.image) ||
                (defaultOutcomes[index] && defaultOutcomes[index].icon);

              return (
                <article key={item.id || index} className="outcome-card">
                  {iconSrc && (
                    <div className="outcome-icon-wrap">
                      <img
                        src={iconSrc}
                        alt={item.title || ''}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {item.title && (
                    <h3 className="outcome-title">{item.title}</h3>
                  )}
                  {(item.desc || item.description) && (
                    <p className="outcome-desc">
                      {item.desc || item.description}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination indicator */}
        <div className="outcomes-pagination-dots" role="navigation" aria-label="Outcomes pagination">
          <button
            type="button"
            className={`outcomes-dot ${activeDot === 0 ? 'active' : ''}`}
            onClick={() => setActiveDot(0)}
            aria-label="Slide 1"
          />
          <button
            type="button"
            className={`outcomes-dot ${activeDot === 1 ? 'active' : ''}`}
            onClick={() => setActiveDot(1)}
            aria-label="Slide 2"
          />
        </div>
      </div>
    </section>
  );
}
