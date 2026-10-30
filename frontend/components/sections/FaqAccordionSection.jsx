'use client';

import React, { useState } from 'react';

export default function FaqAccordionSection({ data = {} }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!data) return null;

  const heading = data.heading || 'Frequently Asked Questions';
  const kicker = data.kicker || 'FAQ';
  const description = data.description || '';
  const items = data.items || [];

  if (items.length === 0) return null;

  const toggleFaq = (index) => {
    setOpenIndex((curr) => (curr === index ? null : index));
  };

  return (
    <section className="faq-section-area" style={{ padding: '60px 0' }}>
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.webp" alt="FAQ Map" />
      </div>
      <div className="srcn-container">
        <div className="section-header-area text-center" style={{ marginBottom: '40px' }}>
          {kicker && <span className="sub-title-red">{kicker}</span>}
          <h2 className="section-main-heading">{heading}</h2>
          {description && <p className="hero-common-title" style={{ maxWidth: '750px', margin: '15px auto 0' }}>{description}</p>}
        </div>

        <div className="faq-accordion-container">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-accordion-header">
                  <h3 className="faq-question-title">{faq.question}</h3>
                  <span className="faq-icon-indicator" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <div className="faq-accordion-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
