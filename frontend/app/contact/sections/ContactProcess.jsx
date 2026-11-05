'use client';

import React, { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Share Your Requirement',
    desc: 'Tell us about your business question, target audience, and research objective so we can align the right approach.',
  },
  {
    number: '02',
    title: 'Discuss Your Objectives',
    desc: 'Our team connects with you to understand the context, challenges, and expected outcomes before recommending a path.',
  },
  {
    number: '03',
    title: 'Define The Approach',
    desc: 'We recommend the appropriate methodology, timeline, and execution plan tailored to your decision-making needs.',
  },
  {
    number: '04',
    title: 'Execution & Fieldwork',
    desc: 'We deploy robust multi-market methodology and targeted screening to capture high-integrity data.',
  },
  {
    number: '05',
    title: 'Insight Delivery',
    desc: 'We deliver comprehensive reports, dashboards, and executive insights ready for strategic decision-making.',
  },
  {
    number: '06',
    title: 'Strategic Impact',
    desc: 'We partner with your team to integrate data findings, guide strategic implementation, and track market evolution.',
  },
];

export default function ContactProcess() {
  const scrollRef = useRef(null);

  return (
    <section className="bg-[#f9f9f7] py-16 lg:pb-[181px] lg:pt-[83px]">
      <div className="px-4 text-center sm:px-6">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f]">
          How it works
        </p>
        <h2 className="mx-auto mt-[26px] max-w-[905px] font-sans text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px]">
          What Happens After You Contact Us?
        </h2>
        <p className="mx-auto mt-6 max-w-[885px] font-sans text-[16px] font-normal leading-[1.9] text-[#02060e]/80">
          A simple process designed to understand your requirement and connect you with the right research expertise.
        </p>
      </div>

      <div className="mt-8 lg:mt-[47px]">
        <ul
          ref={scrollRef}
          aria-label="How it works"
          className="flex gap-8 overflow-x-auto scroll-smooth px-4 pb-10 pt-2 [scrollbar-width:none] sm:px-6 lg:px-8 min-[1700px]:pl-[calc((100vw_-_1600px)/2)] min-[1700px]:pr-0 [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((step) => (
            <li key={step.number} className="w-[min(460px,86vw)] shrink-0">
              <div className="relative h-[282px] rounded-[24px] border border-[#e0e0df] bg-white p-8 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]">
                <span className="flex size-[70px] items-center justify-center rounded-full bg-[#a3282a] font-sans text-[32px] font-semibold leading-[1.2] text-white">
                  {step.number}
                </span>
                <h3 className="mt-6 font-sans text-[22px] font-semibold leading-[1.3] text-[#04264e]">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] font-normal leading-[1.6] text-black/70">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
