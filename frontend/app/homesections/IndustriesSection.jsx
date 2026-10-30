'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const industriesData = [
  {
    title: 'Healthcare & Life Sciences',
    image: '/asstes/images/case-study-healthcare.webp',
    desc: 'Delivering research-driven insights that support innovation, patient outcomes, and healthcare advancement.',
  },
  {
    title: 'Banking & Financial Services',
    image: '/asstes/images/case-study-banking.webp',
    desc: 'Empowering financial institutions with actionable intelligence across retail banking, fintech, and risk management.',
  },
  {
    title: 'Retail & Consumer Goods',
    image: '/asstes/images/case-study-fmcg.webp',
    desc: 'Uncovering evolving consumer preferences, omnichannel purchasing behavior, and market trends to drive brand growth.',
  },
  {
    title: 'Automotive & Mobility',
    image: '/asstes/images/case-study-automotive.webp',
    desc: 'Accelerating mobility innovation with deep insights into EV adoption, autonomous tech, and connected fleets.',
  },
  {
    title: 'Technology & Telecom',
    image: '/asstes/images/case-study-telecom.webp',
    desc: 'Navigating rapid digital transformation with data-backed market analysis across SaaS, cloud, and telecommunications.',
  },
  {
    title: 'Energy & Sustainability',
    image: '/asstes/images/case-study-energy.webp',
    desc: 'Powering clean transition strategies through renewable market data, ESG benchmarks, and consumer green habits.',
  },
];

export default function IndustriesSection() {
  const videoRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const [activeMobileCard, setActiveMobileCard] = useState(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      vid.playbackRate = 0.75;

      const handlePlay = () => {
        vid.playbackRate = 0.75;
      };
      vid.addEventListener('play', handlePlay);
      vid.addEventListener('loadedmetadata', handlePlay);

      const p = vid.play();
      if (p !== undefined) p.catch(() => {});
    }
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
          pauseOnMouseEnter: false,
        },
        navigation: {
          nextEl: nextBtnRef.current,
          prevEl: prevBtnRef.current,
        },
        pagination: {
          el: paginationRef.current,
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
           1480: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    }

    const handleDocClick = (e) => {
      if (window.innerWidth <= 1024 && !e.target.closest('.industry-card')) {
        setActiveMobileCard(null);
      }
    };
    document.addEventListener('click', handleDocClick);

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
      document.removeEventListener('click', handleDocClick);
    };
  }, []);

  const handleCardClick = (idx) => {
    if (window.innerWidth <= 1024) {
      setActiveMobileCard((prev) => (prev === idx ? null : idx));
    }
  };

  return (
    <section className="industries-sections" id="industries">
      <div className="srcn-container">
        <div className="industries-banner-wapper-banner">
          <div className="industries-banner-box">
            <div className="industries-backdrop-wrap">
              <video
                ref={videoRef}
                className="industries-video-bg"
                id="industriesBannerVideo"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/asstes/images/indutries-banner-video.mp4" type="video/mp4" />
              </video>
              <div className="industries-city-backdrop"></div>
            </div>
            <div className="industries-banner-content">
              <h2 className="industries-title">Industries We Serve</h2>
              <p className="industries-subtitle">
                Helping organizations make smarter decisions through global research expertise and industry insights.
              </p>
              <Link href="/contact" className="btn-talk-experts">
                <span>TALK TO OUR EXPERTS</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </div>
          </div>

          {/* Overlapping Swiper Slider Container */}
          <div className="carousel-wrapper industries-cards-overlap">
            {/* Desktop Prev Button */}
            <button
              ref={prevBtnRef}
              className="slider-btn prev-btn"
              id="sliderPrev"
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            {/* Swiper Container */}
            <div
              ref={swiperContainerRef}
              className="swiper industries-swiper"
              id="industriesSwiper"
            >
              <div className="swiper-wrapper">
                {industriesData.map((item, index) => (
                  <div
                    key={item.title}
                    className={`swiper-slide industry-card ${activeMobileCard === index ? 'is-active' : ''}`}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="card-media-box">
                      <div className="card-front-media">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="card-back-info">
                        <div className="watermark-bg">
                          <svg viewBox="0 0 200 120" className="watermark-svg">
                            <ellipse
                              cx="100"
                              cy="55"
                              rx="80"
                              ry="36"
                              fill="none"
                              stroke="rgba(128, 57, 87, 0.16)"
                              strokeWidth="2.5"
                              transform="rotate(-8 100 55)"
                            />
                            <text
                              x="100"
                              y="58"
                              fontFamily="'Plus Jakarta Sans', sans-serif"
                              fontSize="20"
                              fontWeight="700"
                              fill="rgba(128, 57, 87, 0.16)"
                              textAnchor="middle"
                            >
                              Unimrkt
                            </text>
                            <text
                              x="100"
                              y="73"
                              fontFamily="'Plus Jakarta Sans', sans-serif"
                              fontSize="9"
                              fontWeight="600"
                              letterSpacing="3"
                              fill="rgba(128, 57, 87, 0.14)"
                              textAnchor="middle"
                            >
                              RESEARCH
                            </text>
                          </svg>
                        </div>
                        <p className="card-hover-text">{item.desc}</p>
                      </div>
                    </div>
                    <div className="card-title-footer">
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Swiper Pagination Dots (Visible on Phone/Mobile) */}
              <div ref={paginationRef} className="swiper-pagination"></div>
            </div>

            {/* Desktop Next Button */}
            <button
              ref={nextBtnRef}
              className="slider-btn next-btn"
              id="sliderNext"
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
