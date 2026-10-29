'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'What can I learn from a Unimrkt case study?',
    answer: 'Unimrkt case studies provide insights into real-world research challenges, the methodologies used to address them, and the actionable insights delivered to support informed business decisions.',
  },
  {
    question: 'What types of research projects are featured in the case studies?',
    answer: 'Our case studies cover a variety of research projects, including B2B and consumer research, healthcare studies, qualitative interviews, quantitative surveys, and international market research.',
  },
  {
    question: 'How does Unimrkt approach a research challenge?',
    answer: "Unimrkt begins by understanding the client's objectives and target audience, then develops a tailored research strategy, selects suitable methodologies, and applies quality checks to deliver reliable, actionable insights.",
  },
  {
    question: 'Can I find a case study relevant to my industry?',
    answer: 'Yes. Unimrkt works across industries, including B2B, consumer markets, and healthcare. You can explore relevant case studies to understand how research approaches can address challenges specific to your industry.',
  },
  {
    question: 'What research methodologies does Unimrkt use?',
    answer: 'Unimrkt uses methodologies such as CATI, CAWI, face-to-face interviews, in-depth interviews, focus groups, secondary desk research, panel recruitment, and custom data analytics, depending on the project requirements.',
  },
  {
    question: 'How do case studies demonstrate the impact of research?',
    answer: 'Case studies explain how research findings help businesses understand their markets, identify opportunities, evaluate customer needs, reduce uncertainty, and make data-driven strategic decisions.',
  },
  {
    question: 'Can Unimrkt conduct a similar research project for my business?',
    answer: 'Yes. Unimrkt can develop a customized research solution based on your business objectives, target audience, industry, geography, and budget. Contact our team to discuss your requirements and explore a suitable research approach.',
  },
];

export default function CaseStudyFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
