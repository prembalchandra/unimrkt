'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const categories = [
  { key: 'all', label: 'ALL' },
  { key: 'team-culture', label: 'TEAM & CULTURE' },
  { key: 'research-process', label: 'RESEARCH PROCESS' },
  { key: 'field-work', label: 'FIELD WORK' },
  { key: 'client-interactions', label: 'CLIENT INTERACTIONS' },
  { key: 'events-conferences', label: 'EVENTS & CONFERENCES' },
];

const galleryItemsData = [
  {
    id: 1,
    categories: ['team-culture', 'client-interactions'],
    src: '/asstes/images/gallery/gallery_item_01.webp',
    title: 'Cross-functional Team Strategy Session',
    alt: 'Team meeting in modern conference room',
  },
  {
    id: 2,
    categories: ['team-culture', 'events-conferences'],
    src: '/asstes/images/gallery/gallery_item_02.webp',
    title: 'Team Building & Creative Problem Solving',
    alt: 'Colleagues playing strategic wooden blocks game',
  },
  {
    id: 3,
    categories: ['research-process', 'field-work'],
    src: '/asstes/images/gallery/gallery_item_03.webp',
    title: 'Quantitative Data Analysis & Reporting',
    alt: 'Researcher reviewing charts and data visualizations',
  },
  {
    id: 4,
    categories: ['research-process', 'field-work'],
    src: '/asstes/images/gallery/gallery_item_04.webp',
    title: 'Questionnaire Architecture & Methodology Planning',
    alt: 'Hands drafting research methodology framework',
  },
  {
    id: 5,
    categories: ['client-interactions', 'field-work'],
    src: '/asstes/images/gallery/gallery_item_05.webp',
    title: 'Executive Client Briefing & Synthesis',
    alt: 'Consultants presenting insights on laptop to partner',
  },
  {
    id: 6,
    categories: ['client-interactions', 'team-culture'],
    src: '/asstes/images/gallery/gallery_item_06.webp',
    title: 'Interactive Insight Discovery Review',
    alt: 'Colleagues sharing and evaluating survey findings',
  },
  {
    id: 7,
    categories: ['team-culture', 'events-conferences'],
    src: '/asstes/images/gallery/gallery_item_07.webp',
    title: 'Project Milestone Success & High Five',
    alt: 'Team celebrating research delivery milestone',
  },
  {
    id: 8,
    categories: ['events-conferences', 'team-culture'],
    src: '/asstes/images/gallery/gallery_item_08.webp',
    title: 'Annual Corporate Sports & Recreation',
    alt: 'Team celebrating together during recreation outing',
  },
  {
    id: 9,
    categories: [
      'research-process',
      'field-work',
      'client-interactions',
    ],
    src: '/asstes/images/gallery/gallery_item_09.webp',
    title: 'Strategic Synthesis & Growth Workshop',
    alt: 'Collaborative multidisciplinary strategy session with notes',
  },
];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isOpen, setIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const swiperContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const modalRef = useRef(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItemsData;

    return galleryItemsData.filter((item) =>
      item.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const openLightbox = useCallback((index) => {
    setInitialSlide(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }
  }, []);

  const handleTabChange = (key) => {
    setActiveCategory(key);
    setVisibleCount(6);
    closeLightbox();
  };

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 250);
  };

  // Initialize Swiper when lightbox opens
  useEffect(() => {
    if (!isOpen || !swiperContainerRef.current) return;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    const swiper = new Swiper(swiperContainerRef.current, {
      modules: [Navigation, Pagination, Keyboard, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 500,
      grabCursor: true,
      initialSlide: initialSlide,
      loop: displayedItems.length > 1,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: nextBtnRef.current,
        prevEl: prevBtnRef.current,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
      observer: true,
      observeParents: true,
    });

    swiperInstanceRef.current = swiper;

    // Ensure layout dimensions update after popup visibility transition
    const timer = setTimeout(() => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.update();
      }
    }, 50);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [isOpen, initialSlide, displayedItems.length, closeLightbox]);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="our-gallery-section">
      <div className="srcn-container">

        <div className="our-gallery-header">
          <h2 className="our-gallery-title">Our Gallery</h2>
        </div>

        {/* Category filters */}
        <div className="our-gallery-tabs" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.key}
              className={`our-gallery-tab-btn ${
                activeCategory === cat.key ? 'is-active' : ''
              }`}
              onClick={() => handleTabChange(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="our-gallery-grid">
          {displayedItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="our-gallery-card"
              onClick={() => openLightbox(index)}
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="our-gallery-card-img"
                loading="lazy"
              />

              <span className="our-gallery-card-hover-overlay">
                <span className="our-gallery-zoom-badge">
                  <i className="fa-solid fa-magnifying-glass-plus" />
                </span>
              </span>
            </button>
          ))}
        </div>

        {displayedItems.length === 0 && (
          <p className="our-gallery-empty">
            No images found in this category.
          </p>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="our-gallery-loadmore-wrap">
            <button
              type="button"
              className="our-gallery-loadmore-btn btn-sm"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              <i
                className={`fa-solid fa-rotate-right ${
                  isLoadingMore ? 'fa-spin' : ''
                }`}
              />
              <span>
                {isLoadingMore ? 'LOADING...' : 'LOAD MORE'}
              </span>
            </button>
          </div>
        )}

        {/* Lightbox Swiper Modal with Autoplay */}
        <div
          ref={modalRef}
          className={`lightbox-modal ${isOpen ? 'active' : ''}`}
          id="galleryLightboxModal"
          aria-hidden={!isOpen}
          style={{ zIndex: 99999 }}
          onClick={(event) => {
            if (event.target === modalRef.current) {
              closeLightbox();
            }
          }}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Close gallery"
            onClick={closeLightbox}
          >
            &times;
          </button>

          <div
            className="lightbox-swiper-container"
            onClick={(event) => event.stopPropagation()}
          >
            {displayedItems.length > 1 && (
              <button
                type="button"
                ref={prevBtnRef}
                className="lightbox-nav-btn lightbox-prev"
                aria-label="Previous slide"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            )}

            <div
              ref={swiperContainerRef}
              className="swiper lightbox-swiper"
              id="galleryLightboxSwiper"
            >
              <div className="swiper-wrapper">
                {displayedItems.map((item) => (
                  <div
                    key={item.id}
                    className="swiper-slide lightbox-slide"
                  >
                    <div className="lightbox-media-box">
                      <img
                        src={item.src}
                        alt={item.alt}
                        style={{ objectFit: 'contain', background: '#000000' }}
                      />
                    </div>

                    <div className="lightbox-caption">
                      <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem', fontWeight: 600 }}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div
                ref={paginationRef}
                className="lightbox-pagination"
              ></div>
            </div>

            {displayedItems.length > 1 && (
              <button
                type="button"
                ref={nextBtnRef}
                className="lightbox-nav-btn lightbox-next"
                aria-label="Next slide"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
