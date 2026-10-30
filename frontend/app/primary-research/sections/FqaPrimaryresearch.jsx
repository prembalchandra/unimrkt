'use client';

import React, { useState } from 'react';

const blogFaqs = [
  {
    question: 'What kind of market research services does Unimrkt provide?',
    answer:
      'Unimrkt Research delivers comprehensive end-to-end solutions, including Primary Research (CATI, CAWI, F2F, Qualitative In-Depth Interviews), Secondary Desk Research, Global Panel Recruitment, and Custom Data Analytics across B2B, Consumer, and Healthcare verticals.',
  },
  {
    question: 'How does Unimrkt ensure the accuracy and quality of survey data?',
    answer:
      'We employ strict ISO 20252 certified quality assurance, including digital device fingerprinting, IP deduplication, speeder/straight-liner algorithmic checks, and dual-layer manual validation before dataset handover.',
  },
  {
    question: 'Can Unimrkt handle international and multi-country research projects?',
    answer:
      'Yes. Our global research network spans over 90+ countries across North America, Europe, APAC, Latin America, and MEA, supported by native-speaking CATI interviewers and localized survey instruments in 40+ languages.',
  },
  {
    question: 'What methodologies do you use for primary research?',
    answer:
      'We deploy Computer-Assisted Telephone Interviewing (CATI), Computer-Assisted Web Interviewing (CAWI), In-Depth Interviews (IDIs), Focus Groups, and Hybrid mixed-mode research designs tailored to specific target audiences.',
  },
  {
    question: 'How long does a typical market research study take to complete?',
    answer:
      'Standard online consumer surveys can be completed within 24–48 hours upon questionnaire sign-off. Detailed B2B and niche healthcare studies typically conclude in 1–3 weeks depending on quota incidence and geographic scope.',
  },
];

export default function FqaPrimaryresearch() {
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
