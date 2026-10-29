'use client';

import React, { useState } from 'react';

const contactFaqs = [
  {
    question: 'How can I contact Unimrkt Research for market research services?',
    answer:
      "You can contact Unimrkt Research through our website's contact form to discuss your market research requirements. Our team will understand your objectives and recommend suitable research solutions for your business.",
  },
  {
    question: 'What types of market research services does Unimrkt offer?',
    answer:
      'Unimrkt Research offers a range of market research solutions, including telephonic surveys, online surveys, qualitative research, quantitative research, B2B research, CATI services, and customized research solutions to help businesses gather meaningful market insights.',
  },
  {
    question: 'Can I discuss a customized research requirement with your team?',
    answer:
      'Yes, you can discuss your specific research requirements with our team. We work to understand your target audience, research objectives, project scope, and timelines to develop a customized solution aligned with your business needs.',
  },
  {
    question: 'Where are Unimrkt Research offices located?',
    answer:
      'Unimrkt Research serves clients across multiple markets. For the latest information about our office locations and contact details, please visit the contact section of our website.',
  },
  {
    question: 'How can I work with Unimrkt Research?',
    answer:
      'If you are interested in working with Unimrkt Research, you can explore career opportunities through our careers page. For business partnerships or research projects, contact our team to discuss available opportunities and collaboration possibilities.',
  },
];

export default function ContactFaq() {
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
          {contactFaqs.map((faq, index) => {
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
