'use client';

import React, { useState } from 'react';

const defaultFaqItems = [
  {
    id: 1,
    question: 'What services does Unimrkt Research provide?',
    answer:
      'Unimrkt Research provides comprehensive qualitative and quantitative research, secondary research, CATI, CAWI, and online global panel services across B2B and B2C sectors.',
  },
  {
    id: 2,
    question: 'How do I choose the right research service for my project?',
    answer:
      'Our team assesses your business question, target audience, timeline, and decision stakes to recommend the optimal mix of qualitative, quantitative, or blended research methodologies.',
  },
  {
    id: 3,
    question: 'Can Unimrkt Research handle global and multi-country research projects?',
    answer:
      'Yes, we operate in 90+ countries across 22+ languages with in-house native moderators, CATI stations, and vetted global consumer & executive panels.',
  },
  {
    id: 4,
    question: 'Which industries do you serve?',
    answer:
      'We serve Healthcare & Life Sciences, BFSI, Automotive & Mobility, Consumer Goods & Retail, Technology & Telecom, Industrial Manufacturing, and Energy sectors.',
  },
  {
    id: 5,
    question: 'Why choose Unimrkt Research as your research partner?',
    answer:
      'With 16+ years of specialized market research experience, strict ISO 20252 / 27001 data quality controls, and customized consultative support, we turn complex market signals into high-confidence business outcomes.',
  },
];

export default function ServicesFaq({ dynamicFaq = null }) {
  const [openId, setOpenId] = useState(1);

  const rawItems = dynamicFaq?.items || dynamicFaq?.faqItems || defaultFaqItems;
  const items = rawItems.map((item, index) => ({
    id: item.id || index + 1,
    question: item.question || item.title,
    answer: item.answer || item.description || item.content,
  }));

  const heading = dynamicFaq?.heading || 'Frequently Asked Questions';

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <img
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 object-contain opacity-[0.05]"
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          color: 'transparent',
        }}
        src="/uploads/faq_worldmap_bg_63310f1a2e.png"
      />
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize !leading-[1.2] lg:tracking-[-3px] text-heading text-center">
          {heading}
        </h2>
        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4">
          {items.map((e) => {
            const isOpen = openId === e.id;
            return (
              <div key={e.id} className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm transition-all duration-200">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : e.id)}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-lg font-bold text-heading">{e.question}</span>
                  <span className={`shrink-0 text-heading transition-transform duration-200 ${isOpen ? 'rotate-45 text-brand-600' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"></path>
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed opacity-80 text-gray-700">{e.answer}</p>
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
