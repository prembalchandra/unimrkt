'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../../../lib/strapi';

const CARDS_PER_PAGE = 6;

function formatBlogCard(b, idx) {
  if (!b) return null;
  const categorySlug = b.category?.slug || 'market-research';
  const tag = b.category?.name || b.tag || 'Market Research';

  return {
    id: b.id || b.documentId || idx + 1,
    category: categorySlug,
    tag,
    img: getStrapiMedia(b.featuredImage || b.coverImage, '/asstes/images/customer-experience-img.png'),
    title: b.title || '',
    desc: b.excerpt || b.description || '',
    link: b.slug ? `/blog-details?slug=${b.slug}` : '/blog-details',
  };
}

export default function BlogGrid({ initialBlogs = [] }) {
  const [blogs, setBlogs] = useState(() => (initialBlogs || []).map(formatBlogCard).filter(Boolean));
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogs(initialBlogs.map(formatBlogCard).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/blogs?populate=*&pagination[limit]=50&sort=publishedAt:desc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setBlogs(d.data.map(formatBlogCard).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialBlogs]);

  const categories = useMemo(() => {
    const map = new Map();
    blogs.forEach((b) => {
      if (b.category && !map.has(b.category)) {
        map.set(b.category, b.tag || b.category);
      }
    });
    const result = [{ value: 'all', label: 'All' }];
    map.forEach((lbl, val) => {
      result.push({ value: val, label: lbl });
    });
    return result;
  }, [blogs]);

  const filteredCards = useMemo(() => {
    return blogs.filter((card) => {
      return activeCategory === 'all' || card.category === activeCategory;
    });
  }, [activeCategory, blogs]);

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / CARDS_PER_PAGE));
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const visibleCards = filteredCards.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      document.querySelector('#blogs-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="blog-section-area" id="blogs-grid">
      <div className="srcn-container">
        {/* Section Header */}
        <div className="section-header-area">
          <h2 className="section-main-heading">Insights &amp; Stories</h2>
          <p className="section-sub-text">
            Explore in-depth articles, industry breakdowns, and forward-looking research perspectives.
          </p>
        </div>

        {/* Filter Tabs */}
        {categories.length > 1 && (
          <div className="blog-filter-tabs" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.value}
                className={`blog-filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Blog Cards Grid */}
        <div className="blog-sction-wapper">
          <div className="blog-col-grid">
            {visibleCards.map((card) => (
              <Link key={card.id} href={card.link} className="blog-col-box">
                <div className="blog-wapper">
                  <div className="blog-img-area">
                    <img src={card.img} alt={card.title} />
                  </div>
                  <div className="blog-contnet">
                    <div className="blog-category-tag-box">
                      <span className="badge-tag">{card.tag}</span>
                    </div>
                    <div className="blog-contnt-row-area">
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
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

          {filteredCards.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              No blogs found in this category.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="blog-pagination-area" style={{ display: 'flex' }}>
              <button
                type="button"
                className="pagination-item arrow-btn prev-btn"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-chevron-left"></i>
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
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
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
