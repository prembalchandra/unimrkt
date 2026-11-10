'use client';

import React, { useState, useEffect } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function WorkFaq({ dynamicFaq = null }) {
  const [faqs, setFaqs] = useState(() => dynamicFaq?.items || []);
  const [openIndex, setOpenIndex] = useState(0);

  const kicker = dynamicFaq?.kicker;
  const heading = dynamicFaq?.heading || dynamicFaq?.title;
  const mapBanner = dynamicFaq?.bannerImage ? getStrapiMedia(dynamicFaq.bannerImage) : getStrapiMedia('/uploads/unimrkt-resarch-map-banner-img.png');

  useEffect(() => {
    if (dynamicFaq?.items && dynamicFaq.items.length > 0) {
      setFaqs(dynamicFaq.items);
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/faqs?pageSlug=work&pagination[limit]=10&sort=order:asc`)
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
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (faqs.length === 0 && !heading) return null;

  return (
    <section className="faq-section-area">
      {mapBanner && (
        <div className="worldmap-bg">
          <img src={mapBanner} alt={heading || 'FAQ'} />
        </div>
      )}
      <div className="srcn-container">
        {(kicker || heading) && (
          <div className="section-header-area">
            {kicker && <span className="career-values-kicker">{kicker}</span>}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
          </div>
        )}

        {faqs.length > 0 && (
          <div className="faq-accordion-container">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id || index} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
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
        )}
      </div>
    </section>
  );
}
