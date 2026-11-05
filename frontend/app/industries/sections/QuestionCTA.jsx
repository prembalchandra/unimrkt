import React from 'react';
import Link from 'next/link';

export default function QuestionCTA({ dynamicCta = null }) {
  const title1 = 'Have a Question?';
  const title2 = 'Let’s Find the Answer.';
  const description =
    dynamicCta?.description ||
    'Research solutions designed around your business objectives, audience and market.';
  const btnLabel = dynamicCta?.button?.label || 'Start a Conversation';
  const btnUrl = dynamicCta?.button?.url || '/contact';

  return (
    <div className="relative z-10 mx-auto -mt-16 w-full max-w-[1600px] px-4 sm:px-6 lg:-mt-[264px] lg:px-8 min-[1700px]:px-0">
      <div className="relative min-h-[455px] rounded-[30px] bg-gradient-to-r from-gradient-from to-gradient-to [container-type:inline-size] lg:rounded-[50px]">
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
          <img
            alt=""
            loading="lazy"
            decoding="async"
            className="object-cover opacity-[0.09] mix-blend-luminosity"
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
            src="/uploads/industries_texture_2fce194492.jpg"
          />
        </div>
        <div className="relative px-6 pt-14 sm:px-10 lg:px-0 lg:pb-[3cqw] lg:pl-[7.125cqw] lg:pt-[5.6875cqw]">
          <div className="lg:max-w-[42cqw]">
            <h2 className="font-sans text-[34px] font-semibold capitalize leading-[41px] tracking-[-1.5px] text-white sm:text-[44px] sm:leading-[53px] lg:text-[clamp(34px,3.25cqw,52px)] lg:leading-[1.2] lg:tracking-[-0.0577em]">
              <span className="block">{title1}</span>
              <span className="block">{title2}</span>
            </h2>
            <p className="mt-[7px] max-w-[674px] font-sans text-[16px] font-normal leading-[1.9] text-white opacity-80 lg:text-[clamp(14px,1cqw,16px)]">
              {description}
            </p>
            <Link
              className="mt-[35px] inline-flex h-[60px] items-center justify-center gap-1 rounded-[4px] bg-[#040f1d] px-10 font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition-[filter] duration-300 ease-in-out hover:brightness-125 motion-reduce:transition-none"
              href={btnUrl}
            >
              {btnLabel}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden="true">
                <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div
          className="pointer-events-none relative mx-auto mt-6 aspect-[690/541] w-[min(100%,420px)] overflow-hidden lg:absolute lg:bottom-0 lg:right-[5.8125cqw] lg:mx-0 lg:mt-0 lg:w-[43.125cqw]"
          aria-hidden="true"
        >
          <img
            alt="Have a Question? Let’s Find the Answer."
            loading="lazy"
            width="931"
            height="621"
            decoding="async"
            className="absolute left-[-16.594%] top-[-14.843%] h-[114.787%] w-[134.928%] max-w-none"
            style={{ color: 'transparent' }}
            src="/uploads/industries_couple_cutout_326ad2e1c1.webp"
          />
        </div>
      </div>
    </div>
  );
}
