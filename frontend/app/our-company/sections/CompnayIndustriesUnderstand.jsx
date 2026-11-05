import React from 'react';

const industries = [
  {
    title: 'Automotive',
    image: '/uploads/oc_industry_automotive_a401cb0936.jpg',
  },
  {
    title: 'Healthcare',
    image: '/uploads/oc_industry_healthcare_df075d98d8.jpg',
  },
  {
    title: 'Consumer',
    image: '/uploads/oc_industry_consumer_4985d4328a.jpg',
  },
  {
    title: 'Technology',
    image: '/uploads/oc_industry_technology_3d259a7b80.jpg',
  },
  {
    title: 'Financial Services',
    image: '/uploads/oc_industry_financial_services_7a52ba11e7.jpg',
  },
  {
    title: 'B2B & Industrial',
    image: '/uploads/oc_industry_b2b_industrial_1adf04cab7.jpg',
  },
  {
    title: 'Retail & E-commerce',
    image: '/uploads/oc_industry_retail_ecommerce_64e9960fb3.jpg',
  },
  {
    title: 'Media & Entertainment',
    image: '/uploads/oc_industry_media_entertainment_3f2f69d899.jpg',
  },
];

export default function CompnayIndustriesUnderstand() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Industries We Understand
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            Deep Knowledge Across Diverse Industries
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">
            Industry-specific expertise that helps us understand complex markets and deliver insights that drive informed business decisions.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[384/480] overflow-hidden rounded-[30px] bg-[#01040c] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                src={item.image}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent"
                aria-hidden="true"
              ></div>
              <p className="absolute bottom-[13%] left-[12.5%] font-nav text-[21px] font-semibold leading-[1.33] text-white">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
