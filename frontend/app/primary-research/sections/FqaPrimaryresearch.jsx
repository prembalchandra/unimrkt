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

  return (
    <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />
      </div>
      <div className="srcn-container">
        <div className="section-header-area">
          <h2 className="section-main-heading">
            {dynamicFaq?.heading || dynamicFaq?.title || 'Frequently Asked Questions'}
          </h2>
        </div>

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
                  <span className="faq-header-left">
                    <span className="faq-question-text">{faq.question}</span>
                  </span>
                  <span className={`faq-icon-indicator ${isOpen ? 'active' : ''}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <div className="faq-accordion-body">
                    <div className="faq-accordion-content">
                      <p>{faq.answer}</p>
                    </div>
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
