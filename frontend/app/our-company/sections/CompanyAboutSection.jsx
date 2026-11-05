import React from 'react';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function CompanyAboutSection({ dynamicRichText = null }) {
  const kicker = dynamicRichText?.kicker || 'About Unimrkt';
  const heading = dynamicRichText?.heading || 'We Turn Questions Into Clarity';
  const bodyText =
    dynamicRichText?.content ||
    'Founded on 6 December 2009, Unimrkt Research has evolved into a trusted global market research partner, conducting multi-industry research across 90 countries and four continents — the Americas, Europe, Asia Pacific, and Africa. With expertise spanning 22+ foreign languages, we connect businesses with diverse audiences and deliver culturally relevant, actionable insights across markets. Our commitment to quality, security, and research integrity is reflected in our adherence to ESOMAR principles and our ISO 20252 and ISO 27001 certifications. Combining global reach, deep industry expertise, robust methodologies, and advanced data collection capabilities, Unimrkt Research helps organizations better understand their markets, customers, and opportunities to make confident, data-driven decisions.';

  const imgUrl = '/uploads/our_company_about_founding_02a86489d1.jpg';

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
              {kicker}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {heading}
            </h2>
            <p className="mt-6 text-base leading-[1.9] text-heading/80">
              {bodyText}
            </p>
          </div>
          <div className="relative aspect-[673/541] overflow-hidden rounded-[24px] bg-slate-100 shadow-md">
            <img
              alt={heading}
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
              src={imgUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
