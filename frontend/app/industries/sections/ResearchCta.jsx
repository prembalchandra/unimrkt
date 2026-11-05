import React from 'react';
import Link from 'next/link';

export default function ResearchCta({ dynamicCta = null }) {
  const title = dynamicCta?.title || 'Start Your Research Journey';
  const description =
    dynamicCta?.description ||
    'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.';
  const btnLabel = dynamicCta?.button?.label || 'Talk to Our Experts';
  const btnUrl = dynamicCta?.button?.url || '/contact';

  return (
    <section className="bg-white px-4 pb-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1740px]">
        <div className="relative flex min-h-[455px] flex-col items-center overflow-hidden rounded-[40px] bg-[#101723] px-6 pb-16 pt-16 text-center lg:pb-[106px] lg:pt-[108px]">
          <img
            alt=""
            loading="lazy"
            width={1838}
            height={1034}
            decoding="async"
            className="pointer-events-none absolute left-[-96px] top-[-203px] max-w-none opacity-20"
            style={{ color: 'transparent' }}
            src="/uploads/industries_cta_people_fd8c3b25cb.jpg"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[227px] rounded-b-[40px] opacity-70"
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(8,19,32,0) 0%, #081320 63%)' }}
            aria-hidden="true"
          ></div>
          <h2 className="relative font-sans text-[30px] font-semibold capitalize leading-[34px] text-white sm:text-[36px] sm:leading-[41px] lg:text-[50px] lg:leading-[57px] lg:tracking-[-2px]">
            {title}
          </h2>
          <p className="relative mt-[10px] max-w-[819px] font-sans text-[16px] font-medium leading-[33.6px] text-white">
            {description}
          </p>
          <div className="relative mt-9 flex justify-center lg:mt-[47px]">
            <Link
              href={btnUrl}
              className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-white text-ink hover:bg-slate-100 focus-visible:ring-brand-600"
            >
              {btnLabel}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden="true">
                <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
