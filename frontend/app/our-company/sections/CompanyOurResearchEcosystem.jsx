import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Define',
    description: 'We define business challenges and research goals to uncover clear opportunities for growth.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-[70px] text-brand-600" aria-hidden="true">
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
        <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
        <circle cx="11.5" cy="14.5" r="2.5"></circle>
        <path d="M13.3 16.3 15 18"></path>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Discover',
    description: 'We discover insights, trends, and opportunities that help businesses make smarter decisions and grow.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-[70px] text-brand-600" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Decode',
    description: 'We decode complex data into clear insights that reveal meaning, direction, and opportunities for business growth.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-[70px] text-brand-600" aria-hidden="true">
        <rect x="14" y="14" width="4" height="6" rx="2"></rect>
        <rect x="6" y="4" width="4" height="6" rx="2"></rect>
        <path d="M6 20h4"></path>
        <path d="M14 10h4"></path>
        <path d="M6 14h2v6"></path>
        <path d="M14 4h2v6"></path>
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'We deliver actionable insights that empower businesses to make confident decisions and achieve sustainable growth.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-[70px] text-brand-600" aria-hidden="true">
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
        <path d="m21.854 2.147-10.94 10.939"></path>
      </svg>
    ),
  },
];

export default function CompanyOurResearchEcosystem() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Our Research Ecosystem
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            From Question to Business Decision
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-heading/70">
            A highly visual interactive journey:
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => (
            <li
              key={idx}
              className="relative flex h-full flex-col gap-6 rounded-[24px] border border-[#e0e0df] bg-white p-6 shadow-blog transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="font-display text-[66px] capitalize leading-[1.2] tracking-[-1px] text-[#02060e] opacity-15">
                {item.step}
              </p>
              {item.icon}
              <div>
                <h3 className="text-[22px] font-semibold text-[#04264e]">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.87] text-black/70">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
