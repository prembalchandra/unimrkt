import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function ServicesHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'OUR SERVICES';
  const title = dynamicHero?.title || 'Research Solutions That Drive Business Growth';
  const description =
    dynamicHero?.description ||
    'Helping organizations transform data into actionable insights through comprehensive market research and business intelligence.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label || 'Get a Free Quote';
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '/contact';
  const secondaryBtnLabel = dynamicHero?.secondaryButton?.label || 'Talk to Our Experts';
  const secondaryBtnUrl = dynamicHero?.secondaryButton?.url || '/contact';

  const bannerImage = getStrapiMediaUrl(
    dynamicHero?.bannerImage,
    '/uploads/hero_photo_a0a6ba6940.jpg'
  );

  return (
    <section className="relative flex min-h-[480px] w-full items-center overflow-hidden text-white sm:min-h-[560px] lg:min-h-[640px]">
      <img
        alt={title}
        fetchPriority="high"
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
        src={bannerImage}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
      <div className="relative z-10 mx-auto w-full max-w-container px-4 pt-32 sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
          <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true"></span>
          {kicker}
        </p>
        <h1 className="mt-3 max-w-[748px] capitalize text-4xl font-semibold leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
          {title}
        </h1>
        <p className="mt-6 max-w-[708px] text-base leading-[1.9] text-white/85 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
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
            className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-white text-ink hover:bg-slate-100 focus-visible:ring-brand-600"
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
