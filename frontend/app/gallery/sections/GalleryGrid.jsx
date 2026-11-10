'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { getStrapiMedia } from '../../../lib/strapi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function formatGalleryItem(item, idx) {
  if (!item) return null;
  const cat = item.category || 'team-culture';
  const categoriesList = Array.isArray(item.categories)
    ? item.categories
    : [cat];

  return {
    id: item.documentId || item.id || idx + 1,
    categories: categoriesList,
    src: getStrapiMedia(item.image, `/asstes/images/gallery/gallery_item_0${(idx % 9) + 1}.webp`),
    title: item.title || '',
    alt: item.caption || item.alt || item.title || 'Unimrkt Research Gallery',
  };
}

export default function GalleryGrid({ initialItems = [] }) {
  const [items, setItems] = useState(() => (initialItems || []).map(formatGalleryItem).filter(Boolean));
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

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems.map(formatGalleryItem).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/gallery-items?populate=*&sort=order:asc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setItems(d.data.map(formatGalleryItem).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialItems]);

  const categories = useMemo(() => {
    const set = new Set();
    items.forEach((item) => {
      (item.categories || []).forEach((c) => set.add(c));
    });
    const result = [{ key: 'all', label: 'ALL' }];
    set.forEach((k) => {
      const label = k
        .split('-')
        .map((w) => w.toUpperCase())
        .join(' ');
      result.push({ key: k, label });
    });
    return result;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => item.categories.includes(activeCategory));
  }, [items, activeCategory]);

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
