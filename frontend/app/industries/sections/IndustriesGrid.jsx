
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../../../lib/strapi';

const ITEMS_PER_PAGE = 6;

// Format Strapi industry data
function formatIndustry(ind) {
  if (!ind) return null;

  const slug = ind.slug || ind.documentId || ind.id;

  const imageData =
    ind.image || ind.featuredImage || ind.heroImage;

  return {
    id: slug,
    title: ind.title || ind.name || '',
    image: imageData ? getStrapiMedia(imageData) : null,
    link: ind.link || ind.url || ind.ctaLink || '',
    desc: ind.shortDescription || ind.description || '',
    alt:
      imageData?.alternativeText ||
      ind.title ||
      ind.name ||
      '',
  };
}

export default function IndustriesGrid({
  initialIndustries = [],
  dynamicSection = null,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);

  // Strapi CMS content
  const displayKicker = dynamicSection?.kicker;
  const displayHeading =
    dynamicSection?.heading || dynamicSection?.title;

  const displayDesc = dynamicSection?.description;

  // Format industries received from Strapi
  const items = (initialIndustries || [])
    .map(formatIndustry)
    .filter((item) => item && item.id && item.title);

  // Pagination
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentIndustries = items.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset pagination when CMS data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [initialIndustries]);

  // Prevent invalid pagination
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Page navigation
  const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === currentPage
    ) {
      return;
    }

    setCurrentPage(newPage);

    if (sectionRef.current) {
      const topOffset =
        sectionRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        90;

      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  // Hide section when CMS has no content
  if (
    !displayKicker &&
    !displayHeading &&
    !displayDesc &&
    items.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="industries-grid-section"
      id="industries-grid"
      ref={sectionRef}
    >
      <div className="srcn-container">

        {/* Section Header */}
        {(displayKicker || displayHeading || displayDesc) && (
          <div className="section-header-area">

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
              <p className="section-sub-text">
                {displayDesc}
              </p>
            )}

          </div>
        )}

        {/* Industries Cards */}
        {currentIndustries.length > 0 && (
          <div className="industries-cards-grid">

            {currentIndustries.map((ind) => (
              <article
                key={ind.id}
                className="industries-grid-card"
              >

                {ind.image && (
                  <div className="industries-card-img-wrap">
                    <img
                      src={ind.image}
                      alt={ind.alt}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="industries-card-content">

                  <h3>{ind.title}</h3>

                  {ind.desc && (
                    <p>{ind.desc}</p>
                  )}

                  {ind.link && (
                    <div className="industries-card-btn-wrap">
                      <Link
                        href={ind.link}
                        className="industries-card-explore-btn btn-border-sm"
                      >
                        <span>
                          {ind.ctaText || dynamicSection?.ctaText}
                        </span>

                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

        {/* Dynamic Pagination */}
        {totalPages > 1 && (
          <div
            className="industries-pagination-area blog-pagination-area"
            style={{
              display: 'flex',
              marginTop: '48px',
              justifyContent: 'center',
            }}
          >

            <button
              type="button"
              className="pagination-item arrow-btn prev-btn"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              <i
                className="fa-solid fa-chevron-left"
                aria-hidden="true"
              />
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={`pagination-item page-btn ${
                  page === currentPage ? 'active' : ''
                }`}
                onClick={() => handlePageChange(page)}
                aria-current={
                  page === currentPage ? 'page' : undefined
                }
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
              <i
                className="fa-solid fa-chevron-right"
                aria-hidden="true"
              />
            </button>

          </div>
        )}

      </div>
    </section>
  );
}
