import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function ResearchCta({ dynamicCta = null }) {
  const title = dynamicCta?.title || 'Start Your Research Journey';
  const description =
    dynamicCta?.description ||
    'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.';
  const btnLabel = dynamicCta?.button?.label || 'Talk to Our Experts';
  const btnUrl = dynamicCta?.button?.url || '/contact';

  const bgImage = getStrapiMediaUrl(
    dynamicCta?.backgroundImage,
    '/uploads/blog_photo_f2f5b0de06.jpg'
  );

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-6 md:px-12 md:py-24">
        <img
          alt={title}
          loading="lazy"
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
          src={bgImage}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.94))' }}
          aria-hidden="true"
        ></div>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[44px]">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">{description}</p>
          <div className="mt-8 flex justify-center">
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold uppercase tracking-wide text-slate-950 shadow-lg transition-all duration-200 hover:bg-gray-100"
              href={btnUrl}
            >
              {btnLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right size-4"
                aria-hidden="true"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
