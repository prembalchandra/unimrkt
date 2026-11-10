'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

const ITEMS_PER_PAGE = 6;

const fallbackIndustryPhotos = [
  '/uploads/oc_industry_healthcare_df075d98d8.jpg',
  '/uploads/industry_automotive_9d8c1f73cd.jpg',
  '/uploads/oc_industry_technology_3d259a7b80.jpg',
  '/uploads/oc_industry_automotive_a401cb0936.jpg',
  '/uploads/industry_banking_49416162c9.jpg',
  '/uploads/oc_industry_b2b_industrial_1adf04cab7.jpg',
];

// Format Strapi industry data
function formatIndustry(ind, idx = 0) {
  if (!ind) return null;

  const slug = ind.slug || ind.documentId || ind.id;
  const imageData = ind.image || ind.featuredImage || ind.heroImage;
  const fallbackImg = fallbackIndustryPhotos[idx % fallbackIndustryPhotos.length];

  return {
    id: slug,
    title: ind.title || ind.name || '',
    image: imageData ? getStrapiMedia(imageData) : fallbackImg,
    link: ind.link || ind.url || `/industries/${slug}`,
    desc: ind.shortDescription || ind.description || 'Delivering structured market intelligence and tailored quantitative and qualitative insights.',
    alt: imageData?.alternativeText || ind.title || ind.name || '',
    ctaText: ind.ctaText || 'Explore Industry',
  };
}

export default function IndustriesGrid({
  initialIndustries = [],
  dynamicSection = null,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  // Strapi CMS content
  const displayKicker = dynamicSection?.kicker || 'Industries';
  const displayHeading =
    dynamicSection?.heading || dynamicSection?.title || 'Deep Expertise Across Diverse Industries';
  const displayDesc =
    dynamicSection?.description ||
    'Our research expertise spans diverse industries, helping businesses understand the unique market dynamics, customer behaviours and challenges shaping their sectors.';

  // Format industries received from Strapi
  const items = (initialIndustries || [])
    .map((ind, idx) => formatIndustry(ind, idx))
    .filter((item) => item && item.id && item.title);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIndustries = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [initialIndustries]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
  };

  return (
    <section
      className="industries-grid-section"
      id="industries-grid"
      ref={sectionRef}
    >
      <div className="srcn-container">
        {/* Section Header */}
        <div className="section-header-area text-center" style={{ maxWidth: 940, margin: '0 auto 40px' }}>
          {displayKicker && (
            <span className="career-values-kicker">
              {displayKicker}
            </span>
          )}

          {displayHeading && (
            <h2 className="section-main-heading">
              {displayHeading}
            </h2>
          )}

          {displayDesc && (
            <p className="section-sub-text" style={{ margin: '0 auto' }}>
              {displayDesc}
            </p>
          )}
        </div>

        {/* Industries Cards */}
        {currentIndustries.length > 0 && (
          <div className="industries-cards-grid">
            {currentIndustries.map((ind) => (
              <article key={ind.id} className="industries-grid-card">
                {ind.image && (
                  <div className="industries-card-img-wrap">
                    <img src={ind.image} alt={ind.alt} loading="lazy" />
                  </div>
                )}

                <div className="industries-card-content">
                  <h3>{ind.title}</h3>
                  {ind.desc && <p>{ind.desc}</p>}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="industries-pagination-area" role="navigation" aria-label="Industries pagination">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  type="button"
                  className={`industries-pagination-dot ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
