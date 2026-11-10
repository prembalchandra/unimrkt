'use client';

import React, { useState, useEffect } from 'react';

export default function FqaPrimaryresearch({ dynamicFaq = null }) {
  const [faqs, setFaqs] = useState(() => dynamicFaq?.items || []);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (dynamicFaq?.items && dynamicFaq.items.length > 0) {
      setFaqs(dynamicFaq.items);
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/faqs?pageSlug=primary-research&pagination[limit]=5`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data) && d.data.length > 0) {
            setFaqs(d.data);
          }
        })
        .catch(() => {});
    }
  }, [dynamicFaq]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (faqs.length === 0) return null;

  const displayHeading = dynamicFaq?.heading || dynamicFaq?.title;

  return (
    <section className="faq-section-area">
      <div className="srcn-container">
        {displayHeading && (
          <div className="section-header-area">
            <h2 className="section-main-heading">{displayHeading}</h2>
          </div>
        )}

        <div className="faq-accordion-container">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
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
