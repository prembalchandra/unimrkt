'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'What are telephonic surveys?',
    answer: 'Telephonic surveys are a market research method where trained interviewers collect responses from participants over the phone. They are useful for reaching specific audiences, gathering detailed feedback, and conducting research when online or face-to-face methods may not be suitable.'
  },
  {
    question: 'What is CATI?',
    answer: 'CATI stands for Computer-Assisted Telephone Interviewing. It is a structured telephone survey methodology where trained interviewers use a computerized questionnaire to conduct interviews, record responses, and maintain consistent data quality throughout the research process.'
  },
  {
    question: 'When should I use a telephonic survey?',
    answer: 'Telephonic surveys are ideal when you need direct interaction with respondents, have a targeted or hard-to-reach audience, require clarification of responses, or need to conduct research among B2B, healthcare, or niche respondent groups.'
  },
  {
    question: 'Can you conduct surveys in multiple languages?',
    answer: 'Yes. We can conduct telephonic surveys in multiple languages using trained native or fluent-speaking interviewers. Survey questionnaires can also be localized to suit the language, culture, and requirements of different markets.'
  },
  {
    question: 'Can you reach B2B respondents?',
    answer: 'Yes. We can reach B2B respondents across different industries, company sizes, job functions, and seniority levels. Our respondent targeting capabilities allow us to conduct research among decision-makers, professionals, executives, and other specialized business audiences.'
  },
  {
    question: 'How do you ensure data quality?',
    answer: 'We follow a structured quality-control process that includes trained interviewers, questionnaire validation, respondent screening, call monitoring, consistency checks, and data validation to ensure accurate, reliable, and high-quality survey results.'
  }
];

export default function TelephonicFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                <div className="faq-accordion-header" onClick={() => toggleFaq(index)}>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-indicator" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>

                <div
                  className="faq-accordion-body"
                  style={{
                    display: isOpen ? 'block' : 'none',
                    maxHeight: isOpen ? '800px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
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
