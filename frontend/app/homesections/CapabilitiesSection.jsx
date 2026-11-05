'use client';

import React, { useState } from 'react';

const statsData = [
  {
    number: '250000+',
    label: 'CATI Surveys Completed Every Year',
    desc: 'Delivering reliable insights through 250,000+ CATI surveys conducted annually across global markets.',
    image: '/uploads/stat_cati_surveys_e8b384b390.jpg',
  },
  {
    number: '500+',
    label: 'Advanced CATI Workstations',
    desc: 'Equipped to deliver high-volume, accurate, and efficient telephone research nationwide, supported by advanced technology, skilled interviewers, and robust quality control processes.',
    image: '/uploads/stat_cati_stations_5a1dabbd81.jpg',
  },
  {
    number: '16+ Years',
    label: 'Of Experience',
    desc: 'Delivering trusted research excellence for over 16 years.',
    image: '/uploads/stat_experience_500090bf55.jpg',
  },
];

export default function CapabilitiesSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 lg:pb-0 lg:pt-[44px]">
      <div className="mx-auto w-full max-w-[960px] px-4 sm:px-6 lg:max-w-[1040px] lg:px-0">
        <div>
          {statsData.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div key={idx}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isHovered}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setHoveredIdx(isHovered ? null : idx)}
                  className={`group relative cursor-pointer overflow-hidden py-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600/40 lg:h-[170px] lg:py-0 lg:pl-6 lg:pt-[34px] transition-colors duration-300 ${
                    idx > 0 ? 'border-t-[3px] border-stat-divider' : ''
                  }`}
                >
                  {/* Wave texture on hover */}
                  <img
                    src="/figma-home/stats-wave.png"
                    alt=""
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-[350ms] ease-in-out ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Left Column: Number & Label */}
                  <div className="relative transition-transform duration-[350ms] ease-in-out">
                    <div className="relative w-fit origin-left whitespace-nowrap font-display text-[clamp(2.5rem,4.5vw,4.5rem)] uppercase leading-[0.85] tracking-[1px] lg:scale-x-[0.815]">
                      <p
                        className={`transition-colors duration-300 ${
                          isHovered ? 'text-transparent' : 'text-stat-number'
                        }`}
                      >
                        {item.number}
                      </p>
                      <p
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-[0.2em] -top-[0.2em] py-[0.2em] bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent transition-opacity duration-[350ms] ease-in-out ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {item.number}
                      </p>
                    </div>
                    <p
                      className={`mt-[10px] font-sans text-base font-semibold capitalize leading-[1.2] text-heading transition-all duration-[350ms] ease-in-out lg:text-[18px] ${
                        isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-70'
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>

                  {/* Desktop Middle Description & Right Image */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-[350ms] ease-in-out lg:contents ${
                      isHovered ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden lg:contents">
                      <div className="relative flex flex-col gap-4 pt-4 lg:contents">
                        <div className="lg:absolute lg:inset-y-0 lg:left-[43.18%] lg:flex lg:w-[25.33%] lg:items-center">
                          <p
                            className={`min-w-0 font-sans text-sm font-normal leading-[1.9] text-heading/80 xl:text-base transition-all duration-[350ms] ease-in-out ${
                              isHovered
                                ? 'translate-x-0 opacity-100'
                                : 'translate-x-3 opacity-0 pointer-events-none'
                            }`}
                          >
                            {item.desc}
                          </p>
                        </div>
                        <div className="lg:absolute lg:inset-y-0 lg:right-[2.9%] lg:flex lg:w-[23.14%] lg:items-center">
                          <div
                            className={`relative aspect-[330.64/176] w-full max-w-[331px] overflow-hidden rounded-[8px] shadow-sm transition-all duration-[350ms] ease-in-out lg:max-w-none ${
                              isHovered
                                ? 'translate-x-0 opacity-100'
                                : 'translate-x-3 opacity-0 pointer-events-none'
                            }`}
                          >
                            <img
                              alt={item.label}
                              loading="lazy"
                              decoding="async"
                              className="object-cover size-full"
                              src={item.image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
