
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const galleryItems = [
  {
    type: 'video',
    src: '/asstes/images/video-banner2.mp4',
    poster: '/asstes/images/gallery-banner-img.png',
    alt: 'Strategic Research Team in Innovation Session',
    isLarge: true,
  },
  {
    type: 'video',
    src: '/asstes/images/video-banner.mp4',
    poster: '/asstes/images/the-impact-banner-img.png',
    alt: 'Team celebrating successful project release',
    isLarge: true,
  },
  {
    type: 'image',
    src: '/asstes/images/unimrkt-reseach-work-banner-img.png',
    alt: 'Research team at work',
    isLarge: false,
  },
  {
    type: 'image',
    src: '/asstes/images/research-needs-banner-img.png',
    alt: 'Research presentation',
    isLarge: false,
  },
  {
    type: 'image',
    src: '/asstes/images/challenge-portrait.png',
    alt: 'Team discussing research challenges',
    isLarge: false,
  },
  {
    type: 'image',
    src: '/asstes/images/have-question-team.png',
    alt: 'Research professionals',
    isLarge: false,
  },
];

export default function MomentsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const swiperContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const modalRef = useRef(null);

  const pauseAllVideos = useCallback(() => {
    if (!modalRef.current) return;

    modalRef.current
      .querySelectorAll('.lightbox-video-player')
      .forEach((video) => video.pause());
  }, []);

  const openLightbox = useCallback((index) => {
    setCurrentSlideIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    pauseAllVideos();
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [pauseAllVideos]);

  useEffect(() => {
    if (!isOpen || !swiperContainerRef.current) return;

    if (!swiperInstanceRef.current) {
      swiperInstanceRef.current = new Swiper(
        swiperContainerRef.current,
        {
          modules: [Navigation, Pagination, Keyboard],
          slidesPerView: 1,
          spaceBetween: 30,
          speed: 400,
          grabCursor: true,
          initialSlide: currentSlideIndex,
          keyboard: { enabled: true },
          navigation: {
            nextEl: nextBtnRef.current,
            prevEl: prevBtnRef.current,
          },
          pagination: {
            el: paginationRef.current,
            clickable: true,
          },
          on: {
            slideChange() {
              pauseAllVideos();
              setCurrentSlideIndex(this.activeIndex);
            },
          },
        }
      );
    } else {
      swiperInstanceRef.current.update();
      swiperInstanceRef.current.slideTo(currentSlideIndex, 0);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentSlideIndex, closeLightbox, pauseAllVideos]);

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
    <>
      <section className="moments-section" id="moments">
  

        <div className="srcn-container">
          <div className="moments-header text-center">
            <h2 className="moments-title">
              Moments Of Excellence
            </h2>

            <p className="moments-subtitle">
              Discovering the expertise, innovations and enthusiasm
              behind every research project and client success story.
            </p>
          </div>

          <div className="bento-gallery-grid">
            {galleryItems.map((item, index) => (
              <button
                type="button"
                key={item.src}
                className={`bento-item ${
                  item.isLarge ? 'bento-large' : 'bento-small'
                } gallery-card ${
                  item.type === 'video' ? 'has-video' : ''
                }`}
                onClick={() => openLightbox(index)}
                aria-label={`Open ${item.type}: ${item.alt}`}
              >
                <img
                  src={item.type === 'video' ? item.poster : item.src}
                  alt={item.alt}
                  loading="lazy"
                />

                {item.type === 'video' && (
                  <span className="gallery-play-btn">
                    <i className="fa-solid fa-play"></i>
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="moments-cta-box text-center">
            <a
            href='/gallery'
              type="button"
              className="moments-explore-btn btn-sm"
            >
              <span>EXPLORE GALLERY</span>
              <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right"></img>
            </a>
          </div>
        </div>
      </section>

      <div
        ref={modalRef}
        className={`lightbox-modal ${isOpen ? 'active' : ''}`}
        id="lightboxModal"
        aria-hidden={!isOpen}
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

        <div className="lightbox-swiper-container">
          <button
            type="button"
            ref={prevBtnRef}
            className="lightbox-nav-btn lightbox-prev"
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div
            ref={swiperContainerRef}
            className="swiper lightbox-swiper"
            id="lightboxSwiper"
          >
            <div className="swiper-wrapper">
              {galleryItems.map((item) => (
                <div
                  key={item.src}
                  className="swiper-slide lightbox-slide"
                >
                  <div className="lightbox-media-box">
                    {item.type === 'video' ? (
                      <video
                        className="lightbox-video-player"
                        controls
                        playsInline
                        preload="metadata"
                        poster={item.poster}
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support video playback.
                      </video>
                    ) : (
                      <img src={item.src} alt={item.alt} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={paginationRef}
              className="lightbox-pagination"
            ></div>
          </div>

          <button
            type="button"
            ref={nextBtnRef}
            className="lightbox-nav-btn lightbox-next"
            aria-label="Next slide"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
