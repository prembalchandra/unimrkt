'use client';

import React, { useState } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

const defaultQuestions = [
  {
    num: '01',
    title: 'Market Dynamics',
    desc: 'Understanding evolving customer expectations, supply chain constraints, competitor maneuvers, and demand cycles across regional and global markets.',
  },
  {
    num: '02',
    title: 'Competitive Intelligence',
    desc: 'Deep-dive competitor benchmarking, product feature mapping, pricing strategies, and market positioning analysis.',
  },
  {
    num: '03',
    title: 'Consumer Behavior',
    desc: 'Decoding decision drivers, brand affinity, purchase triggers, and changing attitudes across demographic cohorts.',
  },
  {
    num: '04',
    title: 'Brand Perception',
    desc: 'Measuring brand health, net promoter scores, brand recall, and market sentiment to refine communication strategies.',
  },
  {
    num: '05',
    title: 'Customer Satisfaction',
    desc: 'Identifying friction points across customer touchpoints to improve retention, lifetime value, and referral rates.',
  },
  {
    num: '06',
    title: 'Pricing Insights',
    desc: 'Willingness-to-pay analysis, price elasticity modeling, and bundle optimization to maximize revenue and margin.',
  },
];

export default function QuestionsToInsightsSection({
  items = [],
  dynamicSection = null,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  const displayKicker =
    dynamicSection?.kicker || 'What We Help You Understand';
  const displayHeading =
    dynamicSection?.heading ||
    dynamicSection?.title ||
    'From Questions To Insights';
  const displayDesc =
    dynamicSection?.description ||
    'Turning complex business questions into clear, actionable insights through structured research, reliable data and thoughtful analysis.';

  const womanImg =
    getStrapiMedia(dynamicSection?.image) ||
    '/uploads/industries_woman_cutout_e241ff634e.webp';

  const rawList =
    items && items.length > 0
      ? items
      : dynamicSection?.cards || dynamicSection?.values || [];
  const list = rawList.length > 0 ? rawList : defaultQuestions;

  return (
    <section
      className="questions-to-insights-section"
      id="questions-to-insights"
    >
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

        <div className="questions-insights-layout">
          {/* Left Column: Woman Visual */}
          <div className="questions-insights-visual">
            <div className="questions-insights-visual-card">
              <img
                src={womanImg}
                alt="From Questions to Insights"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="qti-accordion-wrapper">
            {list.map((item, idx) => {
              const isOpen = openIndex === idx;
              const numStr =
                item.num ||
                (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);

              return (
                <div
                  key={item.id || idx}
                  className={`qti-accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="qti-accordion-header"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="qti-header-left">
                      <span className="qti-num-badge">{numStr}</span>
                      <h3 className="qti-question-title">{item.title}</h3>
                    </div>
                    <span className="qti-toggle-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="qti-accordion-body">
                      <p className="qti-answer-text">
                        {item.desc || item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
