import React from 'react';
import Link from 'next/link';

export default function ResearchCta({ dynamicCta = null }) {
  const title = dynamicCta?.title || 'Start Your Research Journey';
  const desc =
    dynamicCta?.description ||
    'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.';
  const btnLabel = dynamicCta?.button?.label || 'Talk to Our Experts';
  const btnUrl = dynamicCta?.button?.url || '/contact';

  return (
    <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-[#101723] px-6 py-16 text-center sm:px-12 lg:py-20">
        <img
          alt=""
          loading="lazy"
          decoding="async"
          className="object-cover opacity-20"
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
          src="/images/blog/hero-bg.jpg"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden="true"
        ></div>
        <div className="relative mx-auto max-w-[819px]">
          <h2 className="capitalize text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[50px] lg:tracking-[-2px]">
            {title}
          </h2>
          <p className="text-base !leading-[1.9] opacity-80 mx-auto mt-4 max-w-2xl text-white/90">
            {desc}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={btnUrl}
              className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none bg-white text-ink hover:bg-slate-100 focus-visible:ring-brand-600"
            >
              {btnLabel}
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
    </section>
  );
}
