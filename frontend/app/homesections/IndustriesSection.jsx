'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { getStrapiMedia } from '../../lib/strapi';

function getIndustryFallbackImage(title = '') {
  const t = title.toLowerCase();
  if (t.includes('health') || t.includes('life')) return getStrapiMedia('/uploads/case-study-healthcare.jpg');
  if (t.includes('bank') || t.includes('financ')) return getStrapiMedia('/uploads/case-study-banking.jpg');
  if (t.includes('retail') || t.includes('fmcg') || t.includes('consumer')) return getStrapiMedia('/uploads/case-study-fmcg.jpg');
  if (t.includes('auto') || t.includes('mobility')) return getStrapiMedia('/uploads/case-study-automotive.jpg');
  if (t.includes('tech') || t.includes('telecom')) return getStrapiMedia('/uploads/case-study-telecom.jpg');
  if (t.includes('energy') || t.includes('sustain')) return getStrapiMedia('/uploads/case-study-energy.jpg');
  return getStrapiMedia('/uploads/case-study-banking.jpg');
}

function formatIndustry(item) {
  if (!item) return null;
  const title = item.title || item.name || '';
  return {
    title,
    image: getStrapiMedia(item.featuredImage || item.heroImage, getIndustryFallbackImage(title)),
    desc: item.shortDescription || item.description || '',
  };
}

export default function IndustriesSection({ dynamicIndustries = [] }) {
  const videoRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const [activeMobileCard, setActiveMobileCard] = useState(null);
  const [industries, setIndustries] = useState(() => (dynamicIndustries || []).map(formatIndustry).filter(Boolean));

  useEffect(() => {
    if (dynamicIndustries && dynamicIndustries.length > 0) {
      setIndustries(dynamicIndustries.map(formatIndustry).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/industries?populate=*&pagination[limit]=8`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setIndustries(d.data.map(formatIndustry).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [dynamicIndustries]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
    }
  }, []);

  useEffect(() => {
    if (!swiperContainerRef.current || industries.length === 0) return;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    const swiper = new Swiper(swiperContainerRef.current, {
      modules: [Autoplay, Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      loop: industries.length > 2,
      speed: 600,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      navigation: {
        nextEl: nextBtnRef.current,
        prevEl: prevBtnRef.current,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className}" aria-label="Go to slide ${index + 1}"></span>`;
        },
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });

    swiperInstanceRef.current = swiper;

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [industries]);

  const handleMobileCardClick = (index) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setActiveMobileCard(activeMobileCard === index ? null : index);
    }
  };

  return (
    <section className="industries-section" id="industries">
      <div className="industries-video-layer">
        <video
          ref={videoRef}
          className="industries-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={getStrapiMedia('/uploads/the-impact-banner-img.png')}
        >
          <source src="/asstes/images/video-banner2.mp4" type="video/mp4" />
        </video>
        <div className="industries-video-overlay"></div>
      </div>

      <div className="srcn-container">
        <div className="industries-header">
          <div className="industries-header-left">
            <span className="industries-kicker sub-title-red">WHERE WE EXCEL</span>
            <h2 className="industries-title section-main-heading">
              Industries We Understand &amp; Elevate
            </h2>
            <p className="industries-subtitle section-sub-text">
              Transforming complex sector challenges into actionable growth through customized intelligence.
            </p>
          </div>

          <div className="industries-header-right">
            <div className="industries-nav-buttons">
              <button
                ref={prevBtnRef}
                className="industries-nav-btn industries-prev"
                type="button"
                aria-label="Previous industry slide"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                ref={nextBtnRef}
                className="industries-nav-btn industries-next"
                type="button"
                aria-label="Next industry slide"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <Link href="/industries" className="industries-view-all-btn btn-sm">
              <span>EXPLORE ALL INDUSTRIES</span>
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>

        <div className="swiper industries-carousel" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {industries.map((ind, index) => (
              <div key={index} className="swiper-slide industries-slide">
                <article
                  className={`industry-showcase-card ${activeMobileCard === index ? 'is-active-mobile' : ''}`}
                  onClick={() => handleMobileCardClick(index)}
                >
                  <div className="industry-showcase-image-wrap">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      loading="lazy"
                    />
                    <div className="industry-showcase-overlay"></div>
                  </div>
                  <div className="industry-showcase-content">
                    <h3 className="industry-showcase-title">{ind.title}</h3>
                    <p className="industry-showcase-desc">{ind.desc}</p>
                    <Link href="/industries" className="industry-showcase-link">
                      <span>LEARN MORE</span>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div ref={paginationRef} className="industries-pagination"></div>
        </div>
      </div>
    </section>
  );
}
