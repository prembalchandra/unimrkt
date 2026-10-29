'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const blogCardsData = [
  {
    id: 1,
    category: 'market-research',
    tag: 'Market Research',
    img: '/asstes/images/customer-experience-img.png',
    title: 'From Data to Decision: How Modern Market Research Drives Growth',
    desc: 'Discover actionable strategies to translate raw data into decisive market intelligence that accelerates business scaling.',
    link: '/blog-details',
  },
  {
    id: 2,
    category: 'market-research',
    tag: 'Primary Research',
    img: '/asstes/images/unimrkt-reseach-primary-research-banner-img.png',
    title: 'Key Market Research Methodologies Every Business Needs to Know',
    desc: 'A comprehensive breakdown of qualitative vs. quantitative research approaches and when to deploy each for maximum ROI.',
    link: '/blog-details',
  },
  {
    id: 3,
    category: 'b2b-research',
    tag: 'B2B Research',
    img: '/asstes/images/centralized-data-card-img.png',
    title: 'Why Consumer Behaviour Research is Critical for Product Success',
    desc: 'Understanding buyer psychology, purchasing barriers, and preference shifts across diverse and competitive global markets.',
    link: '/blog-details',
  },
  {
    id: 4,
    category: 'market-research',
    tag: 'Automotive',
    img: '/asstes/images/real-time-monitoring-card-img.png',
    title: 'Key Trends Shaping the Future of the Automotive Industry',
    desc: 'Explore how electrification, connected technologies and changing customer expectations are reshaping the future of mobility.',
    link: '/blog-details',
  },
  {
    id: 5,
    category: 'data-analytics',
    tag: 'AI & Technology',
    img: '/asstes/images/interview-controls-card-img.png',
    title: 'The Growing Role of AI in Primary Research & Qualitative Analysis',
    desc: 'Examining how generative AI models and natural language processing augment human intuition in complex studies.',
    link: '/blog-details',
  },
  {
    id: 6,
    category: 'b2b-research',
    tag: 'Brand Tracking',
    img: '/asstes/images/data-validation-card-img.png',
    title: 'Brand Tracking: Measuring What Matters in an Evolving Market',
    desc: 'Reliable techniques for monitoring brand health, respondent sentiment, and perceptual shifts over continuous cycles.',
    link: '/blog-details',
  },
  {
    id: 7,
    category: 'consumer-insights',
    tag: 'Consumer Insights',
    img: '/asstes/images/product-research-img.png',
    title: 'Customer Satisfaction vs Experience: What B2B Companies Need to Know',
    desc: 'Why CSAT metrics alone are insufficient and how modern CX frameworks foster long-term retention and loyalty.',
    link: '/blog-details',
  },
  {
    id: 8,
    category: 'healthcare',
    tag: 'Healthcare',
    img: '/asstes/images/smart-survey-management-card-img.png',
    title: 'Healthcare Market Research: Overcoming Regulatory & Sample Challenges',
    desc: 'Navigating strict compliance, physician panels, and patient sentiment in clinical and healthcare-centric studies.',
    link: '/blog-details',
  },
  {
    id: 9,
    category: 'market-research',
    tag: 'Global Panels',
    img: '/asstes/images/online-surveys-card-img.png',
    title: 'Global Panel Solutions: Best Practices for Quality Data Collection',
    desc: 'How multi-tier respondent screening and digital fraud detection ensure uncompromised integrity in survey research.',
    link: '/blog-details',
  },
];

const categories = [
  { value: 'all', label: 'All' },
  { value: 'market-research', label: 'Market Research' },
  { value: 'b2b-research', label: 'B2B Research' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'consumer-insights', label: 'Consumer Insights' },
  { value: 'data-analytics', label: 'Data Analytics & Tech' },
];

const CARDS_PER_PAGE = 6;

export default function BlogGrid({ initialBlogs = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const activeBlogsList = useMemo(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      return initialBlogs.map((b, idx) => ({
        id: b.id || b.documentId || idx,
        category: b.category?.slug || 'market-research',
        tag: b.category?.name || b.tag || 'Market Research',
        img: b.coverImage?.url
          ? (b.coverImage.url.startsWith('http') ? b.coverImage.url : `${strapiUrl}${b.coverImage.url}`)
          : '/asstes/images/customer-experience-img.png',
        title: b.title,
        desc: b.excerpt || b.description || '',
        link: b.slug ? `/blog/${b.slug}` : '/blog-details',
      }));
    }
    return blogCardsData;
  }, [initialBlogs]);

  const filteredCards = useMemo(() => {
    return activeBlogsList.filter((card) => {
      return activeCategory === 'all' || card.category === activeCategory;
    });
  }, [activeCategory, activeBlogsList]);

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
            Stay ahead with the latest industry insights, expert perspectives, and actionable intelligence to fuel your business growth and decision-making.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="blog-filter-wrapper">
          <div className="blog-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`blog-filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="blog-sction-wapper">
          <div className="blog-grid-area">
            {visibleCards.map((card) => (
              <div key={card.id} className="blog-col">
                <Link href={card.link} className="blog-col-box">
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
              </div>
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
                className="pagination-item arrow-btn"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-item ${page === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-current={page === currentPage ? 'page' : 'false'}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-item arrow-btn"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
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
