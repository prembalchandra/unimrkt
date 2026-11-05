import React from 'react';

export default function IndustriesAbout() {
  return (
    <section className="bg-[#f9f9f7] py-16 lg:min-h-[758px] lg:pb-12 lg:pt-0">
      <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-0 lg:px-8 lg:pt-[92px] min-[1580px]:px-0">
        <div className="min-w-0 lg:max-w-[849px] lg:flex-1">
          <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
            Our Industries
          </p>
          <h2 className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] max-w-[723px] text-[#02060e]">
            Understanding Industries. Uncovering Opportunities.
          </h2>
          <div className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] text-[#02060e] opacity-80">
            <p className="mb-[30.4px]">
              Every industry operates within a unique ecosystem shaped by customer expectations, market trends, competition, technology and regulatory changes. Unimrkt Research helps organizations understand these dynamics through industry-focused research designed around specific business questions and objectives.
            </p>
            <p className="mb-[30.4px]">
              Our research explores market opportunities, customer behavior, competitive landscapes, emerging trends, product preferences and changing industry needs. By combining primary, qualitative, quantitative and business research capabilities, we provide a comprehensive view of the markets and audiences that matter most.
            </p>
            <p>
              From established sectors to emerging markets, our approach can be adapted to different industries, geographies and audiences. We bring together industry context, reliable data and meaningful analysis to help businesses identify opportunities, understand challenges and make informed strategic decisions with greater confidence.
            </p>
          </div>
        </div>

        <div
          className="relative mx-auto aspect-[602/645] w-[clamp(277px,calc(100vw-2rem),420px)] shrink-0 [container-type:inline-size] lg:ml-8 lg:mt-[-36px] lg:w-[clamp(340px,36vw,602px)] xl:ml-[49px]"
          aria-hidden="true"
        >
          <img
            alt=""
            loading="lazy"
            width="597.574"
            height="597.574"
            decoding="async"
            className="absolute max-w-none"
            style={{
              color: 'transparent',
              left: '0.0714cqw',
              top: '7.9037cqw',
              width: '99.2648cqw',
              height: '99.2648cqw',
            }}
            src="/icons/industries/intro-ring-outer.svg"
          />
          <img
            alt=""
            loading="lazy"
            width="539.627"
            height="539.627"
            decoding="async"
            className="absolute max-w-none"
            style={{
              color: 'transparent',
              left: '4.8837cqw',
              top: '12.7159cqw',
              width: '89.6390cqw',
              height: '89.6390cqw',
            }}
            src="/icons/industries/intro-ring-inner.svg"
          />
          <div
            className="absolute -scale-x-100 overflow-hidden"
            style={{
              left: '5.9801cqw',
              top: '0.1661cqw',
              width: '94.0199cqw',
              height: '107.3090cqw',
              maskImage: 'url(/icons/industries/intro-circle-mask.svg)',
              WebkitMaskImage: 'url(/icons/industries/intro-circle-mask.svg)',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: '-1.0968cqw 12.5498cqw',
              WebkitMaskPosition: '-1.0968cqw 12.5498cqw',
              maskSize: '89.6390cqw 89.6390cqw',
              WebkitMaskSize: '89.6390cqw 89.6390cqw',
            }}
          >
            <img
              alt=""
              loading="lazy"
              width="1424"
              height="949"
              decoding="async"
              className="absolute left-[-14.59%] top-[-27.42%] h-[146.81%] w-[251.57%] max-w-none"
              style={{ color: 'transparent' }}
              src="/uploads/industries_worker_cutout_1aadd8e76c.webp"
            />
          </div>
          <div
            className="absolute -scale-x-100 overflow-hidden"
            style={{
              left: '5.9801cqw',
              top: 0,
              width: '94.0199cqw',
              height: '91.5282cqw',
            }}
          >
            <img
              alt="Understanding Industries. Uncovering Opportunities."
              loading="lazy"
              width="1424"
              height="949"
              decoding="async"
              className="absolute left-[-14.59%] top-[-32.18%] h-[172.25%] w-[251.57%] max-w-none"
              style={{ color: 'transparent' }}
              src="/uploads/industries_worker_cutout_1aadd8e76c.webp"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
