'use client';

import React from 'react';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function ContactHero({ dynamicHero = null }) {
  const kicker = dynamicHero?.kicker || 'Contact Us';
  const title =
    dynamicHero?.title || 'Let’s Turn Your Business Questions Into Clear Answers';
  const description =
    dynamicHero?.description ||
    'Tell us what you’re trying to understand. Our research experts will help you find the right path forward.';
  const primaryBtnLabel = dynamicHero?.primaryButton?.label || 'Start a Conversation';
  const primaryBtnUrl = dynamicHero?.primaryButton?.url || '#contact-form';
  const bannerImage = getStrapiMediaUrl(
    dynamicHero?.bannerImage,
    '/images/contact/contact-hero-photo.jpg'
  );

  return (
    <section className="relative w-full bg-[#040112] text-white lg:min-h-[768px]">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-0 top-[-15.2%] h-[153.8%] w-[104.4%] opacity-70">
          <img
            alt={title}
            fetchPriority="high"
            decoding="async"
            className="object-cover object-right"
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
        </div>
        <div className="absolute inset-0 bg-[#010913]/40"></div>
        <div
          className="absolute inset-y-0 left-0 w-[1064px] max-w-full opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to left, rgba(0,0,0,0) 0%, #02050e 63%)',
          }}
        ></div>
        <div
          className="absolute inset-x-0 top-0 h-[255px] opacity-90"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)',
          }}
        ></div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-16 lg:pt-[261px] min-[1500px]:px-0">
        <p className="inline-flex h-10 items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
          <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true"></span>
          {kicker}
        </p>
        <h1 className="mt-[14.5px] max-w-[828px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
          {title}
        </h1>
        <p className="mt-[12.8px] max-w-[818px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">
          {description}
        </p>
        <div className="mt-8 lg:mt-[49.3px]">
          <a
            href={primaryBtnUrl}
            className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-gradient-from to-gradient-to text-white hover:brightness-110 focus-visible:ring-brand-600"
          >
            {primaryBtnLabel}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden="true">
              <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
