'use client';

import React, { useState } from 'react';

export default function CompnayOurFqa({ faqs = [], dynamicFaq = null, heading = null, kicker = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const displayHeading = heading || dynamicFaq?.heading || dynamicFaq?.title || 'Frequently Asked Questions';
  const displayKicker = kicker || dynamicFaq?.kicker || '';

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const list = (dynamicFaq?.items && dynamicFaq.items.length > 0) ? dynamicFaq.items : faqs;
  if (!list || list.length === 0) return null;

  return (
    <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="faq banner" />
      </div>
      <div className="srcn-container">
        <div className="section-header-area">
          {displayKicker && <span className="career-values-kicker">{displayKicker}</span>}
          <h2 className="section-main-heading">{displayHeading}</h2>
        </div>

        <div className="faq-accordion-container">
          {list.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
              >
                <div
                  className="faq-accordion-header"
                  onClick={() => toggleAccordion(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-indicator" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                <div
                  className="faq-accordion-body"
                  style={{
                    display: isOpen ? 'block' : 'none',
                    maxHeight: isOpen ? '500px' : '0',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="faq-accordion-content">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
