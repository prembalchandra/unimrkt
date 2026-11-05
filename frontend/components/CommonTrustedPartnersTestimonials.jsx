'use client';

import React from 'react';

const testimonials = [
  {
    id: 1,
    title: 'Exceptional Research. Actionable Results.',
    quote:
      'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends. Their insights played a key role in shaping our strategic decisions.',
    author: 'David Anderson',
    role: 'Head of Market Strategy',
  },
  {
    id: 2,
    title: 'A Trusted Extension of Our Team',
    quote:
      'From research design to final reporting, the Unimrkt team demonstrated professionalism, accuracy, and deep industry expertise. Their commitment to quality made them a trusted research partner for our organization.',
    author: 'Jennifer Collins',
    role: 'Director – Customer Insights',
  },
  {
    id: 3,
    title: 'Insights That Drive Better Decisions',
    quote:
      'The team provided high-quality data, meaningful analysis, and actionable recommendations that helped us confidently enter new markets. Their research exceeded our expectations at every stage.',
    author: 'Rajesh Mehta',
    role: 'Vice President – Business Intelligence',
  },
];

export default function CommonTrustedPartnersTestimonials() {
  return (
    <section className="relative bg-white py-16 lg:h-[821px] lg:pb-0 lg:pt-[99.6px]">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[55%] overflow-hidden opacity-[0.06] mix-blend-darken lg:top-[696px] lg:h-[697px]" aria-hidden="true">
        <img
          alt=""
          loading="lazy"
          width={2000}
          height={889}
          className="absolute left-[-0.03%] top-0 h-[121.23%] w-[100.05%] max-w-none object-cover object-left-top"
          style={{ color: 'transparent' }}
          src="/images/industries/client-waves.png"
        />
      </div>
      <header className="mx-auto flex flex-col items-center text-center relative px-4 sm:px-6">
        <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
          Client Success Stories
        </p>
        <h2 className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-[#02060e]" style={{ maxWidth: '704px' }}>
          Trusted Research Partner for Businesses Worldwide
        </h2>
      </header>

      <ul className="relative mt-[29.9px] flex snap-x snap-mandatory scroll-px-4 gap-8 overflow-x-auto sm:scroll-px-6 scroll-smooth px-4 pb-6 pt-4 [scrollbar-width:none] sm:px-6 lg:scroll-pl-[max(32px,calc(50vw-800px))] lg:pl-[max(32px,calc(50vw-800px))] lg:pr-8 [&::-webkit-scrollbar]:hidden">
        {testimonials.map((item) => (
          <li
            key={item.id}
            className="w-[85vw] shrink-0 cursor-pointer snap-start rounded-[24px] border border-[#eee] bg-white pb-[34px] pl-[48px] pr-[48px] pt-[47px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl sm:w-[590px] lg:min-h-[385px]"
          >
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={50}
              height={34}
              className="h-[34px] w-[50px]"
              style={{ color: 'transparent' }}
              src="/icons/industries/quote.svg"
            />
            <h3 className="mt-[22.7px] font-sans text-[21px] font-semibold leading-[28.14px] text-[#04264e]">
              {item.title}
            </h3>
            <p className="mt-[19.5px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70 lg:pr-[8px]">
              {item.quote}
            </p>
            <p className="mt-[37.3px] font-sans text-[16px] font-semibold leading-[21.44px] text-[#04264e]">
              {item.author}
            </p>
            <p className="mt-[8px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">
              {item.role}
            </p>
          </li>
        ))}
      </ul>

      <div className="relative mt-[1px] flex justify-center">
        <div className="flex items-center" role="tablist" aria-label="Slide navigation">
          <span className="block h-[15px] w-8 rounded-[40px] bg-[#b63a40]"></span>
          <span className="ml-2 block size-[15px] rounded-full bg-[#e2e2e2]"></span>
          <span className="ml-2 block size-[15px] rounded-full bg-[#e2e2e2]"></span>
        </div>
      </div>
    </section>
  );
}
