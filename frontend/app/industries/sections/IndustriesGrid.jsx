'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../../../lib/strapi';

const ITEMS_PER_PAGE = 6;

function getIndustryImage(slug = '') {
  const s = slug.toLowerCase();
  if (s.includes('auto')) return '/asstes/images/automotives-card-img.png';
  if (s.includes('energy') || s.includes('utilit')) return '/asstes/images/energy-utilities-img.png';
  if (s.includes('bank') || s.includes('financ')) return '/asstes/images/banking-and-finance-img.png';
  if (s.includes('food') || s.includes('beverag')) return '/asstes/images/food-&-beverage-img.png';
  if (s.includes('transport') || s.includes('logistic')) return '/asstes/images/transportation-img.png';
  if (s.includes('media') || s.includes('entert')) return '/asstes/images/media-&-entertainment-img.png';
  if (s.includes('health') || s.includes('medic')) return '/asstes/images/case-study-healthcare.jpg';
  if (s.includes('tech') || s.includes('telecom')) return '/asstes/images/market-trends-card-img2.png';
  return '/asstes/images/banking-and-finance-img.png';
}

function formatIndustry(ind, i) {
  if (!ind) return null;
  const slug = ind.slug || `ind-${i}`;
  return {
    id: slug,
    title: ind.title || ind.name || '',
    image: getStrapiMedia(ind.image || ind.featuredImage || ind.heroImage, getIndustryImage(slug)),
    link: slug === 'automotives' || slug === 'automotive-mobility' ? '/automotives' : '/services',
    desc: ind.shortDescription || ind.description || 'Comprehensive sector intelligence and tailored research insights.',
  };
}

export default function IndustriesGrid({ initialIndustries = [] }) {
  const [items, setItems] = useState(() => (initialIndustries || []).map(formatIndustry).filter(Boolean));
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (initialIndustries && initialIndustries.length > 0) {
      setItems(initialIndustries.map(formatIndustry).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/industries?populate=*&pagination[limit]=50`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setItems(d.data.map(formatIndustry).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialIndustries]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIndustries = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);

    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="industries-grid-section" id="industries-grid" ref={sectionRef}>
      <div className="srcn-container">
        <div className="section-header-area">
          <span className="career-values-kicker">Industries We Serve</span>
          <h2 className="section-main-heading">Expertise Across Key Markets</h2>
          <p className="section-sub-text">
            Explore industry-specific research capabilities tailored to uncover actionable market opportunities.
          </p>
        </div>

        <div className="industries-cards-grid">
          {currentIndustries.map((ind) => (
            <article key={ind.id} className="industries-grid-card">
              <div className="industries-card-img-wrap">
                <img
                  src={ind.image}
                  alt={ind.title}
                  loading="lazy"
                />
              </div>
              <div className="industries-card-content">
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
                <div className="industries-card-btn-wrap">
                  <Link href={ind.link} className="industries-card-explore-btn btn-border-sm">
                    <span>EXPLORE INDUSTRY</span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dynamic Pagination */}
        {totalPages > 1 && (
          <div className="industries-pagination-area blog-pagination-area" style={{ display: 'flex', marginTop: '48px', justifyContent: 'center' }}>
            <button
              type="button"
              className="pagination-item arrow-btn prev-btn"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`pagination-item page-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? 'page' : 'false'}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="pagination-item arrow-btn next-btn"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
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
