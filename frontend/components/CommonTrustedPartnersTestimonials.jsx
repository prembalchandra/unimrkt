'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const testimonials = [
  {
    id: 1,
    title: 'Exceptional Research. Actionable Results.',
    quote:
      'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends. Their insights played a key role in shaping our strategic decisions.',
    author: 'David Anderson',
    role: 'Head of Market Strategy',
  },
  {
    id: 2,
    title: 'A Trusted Extension of Our Team',
    quote:
      'From research design to final reporting, the Unimrkt team demonstrated professionalism, accuracy, and deep industry expertise. Their commitment to quality made them a trusted research partner for our organization.',
    author: 'Jennifer Collins',
    role: 'Director – Customer Insights',
  },
  {
    id: 3,
    title: 'Insights That Drive Better Decisions',
    quote:
      'The team provided high-quality data, meaningful analysis, and actionable recommendations that helped us confidently enter new markets. Their research exceeded our expectations at every stage.',
    author: 'Rajesh Mehta',
    role: 'Vice President – Business Intelligence',
  },
  {
    id: 4,
    title: 'Seamless Global Reach & Localization',
    quote:
      'Reaching specialized commercial fleet operators across 6 European hubs seemed daunting until Unimrkt mobilized native-language interviewers within days.',
    author: 'Elena Rostova',
    role: 'Chief Strategy Officer, Mobility Systems',
  },
  {
    id: 5,
    title: 'High Precision Data Quality',
    quote:
      'The audit trail, speeder checks, and call monitoring controls set Unimrkt apart from standard survey vendors. Every dataset is pristine and ready for decision-makers.',
    author: 'Michael Chen',
    role: 'VP Analytics, Global Fintech Solutions',
  },
  {
    id: 6,
    title: 'Unrivaled Respondent Engagement',
    quote:
      'Even when recruiting C-level executives for strategic technology audits, Unimrkt exceeded our quota targets with exceptional respondent engagement and depth.',
    author: 'Emily Watson',
    role: 'Partner, Global Strategy Consultancy',
  },
];

export default function CommonTrustedPartnersTestimonials() {
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
        640: {
          slidesPerView: 1.25,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3.5,
          spaceBetween: 28,
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
    <section className="testimonials-showcase-section" id="testimonials">
      <div className="testimonials-showcase-container">
        <div className="testimonials-header">
          <span className="testimonials-kicker">CLIENT SUCCESS STORIES</span>
          <h2 className="testimonials-heading">Trusted Research Partner For Businesses Worldwide</h2>
        </div>
        <div className='common-swiper-box'>
          <div className="swiper testimonials-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {testimonials.map((item) => (
                <div key={item.id} className="swiper-slide testimonials-slide">
                  <article className="testimonial-showcase-card">
                    <div className="testimonial-quote-icon" aria-hidden="true">“</div>
                    <h3 className="testimonial-title">{item.title}</h3>
                    <p className="testimonial-quote-body">{item.quote}</p>
                    <div className="testimonial-author-wrap">
                      <h4 className="testimonial-author-name">{item.author}</h4>
                      <p className="testimonial-author-role">{item.role}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="testimonials-pagination" ref={paginationRef}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
