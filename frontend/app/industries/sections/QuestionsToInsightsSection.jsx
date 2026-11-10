'use client';

import React, { useState } from 'react';

const defaultIcons = [
  '/asstes/images/icon/market-opportunity-icon-img.png',
  '/asstes/images/icon/consumer-behavior-icon-img.png',
  '/asstes/images/icon/competitive-landscape-img.png',
  '/asstes/images/icon/product-innovation-icon-img.png',
  '/asstes/images/icon/customer-experience-icon.png',
  '/asstes/images/icon/stronger-growth-icon-img.png',
];

export default function QuestionsToInsightsSection({ items = [], dynamicSection = null }) {
  const [openIndex, setOpenIndex] = useState(0); 
  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  const displayKicker = dynamicSection?.kicker || 'QUESTIONS WE HELP ANSWER';
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'From Key Questions to Strategic Insights';
  const displayDesc = dynamicSection?.description || 'Navigating business uncertainty requires answers to critical questions. We help organizations across industries uncover the insights needed to make informed, forward-looking decisions.';

  if (!items || items.length === 0) return null;

  return (
    <section className="questions-to-insights-section" id="questions-to-insights">
      <div className="srcn-container">
        <div className="questions-insights-header section-header-area">
          <span className="questions-insights-kicker career-values-kicker">{displayKicker}</span>
          <h2 className="questions-insights-heading section-main-heading">{displayHeading}</h2>
          <p className="questions-insights-desc industries-expertise-desc">
            {displayDesc}
          </p>
        </div>

        <div className="qti-accordion-wrapper">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
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
                    <span className="qti-item-icon">
                      <img src={item.icon || item.iconClass || defaultIcons[idx % defaultIcons.length]} alt={item.title} />
                    </span>
                    <h3 className="qti-item-title">{item.title}</h3>
                  </div>
                  <span className="qti-accordion-indicator" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div 
                  className="qti-accordion-body"
                  style={{
                    maxHeight: isOpen ? '400px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.35s ease-in-out',
                    padding: isOpen ? '16px 20px 24px' : '0 20px',
                  }}
                >
                  <p>{item.description || item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
