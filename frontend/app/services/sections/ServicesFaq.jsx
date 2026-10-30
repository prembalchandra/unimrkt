'use client';

import React, { useState } from 'react';

const defaultFaqs = [
  {
    question: 'What research services does Unimrkt Research offer?',
    answer: 'Unimrkt Research offers comprehensive end-to-end market research services, including primary research, qualitative research (focus groups, in-depth interviews), quantitative research (CATI, online surveys), business research, competitive intelligence, and specialized research support functions across 90+ countries.'
  },
  {
    question: 'How does Unimrkt choose the right research methodology?',
    answer: 'We evaluate your specific business objectives, target audience demographics, geographic scope, timeline, and data depth requirements. Based on these factors, our research specialists recommend the most effective methodology—whether qualitative, quantitative, or a blended hybrid approach—to ensure actionable, high-quality insights.'
  },
  {
    question: 'What is the difference between qualitative and quantitative research?',
    answer: 'Qualitative research focuses on understanding the underlying motivations, perceptions, and attitudes through open-ended methods like focus groups and in-depth interviews. Quantitative research measures attitudes, opinions, and behaviors at scale using structured questionnaires, numerical data, and statistical analysis for conclusive decision-making.'
  },
  {
    question: 'Can Unimrkt conduct research across different industries?',
    answer: 'Yes, we have extensive industry expertise across diverse sectors including Automotive & Mobility, Healthcare & Life Sciences, Banking & Financial Services, Consumer & Retail, Technology & SaaS, Energy & Utilities, and Industrial B2B markets worldwide.'
  },
  {
    question: 'Does Unimrkt provide primary market research?',
    answer: 'Yes, primary market research is a core capability at Unimrkt. We collect firsthand data directly from target consumers, B2B executives, healthcare professionals, and niche decision-makers through tailored qualitative and quantitative methodologies.'
  },
  {
    question: 'Does Unimrkt conduct research across multiple markets and geographies?',
    answer: 'Absolutely. We operate across 90+ countries in the Americas, Europe, APAC, the Middle East, and Africa, supporting 22+ languages with native-speaking interviewers and localized survey instruments to ensure culturally accurate and reliable data.'
  },
  {
    question: 'Can Unimrkt customize a research solution for a specific business requirement?',
    answer: 'Yes. Every business challenge is unique, and we tailor research frameworks, questionnaires, sampling strategies, and analytical reporting to align precisely with your strategic goals and decision-making requirements.'
  }
];

export default function ServicesFaq({ dynamicFaq = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const heading = dynamicFaq?.heading || 'Frequently Asked Questions';
  const faqList =
    dynamicFaq?.items && dynamicFaq.items.length > 0 ? dynamicFaq.items : defaultFaqs;

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
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                <div className="faq-accordion-header" onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-indicator" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>

                <div
                  className="faq-accordion-body"
                  style={{
                    display: isOpen ? 'block' : 'none',
                    padding: isOpen ? '16px 20px' : '0 20px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
