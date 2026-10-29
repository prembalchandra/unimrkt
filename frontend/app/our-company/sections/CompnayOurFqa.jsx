'use client';

import React, { useState } from 'react';

const blogFaqs = [
  {
    question: 'What is Unimrkt Research?',
    answer:
      'Unimrkt Research is a global market research firm providing end-to-end qualitative and quantitative research solutions, custom data analytics, and multi-country operational support across B2B, consumer, and healthcare sectors.',
  },
  {
    question: 'In how many countries does Unimrkt conduct research?',
    answer:
      'We operate across 90+ countries covering North America, Europe, APAC, Latin America, and the Middle East & Africa (MEA) with localized market expertise.',
  },
  {
    question: 'What languages does Unimrkt support?',
    answer:
      'Our team supports survey programming, CATI execution, and data reporting in over 40+ global and regional languages through native-speaking researchers.',
  },
  {
    question: 'What quality and security standards does Unimrkt follow?',
    answer:
      'We comply strictly with ISO 20252 market research quality standards and GDPR protocols, implementing digital fingerprinting, IP verification, and multi-tier manual quality checks.',
  },
  {
    question: 'What industries does Unimrkt serve?',
    answer:
      'We cater to a broad spectrum of industries, including Healthcare & Pharmaceuticals, Technology & Telecom, Financial Services, FMCG/Retail, Automotive, and Industrial B2B domains.',
  },
];

export default function CompnayOurFqa() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.png" alt="fqa banner" />
      </div>
      <div className="srcn-container">
        <div className="section-header-area">
          <h2 className="section-main-heading">Frequently Asked Questions</h2>
        </div>

        <div className="faq-accordion-container">
          {blogFaqs.map((faq, index) => {
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