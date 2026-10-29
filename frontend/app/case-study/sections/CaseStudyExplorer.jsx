'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const caseStudiesData = [
  {
    id: 1,
    category: 'banking-finance',
    research: 'consumer-insights',
    badge: 'BANKING & FINANCE',
    img: '/asstes/images/case-study-banking.jpg',
    title: 'Understanding Customer Expectations in a Changing Financial Market',
    snippet: 'How qualitative research helped a leading bank uncover evolving consumer preferences and redesign digital services.',
    link: '/case-study-details',
  },
  {
    id: 2,
    category: 'healthcare',
    research: 'primary-research',
    badge: 'HEALTHCARE',
    img: '/asstes/images/industry-healthcare.png',
    title: 'Physician Insights for Next-Gen MedTech Product Launch',
    snippet: 'Specialized healthcare fieldwork across 12 countries to gauge surgeon interest in innovative robotic devices.',
    link: '/case-study-details',
  },
  {
    id: 3,
    category: 'automotive',
    research: 'b2b-research',
    badge: 'AUTOMOTIVE',
    img: '/asstes/images/industry-retail.png',
    title: 'Electric Vehicle Adoption & Commercial Fleet Readiness',
    snippet: 'Evaluating supplier hurdles and infrastructure readiness among tier-1 automotive suppliers in Europe.',
    link: '/case-study-details',
  },
  {
    id: 4,
    category: 'fmcg',
    research: 'consumer-insights',
    badge: 'FMCG',
    img: '/asstes/images/market-trends-card-img1.png',
    title: 'Consumer Brand Loyalty Shift in Fast-Moving Packaged Goods',
    snippet: 'Uncovering brand-switching triggers among Gen Z and millennial grocery shoppers across metropolitan areas.',
    link: '/case-study-details',
  },
  {
    id: 5,
    category: 'it-telecom',
    research: 'data-analytics',
    badge: 'IT & TELECOM',
    img: '/asstes/images/market-trends-card-img2.png',
    title: 'Enterprise Cloud Transition Benchmarks & Security Needs',
    snippet: 'Synthesizing survey data from 400+ IT decision makers to inform a global telco’s cloud product portfolio.',
    link: '/case-study-details',
  },
  {
    id: 6,
    category: 'energy-utilities',
    research: 'market-research',
    badge: 'ENERGY & UTILITIES',
    img: '/asstes/images/market-trends-card-img3.png',
    title: 'Renewable Transition Readiness Among Commercial Facilities',
    snippet: 'Assessing energy storage and commercial solar adoption barriers among corporate facility directors.',
    link: '/case-study-details',
  },
  {
    id: 7,
    category: 'banking-finance',
    research: 'b2b-research',
    badge: 'BANKING & FINANCE',
    img: '/asstes/images/case-study-banking.jpg',
    title: 'SME Lending Dynamics & Digital Onboarding Optimization',
    snippet: 'Interviewing small business owners to identify financing gaps and friction in current lending workflows.',
    link: '/case-study-details',
  },
  {
    id: 8,
    category: 'healthcare',
    research: 'consumer-insights',
    badge: 'HEALTHCARE',
    img: '/asstes/images/industry-healthcare.png',
    title: 'Telemedicine Satisfaction & Retention in Post-Pandemic Care',
    snippet: 'Tracking patient satisfaction across remote consults and identifying the digital features patients demand.',
    link: '/case-study-details',
  },
  {
    id: 9,
    category: 'automotive',
    research: 'market-research',
    badge: 'AUTOMOTIVE',
    img: '/asstes/images/industry-retail.png',
    title: 'Connected Vehicle Telematics & Consumer Privacy Priorities',
    snippet: 'Mapping consumer willingness to share real-time automotive data in exchange for customized vehicle services.',
    link: '/case-study-details',
  },
  {
    id: 10,
    category: 'fmcg',
    research: 'primary-research',
    badge: 'FMCG',
    img: '/asstes/images/market-trends-card-img1.png',
    title: 'Sustainable Packaging Preferences Across Global Supermarkets',
    snippet: 'Quantifying purchase intent shifts when consumer goods switch to 100% biodegradable packaging alternatives.',
    link: '/case-study-details',
  },
  {
    id: 11,
    category: 'it-telecom',
    research: 'b2b-research',
    badge: 'IT & TELECOM',
    img: '/asstes/images/market-trends-card-img2.png',
    title: '5G Enterprise Private Network Demand Analysis',
    snippet: 'Surveying industrial plants on 5G private wireless network investment timelines and operational requirements.',
    link: '/case-study-details',
  },
  {
    id: 12,
    category: 'energy-utilities',
    research: 'data-analytics',
    badge: 'ENERGY & UTILITIES',
    img: '/asstes/images/market-trends-card-img3.png',
    title: 'Smart Meter Data Analytics for Peak Grid Load Forecasting',
    snippet: 'Analyzing residential smart-meter trial data to assist an electricity provider in pricing and distribution.',
    link: '/case-study-details',
  },
  {
    id: 13,
    category: 'banking-finance',
    research: 'primary-research',
    badge: 'BANKING & FINANCE',
    img: '/asstes/images/case-study-banking.jpg',
    title: 'Cross-Border B2B Payments & Forex Hedging Survey',
    snippet: 'CATI interviews across 250 corporate treasurers evaluating international payment bottlenecks and costs.',
    link: '/case-study-details',
  },
  {
    id: 14,
    category: 'healthcare',
    research: 'data-analytics',
    badge: 'HEALTHCARE',
    img: '/asstes/images/industry-healthcare.png',
    title: 'Pharmaceutical Market Access & Payer Reimbursement Trends',
    snippet: 'In-depth interviews with insurance actuaries and health authorities determining pricing thresholds.',
    link: '/case-study-details',
  },
  {
    id: 15,
    category: 'automotive',
    research: 'consumer-insights',
    badge: 'AUTOMOTIVE',
    img: '/asstes/images/industry-retail.png',
    title: 'Car Subscription Models vs. Traditional Dealership Leasing',
    snippet: 'Analyzing buyer sentiment across urban commuters regarding vehicle subscription flexibility.',
    link: '/case-study-details',
  },
  {
    id: 16,
    category: 'fmcg',
    research: 'market-research',
    badge: 'FMCG',
    img: '/asstes/images/market-trends-card-img1.png',
    title: 'Direct-to-Consumer Disruption in Premium Skincare',
    snippet: 'Examining omnichannel consumer touchpoints and digital discovery funnels for independent cosmetics brands.',
    link: '/case-study-details',
  },
  {
    id: 17,
    category: 'it-telecom',
    research: 'primary-research',
    badge: 'IT & TELECOM',
    img: '/asstes/images/market-trends-card-img2.png',
    title: 'AI Development Tool Stack Adoption in Enterprise Engineering',
    snippet: 'Assessing developer velocity and software licensing models through targeted developer community panels.',
    link: '/case-study-details',
  },
  {
    id: 18,
    category: 'energy-utilities',
    research: 'b2b-research',
    badge: 'ENERGY & UTILITIES',
    img: '/asstes/images/market-trends-card-img3.png',
    title: 'Hydrogen Infrastructure Viability & Industrial Fuel Switching',
    snippet: 'Gathering strategic viewpoints from chemical and manufacturing leaders on hydrogen energy feasibility.',
    link: '/case-study-details',
  },
];

const industryOptions = [
  { value: 'all', label: 'All Industries' },
  { value: 'banking-finance', label: 'Banking & Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'fmcg', label: 'FMCG' },
  { value: 'it-telecom', label: 'IT & Telecom' },
  { value: 'energy-utilities', label: 'Energy & Utilities' },
];

const researchOptions = [
  { value: 'all', label: 'All Research Types' },
  { value: 'market-research', label: 'Market Research' },
  { value: 'primary-research', label: 'Primary Research' },
  { value: 'b2b-research', label: 'B2B Research' },
  { value: 'consumer-insights', label: 'Consumer Insights' },
  { value: 'data-analytics', label: 'Data Analytics' },
];

const CARDS_PER_PAGE = 6;

export default function CaseStudyExplorer({ initialCaseStudies = [] }) {
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeResearch, setActiveResearch] = useState('all');
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState('');
  const [researchSearch, setResearchSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allStudies = useMemo(() => {
    if (initialCaseStudies && initialCaseStudies.length > 0) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      return initialCaseStudies.map((item, idx) => {
        const heroUrl = item.heroImage?.url
          ? (item.heroImage.url.startsWith('http') ? item.heroImage.url : `${strapiUrl}${item.heroImage.url}`)
          : '/asstes/images/case-study-banking.jpg';
        const indSlug = item.industry?.slug || 'banking-finance';
        const indName = item.industry?.name || 'BANKING & FINANCE';
        const resSlug = item.researchType?.slug || 'consumer-insights';

        return {
          id: item.documentId || item.id || idx + 1,
          category: indSlug,
          research: resSlug,
          badge: indName.toUpperCase(),
          img: heroUrl,
          title: item.title,
          snippet: item.excerpt || '',
          link: item.slug ? `/case-study/${item.slug}` : '/case-study-details',
        };
      });
    }
    return caseStudiesData;
  }, [initialCaseStudies]);

  const filteredStudies = useMemo(() => {
    return allStudies.filter((card) => {
      const matchInd = activeIndustry === 'all' || card.category === activeIndustry;
      const matchRes = activeResearch === 'all' || card.research === activeResearch;
      return matchInd && matchRes;
    });
  }, [allStudies, activeIndustry, activeResearch]);

  const totalPages = Math.max(1, Math.ceil(filteredStudies.length / CARDS_PER_PAGE));
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const visibleCards = filteredStudies.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handleAllClick = () => {
    setActiveIndustry('all');
    setActiveResearch('all');
    setIndustryDropdownOpen(false);
    setResearchDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleIndustrySelect = (val) => {
    setActiveIndustry(val);
    setIndustryDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleResearchSelect = (val) => {
    setActiveResearch(val);
    setResearchDropdownOpen(false);
    setCurrentPage(1);
  };

  const currentIndustryLabel =
    activeIndustry === 'all'
      ? 'Industries'
      : industryOptions.find((o) => o.value === activeIndustry)?.label || 'Industries';

  const currentResearchLabel =
    activeResearch === 'all'
      ? 'Research Type'
      : researchOptions.find((o) => o.value === activeResearch)?.label || 'Research Type';

  const filteredIndustryOptions = industryOptions.filter((opt) =>
    opt.label.toLowerCase().includes(industrySearch.toLowerCase().trim())
  );

  const filteredResearchOptions = researchOptions.filter((opt) =>
    opt.label.toLowerCase().includes(researchSearch.toLowerCase().trim())
  );

  return (
    <section className="blog-section-area" id="blogs-grid">
      <div className="srcn-container">
        {/* Section Header */}
        <div className="section-header-area">
          <span className="career-values-kicker">Case Study Explorer</span>
          <h2 className="section-main-heading">Explore Our Research Stories</h2>
          <p className="section-sub-text">
            Discover how we solve complex research challenges across industries, markets and methodologies.
          </p>
        </div>

        {/* Category Filter Pills & Dropdowns */}
        <div className="case-study-filter-wrapper">
          <div className="case-filter-row">
            <button
              type="button"
              className={`filter-all-btn ${activeIndustry === 'all' && activeResearch === 'all' ? 'active' : ''}`}
              onClick={handleAllClick}
            >
              ALL
            </button>

            {/* Industries Dropdown */}
            <div className={`cs-dropdown ${industryDropdownOpen ? 'active' : ''}`} id="dropdown-industries">
              <button
                type="button"
                className="filter-dropdown-btn"
                aria-haspopup="true"
                aria-expanded={industryDropdownOpen}
                onClick={() => {
                  setIndustryDropdownOpen((prev) => !prev);
                  setResearchDropdownOpen(false);
                }}
              >
                <span className="dropdown-label">{currentIndustryLabel}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="cs-dropdown-menu">
                <div className="cs-dropdown-search-wrap" onClick={(e) => e.stopPropagation()}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    className="cs-dropdown-search-input"
                    placeholder="Search industry..."
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="cs-dropdown-list">
                  {filteredIndustryOptions.map((opt) => (
                    <a
                      key={opt.value}
                      href="javascript:void(0)"
                      className={`cs-dropdown-item ${activeIndustry === opt.value ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleIndustrySelect(opt.value);
                      }}
                    >
                      {opt.label}
                    </a>
                  ))}
                </div>
                {filteredIndustryOptions.length === 0 && (
                  <div className="cs-dropdown-empty" style={{ display: 'block' }}>
                    No industry found
                  </div>
                )}
              </div>
            </div>

            {/* Research Type Dropdown */}
            <div className={`cs-dropdown ${researchDropdownOpen ? 'active' : ''}`} id="dropdown-research-type">
              <button
                type="button"
                className="filter-dropdown-btn"
                aria-haspopup="true"
                aria-expanded={researchDropdownOpen}
                onClick={() => {
                  setResearchDropdownOpen((prev) => !prev);
                  setIndustryDropdownOpen(false);
                }}
              >
                <span className="dropdown-label">{currentResearchLabel}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="cs-dropdown-menu">
                <div className="cs-dropdown-search-wrap" onClick={(e) => e.stopPropagation()}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    className="cs-dropdown-search-input"
                    placeholder="Search research type..."
                    value={researchSearch}
                    onChange={(e) => setResearchSearch(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="cs-dropdown-list">
                  {filteredResearchOptions.map((opt) => (
                    <a
                      key={opt.value}
                      href="javascript:void(0)"
                      className={`cs-dropdown-item ${activeResearch === opt.value ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleResearchSelect(opt.value);
                      }}
                    >
                      {opt.label}
                    </a>
                  ))}
                </div>
                {filteredResearchOptions.length === 0 && (
                  <div className="cs-dropdown-empty" style={{ display: 'block' }}>
                    No research type found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="blog-sction-wapper">
          <div className="case-study-grid">
            {visibleCards.map((card) => (
              <Link href={card.link} className="blog-col-box">
                <div className="blog-wapper">
                  <div className="blog-img-area">
                    <img src={card.img} alt={card.title} />
                  </div>
                  <div className="blog-contnet">
                    <div className="blog-category-tag-box">
                      <span className="badge-tag">{card.badge}</span>
                    </div>
                    <div className="blog-contnt-row-area">
                      <h3>{card.title}</h3>
                      <p>{card.snippet}</p>
                    </div>
                    <div className="blog-card-bottom-action">
                      <span className="blog-read-arrow-circle">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              No case studies found matching the selected criteria.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="case-pagination blog-pagination-area" style={{ display: 'flex' }}>
              <button
                type="button"
                className="pagination-item arrow-btn prev-btn"
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                  document.querySelector('#blogs-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`pagination-item page-btn ${page === currentPage ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage(page);
                    document.querySelector('#blogs-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  aria-current={page === currentPage ? 'page' : 'false'}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="pagination-item arrow-btn next-btn"
                disabled={currentPage >= totalPages}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                  document.querySelector('#blogs-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                aria-label="Next page"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </section >
  );
}
