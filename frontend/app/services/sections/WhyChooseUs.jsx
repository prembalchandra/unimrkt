import React from 'react';

const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white" aria-hidden="true">
        <path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2"></path>
        <path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2"></path>
        <path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3"></path>
        <path d="M4 22h16"></path>
        <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
        <path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"></path>
      </svg>
    ),
    title: '16+ Years',
    subtitle: 'of Research Excellence',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
    title: '90+ Countries',
    subtitle: 'Covered',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white" aria-hidden="true">
        <path d="m5 8 6 6"></path>
        <path d="m4 14 6-6 2-3"></path>
        <path d="M2 5h12"></path>
        <path d="M7 2h1"></path>
        <path d="m22 22-5-10-5 10"></path>
        <path d="M14 18h6"></path>
      </svg>
    ),
    title: '22+ Languages',
    subtitle: 'Supported',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <circle cx="9" cy="7" r="4"></circle>
      </svg>
    ),
    title: 'Experienced',
    subtitle: 'Research Professionals',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white" aria-hidden="true">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
        <path d="m3.3 7 8.7 5 8.7-5"></path>
        <path d="M12 22V12"></path>
      </svg>
    ),
    title: 'Customized',
    subtitle: 'Research Solutions',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    title: 'Accurate',
    subtitle: '& Actionable Insights',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <img
        alt="Why Choose Unimrkt?"
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
        src="/uploads/industry_cityscape_f926ff60c2.jpg"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true"></div>
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 relative">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize !leading-[1.2] lg:tracking-[-3px] text-heading text-white">
            Why Choose Unimrkt?
          </h2>
          <p className="text-base !leading-[1.9] opacity-80 mt-4">
            With 16+ years of expertise, global research capabilities, advanced methodologies, and trusted data quality, Unimrkt delivers accurate insights that empower smarter business decisions and sustainable growth.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex h-full flex-col items-center gap-4 rounded-[20px] border border-[#ba4551] bg-[rgba(36,5,5,0.18)] px-6 py-8 text-center backdrop-blur-[21px]"
            >
              <div className="flex size-[70px] items-center justify-center rounded-full border border-[#ba4551]/60 bg-[rgba(36,5,5,0.18)] backdrop-blur-[21px]">
                {item.icon}
              </div>
              <div className="text-white">
                <p className="text-xl font-semibold">{item.title}</p>
                <p className="mt-1 text-base opacity-80">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
