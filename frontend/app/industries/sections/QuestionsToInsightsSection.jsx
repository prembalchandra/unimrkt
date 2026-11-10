'use client';

import React, { useState } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function QuestionsToInsightsSection({ items = [], dynamicSection = null }) {
  const [openIndex, setOpenIndex] = useState(0);
  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  const displayKicker = dynamicSection?.kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;
  const list = (items && items.length > 0) ? items : (dynamicSection?.cards || dynamicSection?.values || []);

  if (!displayHeading && !displayDesc && list.length === 0) return null;

  return (
    <section className="questions-to-insights-section" id="questions-to-insights">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="questions-insights-header section-header-area">
            {displayKicker && (
              <span className="questions-insights-kicker career-values-kicker">
                {displayKicker}
              </span>
            )}
            {displayHeading && (
              <h2 className="questions-insights-heading section-main-heading">
                {displayHeading}
              </h2>
            )}
            {displayDesc && (
              <p className="questions-insights-desc industries-expertise-desc">
                {displayDesc}
              </p>
            )}
          </div>
        )}

        {list.length > 0 && (
          <div className="qti-accordion-wrapper">
            {list.map((item, idx) => {
              const isOpen = openIndex === idx;
              const iconSrc = getStrapiMedia(item.icon || item.image);
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
                      {iconSrc && (
                        <div className="qti-icon-wrap">
                          <img src={iconSrc} alt={item.title || ''} />
                        </div>
                      )}
                      {item.title && <h3 className="qti-question-title">{item.title}</h3>}
                    </div>
                    <span className="qti-toggle-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="qti-accordion-body">
                      {(item.desc || item.description) && (
                        <p className="qti-answer-text">{item.desc || item.description}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
