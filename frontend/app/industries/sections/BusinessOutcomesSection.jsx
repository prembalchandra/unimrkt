'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const outcomeCards = [
  {
    id: 1,
    icon: '/asstes/images/icon/the-challenge-img.png', 
    title: 'The Challenge',
    desc: 'The starting point of every research project is understanding the business challenge. We identify the key questions, market gaps, customer needs and decision-making challenges that require deeper clarity. This helps define the research direction, focus on what matters most and establish a clear foundation for meaningful, actionable insights.',
  },
  {
    id: 2,
      icon: '/asstes/images/icon/cogwheel-icon-img.png', 
    title: 'The Approach',
    desc: 'We design the right research methodology around the business objective, identify and reach the most relevant audiences, and gather reliable, meaningful evidence. From research design and audience selection to fieldwork and data collection, every step is carefully planned to ensure the findings are accurate, relevant and useful for decision-making.',
  },
  {
    id: 3,
    icon: '/asstes/images/icon/insight-icon-img.png',
    title: 'The Insight',
    desc: 'We analyze the research to uncover meaningful patterns, customer behaviors, emerging needs, market trends and hidden opportunities. By connecting the findings and looking beyond surface-level responses, we turn complex research data into clear insights that reveal what matters most and where businesses can create greater value and impact.',
  },
  {
    id: 4,
    icon: '/asstes/images/icon/ouality-check-icon-img.png', 
    title: 'The Impact',
    desc: 'We translate validated insights into strategic business recommendations that inform product development, customer engagement, and commercial decision-making to generate tangible value and sustained competitive advantage.',
  },
  {
    id: 5,
    icon: '/asstes/images/icon/deliver-icon-img.png', 
    title: 'The Growth',
    desc: 'Partnering continuously with your leaders, we benchmark results against shifting market trends to ensure your organization continuously navigates industry disruption with clarity and agility.',
  },
];

export default function BusinessOutcomesSection() {
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
        600: {
          slidesPerView: 1,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
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
    <section className="business-outcomes-section" id="business-outcomes">
      <div className="srcn-container">
        <div className="business-outcomes-header section-header-area">
          <span className="business-outcomes-kicker career-values-kicker">FEATURED CASE STUDIES</span>
          <h2 className="business-outcomes-heading section-main-heading">From Business Questions to Meaningful Outcomes</h2>
          <p className="business-outcomes-desc  industries-expertise-desc">
           Explore how Unimrkt helps businesses address complex challenges through focused research, deeper customer understanding and actionable insights. Each case study showcases the journey from the initial business question to decisions that create measurable value.
          </p>
        </div>
        <div className="swiper business-outcomes-swiper" ref={sliderRef}>
          <div className="swiper-wrapper">
            {outcomeCards.map((card) => (
              <div key={card.id} className="swiper-slide business-outcomes-slide">
                <article className="outcome-card">
                  <div className="outcome-card-icon-wrap">
                    <img src={card.icon} alt={card.title} loading="lazy" />
                  </div>
                  <h3 className="outcome-card-title">{card.title}</h3>
                  <p className="outcome-card-desc">{card.desc}</p>
                </article>
              </div>
            ))}
          </div>
          <div className="business-outcomes-pagination" ref={paginationRef}></div>
        </div>
      </div>
    </section>
  );
}
