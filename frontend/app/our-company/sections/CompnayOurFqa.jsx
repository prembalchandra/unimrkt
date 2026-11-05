'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const defaultFaqs = [
  {
    question: 'What does Unimrkt Research do?',
    answer:
      'We are a global market research and consulting firm helping organizations understand markets, consumers, and emerging opportunities through primary and secondary research, data analytics, and strategic consulting.',
  },
  {
    question: 'How many countries and languages do you operate across?',
    answer:
      'We conduct market research in 90+ countries across four continents and operate in 22+ languages, enabling businesses to collect culturally relevant and accurate data worldwide.',
  },
  {
    question: 'What quality standards does Unimrkt Research follow?',
    answer:
      'Unimrkt adheres to rigorous quality benchmarks including ISO 20252 and ISO 27001 standards, alongside compliance with global market research ethics guidelines such as ESOMAR.',
  },
  {
    question: 'What industries does Unimrkt Research serve?',
    answer:
      'We serve a diverse range of industries including Healthcare, Automotive, Consumer Goods, Technology, Financial Services, B2B Industrial, Retail, and Media & Entertainment.',
  },
  {
    question: 'How is Unimrkt Research different from other research firms?',
    answer:
      'We combine expansive global coverage with deep localized understanding, proprietary field stations, multi-lingual capabilities, and a human-centered approach to deliver actionable business intelligence.',
  },
];

export default function CompnayOurFqa({ dynamicFaq = null }) {
  const heading = dynamicFaq?.heading || 'Frequently Asked Questions';
  const displayFaqs =
    dynamicFaq?.items && dynamicFaq.items.length > 0
      ? dynamicFaq.items
      : defaultFaqs;

  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        src="/mock/faq-worldmap-bg.svg"
      />
      <div className="relative mx-auto flex w-full max-w-container flex-col items-center px-4 sm:px-6 lg:px-8">
        <Link
          className="inline-flex h-[60px] items-center justify-center gap-2 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-transform hover:brightness-110"
          href="/blogs"
        >
          Browse Blogs
        </Link>
        <h2 className="mt-6 max-w-3xl text-center capitalize text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[50px] lg:tracking-[-3px]">
          {heading}
        </h2>
        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-4">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-faq border border-[#f9edf8] bg-white shadow-faq transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-accent text-lg font-bold text-faq-text">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-faq-text">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 transition-transform duration-200"
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <path
                          d="M5 12h14"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        ></path>
                      ) : (
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        ></path>
                      )}
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed opacity-80 text-heading">
                      {faq.answer}
                    </p>
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
