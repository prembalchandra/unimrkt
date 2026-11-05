import React from 'react';

const defaultStats = [
  { icon: '/figma-contact/stat-global.svg', number: '90+', label: 'Countries' },
  { icon: '/figma-contact/stat-language.svg', number: '22+', label: 'Languages' },
  { icon: '/figma-contact/stat-call.svg', number: '450+', label: 'CATI Stations' },
  { icon: '/figma-contact/stat-medal.svg', number: '16+', label: 'Years of Experience' },
];

export default function ResearchImpact({ dynamicMetrics = null }) {
  const heading = dynamicMetrics?.heading || 'Research at a Global Scale';
  const displayStats =
    dynamicMetrics?.metrics && dynamicMetrics.metrics.length > 0
      ? dynamicMetrics.metrics.map((m, idx) => ({
          icon: defaultStats[idx % defaultStats.length].icon,
          number: m.number,
          label: m.label,
        }))
      : defaultStats;

  return (
    <section className="bg-[#f9f9f7] px-4 py-14 sm:px-6 lg:pb-[58px] lg:pt-[43px]">
      <h2 className="text-center font-sans text-[24px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#02060e] sm:text-[28px]">
        {heading}
      </h2>
      <div className="mx-auto mt-8 grid max-w-[1050px] grid-cols-2 gap-4 lg:mt-[28px] lg:grid-cols-4 lg:gap-[30px]">
        {displayStats.map((item, idx) => (
          <div
            key={idx}
            className="flex min-h-[220px] flex-col items-center rounded-[19px] border border-[#e2e2e0] bg-white/65 px-3 pt-8 text-center backdrop-blur-[12px] lg:h-[248px] lg:pt-[37px]"
          >
            <span className="flex size-20 items-center justify-center rounded-full border border-[#a3282a]/10 bg-white/80">
              <img src={item.icon} alt={item.label} width="44" height="44" className="size-11" />
            </span>
            <p className="mt-[15px] font-sans text-[30px] font-bold leading-[1.34] text-[#04264e] sm:text-[34px]">
              {item.number}
            </p>
            <p className="mt-3 font-sans text-[16px] font-normal leading-[1.34] text-black">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
