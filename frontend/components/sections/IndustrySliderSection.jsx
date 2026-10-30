'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import LazyVideo from '@/components/LazyVideo';
import { getStrapiMediaUrl } from '@/lib/strapi';

const defaultIndustries = [
  { title: 'Healthcare & Life Sciences', image: '/asstes/images/Healthcare-img.webp', desc: 'Delivering research-driven insights that support innovation, patient outcomes, and healthcare advancement.' },
  { title: 'Banking & Financial Services', image: '/asstes/images/banking-and-finance-img.webp', desc: 'Empowering financial institutions with actionable intelligence across retail banking, fintech, and risk management.' },
  { title: 'Consumer & Retail', image: '/asstes/images/consumer-retail-img.webp', desc: 'Uncovering evolving consumer preferences, omnichannel purchasing behavior, and market trends to drive brand growth.' },
  { title: 'Automotive & Mobility', image: '/asstes/images/automotives-card-img.webp', desc: 'Accelerating mobility innovation with deep insights into EV adoption, autonomous tech, and connected fleets.' },
  { title: 'Technology & Telecom', image: '/asstes/images/technology-and-telecom-img.webp', desc: 'Navigating rapid digital transformation with data-backed market analysis across SaaS, cloud, and telecommunications.' },
  { title: 'Energy & Utilities', image: '/asstes/images/energy-utilities-img.webp', desc: 'Powering clean transition strategies through renewable market data, ESG benchmarks, and consumer green habits.' },
];

export default function IndustrySliderSection({ data = {} }) {
  const swiperContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const [activeMobileCard, setActiveMobileCard] = useState(null);

  const kicker = data.kicker || 'INDUSTRIES WE SERVE';
  const heading = data.heading || 'Driving Clarity Across Diverse Industries';
  const description = data.description || '';

  const slides = (data.slides && data.slides.length > 0)
    ? data.slides.map((s, idx) => ({
        title: s.title,
        desc: s.description || defaultIndustries[idx % defaultIndustries.length].desc,
        image: getStrapiMediaUrl(s.image || s.thumbnail, defaultIndustries[idx % defaultIndustries.length].image),
      }))
    : defaultIndustries;

  useEffect(() => {
    if (swiperContainerRef.current) {
      swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
        modules: [Autoplay, Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        speed: 600,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        navigation: {
          prevEl: prevBtnRef.current,
          nextEl: nextBtnRef.current,
        },
        pagination: {
          el: paginationRef.current,
          clickable: true,
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        },
      });
    }

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [slides.length]);

  return (
    <section className="industries-slider-section" id="industries">
      <div className="industries-video-layer">
        <LazyVideo
          className="industries-video-bg"
          src="/asstes/images/industries-banner-video.mp4"
          poster="/asstes/images/industries-banner-img.webp"
        />
        <div className="industries-video-overlay"></div>
      </div>

      <div className="srcn-container industries-slider-container">
        <div className="industries-header-flex">
          <div className="industries-title-col">
            {kicker && <span className="industries-kicker">{kicker}</span>}
            {heading && <h2 className="industries-heading">{heading}</h2>}
            {description && <p className="industries-desc">{description}</p>}
          </div>

          <div className="industries-arrows-box">
            <button ref={prevBtnRef} className="swiper-nav-btn prev-btn" aria-label="Previous slide">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button ref={nextBtnRef} className="swiper-nav-btn next-btn" aria-label="Next slide">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="swiper industries-swiper" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {slides.map((ind, idx) => (
              <div key={idx} className="swiper-slide industry-slide">
                <article
                  className={`industry-slide-card ${activeMobileCard === idx ? 'mobile-active' : ''}`}
                  onClick={() => setActiveMobileCard((prev) => (prev === idx ? null : idx))}
                >
                  <div className="industry-card-img-wrap">
                    <img src={ind.image} alt={ind.title} />
                    <div className="industry-card-overlay"></div>
                  </div>
                  <div className="industry-card-content">
                    <h3 className="industry-card-title">{ind.title}</h3>
                    <p className="industry-card-desc">{ind.desc}</p>
                    <Link href="/services" className="industry-card-link">
                      <span>EXPLORE</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="swiper-pagination industries-pagination" ref={paginationRef}></div>
        </div>
      </div>
    </section>
  );
}
