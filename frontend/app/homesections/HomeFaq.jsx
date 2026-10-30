 'use client';

import React, { useState } from 'react';

const homeFaqs = [
  {
    question: 'What market research services does Unimrkt offer?',
    answer:
      'Unimrkt Research offers end-to-end market research solutions, including primary research (CATI, CAWI, and face-to-face surveys), qualitative research, secondary research, global panel recruitment, data collection, and custom data analytics to help businesses make informed decisions.',
  },
  {
    question: 'What industries does Unimrkt serve?',
    answer:
      'Unimrkt serves a wide range of industries, including healthcare and pharmaceuticals, banking and financial services, information technology, consumer goods, automotive, retail, media, telecommunications, and B2B sectors. Our research solutions are customized to meet each industry’s unique requirements.',
  },
  {
    question: 'What is Unimrkt’s global research reach?',
    answer:
      'Unimrkt Research supports international market research projects across 90+ countries, covering North America, Europe, Asia-Pacific, Latin America, and the Middle East and Africa. Our global network helps businesses understand local markets and diverse audiences.',
  },
  {
    question: 'How does Unimrkt ensure data quality and reliability?',
    answer:
      'Unimrkt follows a rigorous quality assurance process that includes respondent validation, duplicate response detection, data consistency checks, survey monitoring, and manual quality reviews to help deliver accurate, reliable, and actionable research insights.',
  },
  {
    question: 'Why choose Unimrkt as your research partner?',
    answer:
      'Unimrkt combines global research capabilities, experienced research professionals, flexible methodologies, and a strong focus on data quality. We deliver customized research solutions and actionable insights to help businesses reduce uncertainty and make confident strategic decisions.',
  },
];

export default function HomeFaq({ dynamicFaq = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  const activeFaqs =
    dynamicFaq && Array.isArray(dynamicFaq.items) && dynamicFaq.items.length > 0
      ? dynamicFaq.items
      : homeFaqs;
  const heading = dynamicFaq?.heading || 'Frequently Asked Questions';

  return (
   <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.webp" alt="fqa banner" />
      </div>
      <div className="srcn-container">
        <div className="section-header-area">
          <h2 className="section-main-heading">{heading}</h2>
        </div>

        <div className="faq-accordion-container">
          {activeFaqs.map((faq, index) => {
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