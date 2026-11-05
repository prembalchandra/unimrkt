'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

const defaultIndustries = [
  {
    title: 'Healthcare & Life Sciences',
    slug: 'healthcare-and-life-sciences',
    desc: 'Delivering research-driven insights that support innovation, patient outcomes, and healthcare advancement.',
    image: '/uploads/industry_healthcare_bdad1c7444.jpg',
  },
  {
    title: 'Banking & Financial Services',
    slug: 'banking-and-financial-services',
    desc: 'Empowering financial institutions with actionable intelligence across retail banking, fintech, and risk management.',
    image: '/uploads/industry_banking_49416162c9.jpg',
  },
  {
    title: 'Retail & Consumer Goods',
    slug: 'retail-and-consumer-goods',
    desc: 'Uncovering evolving consumer preferences, omnichannel purchasing behavior, and market trends to drive brand growth.',
    image: '/uploads/industry_retail_9a08ec9395.jpg',
  },
  {
    title: 'Automotive & Mobility',
    slug: 'automotive-and-mobility',
    desc: 'Accelerating mobility innovation with deep insights into EV adoption, autonomous tech, and connected fleets.',
    image: '/uploads/industry_automotive_9d8c1f73cd.jpg',
  },
];

export default function IndustriesSection({ dynamicIndustries = [] }) {
  const scrollRef = useRef(null);

  const industries = defaultIndustries.map((ind, i) => {
    const dyn = dynamicIndustries[i];
    return {
      title: dyn?.title || ind.title,
      slug: dyn?.slug || ind.slug,
      desc: dyn?.shortDescription || dyn?.description || ind.desc,
      image: dyn?.featuredImage?.url || ind.image,
    };
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#fff_35.5%,#f7f7f4_55.3%)] lg:[container-type:inline-size]">
      <div className="relative px-4 py-12 sm:px-6 lg:h-[51.4211cqw] lg:p-0">
        {/* Navy Header Block */}
        <div
          className="relative overflow-hidden rounded-[30px] bg-[#03121e] p-6 sm:p-10 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:h-[var(--h)] lg:w-[var(--w)] lg:rounded-[2.6316cqw] lg:p-0"
          style={{
            '--l': '4.1053cqw',
            '--t': '0.0000cqw',
            '--w': '91.6842cqw',
            '--h': '34.7368cqw',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 lg:[background-position:-2.5263cqw_-10.1053cqw] lg:[background-size:96.7437cqw_auto]"
            style={{
              backgroundImage: "url('/uploads/industry_cityscape_f926ff60c2.jpg')",
            }}
            aria-hidden="true"
          ></div>
          <div className="pointer-events-none absolute inset-0 bg-[#010913]/20" aria-hidden="true"></div>
          <div
            className="absolute inset-y-0 left-0 w-[45.18%] bg-[linear-gradient(to_left,rgba(6,7,13,0),#06070d_63%)] opacity-65"
            aria-hidden="true"
          ></div>

          <div
            className="relative lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
            style={{
              '--l': '5.6316cqw',
              '--t': '6.5789cqw',
              '--w': '36.8421cqw',
            }}
          >
            <h2
              className="text-3xl font-semibold capitalize !leading-[1.15] tracking-[-0.04em] text-white sm:text-4xl lg:text-[length:var(--fs)]"
              style={{
                '--fs': 'max(13px, 2.6316cqw)',
              }}
            >
              Industries We Serve
            </h2>
            <p
              className="mt-4 max-w-[513px] text-base font-medium leading-[1.9] text-white lg:mt-[0.58cqw] lg:max-w-[27cqw] lg:text-[length:var(--fs)]"
              style={{
                '--fs': 'max(13px, 0.8421cqw)',
              }}
            >
              Helping organizations make smarter decisions through global research expertise and industry insights.
            </p>
            <div className="mt-6 lg:mt-[2.45cqw]">
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
        </div>

        {/* 4 Cards Track */}
        <div
          ref={scrollRef}
          id="industry-grid-track"
          className="relative mt-8 grid gap-6 sm:grid-cols-2 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:mt-0 lg:flex lg:w-[var(--w)] lg:gap-[1.4211cqw] lg:overflow-x-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
          style={{
            '--l': '7.8947cqw',
            '--t': '24.7895cqw',
            '--w': '84.2632cqw',
          }}
        >
          {industries.map((ind, idx) => (
            <Link
              key={idx}
              href={`/industries/${ind.slug}`}
              className="group relative aspect-[380/399] overflow-hidden rounded-[30px] transition-transform hover:-translate-y-1 lg:w-[20cqw] lg:shrink-0 lg:rounded-[1.5789cqw]"
              style={{ backgroundColor: '#7f3856' }}
            >
              <div className="absolute inset-x-[2.63%] top-[2.51%] bottom-[23.31%] overflow-hidden rounded-[27px] bg-white lg:rounded-[1.42cqw]">
                <img
                  alt={ind.title}
                  loading="eager"
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
                  src={ind.image}
                />
                {/* Hover state */}
                <div className="absolute inset-0 flex items-center justify-center bg-white px-[11.1%] py-[6%] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <span
                    className="absolute left-[23.89%] top-[29.39%] h-[43.58%] w-[55%] bg-[#521e4f] opacity-10 [mask-image:url(/figma-home/industry-hover-watermark.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                    aria-hidden="true"
                  ></span>
                  <p className="relative z-10 text-center font-sans text-xs leading-[1.6] text-black opacity-80 lg:text-[clamp(11px,0.7368cqw,14px)]">
                    {ind.desc}
                  </p>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex h-[23.31%] items-center justify-center px-4">
                <p className="text-center font-nav text-xs font-semibold leading-[1.3] text-white lg:text-[clamp(11px,0.8421cqw,16px)]">
                  {ind.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Previous"
          className="hidden lg:flex size-[45px] items-center justify-center rounded-full bg-[#eee] transition-transform hover:scale-105 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]"
          style={{
            '--l': '4.4737cqw',
            '--t': '36.5263cqw',
          }}
        >
          <span
            className="block size-[18px] bg-[#0e1626] [mask-image:url(/figma-home/arrow-mask.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
            aria-hidden="true"
          ></span>
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Next"
          className="hidden lg:flex size-[45px] items-center justify-center rounded-full bg-[#eee] transition-transform hover:scale-105 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]"
          style={{
            '--l': '93.2105cqw',
            '--t': '36.5263cqw',
          }}
        >
          <span
            className="block size-[18px] bg-[#0e1626] [mask-image:url(/figma-home/arrow-mask.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] -scale-x-100"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </section>
  );
}
