'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const defaultFaqItems = [
  {
    id: 1,
    question: 'What industries does Unimrkt Research serve?',
    answer:
      'Unimrkt Research serves diverse global industries including Automotive & Mobility, Banking & Financial Services, Healthcare & Pharmaceuticals, Consumer Goods & Retail, Technology & Telecom, Aerospace & Defence, and Energy.',
  },
  {
    id: 2,
    question: 'What research methodologies do you use for industry-specific studies?',
    answer:
      'We combine quantitative telephonic (CATI) and online surveys with qualitative in-depth interviews (IDIs), focus group discussions (FGDs), and secondary desk research tailored to specific industry audiences and regulatory requirements.',
  },
  {
    id: 3,
    question: 'Is your research approach customized for each industry?',
    answer:
      'Yes, every engagement is customized to the target market, stakeholder profile, decision context, and regulatory nuances of your industry sector.',
  },
  {
    id: 4,
    question: 'How does an industry research engagement typically start?',
    answer:
      'It starts with a scoping consultation to define research objectives, target geographies, audience quotas, and timeline, followed by study design and fieldwork execution.',
  },
  {
    id: 5,
    question: 'How do you ensure data quality across different industries?',
    answer:
      'We operate under ISO 20252 and ISO 27001 guidelines with native language moderators, rigorous respondent verification, and multi-tier quality checks on every dataset.',
  },
];

export default function IndustriesFaq({ dynamicFaq = null }) {
  const [openId, setOpenId] = useState(null);

  const rawItems = dynamicFaq?.items || dynamicFaq?.faqItems || defaultFaqItems;
  const items = rawItems.map((item, index) => ({
    id: item.id || index + 1,
    question: item.question || item.title,
    answer: item.answer || item.description || item.content,
  }));

  const heading = dynamicFaq?.heading || 'Frequently Asked Questions';

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-16 lg:h-[986px] lg:pb-0 lg:pt-[43px]">
      <div className="pointer-events-none absolute inset-x-0 top-[93px] h-[719px] overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-71px] h-[787px] w-[1377px] -translate-x-1/2 opacity-[0.08]">
          <img
            alt=""
            loading="lazy"
            decoding="async"
            className="object-cover"
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
            src="/figma-home/faq-worldmap.png"
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center px-4 sm:px-6">
        <Link
          className="inline-flex h-[60px] w-[222px] items-center justify-center gap-1 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition-[filter] duration-300 ease-in-out hover:brightness-110"
          href="/blogs"
        >
          Browse Blogs
        </Link>
        <h2 className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[43px] text-center text-[#02060e]">
          {heading}
        </h2>
        <div className="mt-[44.9px] flex w-full max-w-[1160px] flex-col gap-4">
          {items.map((e) => {
            const isOpen = openId === e.id;
            return (
              <div
                key={e.id}
                className="rounded-[14px] border border-[#f9edf8] bg-white shadow-[0px_8px_14px_0px_rgba(235,235,241,0.7)] transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : e.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-[88px] w-full items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <span className="font-accent text-[18px] font-bold leading-[22.68px] text-[#280c27]">
                    {e.question}
                  </span>
                  <span
                    className={`flex size-[30px] shrink-0 items-center justify-center text-[#280c27] transition-transform duration-200 ${
                      isOpen ? 'rotate-45 text-brand-600' : ''
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-[22.5px]" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"></path>
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-7 pb-6 text-sm leading-relaxed text-[#475569]">
                    {e.answer}
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
