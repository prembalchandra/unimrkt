import React from 'react';

const stats = [
  {
    icon: '/uploads/industries_icon_stat_global_network_289b3bf784.svg',
    number: '90+',
    label: 'Countries Covered',
  },
  {
    icon: '/uploads/industries_icon_stat_communications_eac0fb3a23.svg',
    number: '22+',
    label: 'Languages Supported',
  },
  {
    icon: '/uploads/industries_icon_stat_world_719c98048f.svg',
    number: '4',
    label: 'Global Regions',
  },
  {
    icon: '/uploads/industries_icon_stat_search_40727a6f43.svg',
    number: 'Multi-Industry',
    label: 'Research Expertise',
  },
];

export default function LocalInsightGlobalReach() {
  return (
    <section className="relative overflow-hidden bg-[#020a13] py-16 lg:h-[778px] lg:pb-0 lg:pt-[80.6px]">
      <img
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none object-cover opacity-[0.08] mix-blend-luminosity"
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
        src="/images/industries/texture.jpg"
      />
      <div className="relative">
        <header className="mx-auto flex flex-col items-center text-center px-4 sm:px-6">
          <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white">
            Beyond Industries
          </p>
          <h2
            className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-white"
            style={{ maxWidth: '655px' }}
          >
            Local Insight. Global Reach.
          </h2>
          <div
            className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] opacity-80 text-white"
            style={{ maxWidth: '1182px' }}
          >
            Unimrkt delivers research across 90+ countries and 22+ languages, combining deep local understanding with a global perspective. Our international research capabilities help businesses understand diverse markets, audiences and industry dynamics with confidence.
          </div>
        </header>

        <div className="mx-auto mt-[34.9px] grid w-full max-w-[1602px] grid-cols-1 gap-[30px] px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 min-[1660px]:px-0">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.08] px-6 pb-12 pt-12 text-center backdrop-blur-[21px] lg:min-h-[380px] lg:pt-[83px]"
            >
              <span className="relative size-[124px] shrink-0" aria-hidden="true">
                <img
                  alt=""
                  loading="lazy"
                  width={124}
                  height={124}
                  className="absolute inset-0 size-full"
                  src="/icons/industries/stat-ring.svg"
                />
                <img
                  alt=""
                  loading="lazy"
                  width={64}
                  height={64}
                  className="absolute left-[30px] top-[30px] size-[64px]"
                  src={item.icon}
                />
              </span>
              <p className="mt-[19.8px] font-sans text-[34px] font-semibold leading-[45.56px] text-white">
                {item.number}
              </p>
              <p className="mt-[4.1px] font-sans text-[16px] font-normal leading-[29.92px] text-white opacity-70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
