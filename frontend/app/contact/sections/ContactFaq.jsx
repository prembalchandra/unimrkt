'use client';

import React, { useState } from 'react';

const defaultFaqs = [
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
      'Unimrkt Research serves clients across multiple markets with global offices in Gurugram (India), Great Neck, NY (USA), and Headington, Oxford (UK).',
  },
  {
    question: 'How can I work with Unimrkt Research?',
    answer:
      'If you are interested in working with Unimrkt Research, you can explore career opportunities through our careers page. For business partnerships or research projects, contact our team to discuss available opportunities and collaboration possibilities.',
  },
];

export default function ContactFaq({ dynamicFaq = null }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const heading = dynamicFaq?.heading || 'Frequently Asked Questions';
  const displayFaqs =
    dynamicFaq?.items && dynamicFaq.items.length > 0 ? dynamicFaq.items : defaultFaqs;

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24 lg:!pb-[70px] lg:!pt-[96.5px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[719px] overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-71px] h-[787px] w-[1377px] -translate-x-1/2 opacity-[0.08]">
          <img
            alt=""
            src="/figma-home/faq-worldmap.png"
            className="size-full object-cover"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1050px] px-4 sm:px-6">
        <h2 className="text-center font-sans text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#02060e] sm:text-[40px] lg:text-[48px]">
          {heading}
        </h2>

        <div className="mt-10 flex flex-col gap-4 lg:mt-12">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-[16px] border border-[#e0e0df] bg-white shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between p-6 text-left font-sans text-[18px] font-semibold text-[#04264e] transition-colors hover:text-brand-600 sm:text-[20px]"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`ml-4 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f9f9f7] text-[#04264e] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-brand-50 text-brand-600' : ''
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 font-sans text-[15px] leading-[1.7] text-black/75">
                    <p>{faq.answer}</p>
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
