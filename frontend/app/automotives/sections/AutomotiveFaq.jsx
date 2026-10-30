'use client';

import React, { useState } from 'react';

const blogFaqs = [
  {
    question: 'What industry sectors does Unimrkt Research cover?',
    answer:
      'We conduct quantitative and qualitative research across 10+ major global sectors, including Automotive & Mobility, Healthcare & Life Sciences, BFSI & Fintech, Retail & E-commerce, Technology & SaaS, Consumer Goods (FMCG), Energy & Utilities, Telecommunications, and Media & Entertainment across 90+ countries.',
  },
  {
    question:
      'How do you recruit senior decision-makers and specialized respondents?',
    answer:
      'We leverage verified proprietary B2B panels, telephone outreach (CATI), and multi-channel screening. Every executive, physician, or technical buyer is thoroughly screened, vetted, and identity-verified to ensure authentic, qualified domain perspectives.',
  },
  {
    question:
      'Can you tailor research methodologies for regulated industries?',
    answer:
      'Yes. Our questionnaires, fieldwork workflows, and data handling protocols are custom-designed to comply with stringent industry standards, including HIPAA and adverse event reporting for Healthcare, and GDPR/CCPA for financial and consumer data privacy.',
  },
  {
    question: 'How do you ensure high data quality and eliminate fraud?',
    answer:
      'We implement a multi-stage validation engine including digital fingerprinting, IP deduplication, speeder/straight-liner detection, audio audit verifications, and consistency scoring to deliver pristine, audit-ready data sets.',
  },
  {
    question:
      'In how many countries and languages can research be executed?',
    answer:
      'We conduct fieldwork across 90+ countries across the Americas, Europe, APAC, Middle East, and Africa, supporting over 25+ local languages with native-speaking interviewers and localized survey instruments.',
  },
  {
    question:
      'What deliverables and data formats do you provide upon project completion?',
    answer:
      'We deliver clean data sets (SPSS, Excel, CSV), cross-tabulations, visual PowerPoint/PDF executive reports, interactive dashboard visualizations, and strategic insight summaries tailored for board and C-suite presentations.',
  },

];

export default function AutomotiveFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section-area">
      <div className="worldmap-bg">
        <img src="/asstes/images/unimrkt-resarch-map-banner-img.webp" alt="fqa banner" />
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
