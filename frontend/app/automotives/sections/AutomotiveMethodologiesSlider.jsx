'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const methodologies = [
  {
    id: 1,
    image: '/asstes/images/online-surveys-card-img.png',
    title: 'CAWI Surveys',
    desc: 'Deploying responsive quantitative surveys to verified EV owners, intenders, and passenger car drivers worldwide.',
  },
  {
    id: 2,
    image: '/asstes/images/smart-survey-management-card-img.png',
    title: 'In-Facility Surveys',
    desc: 'Conducting structured executive interviews with fleet directors, dealership principals, and automotive engineers.',
  },
  {
    id: 3,
    image: '/asstes/images/interview-controls-card-img.png',
    title: 'In-Depth Executive Interviews',
    desc: 'One-on-one qualitative discovery with Tier-1 procurement leads and mobility innovators on strategic roadmaps.',
  },
  {
    id: 4,
    image: '/asstes/images/real-time-monitoring-card-img.png',
    title: 'Focus Group Discussions (FGDs)',
    desc: 'Physical and virtual vehicle clinics evaluating cockpit ergonomics, digital infotainment, and styling appeal.',
  },
  {
    id: 5,
    image: '/asstes/images/telephonic-surveys-card-img.png',
    title: 'Mystery Shopping & Audits',
    desc: 'Assessing dealer network sales etiquette, EV customer handover protocols, and test drive quality standards.',
  },
  {
    id: 6,
    image: '/asstes/images/data-validation-card-img.png',
    title: 'Brand Health Tracking',
    desc: 'Continuous multi-market monitoring of OEM brand equity, consideration funnel, and net promoter score (NPS).',
  },
];

export default function AutomotiveMethodologiesSlider() {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      navigation: {
        prevEl: prevBtnRef.current,
        nextEl: nextBtnRef.current,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`;
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1.15,
          spaceBetween: 14,
        },
        560: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.8,
          spaceBetween: 18,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 22,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="auto-methods-dark-section" id="auto-methods">
      <div className="srcn-container">
        {/* Dark Curved Hero Banner */}
        <div className="auto-methods-dark-banner">
          <div className="auto-methods-header">
            <span className="auto-methods-kicker">PROVEN METHODOLOGIES</span>
            <h2 className="auto-methods-heading">Proven Research Methodologies</h2>
            <p className="auto-methods-desc">
              From cockpit usability clinics to enterprise supply chain audits, our multi-modal research suites deliver dependable, defensible intelligence for high-stakes mobility decisions.
            </p>
          </div>
        </div>

        {/* Overlapping Slider with Side Navigation Arrows */}
        <div className="auto-methods-carousel-wrap">
          {/* Left Navigation Arrow */}
          <button
            ref={prevBtnRef}
            className="auto-methods-nav-btn auto-methods-prev"
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Swiper Slider */}
          <div className="swiper auto-methods-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {methodologies.map((item) => (
                <div key={item.id} className="swiper-slide auto-methods-slide">
                  <article className="auto-method-card">
                    <div className="auto-method-img-wrap">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                    <div className="auto-method-body">
                      <h3 className="auto-method-title">{item.title}</h3>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            ref={nextBtnRef}
            className="auto-methods-nav-btn auto-methods-next"
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Pagination Indicators */}
          <div className="auto-methods-pagination" ref={paginationRef}></div>
        </div>
      </div>
    </section>
  );
}
