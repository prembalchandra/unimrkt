'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const defaultCards = [
  {
    title: 'Research Support',
    slug: 'research-support',
    desc: 'Dedicated project management and fieldwork operations that keep every study on schedule and on spec.',
    style: {
      '--l': '0.0000cqw',
      '--w': '17.4737cqw',
      '--h': '6.0000cqw',
      '--hx': '13.6842cqw',
    },
  },
  {
    title: 'Qualitative Research',
    slug: 'qualitative-research',
    desc: 'Uncovering the deeper motivations and perspectives of consumers and professionals through targeted discussions.',
    style: {
      '--l': '46.4737cqw',
      '--w': '17.4737cqw',
      '--h': '6.0000cqw',
      '--hx': '13.6842cqw',
    },
  },
  {
    title: 'Quantitative Research',
    slug: 'quantitative-research',
    desc: 'Structured, large-scale data collection delivering measurable, statistically sound market evidence.',
    style: {
      '--l': '64.7368cqw',
      '--w': '17.4737cqw',
      '--h': '6.0000cqw',
      '--hx': '13.6842cqw',
    },
  },
  {
    title: 'Business Research',
    slug: 'business-research',
    desc: 'Strategic intelligence on markets, competitors, and industry trends to guide high-stakes business choices.',
    style: {
      '--l': '83.0000cqw',
      '--w': '17.0000cqw',
      '--h': '6.0000cqw',
      '--hx': '13.6842cqw',
    },
  },
];

export default function SolutionsSection({ dynamicServices = [] }) {
  const [activeIdx, setActiveIdx] = useState(null);

  const cards = defaultCards.map((c, i) => {
    const dynamicItem = dynamicServices[i];
    return {
      title: dynamicItem?.title || c.title,
      slug: dynamicItem?.slug || c.slug,
      desc: dynamicItem?.shortDescription || dynamicItem?.description || c.desc,
      style: c.style,
    };
  });

  return (
    <section className="relative overflow-hidden bg-[#0b0c0e] text-white xl:[container-type:inline-size]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center xl:[background-position:-5.42cqw_-6.68cqw] xl:[background-size:154.84cqw_auto]"
        style={{
          backgroundImage: "url('/uploads/services_earth_36af66b701.jpg')",
        }}
        aria-hidden="true"
      ></div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#010913]/60"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 px-4 py-16 sm:px-6 sm:py-20 xl:h-[34.5789cqw] xl:p-0">
        <div className="grid gap-6 md:grid-cols-2 md:items-end lg:grid-cols-4 xl:block">
          {/* Main Burgundy Banner Card */}
          <div
            className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to p-8 md:col-span-2 lg:col-span-4 xl:h-[var(--h)] xl:p-0 xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:w-[var(--w)]"
            style={{
              '--l': '18.6316cqw',
              '--t': '0.0000cqw',
              '--w': '26.8421cqw',
              '--h': '34.5789cqw',
            }}
          >
            <img
              src="/figma-home/services-gradient-wallpaper.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
            />
            <h2
              className="relative text-3xl font-semibold capitalize !leading-[1.15] tracking-[-0.0208em] text-white sm:text-4xl xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:w-[var(--w)] xl:text-[length:var(--fs)]"
              style={{
                '--l': '3.3684cqw',
                '--t': '5.9474cqw',
                '--w': '19.3684cqw',
                '--fs': 'max(13px, 2.5263cqw)',
              }}
            >
              Research Solutions That Drive Growth
            </h2>
            <p
              className="relative mt-4 text-base font-medium leading-[1.9] text-white/90 xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:mt-0 xl:w-[var(--w)] xl:text-[length:var(--fs)]"
              style={{
                '--l': '3.3684cqw',
                '--t': '15.2105cqw',
                '--w': '19.3684cqw',
                '--fs': 'max(13px, 0.8421cqw)',
              }}
            >
              Delivering end-to-end research solutions that transform data into confident business decisions, enabling organizations to uncover opportunities, understand markets, and drive sustainable growth.
            </p>
            <div
              className="relative mt-6 xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:mt-0"
              style={{
                '--l': '3.3684cqw',
                '--t': '25.3684cqw',
              }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none bg-white text-ink hover:bg-slate-100 focus-visible:ring-brand-600"
              >
                Talk to Our Experts
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7v8"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* 4 Interactive Service Cards */}
          {cards.map((card, idx) => {
            const isActive = activeIdx === idx;
            return (
              <Link
                key={card.title}
                href={`/services/${card.slug}`}
                data-active={isActive ? 'true' : 'false'}
                onClick={(e) => {
                  if (window.innerWidth < 1280) {
                    if (!isActive) {
                      e.preventDefault();
                      setActiveIdx(idx);
                    }
                  }
                }}
                className="group pointer-events-auto relative z-10 flex cursor-pointer min-h-[155px] flex-col justify-end gap-3 md:min-h-[172px] xl:min-h-0 rounded-t-[5px] bg-[#160415]/50 p-6 backdrop-blur-glass xl:absolute xl:bottom-[0.0526cqw] xl:left-[var(--l)] xl:h-[var(--h)] xl:w-[var(--w)] xl:p-0 xl:transition-[height] xl:duration-300 xl:ease-in-out xl:hover:h-[var(--hx)]"
                style={card.style}
              >
                <h3
                  className="font-nav text-[21px] font-semibold capitalize leading-[1.24] text-white xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:text-[length:var(--fs)]"
                  style={{
                    '--l': '2.1053cqw',
                    '--t': '1.4211cqw',
                    '--fs': 'max(13px, 1.1053cqw)',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="relative text-sm font-medium leading-[1.6] text-white/80 transition-[opacity,transform,max-height] duration-300 ease-in-out motion-reduce:transition-none [@media(hover:hover)]:md:max-h-0 [@media(hover:hover)]:md:overflow-hidden [@media(hover:hover)]:md:opacity-0 [@media(hover:hover)]:md:group-hover:max-h-40 [@media(hover:hover)]:md:group-data-[active=true]:max-h-40 [@media(hover:hover)]:md:group-hover:opacity-100 [@media(hover:hover)]:md:group-data-[active=true]:opacity-100 [@media(hover:hover)]:xl:max-h-none [@media(hover:hover)]:xl:overflow-visible lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-40 lg:group-data-[active=true]:max-h-40 lg:group-hover:opacity-100 lg:group-data-[active=true]:opacity-100 xl:max-h-none xl:overflow-visible xl:pointer-events-none xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:w-[var(--w)] xl:translate-y-2 xl:text-[length:var(--fs)] xl:opacity-0 xl:group-hover:translate-y-0 xl:group-data-[active=true]:translate-y-0 xl:group-hover:opacity-100 xl:group-data-[active=true]:opacity-100"
                  style={{
                    '--l': '2.1053cqw',
                    '--t': '3.6842cqw',
                    '--w': '13.2105cqw',
                    '--fs': 'max(13px, 0.7368cqw)',
                  }}
                >
                  {card.desc}
                </p>
                <span
                  className="xl:absolute xl:bottom-[var(--b)] xl:left-[var(--l)] inline-flex items-center text-white/70 group-hover:text-white"
                  style={{
                    '--l': '2.1053cqw',
                    '--b': '1.4211cqw',
                  }}
                >
                  <svg
                    className="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H9M17 7v8"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
