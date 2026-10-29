'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
const allIndustries = [
  {
    id: 'automotives',
    title: 'Automotives',
    image: '/asstes/images/automotives-card-img.png',
    link: '/automotives',
    desc: 'Understand mobility trends, consumer preferences, vehicle ownership, EV adoption and the evolving automotive...',
  },
  {
    id: 'energy-utilities',
    title: 'Energy & Utilities',
    image: '/asstes/images/energy-utilities-img.png',
    link: '/services',
    desc: 'Understand energy consumption, transition trends, infrastructure, sustainability, regulation and evolving customer...',
  },
  {
    id: 'banking-finance',
    title: 'Banking and Finance',
    image: '/asstes/images/banking-and-finance-img.png',
    link: '/services',
    desc: 'Explore customer expectations, financial behavior, digital adoption, lending, payments, insurance and com...',
  },
  {
    id: 'food-beverage',
    title: 'Food & Beverage',
    image: '/asstes/images/food-&-beverage-img.png',
    link: '/services',
    desc: 'Discover changing consumption habits, product preferences, category trends, brand perceptions and purchase drivers.',
  },
  {
    id: 'transportation',
    title: 'Transportation',
    image: '/asstes/images/transportation-img.png',
    link: '/services',
    desc: 'Research mobility behavior, logistics, transportation preferences, infrastructure and emerging mobility models.',
  },
  {
    id: 'media-entertainment',
    title: 'Media & Entertainment',
    image: '/asstes/images/media-&-entertainment-img.png',
    link: '/services',
    desc: 'Explore content consumption, audience engagement, platform preferences, subscriptions, advertising and monetization.',
  },

  // Page 2 - Additional sectors
  {
    id: 'healthcare-life-sciences',
    title: 'Healthcare & Life Sciences',
    image: '/asstes/images/case-study-healthcare.jpg',
    link: '/services',
    desc: 'Physician panels, patient journey mapping, medical devices, pharmaceuticals, and regulatory compliance studies.',
  },
  {
    id: 'technology-saas',
    title: 'Technology & SaaS',
    image: '/asstes/images/market-trends-card-img2.png',
    link: '/services',
    desc: 'Enterprise software buying cycles, cloud adoption, cybersecurity priorities, and AI implementation benchmarking.',
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    image: '/asstes/images/industry-retail.png',
    link: '/services',
    desc: 'Omnichannel consumer behavior, brand perception, price elasticity, and post-purchase customer satisfaction.',
  },
  {
    id: 'consumer-goods-fmcg',
    title: 'Consumer Goods (FMCG)',
    image: '/asstes/images/case-study-fmcg.jpg',
    link: '/services',
    desc: 'Brand tracking, concept validation, packaging testing, shelf-placement analysis, and consumer lifestyle shifts.',
  },
  {
    id: 'telecommunications',
    title: 'Telecommunications',
    image: '/asstes/images/case-study-telecom.jpg',
    link: '/services',
    desc: '5G network rollout sentiment, subscriber churn analysis, digital service bundling, and enterprise telecom audits.',
  },
  {
    id: 'travel-hospitality',
    title: 'Travel & Hospitality',
    image: '/asstes/images/market-trends-card-img3.png',
    link: '/services',
    desc: 'Business and leisure travel trends, hotel guest satisfaction, booking platform preferences, and tourism demand forecasts.',
  },

  // Page 3 - Extended strategic research verticals
  {
    id: 'b2b-markets',
    title: 'B2B Research & Enterprise',
    image: '/asstes/images/b2b-research-img.png',
    link: '/services',
    desc: 'Executive decision-making, procurement dynamics, vendor evaluation, and specialized B2B market feasibility.',
  },
  {
    id: 'brand-intelligence',
    title: 'Brand & Market Intelligence',
    image: '/asstes/images/brand-research-img.png',
    link: '/services',
    desc: 'Brand health diagnostics, competitive positioning, customer sentiment indexing, and brand switch drivers.',
  },
  {
    id: 'product-innovation',
    title: 'Product & Concept Testing',
    image: '/asstes/images/product-research-img.png',
    link: '/services',
    desc: 'Concept validation, feature tradeoff testing, conjoint analysis, and prototype user experience feedback.',
  },
  {
    id: 'customer-experience',
    title: 'Customer Experience (CX)',
    image: '/asstes/images/customer-experience-img.png',
    link: '/services',
    desc: 'End-to-end customer journey mapping, NPS tracking, touchpoint friction analysis, and retention strategies.',
  },
  {
    id: 'global-expansion',
    title: 'Global Markets & Demographics',
    image: '/asstes/images/unimrkt-resarch-map-banner-img.png',
    link: '/services',
    desc: 'Cross-border consumer demographics, regional purchasing trends, and multi-country comparative market studies.',
  },
  {
    id: 'digital-panels',
    title: 'Online & Digital Panels',
    image: '/asstes/images/online-surveys-card-img.png',
    link: '/services',
    desc: 'High-frequency quantitative panel collection, real-time quality validation, and global respondent reach.',
  },
];

const ITEMS_PER_PAGE = 6;

export default function IndustriesGrid({ initialIndustries = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  const industriesList =
    initialIndustries && initialIndustries.length > 0
      ? initialIndustries.map((ind, i) => ({
          id: ind.slug || `ind-${i}`,
          title: ind.title || ind.name,
          image: ind.image?.url || allIndustries[i % allIndustries.length].image,
          link: ind.slug === 'automotives' ? '/automotives' : '/services',
          desc:
            ind.shortDescription ||
            ind.description ||
            allIndustries[i % allIndustries.length].desc,
        }))
      : allIndustries;

  const totalPages = Math.ceil(industriesList.length / ITEMS_PER_PAGE) || 1;

  // Pagination calculation
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIndustries = industriesList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Self-contained page change JavaScript handler
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);

    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <section className="industries-showcase-section" ref={sectionRef} id="industries-showcase">

      <div className="srcn-container">
        <div className="industries-showcase-header section-header-area">
          <span className="industries-showcase-kicker career-values-kicker">INDUSTRIES</span>
          <h2 className="industries-showcase-heading section-main-heading">Deep Expertise Across Diverse Industries</h2>
          <p className="industries-showcase-desc section-sub-text">
            Our research expertise spans diverse industries, helping businesses understand the unique market dynamics,
            customer behaviours and challenges shaping their sectors. From Banking &amp; Finance and Healthcare to
            Consumer &amp; Retail, Technology, Automotive and B2B markets, we bring relevant industry understanding and
            research capabilities to every project.
          </p>
        </div>

        {/* 6 Cards Grid (Responsive: 3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="industries-showcase-grid" key={currentPage}>
          {currentIndustries.map((item) => (
            <Link key={item.id} href={item.link} className="industries-card" aria-label={`Learn more about ${item.title}`}>
              <div className="industries-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <div className="industries-card-body">
                <h3 className="industries-card-title">{item.title}</h3>
                <p className="industries-card-desc">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Interactive Working Pagination */}
        {totalPages > 1 && (
          <div className="blog-pagination-area" style={{ display: 'flex', marginTop: '48px' }} aria-label="Industries pagination">
            <button
              type="button"
              className="pagination-item arrow-btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`pagination-item ${pageNum === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
                aria-current={pageNum === currentPage ? 'page' : undefined}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              className="pagination-item arrow-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
