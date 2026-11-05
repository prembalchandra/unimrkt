import React from 'react';

const defaultCards = [
  {
    icon: '/figma-contact/icon-research.svg',
    title: 'Deep Research Expertise',
    desc: 'Experienced researchers who understand complex business problems and deliver clear, informed answers.',
  },
  {
    icon: '/figma-contact/icon-global-lg.svg',
    title: 'Global Reach',
    desc: 'Research capable across markets, audiences, and geographies with localized expertise and scalable execution.',
  },
  {
    icon: '/figma-contact/icon-badge.svg',
    title: 'Quality-First Approach',
    desc: 'Rigorous processes designed to ensure reliable data, trusted insights, and consistent reporting standards.',
  },
  {
    icon: '/figma-contact/icon-dashboard.svg',
    title: 'Business-Focused Insights',
    desc: 'We turn research findings into strategic direction that supports smarter, faster business decisions.',
  },
];

export default function ResearchValue({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker || 'Why work with unimrkt?';
  const heading = dynamicValues?.heading || 'More Than Research. A Partner For Better Decisions.';
  const description =
    dynamicValues?.description ||
    'From defining the research question to delivering actionable insights, our team combines research expertise, technology and global field capabilities to support better business decisions.';

  const displayCards =
    dynamicValues?.values && dynamicValues.values.length > 0
      ? dynamicValues.values.map((v, idx) => ({
          icon: defaultCards[idx % defaultCards.length].icon,
          title: v.title,
          desc: v.description || v.desc || '',
        }))
      : defaultCards;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-4 py-16 text-white sm:px-6 lg:pb-[98px] lg:pt-[85px]">
      <div
        className="pointer-events-none absolute -left-[15.6%] -top-[38.2%] h-[176.1%] w-[131.2%] -scale-x-100 bg-[url('/images/industries/case-studies-wallpaper.jpg')] bg-[length:100%_100%] opacity-[0.12] mix-blend-luminosity"
        aria-hidden="true"
      ></div>

      <div className="relative text-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-white">
          {kicker}
        </p>
        <h2 className="mt-[19px] font-nav text-[32px] font-semibold leading-[1.2] tracking-[-1px] text-white sm:text-[40px] lg:text-[52px]">
          {heading}
        </h2>
        <p className="mx-auto mt-6 max-w-[1090px] font-sans text-[16px] font-normal leading-[1.9] text-white/90 lg:mt-8">
          {description}
        </p>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[58px] lg:grid-cols-4">
        {displayCards.map((card, idx) => (
          <div
            key={idx}
            className="flex min-h-[354px] flex-col items-center rounded-[24px] border border-[#e0e0df] bg-white px-6 pt-[57px] pb-8 text-center shadow-[6px_6px_54px_0px_rgba(0,0,0,0.06)]"
          >
            <div className="flex size-[76px] items-center justify-center rounded-full bg-[#f9f9f7] p-4 shadow-sm">
              <img src={card.icon} alt={card.title} className="size-10 object-contain" />
            </div>
            <h3 className="mt-8 font-sans text-[22px] font-semibold leading-[1.3] text-[#04264e]">
              {card.title}
            </h3>
            <p className="mt-4 font-sans text-[15px] font-normal leading-[1.6] text-black/70">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
