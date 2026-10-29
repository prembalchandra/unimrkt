'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const processSteps = [
  {
    num: '01',
    icon: '/asstes/images/icon/understanding-icon-img.png',
    title: 'Define',
    desc: 'We define business challenges and research goals to uncover clear opportunities for growth. Our approach aligns research with strategic priorities, customer needs, market dynamics, and competitive realities, helping organizations identify the right questions, focus on meaningful insights, and develop actionable strategies that support informed decisions, innovation, and sustainable business growth.',
  },
  {
    num: '02',
    icon: '/asstes/images/icon/front-end-programming-icon-img.png',
    title: 'Discover',
    desc: 'We discover meaningful insights, emerging trends, and untapped opportunities that help businesses make smarter, data-driven decisions. By understanding customers, markets, competitors, and evolving behaviours, we turn complex information into clear direction, enabling organizations to refine strategies, identify growth opportunities, strengthen market positioning, and build sustainable competitive advantage for long-term success.',
  },
  {
    num: '03',
    icon: '/asstes/images/icon/recruit-icon-img.png',
    title: 'Decode',
    desc: 'We decode complex data into clear, actionable insights that reveal meaningful patterns, strategic direction, and new opportunities for business growth. By combining research, analysis, and market intelligence, we help organizations understand what matters, uncover emerging trends, reduce uncertainty, make confident decisions, optimize strategies, and create sustainable value across evolving markets.',
  },
  {
    num: '04',
    icon: '/asstes/images/icon/Interview-icon-img.png',
    title: 'Deliver',
    desc: 'We deliver actionable insights that empower businesses to make confident, strategic decisions and achieve sustainable growth. Through rigorous research and market intelligence-driven recommendations, we help organizations seize opportunities, address challenges, connect with customers, strengthen strategic market performance, navigate market shifts, and build a stronger foundation for long-term success.',
  },
  {
    num: '05',
    icon: '/asstes/images/icon/deliver-icon-img.png',
    title: 'Drive',
    desc: 'We drive growth by turning actionable insights into focused strategies that create lasting business impact. By connecting research with real-world business priorities, we help organizations uncover opportunities, solve challenges, strengthen decision-making, optimize performance, adapt to changing markets, and build sustainable competitive advantage that delivers measurable value and long-term growth.',
  },
];

export default function CompanyOurResearchEcosystem() {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
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
        576: {
          slidesPerView: 1.5,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2.3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3.5,
          spaceBetween: 26,
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
    <section className="telephonic-process-area" id="telephonic-process">
      <div className="telephonic-process-container">
        <div className="telephonic-process-header">
          <span className="telephonic-process-eyebrow">
            OUR RESEARCH ECOSYSTEM
          </span>
          <h2 className="telephonic-process-main-heading">
            From Question To Business Decision
          </h2>
          <p className="telephonic-process-sub-heading">
            A highly visual interactive journey:
          </p>
        </div>

        <div className="common-swiper-box">
          <div className="swiper telephonic-process-slider" ref={sliderRef}>
            <div className="swiper-wrapper">
              {processSteps.map((step) => (
                <div key={step.num} className="swiper-slide telephonic-process-slide">
                  <article className="telephonic-process-card">
                    <span className="telephonic-process-number">
                      {step.num}
                    </span>
                    <div className="telephonic-process-icon">
                      <img src={step.icon} alt={step.title} loading="lazy" />
                    </div>
                    <div className="telephonic-process-content">
                      <h3 className="telephonic-process-card-heading">
                        {step.title}
                      </h3>
                      <p className="telephonic-process-desc">
                        {step.desc}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <div
              className="telephonic-process-pagination telephonic-process-dots"
              ref={paginationRef}
              aria-label="Process pagination"
            />
          </div>
        </div>
      </div>
    </section>
  );
}