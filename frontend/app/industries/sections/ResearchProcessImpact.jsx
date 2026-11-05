import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Understand',
    icon: '/uploads/industries_icon_process_clipboard_774213b063.svg',
    description:
      'We begin by understanding your business question, objectives and the decisions you need to make. By identifying the core challenge, market context and information gaps, we establish a clear research direction that keeps the study focused, relevant and aligned with your strategic priorities, customer needs and desired business outcomes.',
  },
  {
    step: '02',
    title: 'Design',
    icon: '/uploads/industries_icon_process_brush_b535199055.svg',
    description:
      'We select the right research methodology and audience based on your objectives, market and business needs. From qualitative and quantitative approaches to specialized research techniques, we identify the most relevant participants, markets and channels to ensure meaningful data, reliable findings and insights that directly address your research questions.',
  },
  {
    step: '03',
    title: 'Research',
    icon: '/uploads/industries_icon_process_presentation_3cf42d3bc4.svg',
    description:
      'We gather relevant primary and secondary data from credible sources and carefully selected audiences. Through surveys, interviews, discussions, desk research and other appropriate methods, we collect reliable evidence that provides a comprehensive understanding of market conditions, customer behaviors, industry trends and the factors influencing key business decisions.',
  },
  {
    step: '04',
    title: 'Analyze',
    icon: '/uploads/industries_icon_process_chart_9e15f700a8.svg',
    description:
      'We analyze the research to identify meaningful patterns, key drivers, emerging trends and untapped opportunities. By connecting data points across audiences, markets and industries, we uncover what influences decisions, where gaps exist and which opportunities can help businesses strengthen strategies and respond effectively to changing market needs.',
  },
];

export default function ResearchProcessImpact() {
  return (
    <section className="relative overflow-hidden bg-[#f9f9f7] py-16 lg:h-[964px] lg:pb-0 lg:pt-[80.6px]">
      <img
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none object-cover object-top opacity-[0.06] mix-blend-luminosity"
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
        src="/images/industries/process-bg.jpg"
      />
      <div className="relative">
        <header className="mx-auto flex flex-col items-center text-center px-4 sm:px-6">
          <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
            Industry Research Process
          </p>
          <h2
            className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-[#02060e]"
            style={{ maxWidth: '718px' }}
          >
            Turning Research Into Impact
          </h2>
          <div
            className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] opacity-80 text-[#02060e]"
            style={{ maxWidth: '1234px' }}
          >
            Transforming industry questions, market data and customer insights into actionable strategies that help businesses make informed decisions. Our research connects evidence with business objectives, uncovering meaningful opportunities, addressing challenges and enabling organizations to create measurable impact, strengthen strategies and support sustainable growth.
          </div>
        </header>

        <ul className="mt-[15.5px] flex snap-x snap-mandatory scroll-px-4 gap-[28px] sm:scroll-px-6 overflow-x-auto scroll-smooth px-4 pb-6 pt-4 [scrollbar-width:none] sm:px-6 lg:scroll-pl-[max(32px,calc(50vw-800px))] lg:pl-[max(32px,calc(50vw-800px))] lg:pr-8 [&::-webkit-scrollbar]:hidden">
          {steps.map((item, idx) => (
            <li
              key={idx}
              className="group relative w-[85vw] shrink-0 cursor-pointer snap-start rounded-[24px] border border-[#e0e0df] bg-white pb-6 pl-[47px] pr-[41px] pt-[33px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl sm:w-[460px] lg:min-h-[540px]"
            >
              <p className="font-sans text-[66px] font-semibold capitalize leading-[79.2px] tracking-[-1px] text-[#02060e] opacity-15">
                {item.step}
              </p>
              <img alt="" loading="lazy" width={70} height={70} className="mt-[41.8px] size-[70px]" src={item.icon} />
              <h3 className="mt-[13.8px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">
                {item.title}
              </h3>
              <p className="mt-[9.4px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-[2px] flex justify-center">
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
