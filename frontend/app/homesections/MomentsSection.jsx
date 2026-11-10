'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { getStrapiMedia } from '../../lib/strapi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function formatMomentItem(item, idx) {
  if (!item) return null;
  const isVideo = item.mediaType === 'video' || (typeof item.src === 'string' && item.src.endsWith('.mp4'));
  return {
    type: isVideo ? 'video' : 'image',
    src: getStrapiMedia(item.image, item.src || getStrapiMedia(`/uploads/gallery_item_0${(idx % 8) + 1}.webp`)),
    poster: item.poster ? getStrapiMedia(item.poster) : getStrapiMedia('/uploads/gallery-banner-img.png'),
    alt: item.caption || item.alt || item.title || '',
    isLarge: idx === 0 || idx === 1,
  };
}

export default function MomentsSection({ initialGalleryItems = [] }) {
  const [items, setItems] = useState(() => (initialGalleryItems || []).map(formatMomentItem).filter(Boolean));
  const [isOpen, setIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const swiperContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (initialGalleryItems && initialGalleryItems.length > 0) {
      setItems(initialGalleryItems.map(formatMomentItem).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/gallery-items?populate=*&pagination[limit]=8`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setItems(d.data.map(formatMomentItem).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialGalleryItems]);

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

  useEffect(() => {
    if (!isOpen || !swiperContainerRef.current) return;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    const swiper = new Swiper(swiperContainerRef.current, {
      modules: [Navigation, Pagination, Keyboard],
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 400,
      grabCursor: true,
      initialSlide: initialSlide,
      loop: items.length > 1,
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
  }, [isOpen, initialSlide, items.length, closeLightbox]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="moments-section" id="moments">
      <div className="srcn-container">
        <div className="moments-header">
          <span className="moments-kicker sub-title-red">OUR CULTURE &amp; PEOPLE</span>
          <h2 className="moments-title section-main-heading">Moments That Matter</h2>
          <p className="moments-subtitle section-sub-text">
            A glimpse into the life, energy, and shared experiences that drive our global team forward.
          </p>
        </div>

        <div className="moments-grid-container">
          <div className="moments-grid">
            {items.map((item, index) => (
              <div
                key={index}
                className={`moment-item ${item.isLarge ? 'moment-large' : 'moment-small'}`}
                onClick={() => openLightbox(index)}
              >
                {item.type === 'video' ? (
                  <div className="moment-video-wrap">
                    <video
                      src={item.src}
                      poster={item.poster}
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="moment-play-badge">
                      <i className="fa-solid fa-play" />
                    </div>
                  </div>
                ) : (
                  <div className="moment-image-wrap">
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </div>
                )}
                <div className="moment-hover-overlay">
                  <span className="moment-zoom-badge">
                    <i className="fa-solid fa-magnifying-glass-plus" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Swiper Modal */}
      <div
        ref={modalRef}
        className={`lightbox-modal ${isOpen ? 'active' : ''}`}
        id="momentsLightboxModal"
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
          aria-label="Close modal"
          onClick={closeLightbox}
        >
          &times;
        </button>

        <div
          className="lightbox-swiper-container"
          onClick={(event) => event.stopPropagation()}
        >
          {items.length > 1 && (
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
            id="momentsLightboxSwiper"
          >
            <div className="swiper-wrapper">
              {items.map((item, index) => (
                <div key={index} className="swiper-slide lightbox-slide">
                  <div className="lightbox-media-box">
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        controls
                        autoPlay
                        playsInline
                        style={{ maxHeight: '80vh', width: 'auto' }}
                      />
                    ) : (
                      <img src={item.src} alt={item.alt} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div ref={paginationRef} className="lightbox-pagination"></div>
          </div>

          {items.length > 1 && (
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
    </section>
  );
}
