import React from 'react';

const outcomes = [
  {
    icon: '/uploads/industries_icon_case_connection_eb7a68ba63.svg',
    title: 'The Challenge',
    description:
      'The starting point of every research project is understanding the business challenge. We identify the key questions, market gaps, customer needs and decision-making challenges that require deeper clarity. This helps define the research direction, focus on what matters most and establish a clear foundation for meaningful, actionable insights.',
  },
  {
    icon: '/uploads/industries_icon_case_cogwheel_92fdecc191.svg',
    title: 'The Approach',
    description:
      'We design the right research methodology around the business objective, identify and reach the most relevant audiences, and gather reliable, meaningful evidence. From research design and audience selection to fieldwork and data collection, every step is carefully planned to ensure the findings are accurate, relevant and useful for decision-making.',
  },
  {
    icon: '/uploads/industries_icon_case_insight_f3297cd056.svg',
    title: 'The Insight',
    description:
      'We analyze the research to uncover meaningful patterns, customer behaviors, emerging needs, market trends and hidden opportunities. By connecting the findings and looking beyond surface-level responses, we turn complex research data into clear insights that reveal what matters most and where businesses can create greater value and impact.',
  },
];

export default function BusinessOutcomesSection() {
  return (
    <section className="relative bg-[#f9f9f7] py-16 lg:h-[851px] lg:pb-0 lg:pt-[77.6px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[168px]"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      ></div>
      <div className="relative">
        <header className="mx-auto flex flex-col items-center text-center px-4 sm:px-6">
          <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
            Featured Case Studies
          </p>
          <h2
            className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-[#02060e]"
            style={{ maxWidth: '1181px' }}
          >
            From Business Questions to Meaningful Outcomes
          </h2>
          <div
            className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] opacity-80 text-[#02060e]"
            style={{ maxWidth: '1252px' }}
          >
            Explore how Unimrkt helps businesses address complex challenges through focused research, deeper customer understanding and actionable insights. Each case study showcases the journey from the initial business question to decisions that create measurable value.
          </div>
        </header>

        <div className="mx-auto mt-[44.9px] w-full max-w-[1560px]">
          <div
            role="group"
            aria-label="Case study highlights"
            className="-my-12 flex snap-x snap-mandatory touch-pan-x gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-4 py-12 [scrollbar-width:none] sm:px-6 lg:gap-[30px] lg:px-8 min-[1620px]:-mx-12 min-[1620px]:px-12 [&::-webkit-scrollbar]:hidden"
          >
            {outcomes.map((item, idx) => (
              <article
                key={idx}
                className="group w-[85%] shrink-0 cursor-pointer snap-start rounded-[24px] border border-[#e0e0df] bg-white pb-10 pl-8 pr-8 pt-[40px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl sm:w-[360px] sm:pl-[47px] sm:pr-[48px] lg:min-h-[443px] lg:w-[max(380px,calc((100%-60px)/3))]"
              >
                <span className="block w-[70px] origin-left transition-transform duration-300 ease-out group-hover:scale-110">
                  <img alt="" loading="lazy" width={70} height={70} className="size-[70px]" src={item.icon} />
                </span>
                <h3 className="mt-[29.8px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">
                  {item.title}
                </h3>
                <p className="mt-[9.9px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-[29px] flex justify-center">
          <div className="flex items-center" role="tablist" aria-label="Slide navigation">
            <span className="block h-[15px] w-8 rounded-[40px] bg-[#b63a40]"></span>
            <span className="ml-2 block size-[15px] rounded-full bg-[#e2e2e2]"></span>
            <span className="ml-2 block size-[15px] rounded-full bg-[#e2e2e2]"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
