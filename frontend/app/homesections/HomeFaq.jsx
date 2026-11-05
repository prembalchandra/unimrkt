'use client';

import React, { useState } from 'react';

const homeFaqs = [
  {
    question: 'What market research services does Unimrkt offer?',
    answer:
      'Unimrkt Research offers end-to-end market research solutions, including primary research (CATI, CAWI, and face-to-face surveys), qualitative research, secondary research, global panel recruitment, data collection, and custom data analytics to help businesses make informed decisions.',
  },
  {
    question: 'What industries does Unimrkt serve?',
    answer:
      'Unimrkt serves a wide range of industries, including healthcare and pharmaceuticals, banking and financial services, information technology, consumer goods, automotive, retail, media, telecommunications, and B2B sectors. Our research solutions are customized to meet each industry’s unique requirements.',
  },
  {
    question: 'What is Unimrkt’s global research reach?',
    answer:
      'Unimrkt Research supports international market research projects across 90+ countries, covering North America, Europe, Asia-Pacific, Latin America, and the Middle East and Africa. Our global network helps businesses understand local markets and diverse audiences.',
  },
  {
    question: 'How does Unimrkt ensure data quality and reliability?',
    answer:
      'Unimrkt follows a rigorous quality assurance process that includes respondent validation, duplicate response detection, data consistency checks, survey monitoring, and manual quality reviews to help deliver accurate, reliable, and actionable research insights.',
  },
  {
    question: 'Why choose Unimrkt as your research partner?',
    answer:
      'Unimrkt combines global research capabilities, experienced research professionals, flexible methodologies, and a strong focus on data quality. We deliver customized research solutions and actionable insights to help businesses reduce uncertainty and make confident strategic decisions.',
  },
];

export default function HomeFaq({ dynamicFaq = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  const activeFaqs =
    dynamicFaq && Array.isArray(dynamicFaq.items) && dynamicFaq.items.length > 0
      ? dynamicFaq.items
      : homeFaqs;
  const heading = dynamicFaq?.heading || 'Frequently Asked Questions';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative lg:!pb-[92px] lg:!pt-[114.5px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[719px] overflow-hidden"
        aria-hidden="true"
      >
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

      <div className="mx-auto flex w-full max-w-container flex-col items-center px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize !leading-[1.2] lg:tracking-[-3px] text-heading text-center">
          {heading}
        </h2>
        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-4">
          {activeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-faq border border-[#f9edf8] bg-white shadow-faq transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
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
