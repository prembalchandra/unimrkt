import React from 'react';

const cards = [
  {
    icon: '/uploads/industries_icon_beyond_infrastructure_7740e0e270.svg',
    title: 'Deep Industry Understanding',
    description:
      'Research backed by deep knowledge of industry trends, evolving customer expectations, competitive landscapes and market dynamics. We combine sector expertise with rigorous research methodologies to uncover meaningful insights, identify opportunities, understand changing behaviors and help businesses make informed, confident strategic decisions.',
  },
  {
    icon: '/uploads/industries_icon_beyond_repair_e8fe083fb0.svg',
    title: 'Cross-Industry Perspective',
    description:
      'Identifying meaningful patterns and emerging opportunities by connecting insights across sectors, audiences and markets. Our cross-industry perspective helps uncover shared behaviors, evolving needs and market trends, enabling businesses to discover new possibilities, strengthen strategies and make more informed, forward-looking decisions.',
  },
  {
    icon: '/uploads/industries_icon_beyond_research_db455e8c5f.svg',
    title: 'Specialized Research Expertise',
    description:
      'Applying qualitative, quantitative and customized research methodologies to address complex business questions. We combine the right approaches, tools and techniques to explore customer perspectives, validate hypotheses, measure market dynamics and generate reliable insights that support strategic planning, informed decision-making and sustainable business growth.',
  },
  {
    icon: '/uploads/industries_icon_beyond_dashboard_29b30be305.svg',
    title: 'Consumer & Market Insights',
    description:
      'Understanding customer needs, behaviors, preferences and decision drivers to reveal what truly influences choices. Our research helps businesses identify customer expectations, uncover experience gaps and respond with greater confidence through informed strategies, relevant solutions and meaningful engagement across diverse audiences and markets.',
  },
  {
    icon: '/uploads/industries_icon_beyond_configuration_edea846bc9.svg',
    title: 'Actionable Business Intelligence',
    description:
      'Transforming research findings into practical, actionable insights that support strategy, innovation and growth. We translate complex data into clear direction, helping businesses identify opportunities, solve challenges, refine strategies, develop customer-focused solutions and make confident decisions that create meaningful, measurable impact.',
  },
  {
    icon: '/uploads/industries_icon_beyond_growth_c2885d0bdc.svg',
    title: 'Better Decisions, Stronger Growth',
    description:
      'Providing clarity that helps organizations make informed decisions, navigate changing markets and identify future opportunities. By turning research and market intelligence into clear, actionable insights, we help businesses understand what matters, respond to evolving needs, strengthen strategic direction and plan for sustainable growth.',
  },
];

export default function PartnerIndustriesSection() {
  return (
    <section className="relative bg-[#f9f9f7] pb-16 pt-16 lg:h-[1728px] lg:pb-0 lg:pt-[96px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[250px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 100%)' }}
        aria-hidden="true"
      ></div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[423px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      ></div>
      <div className="relative">
        <header className="mx-auto flex flex-col items-center text-center px-4 sm:px-6">
          <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
            Beyond Industries
          </p>
          <h2
            className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-[#02060e]"
            style={{ maxWidth: '1011px' }}
          >
            One Research Partner. Multiple Industries.
          </h2>
          <div
            className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] opacity-80 text-[#02060e]"
            style={{ maxWidth: '1182px' }}
          >
            Combining cross-industry experience with specialized research expertise, we uncover market opportunities, understand evolving customer behaviors and identify emerging trends. Our research-driven approach transforms data into actionable insights, helping businesses make informed decisions, strengthen strategies, respond to market changes and drive sustainable growth.
          </div>
        </header>

        <div className="mx-auto mt-[55.5px] grid w-full max-w-[1520px] grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 min-[1600px]:px-0">
          {cards.map((item, idx) => (
            <article
              key={idx}
              className="group cursor-pointer rounded-[24px] border border-[#e1e1df] bg-white pb-10 pl-[43px] pr-[39px] pt-[65px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#a82c31] hover:bg-[#a82c31] hover:shadow-xl lg:min-h-[464px]"
            >
              <img
                alt=""
                loading="lazy"
                width={70}
                height={70}
                className="size-[70px] transition-[filter] duration-300 ease-in-out group-hover:brightness-0 group-hover:invert"
                src={item.icon}
              />
              <h3 className="mt-[23.3px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e] transition-colors duration-300 ease-in-out group-hover:text-white">
                {item.title}
              </h3>
              <p className="mt-[9.9px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70 transition-colors duration-300 ease-in-out group-hover:text-white group-hover:opacity-90">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
