'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

const defaultIndustries = [
  {
    title: 'AeroSpace and Defence Market Research',
    slug: 'aerospace-and-defence-market-research',
    image: '/uploads/oc_industry_b2b_industrial_1adf04cab7.jpg',
    description:
      'Our Aerospace and Defence research supports manufacturers and suppliers with stakeholder engagement, procurement decision research, and market demand analysis in a highly regulated, long-cycle industry.',
  },
  {
    title: 'Agriculture & Agritech Market Research',
    slug: 'agriculture-and-agritech-market-research',
    image: '/uploads/industry_retail_9a08ec9395.jpg',
    description:
      'Our Agriculture & Agritech research helps input suppliers, equipment makers, and agritech startups understand farmer decision-making, technology adoption barriers, and market demand across diverse farming segments.',
  },
  {
    title: 'Architecture & Construction',
    slug: 'architecture-and-construction',
    image: '/uploads/oc_industry_b2b_industrial_1adf04cab7.jpg',
    description:
      'Our Architecture & Construction research helps firms and material suppliers understand client satisfaction, specification decision drivers, and demand trends across residential and commercial building.',
  },
  {
    title: 'Automotives',
    slug: 'automotives',
    image: '/uploads/industry_automotive_9d8c1f73cd.jpg',
    description:
      'Our Automotive research helps OEMs, dealers, and suppliers understand shifting buyer preferences — from EV adoption and connected-car features to dealership experience and total cost of ownership perceptions.',
  },
  {
    title: 'Banking and Finance',
    slug: 'banking-and-finance',
    image: '/uploads/industry_banking_49416162c9.jpg',
    description:
      'Our Banking and Finance research covers digital banking adoption, customer satisfaction, and product concept testing for retail and commercial banks navigating fintech disruption.',
  },
  {
    title: 'Chemicals',
    slug: 'chemicals',
    image: '/uploads/oc_industry_b2b_industrial_1adf04cab7.jpg',
    description:
      'Our Chemicals industry research supports B2B demand forecasting, customer satisfaction, and go-to-market decisions for specialty and commodity chemical producers navigating shifting regulation and end-market demand.',
  },
  {
    title: 'Consumer Goods & Retail',
    slug: 'consumer-goods-and-retail',
    image: '/uploads/oc_industry_consumer_4985d4328a.jpg',
    description:
      'Consumer behavior, retail touchpoints, shopper journeys, and pricing sensitivity across omni-channel modern trade.',
  },
  {
    title: 'Healthcare & Life Sciences',
    slug: 'healthcare-and-life-sciences',
    image: '/uploads/oc_industry_healthcare_df075d98d8.jpg',
    description:
      'KOL interviews, physician prescription behavior, patient journeys, and medical device evaluation across global markets.',
  },
  {
    title: 'Technology & Telecom',
    slug: 'technology-and-telecom',
    image: '/uploads/oc_industry_technology_3d259a7b80.jpg',
    description:
      'B2B software adoption, SaaS benchmarks, cloud migration sentiment, and IT decision-maker procurement insights.',
  },
];

export default function IndustriesGrid({ initialIndustries = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const rawIndustries = initialIndustries?.length > 0 ? initialIndustries : defaultIndustries;
  const industries = rawIndustries.map((ind, idx) => ({
    title: ind.title || ind.name,
    slug: ind.slug || ind.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    image: getStrapiMediaUrl(ind.featuredImage || ind.image, defaultIndustries[idx % defaultIndustries.length].image),
    description: ind.description || ind.excerpt || defaultIndustries[idx % defaultIndustries.length].description,
  }));

  const totalPages = Math.ceil(industries.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIndustries = industries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="industries-grid" className="relative overflow-hidden bg-white pb-16 pt-16 lg:pb-[77.5px] lg:pt-[80px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1388px] bg-[length:1900px_1411px] bg-[position:center_top] bg-repeat"
        style={{ backgroundImage: "url('/uploads/industries_wave_pattern_478069a87d.png')" }}
        aria-hidden="true"
      ></div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[863px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      ></div>
      <div className="relative mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
        <header className="mx-auto flex flex-col items-center text-center">
          <p className="font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-[#cc1f1f]">
            Industries
          </p>
          <h2
            className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px] mt-[7px] text-[#02060e]"
            style={{ maxWidth: '939px' }}
          >
            Deep Expertise Across Diverse Industries
          </h2>
          <div
            className="font-sans text-[16px] font-normal leading-[30.4px] mt-[12px] opacity-80 text-[#02060e]"
            style={{ maxWidth: '1309px' }}
          >
            Our research expertise spans diverse industries, helping businesses understand the unique market dynamics, customer behaviours and challenges shaping their sectors. From Banking & Finance and Healthcare to Consumer & Retail, Technology, Automotive and B2B markets, we bring relevant industry understanding and research capabilities to every project.
          </div>
        </header>

        <div className="mt-[41px] grid grid-cols-1 gap-x-[36px] gap-y-[35px] sm:grid-cols-2 lg:grid-cols-3">
          {currentIndustries.map((item, idx) => (
            <div key={idx} className="lg:min-h-[430px]">
              <Link
                className="group flex h-full w-full flex-col rounded-[24px] border border-[#eee] bg-white p-[19px] pb-[43px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                href={`/industries/${item.slug}`}
              >
                <div className="relative aspect-[469/260] w-full shrink-0 overflow-hidden rounded-[20px] bg-[#d1d1d1]">
                  <img
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
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
                </div>
                <h3 className="mt-[26.4px] px-[19px] font-sans text-[20px] font-semibold leading-[26.8px] text-[#04264e]">
                  {item.title}
                </h3>
                <p className="mt-[7.2px] line-clamp-2 pl-[19px] font-sans text-[14px] font-normal leading-[22.8px] text-black opacity-70">
                  {item.description}
                </p>
              </Link>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-[31px]">
            <nav aria-label="Industries pagination" className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
                className="flex size-[53px] items-center justify-center rounded-md border border-[#c4d7e8] text-[#144168] transition-colors hover:bg-black/5 disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 rotate-180" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  onClick={() => setCurrentPage(pg)}
                  aria-current={currentPage === pg ? 'page' : undefined}
                  className={`flex size-[53px] items-center justify-center rounded-md font-sans text-sm font-medium transition-colors ${
                    currentPage === pg
                      ? 'bg-[#ba2c29] text-white border-0'
                      : 'border border-[#c4d7e8] text-[#144168] hover:bg-black/5'
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next page"
                className="flex size-[53px] items-center justify-center rounded-md border border-[#c4d7e8] text-[#144168] transition-colors hover:bg-black/5 disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
