import React from 'react';
import Link from 'next/link';

export default function GlobalResearchSection({ dynamicData = null }) {
  const kicker = dynamicData?.kicker || 'About Unimrkt';
  const title = dynamicData?.heading || 'Global Research, Local Understanding';
  const description =
    dynamicData?.description ||
    'As a trusted market research company, we partner with forward-thinking organizations to deliver accurate insights, meaningful intelligence, and data-driven strategies that support informed decision-making, sustainable growth, and industry leadership.';

  const years = dynamicData?.metrics?.[1]?.number?.replace(/\D/g, '') || '16';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative scroll-mt-[130px] overflow-hidden pt-24 sm:pt-28 lg:pb-[70px] lg:pt-[96px] min-[1800px]:pt-[73px]">
      <img
        src="/figma-home/waves-texture.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[calc(50%+11.56px)] top-[calc(50%-81px)] h-[1410px] w-[3222px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-50"
      />
      <div className="relative mx-auto flex w-full max-w-[1227px] flex-col px-4 sm:px-6 lg:px-8 min-[1300px]:px-0">
        <div className="text-center">
          <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-brand-600">
            {kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize !leading-[1.2] lg:tracking-[-3px] text-heading mt-2 lg:!tracking-[-1px]">
            <span>Global Research,</span>
            <span>
              {' '}
              <br className="max-sm:hidden" />
              Local Understanding
            </span>
          </h2>
        </div>
        <div className="w-full">
          <div className="relative mx-auto mt-8 aspect-[1227/571] w-full max-w-[880px] overflow-hidden rounded-[4px] shadow-xl md:max-w-[960px] lg:mt-10 lg:max-h-[480px] lg:max-w-[1040px] bg-gradient-to-r from-[#63284f] to-[#c75e4a]">
            <video
              className="absolute left-[-15.974%] top-[-9.807%] h-[144.308%] w-[119.397%] max-w-none object-cover opacity-80"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/uploads/moments_large_8fa260d861.jpg"
            >
              <source src="/videos/about-banner.mp4" type="video/mp4" />
            </video>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-100"
            >
              <img
                alt="Global Research, Local Understanding"
                loading="lazy"
                decoding="async"
                className="object-cover opacity-80"
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
                src="/uploads/moments_large_8fa260d861.jpg"
              />
            </div>
          </div>
          <div className="mt-[43px] grid gap-10 lg:grid-cols-[484px_1fr] lg:gap-x-0">
            <div className="flex items-start justify-center gap-[10px] lg:justify-start lg:gap-[35px] lg:pl-[82px]">
              <span className="w-[0.78em] shrink-0 text-center font-[Arial,Helvetica,sans-serif] text-[clamp(8rem,15.8vw,300px)] uppercase leading-[0.85] tracking-[-0.1667em] text-black">
                {years}
              </span>
              <span className="mt-[18px] h-[165px] shrink-0 rotate-180 font-nav text-[17px] font-semibold uppercase leading-[1.4] text-black [writing-mode:vertical-rl]">
                + years of work experience
              </span>
            </div>
            <div className="relative lg:pl-[58px]">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[2px] hidden h-[240px] w-px bg-black/20 lg:block"
              ></span>
              <p className="text-base !leading-[1.9] opacity-80 max-w-[605px] text-heading">
                {description}
              </p>
              <div className="mt-[46px] flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-gradient-from to-gradient-to text-white hover:brightness-110 focus-visible:ring-brand-600"
                >
                  Get Started Today
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
        </div>
      </div>
    </section>
  );
}
