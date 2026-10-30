'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const industriesData = [
  {
    id: 1,
    title: 'Banking & Finance',
    image: '/asstes/images/banking-finance-img.webp',
    fallbackImg: '/asstes/images/banking-and-finance-img.webp',
    desc: 'Understand evolving financial markets, customer needs and competitive landscape with research built for banks, fintech, and investment institutions.',
    link: '/services',
  },
  {
    id: 2,
    title: 'Healthcare',
    image: '/asstes/images/Healthcare-img.webp',
    fallbackImg: '/asstes/images/case-study-healthcare.webp',
    desc: 'Gain deeper insights into patient needs, healthcare behaviours and evolving market dynamics through compliant clinical and medical research.',
    link: '/services',
  },
  {
    id: 3,
    title: 'Consumer & Retail',
    image: '/asstes/images/consumer-retail-img.webp',
    fallbackImg: '/asstes/images/food-&-beverage-img.webp',
    desc: 'Understand consumer preferences, purchasing behaviour and evolving retail trends with research designed for brands, retailers, and FMCG leaders.',
    link: '/services',
  },
  {
    id: 4,
    title: 'Automotive & Mobility',
    image: '/asstes/images/case-study-automotive.webp',
    fallbackImg: '/asstes/images/automotives-card-img.webp',
    desc: 'Accelerating mobility innovation with deep insights into EV adoption, autonomous tech, connected software cockpits, and global fleet dynamics.',
    link: '/services',
  },
  {
    id: 5,
    title: 'Technology & Telecom',
    image: '/asstes/images/case-study-telecom.webp',
    fallbackImg: '/asstes/images/technology-card-img.webp',
    desc: 'Navigating rapid digital transformation with data-backed market analysis across SaaS, cloud platforms, cybersecurity, and telecommunications.',
    link: '/services',
  },
  {
    id: 6,
    title: 'Energy & Sustainability',
    image: '/asstes/images/case-study-energy.webp',
    fallbackImg: '/asstes/images/energy-utilities-img.webp',
    desc: 'Powering clean energy transition strategies through renewable market data, ESG benchmarks, and evolving consumer green habits.',
    link: '/services',
  },
];

export default function ServicesIndustriesExpertise() {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
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
          slidesPerView: 1,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 22,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 26,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 30,
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
    <section className="industries-expertise-section" id="industries-expertise">
      <div className="srcn-container">
        <div className="industries-expertise-header section-header-area ">
          <span className="industries-expertise-kicker  career-values-kicker">INDUSTRIES WE SERVE</span>
          <h2 className="industries-expertise-heading section-main-heading">
            Research Expertise Across Diverse Industries
          </h2>
          <p className="industries-expertise-desc section-sub-text">
            From financial services and healthcare to technology, retail and industrial markets, our research capabilities help organizations understand their customers, markets and business opportunities. We work across diverse sectors, tailoring research approaches to each industry's unique challenges, audiences and decision-making needs. By combining the right methodologies, market expertise and quality-focused execution, we help businesses uncover meaningful insights and make more informed strategic decisions.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="swiper industries-expertise-swiper" ref={sliderRef}>
          <div className="swiper-wrapper">
            {industriesData.map((item) => (
              <div key={item.id} className="swiper-slide industries-expertise-slide">
                <article className="industry-expertise-card">
                  <div className="industry-card-visual-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackImg && e.currentTarget.src !== item.fallbackImg) {
                          e.currentTarget.src = item.fallbackImg;
                        }
                      }}
                    />
                  </div>
                  <div className="industry-card-body">
                    <h3 className="industry-card-title">{item.title}</h3>
                    <p className="industry-card-desc">{item.desc}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="industries-expertise-pagination" ref={paginationRef}></div>
        </div>
      </div>
    </section>
  );
}
