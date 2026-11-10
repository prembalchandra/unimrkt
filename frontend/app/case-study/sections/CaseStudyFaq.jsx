'use client';

import React, { useState, useEffect } from 'react';

function formatFaq(f) {
  if (!f) return null;
  return {
    question: f.question || '',
    answer: f.answer || '',
  };
}

export default function CaseStudyFaq({ dynamicFaq = null, initialFaqs = [] }) {
  const [faqs, setFaqs] = useState(() => {
    if (dynamicFaq?.items && dynamicFaq.items.length > 0) return dynamicFaq.items;
    return (initialFaqs || []).map(formatFaq).filter(Boolean);
  });
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    if (dynamicFaq?.items && dynamicFaq.items.length > 0) {
      setFaqs(dynamicFaq.items);
    } else if (initialFaqs && initialFaqs.length > 0) {
      setFaqs(initialFaqs.map(formatFaq).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/faqs?pagination[limit]=7&sort=order:asc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setFaqs(d.data.map(formatFaq).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [dynamicFaq, initialFaqs]);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (faqs.length === 0) return null;

  return (
    <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />
      </div>
      <div className="srcn-container">
        <div className="section-header-area">
          <h2 className="section-main-heading">
            {dynamicFaq?.title || 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="faq-accordion-container">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                <div
                  className="faq-accordion-header"
                  onClick={() => toggleFaq(index)}
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
