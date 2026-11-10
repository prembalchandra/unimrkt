'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { getStrapiMedia } from '../lib/strapi';

function getIndustryFallbackImage(slug = '') {
  const s = slug.toLowerCase();
  if (s.includes('bank') || s.includes('bfsi') || s.includes('financ')) return '/asstes/images/banking-finance-img.png';
  if (s.includes('health') || s.includes('life')) return '/asstes/images/Healthcare-img.png';
  if (s.includes('consumer') || s.includes('retail') || s.includes('fmcg')) return '/asstes/images/consumer-retail-img.png';
  if (s.includes('auto') || s.includes('mobility')) return '/asstes/images/case-study-automotive.jpg';
  if (s.includes('tech') || s.includes('telecom')) return '/asstes/images/case-study-telecom.jpg';
  if (s.includes('energy') || s.includes('sustain')) return '/asstes/images/case-study-energy.jpg';
  return '/asstes/images/banking-finance-img.png';
}

function formatIndustry(item) {
  if (!item) return null;
  const slug = item.slug || '';
  return {
    id: item.id || item.documentId || slug,
    title: item.title || '',
    desc: item.shortDescription || item.description || '',
    image: getStrapiMedia(item.featuredImage || item.heroImage, getIndustryFallbackImage(slug)),
    link: `/industries`,
  };
}

export default function ServicesIndustriesExpertise({ initialIndustries = [], dynamicSection = null }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const [industries, setIndustries] = useState(() => (initialIndustries || []).map(formatIndustry).filter(Boolean));

  const displayKicker = dynamicSection?.kicker || 'INDUSTRIES WE SERVE';
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'Research Expertise Across Diverse Industries';
  const displayDesc = dynamicSection?.description || 'From financial services and healthcare to technology, retail and industrial markets, our research capabilities help organizations understand their customers, markets and business opportunities. We work across diverse sectors, tailoring research approaches to each industry\'s unique challenges, audiences and decision-making needs. By combining the right methodologies, market expertise and quality-focused execution, we help businesses uncover meaningful insights and make more informed strategic decisions.';

  useEffect(() => {
    if (initialIndustries && initialIndustries.length > 0) {
      setIndustries(initialIndustries.map(formatIndustry).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/industries?populate=*&pagination[limit]=12`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setIndustries(d.data.map(formatIndustry).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialIndustries]);

  useEffect(() => {
    if (!sliderRef.current || industries.length === 0) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      loop: industries.length > 3,
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
  }, [industries]);

  return (
    <section className="industries-expertise-section" id="industries-expertise">
      <div className="srcn-container">
        <div className="industries-expertise-header section-header-area ">
          <span className="industries-expertise-kicker career-values-kicker">{displayKicker}</span>
          <h2 className="industries-expertise-heading section-main-heading">
            {displayHeading}
          </h2>
          <p className="industries-expertise-desc section-sub-text">
            {displayDesc}
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="swiper industries-expertise-swiper" ref={sliderRef}>
          <div className="swiper-wrapper">
            {industries.map((item) => (
              <div key={item.id} className="swiper-slide industries-expertise-slide">
                <article className="industry-expertise-card">
                  <div className="industry-card-visual-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
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
