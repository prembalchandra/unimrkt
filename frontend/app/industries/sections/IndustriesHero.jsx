import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function IndustriesHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'Industries We Serve';
  const titleLine1 = 'Industry Expertise.';
  const titleLine2 = 'Insights That Drive Growth.';
  const description =
    dynamicHero?.description ||
    'Data-driven market research solutions tailored to the unique challenges of your industry.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label || 'Explore Industries';
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '#industries-grid';
  const secondaryBtnLabel = dynamicHero?.secondaryButton?.label || 'Talk to Our Experts';
  const secondaryBtnUrl = dynamicHero?.secondaryButton?.url || '/contact';

  const bannerImage = getStrapiMediaUrl(
    dynamicHero?.bannerImage,
    '/uploads/industries_hero_3d22e9bd59.webp'
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#040112] text-white lg:h-[768px]">
      <img
        alt=""
        fetchPriority="high"
        width="2645"
        height="1487"
        decoding="async"
        className="pointer-events-none absolute left-[3.95px] top-[-70.25px] hidden max-w-none opacity-70 lg:block"
        src={bannerImage}
      />
      <img
        alt=""
        loading="lazy"
        decoding="async"
        className="object-cover object-[60%_center] opacity-70 lg:hidden"
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
        src={bannerImage}
      />
      <div className="absolute inset-0 bg-[#010913]/40" aria-hidden="true"></div>
      <div
        className="absolute inset-x-0 top-0 h-[255px] opacity-[0.85]"
        style={{ backgroundImage: 'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)' }}
        aria-hidden="true"
      ></div>
      <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-0 lg:pt-[276px] min-[1500px]:px-0">
        <p className="inline-flex h-10 w-[273px] items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
          <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true"></span>
          {kicker}
        </p>
        <h1 className="mt-[14.5px] max-w-[768px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
          <span className="block">{dynamicHero?.title || titleLine1}</span>
          {!dynamicHero?.title && <span className="block">{titleLine2}</span>}
        </h1>
        <p className="mt-[12.8px] max-w-[757px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">
          {description}
        </p>
        <div className="mt-[44.3px] flex flex-wrap gap-5">
          <Link
            href={primaryBtnUrl}
            className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-gradient-to-r from-gradient-from to-gradient-to text-white hover:brightness-110 focus-visible:ring-brand-600"
          >
            {primaryBtnLabel}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden="true">
              <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </Link>
          <Link
            href={secondaryBtnUrl}
            className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent text-current hover:bg-white/10 focus-visible:ring-brand-600 border border-white"
          >
            {secondaryBtnLabel}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden="true">
              <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
