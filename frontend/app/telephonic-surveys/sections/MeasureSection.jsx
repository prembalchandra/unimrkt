'use client';

import React, { useState } from 'react';

const accordionPanels = [
  {
    id: 1,
    title: 'Smart Survey Management',
    desc: 'Structured questionnaires and controlled interview flows.',
    image: '/asstes/images/smart-survey-management-card-img.webp',
  },
  {
    id: 2,
    title: 'Real-Time Monitoring',
    desc: 'Live supervisor dashboards and field interview tracking.',
    image: '/asstes/images/real-time-monitoring-card-img.webp',
  },
  {
    id: 3,
    title: 'Interview Controls',
    desc: 'Strict quota enforcement and verified demographic protocols.',
    image: '/asstes/images/interview-controls-card-img.webp',
  },
  {
    id: 4,
    title: 'Data Validation',
    desc: 'Automated speeder checks and multi-point audio audits.',
    image: '/asstes/images/data-validation-card-img.webp',
  },
  {
    id: 5,
    title: 'Centralized Data',
    desc: 'Unified reporting and instant data synchronization across markets.',
    image: '/asstes/images/centralized-data-card-img.webp',
  },
];

export default function MeasureSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="measure-section" id="survey-capabilities">
      <div className="srcn-container">
        <div className="measure-header">
          <span className="measure-kicker">CATI Technology</span>
          <h2 className="measure-title">Human Conversations. Technology-Enabled Research.</h2>
          <p className="measure-subtext">
            CATI combines interviewer-led conversations with technology for consistent, efficient research management.
          </p>
        </div>
        <div
          className="telephonic-accordion-container"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {accordionPanels.map((panel, index) => {
            const isHovered = hoveredIndex === index;
            const hasAnyHover = hoveredIndex !== null;

            return (
              <div
                key={panel.id}
                className={`telephonic-accordion-panel ${isHovered ? 'is-active' : ''} ${hasAnyHover && !isHovered ? 'is-collapsed' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(isHovered ? null : index)}
                tabIndex={0}
                role="button"
                aria-label={panel.title}
                aria-expanded={isHovered}
              >
                {/* Background Image */}
                <div
                  className="accordion-panel-bg"
                  style={{ backgroundImage: `url('${panel.image}')` }}
                />

                {/* Dark Gradient Overlay */}
                <div className="accordion-panel-overlay" />

                {/* Expanded Content (Horizontal at bottom-left) */}
                <div className="accordion-expanded-content">
                  <h3 className="accordion-expanded-title">{panel.title}</h3>
                  <p className="accordion-expanded-desc">{panel.desc}</p>
                </div>

                {/* Collapsed Vertical Title (Rotated text) */}
                <div className="accordion-vertical-title-wrap">
                  <span className="accordion-vertical-title">{panel.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
