import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Discover Your Objectives',
    description: 'Aligning research goals, target audience, and business context to establish clear project milestones.',
    icon: '/uploads/process_clipboard_tick_163f70e35c.svg',
  },
  {
    step: '02',
    title: 'Design the Research',
    description: 'Carefully designing research methodologies to deliver reliable, actionable, and impactful results.',
    icon: '/uploads/process_brush_4eb7a168ba.svg',
  },
  {
    step: '03',
    title: 'Collect Quality Data',
    description: 'Gathering accurate, reliable data from trusted sources for meaningful business insights.',
    icon: '/uploads/process_presentation_chart_a7b1453e99.svg',
  },
  {
    step: '04',
    title: 'Analyze & Validate',
    description: 'Transforming raw data into accurate, validated insights for confident business decisions.',
    icon: '/uploads/process_chart_2696286093.svg',
  },
];

export default function ServicesWorkflow() {
  return (
    <section className="relative overflow-hidden bg-[#fbfbfc] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 relative">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-nav text-sm font-semibold uppercase tracking-[0.2em] text-[#be2c28]">WORKFLOW</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize !leading-[1.2] lg:tracking-[-3px] text-heading mt-3">
            Research Process
          </h2>
          <p className="text-base !leading-[1.9] opacity-80 mt-4">
            Our proven research process combines strategic planning, precise data collection, rigorous analysis, and actionable reporting to deliver reliable insights that support confident business decisions and measurable growth.
          </p>
        </header>

        <ul className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:pb-0 lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {steps.map((item, idx) => (
            <li
              key={idx}
              className="relative min-w-[80%] shrink-0 snap-center overflow-hidden rounded-[24px] border border-[#e0e0df] bg-white p-8 shadow-blog sm:min-w-[45%] lg:min-w-0 lg:shrink"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 right-4 select-none font-sans text-[66px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-heading opacity-15"
              >
                {item.step}
              </span>
              <img
                alt={item.title}
                loading="lazy"
                width={48}
                height={48}
                className="size-12 object-contain"
                src={item.icon}
              />
              <h3 className="relative mt-6 text-xl font-semibold text-ink2">{item.title}</h3>
              <p className="text-base !leading-[1.9] opacity-80 relative mt-2 text-sm leading-[1.87] opacity-70">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden" aria-hidden="true">
          <span className="h-[15px] w-8 rounded-full bg-[#be2c28]"></span>
          <span className="size-[15px] rounded-full bg-[#e0e0df]"></span>
          <span className="size-[15px] rounded-full bg-[#e0e0df]"></span>
          <span className="size-[15px] rounded-full bg-[#e0e0df]"></span>
        </div>
      </div>
    </section>
  );
}
