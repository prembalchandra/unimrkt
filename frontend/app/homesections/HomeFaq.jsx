'use client';

import { getStrapiMedia } from '@/lib/strapi';

import React, { useState, useEffect } from 'react';

export default function HomeFaq({ dynamicFaq = null }) {
  const [faqs, setFaqs] = useState(() => dynamicFaq?.items || []);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (dynamicFaq?.items && dynamicFaq.items.length > 0) {
      setFaqs(dynamicFaq.items);
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/faqs?pageSlug=home&pagination[limit]=5`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data) && d.data.length > 0) {
            setFaqs(d.data);
          }
        })
        .catch(() => {});
    }
  }, [dynamicFaq]);

  const toggleFaq = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  if (faqs.length === 0) return null;

  const heading = dynamicFaq?.heading || dynamicFaq?.title;

  return (
    <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src={getStrapiMedia("/uploads/unimrkt-resarch-map-banner-img.png")} alt="fqa banner" />
      </div>
      <div className="srcn-container">
        <div className="section-header-area">
          <h2 className="section-main-heading">{heading}</h2>
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
                  onClick={() => toggleFaq(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className={`faq-icon-indicator ${isOpen ? 'active' : ''}`}>
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
