import React from 'react';

const offices = [
  {
    name: 'India Office',
    image: '/figma-home/offices/india.jpg',
    location: '5th floor, Nimai Tower, 412-415, Udyog Vihar, Phase IV, Gurugram, Haryana-122015',
    email: 'sales@unimrkt.com',
    queries: '+91 124 424 5210, +91 9870 377 557',
  },
  {
    name: 'United States of America Office',
    image: '/figma-home/offices/usa.jpg',
    location: '98 Cutter Mill Road Suite 466, Great Neck, NY 11021, USA',
    email: 'sales@unimrkt.com',
    queries: '+1.646.712.9302',
  },
  {
    name: 'United Kingdom Office',
    image: '/figma-home/offices/uk.jpg',
    location: 'The Old Dairy, 12 Stephen Road, Headington, Oxford, Oxfordshire, United Kingdom OX3 9AY',
    email: 'sales@unimrkt.com',
    queries: '+1.646.712.9302',
  },
];

export default function MarketplacesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative overflow-hidden lg:!pb-[90px] lg:!pt-[100px] lg:[container-type:inline-size]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/figma-home/waves-texture.png')] bg-cover bg-center opacity-50 lg:hidden"
      ></div>
      <img
        src="/figma-home/waves-texture.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[calc(50%+0.5558cqw)] top-[-19.3606cqw] z-0 hidden h-[74.2503cqw] w-[169.5829cqw] max-w-none -translate-x-1/2 object-cover opacity-50 lg:block"
      />
      <img
        src="/figma-home/waves-texture.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[calc(50%+0.5558cqw)] top-[54.9474cqw] z-0 hidden h-[74.2503cqw] w-[169.5829cqw] max-w-none -translate-x-1/2 object-cover opacity-50 lg:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 xl:px-12 min-[1900px]:px-[20px]">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize !leading-[1.2] lg:tracking-[-3px] text-heading lg:!tracking-[-1px]">
            Unlock the Power <br className="max-sm:hidden" />
            of <span className="text-brand-600">Marketplaces</span>
          </h2>
          <p className="text-base !leading-[1.9] opacity-80 mx-auto mt-2 max-w-3xl text-heading lg:mt-[7.4px] lg:max-w-none">
            Unimrkt conducts multi-industry research across 90 countries in over 22 languages.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-[25px] lg:grid-cols-3">
          {offices.map((office, idx) => (
            <article
              key={idx}
              className="group w-full transform-gpu cursor-pointer overflow-hidden rounded-[20px] border border-card-border bg-white shadow-blog transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[452/240] w-full overflow-hidden p-3 pb-0 lg:p-4 lg:pb-0">
                <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                  <img
                    src={office.image}
                    alt={office.name}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="px-5 pb-6 pt-[18px] lg:px-[22px] lg:pt-5">
                <h3 className="font-sans text-lg font-semibold leading-[1.34] text-ink2 xl:text-[20px]">
                  {office.name}
                </h3>

                <div className="mt-5 flex flex-col gap-5 xl:mt-[27.5px]">
                  <div>
                    <div className="flex h-[22px] items-center gap-1">
                      <img
                        src="/figma-home/offices/icon-location.svg"
                        alt=""
                        aria-hidden="true"
                        className="size-[22px] shrink-0"
                      />
                      <p className="font-nav text-[12px] font-bold uppercase leading-normal tracking-[1.2px] text-[#1e1e1e]">
                        Location
                      </p>
                    </div>
                    <div className="ml-[26px] mt-1.5 text-[14px] leading-[1.43] text-black">
                      <p className="text-[13px]">{office.location}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex h-[22px] items-center gap-1">
                      <img
                        src="/figma-home/offices/icon-sms.svg"
                        alt=""
                        aria-hidden="true"
                        className="size-[22px] shrink-0"
                      />
                      <p className="font-nav text-[12px] font-bold uppercase leading-normal tracking-[1.2px] text-[#1e1e1e]">
                        Email
                      </p>
                    </div>
                    <div className="ml-[26px] mt-1.5 text-[14px] leading-[1.43] text-black">
                      <a href={`mailto:${office.email}`} className="break-words hover:text-brand-600 transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="flex h-[22px] items-center gap-1">
                      <img
                        src="/figma-home/offices/icon-call.svg"
                        alt=""
                        aria-hidden="true"
                        className="size-[22px] shrink-0"
                      />
                      <p className="font-nav text-[12px] font-bold uppercase leading-normal tracking-[1.2px] text-[#1e1e1e]">
                        Sales &amp; Business Queries
                      </p>
                    </div>
                    <div className="ml-[26px] mt-1.5 text-[14px] leading-[1.43] text-black">
                      <p>{office.queries}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Global Coverage Note */}
        <div className="mt-12 text-center">
          <p className="font-sans text-sm text-heading/70">
            To know more about our global coverage, please email us at{' '}
            <a
              href="mailto:SALES@UNIMRKT.COM"
              className="font-bold text-brand-600 uppercase tracking-wide hover:underline"
            >
              SALES@UNIMRKT.COM
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
