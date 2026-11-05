import React from 'react';

export default function IndustriesAboutServices() {
  return (
    <section className="relative bg-[#f9f9f7] pb-16 pt-16 lg:h-[571px] lg:pt-[99.6px] lg:pb-0">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[151px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      ></div>
      <header className="mx-auto flex flex-col items-center text-center px-4 sm:px-6">
        <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
          About Our Services
        </p>
        <h2
          className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-[#02060e]"
          style={{ maxWidth: '854px' }}
        >
          Comprehensive Research Solutions for Smarter Business Decisions
        </h2>
        <div
          className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] opacity-80 text-[#02060e]"
          style={{ maxWidth: '1281px' }}
        >
          <p className="mb-[30.4px]">
            At Unimrkt Research, we provide end-to-end market research services that empower businesses with accurate data, actionable insights, and strategic intelligence. From primary data collection and qualitative research to quantitative studies, business research, and research support functions, our tailored solutions help organizations understand markets, customers, and emerging opportunities.
          </p>
          <p>
            Backed by experienced researchers, advanced methodologies, and global capabilities, we deliver reliable research solutions across diverse industries. Whether you&#39;re launching a new product, evaluating market opportunities, or strengthening your competitive position, Unimrkt Research provides the insights you need to make confident, data-driven decisions and achieve sustainable growth.
          </p>
        </div>
      </header>
    </section>
  );
}
