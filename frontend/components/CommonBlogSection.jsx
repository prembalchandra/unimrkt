'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';

const blogMarketTrends = [
  {
    id: 1,
    img: '/asstes/images/market-trends-card-img1.png',
    title: 'All You Need to Know About Online Market Research"',
    snippet: 'In a world where consumer behavior evolves faster than a trending...',
    link: '/blog',
  },
  {
    id: 2,
    img: '/asstes/images/market-trends-card-img2.png',
    title: 'Why Field-Based Quantitative Market Research Remains Critical in 2026"',
    snippet: 'Over the past few years, the research landscape has shifted rapidly...',
    link: '/blog',
  },
  {
    id: 3,
    img: '/asstes/images/market-trends-card-img3.png',
    title: 'AI and the Workforce in Transformation, Disrupti...',
    snippet: 'In 2026, artificial intelligence is no longer just an emerging tool...',
    link: '/blog',
  },
  {
    id: 4,
    img: '/asstes/images/customer-experience-img.png',
    title: 'From Data to Decision: How Modern Market Research Drives Growth',
    snippet: 'Discover actionable strategies to translate raw data into decisive market intelligence...',
    link: '/blog',
  },
  {
    id: 5,
    img: '/asstes/images/unimrkt-reseach-primary-research-banner-img.png',
    title: 'Key Market Research Methodologies Every Business Needs to Know',
    snippet: 'A comprehensive breakdown of qualitative vs. quantitative research approaches...',
    link: '/blog',
  },
  {
    id: 6,
    img: '/asstes/images/centralized-data-card-img.png',
    title: 'Why Consumer Behaviour Research is Critical for Product Success',
    snippet: 'Understanding buyer psychology, purchasing barriers, and preference shifts across markets...',
    link: '/blog',
  },
];

export default function CommonBlogSection() {
  const swiperRef = useRef(null);

  useEffect(() => {
    let swiperInstance = null;

    if (swiperRef.current) {
      swiperInstance = new Swiper(swiperRef.current, {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        navigation: {
          nextEl: '.market-trends-blog-section .market-trends-next',
          prevEl: '.market-trends-blog-section .market-trends-prev',
        },
        breakpoints: {
          576: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          991: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
           1680: {
            slidesPerView: 3.5,
            spaceBetween: 25,
          },
        },
      });
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
      }
    };
  }, []);

  return (
    <section className="market-trends-section market-trends-blog-section">
      <div className="market-trends-bg-banner" aria-hidden="true"></div>
      <div className="market-trends-container">
        <div className="market-trends-layout">
          <div className="market-trends-left-col">
            <span className="market-trends-kicker  sub-title-red">LATEST BLOGS</span>
            <h2 className="market-trends-title section-main-heading">
              Exploring<br />Market Trends
            </h2>
            <p className="market-trends-desc section-sub-text">
              Discover Emerging Market Trends That Shape Smarter Business Decisions.
            </p>
            <div className="market-trends-nav-btns" aria-label="Slider navigation">
              <button className="market-trends-nav-btn market-trends-prev" aria-label="Previous slide">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button className="market-trends-nav-btn market-trends-next" aria-label="Next slide">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Right Column (Swiper Cards Slider) */}
          <div className="market-trends-slider-col">
            <div className="swiper market-trends-swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {blogMarketTrends.map((card) => (
                  <div key={card.id} className="swiper-slide market-trends-slide">
                    <Link href={card.link} className="market-trends-card">
                      <div className="market-trends-card-img-wrap">
                        <img src={card.img} alt={card.title} />
                      </div>
                      <div className="market-trends-card-body blog-contnt-row-area">
                        <h3 className="market-trends-card-title">{card.title}</h3>
                        <p className="market-trends-card-snippet">{card.snippet}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="market-trends-btn-wrap">
        <Link href="/blog" className="market-trends-browse-btn btn-sm">
          <span>BROWSE BLOGS</span>
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
    </section>
  );
}
