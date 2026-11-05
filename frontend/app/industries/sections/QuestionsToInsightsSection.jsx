'use client';

import React, { useState } from 'react';

const pillars = [
  {
    id: 1,
    title: 'Market Opportunity',
    icon: '/icons/industries/q-globe.svg',
    description:
      'Identifying emerging trends, unmet needs and changing customer expectations to uncover opportunities for growth. Our research helps businesses understand market potential, assess competitive dynamics and identify the spaces where new products, services and strategies can create meaningful value.',
  },
  {
    id: 2,
    title: 'Consumer Behavior',
    icon: '/icons/industries/q-user.svg',
    description:
      'Exploring customer motivations, purchase triggers, and satisfaction metrics across touchpoints to understand what drives adoption and brand loyalty.',
  },
  {
    id: 3,
    title: 'Competitive Landscape',
    icon: '/icons/industries/q-ranking.svg',
    description:
      'Benchmarking product offerings, pricing structures, and positioning to pinpoint competitive strengths, weaknesses, and underserved market niches.',
  },
  {
    id: 4,
    title: 'Product & Innovation',
    icon: '/icons/industries/q-product.svg',
    description:
      'Concept validation, feature prioritization, pricing models, and usability testing to ensure products launch with high product-market fit.',
  },
  {
    id: 5,
    title: 'Customer Experience',
    icon: '/icons/industries/q-review.svg',
    description:
      'Mapping customer journeys from first awareness to post-purchase engagement, identifying friction points and areas to maximize lifetime customer value.',
  },
  {
    id: 6,
    title: 'Future Trends',
    icon: '/icons/industries/q-trend.svg',
    description:
      'Anticipating regulatory shifts, technology disruptions, and long-term macro trends so leadership can position their business ahead of curve.',
  },
];

export default function QuestionsToInsightsSection() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="bg-white pb-16 pt-16 lg:min-h-[1206px] lg:pb-0 lg:pt-[93.6px]">
      <header className="mx-auto flex flex-col items-center text-center px-4 sm:px-6">
        <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
          What We Help You Understand
        </p>
        <h2
          className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-[#02060e]"
          style={{ maxWidth: '658px' }}
        >
          From Questions to Insights
        </h2>
        <div
          className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] opacity-80 text-[#02060e]"
          style={{ maxWidth: '1182px' }}
        >
          Turning complex business questions into clear, actionable insights through structured research, reliable data and thoughtful analysis. We help businesses move beyond information to understand what matters, why it matters and how those insights can support confident decisions.
        </div>
      </header>

      <div className="mx-auto mt-12 flex w-full max-w-[1506px] flex-col gap-10 px-4 sm:px-6 lg:mt-[158.9px] lg:flex-row lg:gap-0 lg:px-8 min-[1560px]:px-0">
        <div className="relative hidden aspect-[666/737] w-[clamp(340px,35vw,666px)] shrink-0 lg:block">
          <img
            alt=""
            loading="lazy"
            width={668}
            height={739}
            className="absolute inset-0 size-full"
            style={{ color: 'transparent' }}
            src="/uploads/industries_woman_panel_bg_6e8aa160aa.png"
          />
          <div className="absolute left-[4.5%] top-[-9.77%] aspect-[590/809] w-[88.6%] overflow-hidden">
            <img
              alt="From Questions to Insights"
              loading="lazy"
              width={1320}
              height={880}
              className="absolute left-[-76.62%] top-[-8.81%] h-[108.81%] w-[223.71%] max-w-none"
              style={{ color: 'transparent' }}
              src="/uploads/industries_woman_cutout_e241ff634e.webp"
            />
          </div>
        </div>

        <ul className="w-full min-w-0 lg:ml-8 lg:max-w-[734px] xl:ml-[56px] lg:flex-1 lg:pt-[34px]">
          {pillars.map((item, idx) => {
            const isOpen = activeId === item.id;
            return (
              <li key={item.id} className={idx > 0 ? 'mt-[20px]' : ''}>
                {idx > 0 && (
                  <div className="-ml-[10px] mb-[20px] hidden h-px w-[calc(100%+10px)] max-w-[763px] bg-[#bbb]/40 lg:block" aria-hidden="true"></div>
                )}
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-start gap-[21px] text-left"
                >
                  <span className="relative mt-0 size-[64px] shrink-0 lg:mt-[6px]" aria-hidden="true">
                    <img alt="" loading="lazy" width={64} height={64} className="absolute inset-0 size-full" src="/icons/industries/q-ring.svg" />
                    <img alt="" loading="lazy" width={34} height={34} className="absolute left-[15px] top-[15px] size-[34px]" src={item.icon} />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className={`block font-sans text-[18px] font-semibold leading-[27px] text-[#04264e] max-lg:flex max-lg:min-h-[64px] max-lg:items-center ${!isOpen ? 'lg:mt-[18.5px]' : ''}`}>
                      {item.title}
                    </span>
                    {isOpen && (
                      <span className="block overflow-hidden transition-all duration-300">
                        <span className="mt-1 block max-w-[620px] lg:mt-[24px] font-sans text-[14px] font-normal leading-[26.6px] text-[#02060e] opacity-70">
                          {item.description}
                        </span>
                      </span>
                    )}
                  </span>
                  <img
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={20}
                    height={20}
                    className={`shrink-0 ${isOpen ? 'mt-[31px] h-[1.7px] w-[19.7px] lg:mt-[44px]' : 'mt-[22px] size-5 lg:mt-[28px]'}`}
                    src={isOpen ? '/icons/industries/q-dash.svg' : '/icons/industries/q-chevron.svg'}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
