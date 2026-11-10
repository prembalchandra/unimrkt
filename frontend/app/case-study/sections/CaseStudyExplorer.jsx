'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../../../lib/strapi';

const CARDS_PER_PAGE = 6;

function formatStudy(item, idx) {
  if (!item) return null;
  const indSlug = item.industry?.slug || 'banking-finance';
  const indName = item.industry?.title || item.industry?.name || 'BANKING & FINANCE';
  const resSlug = item.researchType?.slug || 'consumer-insights';

  return {
    id: item.documentId || item.id || idx + 1,
    category: indSlug,
    research: resSlug,
    badge: indName.toUpperCase(),
    img: getStrapiMedia(item.heroImage, '/asstes/images/case-study-banking.jpg'),
    title: item.title || '',
    snippet: item.excerpt || '',
    link: item.slug ? `/case-study-details?slug=${item.slug}` : '/case-study-details',
  };
}

export default function CaseStudyExplorer({
  initialCaseStudies = [],
  dynamicSection = null,
  kicker,
  title,
  description,
}) {
  const displayKicker = dynamicSection?.kicker || kicker || 'Case Study Explorer';
  const displayTitle = dynamicSection?.heading || dynamicSection?.title || title || 'Explore Our Research Stories';
  const displayDesc =
    dynamicSection?.description ||
    description ||
    'Discover how we solve complex research challenges across industries, markets and methodologies.';

  const [studies, setStudies] = useState(() => (initialCaseStudies || []).map(formatStudy).filter(Boolean));
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeResearch, setActiveResearch] = useState('all');
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState('');
  const [researchSearch, setResearchSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialCaseStudies && initialCaseStudies.length > 0) {
      setStudies(initialCaseStudies.map(formatStudy).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/case-studies?populate=*&pagination[limit]=50`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setStudies(d.data.map(formatStudy).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialCaseStudies]);

  const industryOptions = useMemo(() => {
    const map = new Map();
    studies.forEach((s) => {
      if (s.category && !map.has(s.category)) {
        map.set(s.category, s.badge || s.category);
      }
    });
    const opts = [{ value: 'all', label: 'All Industries' }];
    map.forEach((lbl, val) => {
      opts.push({ value: val, label: lbl });
    });
    return opts;
  }, [studies]);

  const researchOptions = useMemo(() => {
    const set = new Set();
    studies.forEach((s) => {
      if (s.research) set.add(s.research);
    });
    const opts = [{ value: 'all', label: 'All Research Types' }];
    set.forEach((r) => {
      const label = r
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      opts.push({ value: r, label });
    });
    return opts;
  }, [studies]);

  const filteredStudies = useMemo(() => {
    return studies.filter((card) => {
      const matchInd = activeIndustry === 'all' || card.category === activeIndustry;
      const matchRes = activeResearch === 'all' || card.research === activeResearch;
      return matchInd && matchRes;
    });
  }, [studies, activeIndustry, activeResearch]);

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
          <span className="career-values-kicker">{displayKicker}</span>
          <h2 className="section-main-heading">{displayTitle}</h2>
          <p className="section-sub-text">{displayDesc}</p>
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
              <Link key={card.id} href={card.link} className="blog-col-box">
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
    </section>
  );
}
