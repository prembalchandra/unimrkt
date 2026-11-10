'use client';

import React, { useState } from 'react';

export default function ServicesFaq({ faqs = [], dynamicFaq = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const displayHeading = dynamicFaq?.heading || dynamicFaq?.title;
  const displayKicker = dynamicFaq?.kicker;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const list = (dynamicFaq?.items && dynamicFaq.items.length > 0) ? dynamicFaq.items : faqs;
  if (!list || list.length === 0) return null;

  return (
    <section className="faq-section-area">
      <div className="srcn-container">
        {(displayKicker || displayHeading) && (
          <div className="section-header-area">
            {displayKicker && <span className="career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="section-main-heading">{displayHeading}</h2>}
          </div>
        )}

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
                {isOpen && (
                  <div className="faq-accordion-body">
                    <p className="faq-accordion-answer">{faq.answer}</p>
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
