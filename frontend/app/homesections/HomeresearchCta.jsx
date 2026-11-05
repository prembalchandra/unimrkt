import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function HomeresearchCta({ dynamicCta = null }) {
  const title = dynamicCta?.title || 'Global Research Panel';
  const desc =
    dynamicCta?.description ||
    'Access a diverse network of verified respondents across multiple countries, demographics, and industries, enabling reliable market research, faster data collection, and meaningful insights at a global scale.';
  const btnLabel = dynamicCta?.button?.label || 'Explore Our Global Panel';
  const btnUrl = dynamicCta?.button?.url || '/contact';

  const bgImage = getStrapiMediaUrl(
    dynamicCta?.visualImage,
    '/uploads/global_panel_bg_fc36ba001a.jpg'
  );

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-ink-900 text-white relative overflow-hidden lg:flex lg:min-h-[567px] lg:flex-col lg:!pb-0 lg:!pt-[168px]"
      style={{ backgroundColor: '#0b0c0e' }}
      id="cta"
    >
      <img
        alt={title}
        loading="lazy"
        decoding="async"
        className="object-cover lg:object-[50%_41%]"
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
        src={bgImage}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[#010913]/75"
        aria-hidden="true"
      ></div>
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-[875px] text-center">
          <h2 className="text-3xl font-semibold capitalize !leading-[1.14] tracking-[-0.04em] text-white sm:text-4xl lg:text-[50px]">
            {title}
          </h2>
          <p className="mt-3 text-base font-medium leading-[2.1] text-white lg:mt-[12.8px]">
            {desc}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:mt-[51px]">
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
