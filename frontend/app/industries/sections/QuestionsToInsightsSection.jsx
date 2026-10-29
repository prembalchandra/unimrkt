'use client';

import React, { useState } from 'react';

const accordionItems = [
  {
    id: 'market-opportunities',
    title: 'Market Opportunities',
    icon: '/asstes/images/icon/market-opportunity-icon-img.png',
    desc: 'Pinpointing untapped market segments, evaluating entry barriers, assessing addressable market size, and identifying whitespace opportunities for high-growth ventures.',
  },
  {
    id: 'customer-sentiment',
    title: 'Customer Sentiment',
    icon: '/asstes/images/icon/consumer-behavior-icon-img.png',
    desc: 'Uncovering purchase drivers, brand perceptions, evolving customer expectations, and emotional triggers shaping consumer brand affinity and loyalty.',
  },
  {
    id: 'competitive-landscape',
    title: 'Competitive Landscape',
    icon: '/asstes/images/icon/competitive-landscape-img.png',
    desc: 'Benchmarking market share, monitoring competitor maneuvers, analyzing pricing strategies, and mapping perceptual positioning across industry leaders.',
  },
  {
    id: 'product-innovation',
    title: 'Product Innovation',
    icon: '/asstes/images/icon/product-innovation-icon-img.png',
    desc: 'Concept validation, feature prioritization, UX/UI feedback, pricing sensitivity analysis, and post-launch performance monitoring across buyer segments.',
  },
  {
    id: 'customer-experience',
    title: 'Customer Experience',
    icon: '/asstes/images/icon/customer-experience-icon.png',
    desc: 'Measuring CSAT, Net Promoter Score (NPS), customer lifetime value drivers, and touchpoint friction across omni-channel customer journeys.',
  },
  {
    id: 'brand-equity',
    title: 'Brand Equity',
    icon: '/asstes/images/icon/stronger-growth-icon-img.png',
    desc: 'Tracking brand awareness, associations, perceived quality, and resonance to build resilient, long-term sustainable brand value.',
  },
];

export default function QuestionsToInsightsSection() {
  const [openIndex, setOpenIndex] = useState(0); 
  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="questions-insights-section" id="questions-insights">

      <div className="srcn-container">
        <div className="industries-showcase-header section-header-area">
          <span className="industries-showcase-kicker career-values-kicker">SOLUTIONS &amp; METHODOLOGIES</span>
          <h2 className="industries-showcase-heading section-main-heading">From Questions To Insights</h2>
          <p className="industries-showcase-desc section-sub-text">
            Every business question requires a distinct analytical lens. Explore how our specialized research modules
            translate inquiries into strategic clarity.
          </p>
        </div>

        <div className="questions-insights-layout">
          <div className="questions-insights-visual">
            <img
              src="/asstes/images/questions-to-insights-img.png"
              alt="Unimrkt Research Specialist Analysing Insights"
              loading="lazy"
            />
          </div>
          <div className="questions-accordion" role="region" aria-label="Research insight topics">
            {accordionItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.id}
                  className={`questions-accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="questions-accordion-btn"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-body-${item.id}`}
                  >
                    <div className="questions-accordion-title-wrap">
                      <div className="questions-accordion-icon">
                        <img src={item.icon} alt={item.title} />
                      </div>
                      <h3 className="questions-accordion-title">{item.title}</h3>
                    </div>
                    <span className="questions-accordion-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    id={`accordion-body-${item.id}`}
                    className={`questions-accordion-collapse ${isOpen ? 'show' : ''}`}
                  >
                    <div className="questions-accordion-inner">
                      <p className="questions-accordion-content">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
