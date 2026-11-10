'use client';

import React, { useState } from 'react';

const defaultImages = [
  '/asstes/images/smart-survey-management-card-img.png',
  '/asstes/images/real-time-monitoring-card-img.png',
  '/asstes/images/interview-controls-card-img.png',
  '/asstes/images/data-validation-card-img.png',
  '/asstes/images/centralized-data-card-img.png',
];

export default function MeasureSection({ accordionPanels = [], kicker, title, subtext }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!accordionPanels || accordionPanels.length === 0) return null;

  return (
    <section className="measure-section" id="survey-capabilities">
      <div className="srcn-container">
        <div className="measure-header">
          <span className="measure-kicker">{kicker || 'CATI Technology'}</span>
          <h2 className="measure-title">{title || 'Human Conversations. Technology-Enabled Research.'}</h2>
          <p className="measure-subtext">
            {subtext || 'CATI combines interviewer-led conversations with technology for consistent, efficient research management.'}
          </p>
        </div>

        <div className="measure-accordion">
          {accordionPanels.map((panel, index) => {
            const isHovered = hoveredIndex === index;
            const isDefault = hoveredIndex === null && index === 0;
            const isActive = isHovered || isDefault;

            return (
              <div
                key={panel.id || index}
                className={`measure-panel ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="measure-panel-bg">
                  <img src={panel.image || panel.iconClass || defaultImages[index % defaultImages.length]} alt={panel.title} />
                  <div className="measure-panel-overlay"></div>
                </div>

                <div className="measure-panel-content">
                  <div className="measure-panel-top">
                    <span className="measure-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                    <h3 className="measure-panel-title">{panel.title}</h3>
                  </div>

                  <div className="measure-panel-bottom">
                    <p className="measure-panel-desc">{panel.desc || panel.description}</p>
                    <div className="measure-panel-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="measure-panel-vertical-title">
                  <span>{panel.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
