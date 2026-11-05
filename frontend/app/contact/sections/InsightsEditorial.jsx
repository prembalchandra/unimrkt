import React from 'react';

export default function InsightsEditorial({ dynamicData = null }) {
  const kicker = dynamicData?.kicker || 'Contact Us';
  const heading = dynamicData?.heading || 'Have a Research Question? Let’s Talk.';

  return (
    <section className="relative bg-[#f9f9f7] pb-16 pt-16 lg:h-[518px] lg:pt-[65.6px] lg:pb-0">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[151px]"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)',
        }}
        aria-hidden="true"
      ></div>
      <header className="mx-auto flex flex-col items-center px-4 text-center sm:px-6">
        <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
          {kicker}
        </p>
        <h2
          className="mt-[7px] max-w-[920px] font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] text-[#02060e] sm:text-[40px] sm:leading-[48px] lg:mt-[9.4px] lg:text-[52px] lg:leading-[1.2] lg:tracking-[-3px]"
        >
          {heading}
        </h2>
        <div
          className="mt-[12px] max-w-[1281px] font-sans text-[16px] font-normal leading-[30.4px] text-[#02060e] opacity-80 lg:mt-[22.9px]"
        >
          <p className="mb-[30.4px]">
            Tell us what you’re trying to understand—whether it’s a market opportunity, customer behaviour,
            industry trend, competitive landscape or a specific business challenge. Our team takes the time
            to understand your objectives, target audience and desired outcomes before recommending the
            right research approach, methodology and scope. From focused studies to complex multi-market
            research programs, we help businesses ask the right questions and uncover meaningful insights.
          </p>
          <p>
            Our capabilities span qualitative and quantitative research, B2B, healthcare, consumer research,
            CATI and global research across diverse industries and audiences. With experienced researchers,
            robust quality processes, technology-enabled execution and a global network, we deliver reliable
            insights that can support confident business decisions. Share your research requirement with us,
            and our experts will work with you to shape a practical, focused solution aligned with your
            goals, timelines and market needs. Let’s start a conversation and discover the right research
            path for your business.
          </p>
        </div>
      </header>
    </section>
  );
}
