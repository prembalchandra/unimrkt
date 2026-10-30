'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const defaultTestimonials = [
  {
    title: 'Exceptional Research. Actionable Results.',
    quote: 'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends.',
    author: 'David Anderson',
    role: 'Head of Market Strategy',
  },
  {
    title: 'A Trusted Extension of Our Team',
    quote: 'From research design to final reporting, the Unimrkt team demonstrated professionalism, accuracy, and deep industry expertise.',
    author: 'Jennifer Collins',
    role: 'Director – Customer Insights',
  },
  {
    title: 'Insights That Drive Better Decisions',
    quote: 'The team provided high-quality data, meaningful analysis, and actionable recommendations that helped us confidently enter new markets.',
    author: 'Rajesh Mehta',
    role: 'Vice President – Business Intelligence',
  },
];

export default function TestimonialsSection({ data = {} }) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const kicker = data.kicker || 'CLIENT SUCCESS STORIES';
  const heading = data.heading || 'Trusted Research Partner For Businesses Worldwide';
  const testimonials = (data.testimonials && data.testimonials.length > 0)
    ? data.testimonials
    : defaultTestimonials;

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
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 1.5, spaceBetween: 18 },
        768: { slidesPerView: 2.5, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [testimonials.length]);

  return (
    <section className="testimonials-showcase-section" id="testimonials">
      <div className="testimonials-showcase-container">
        <div className="testimonials-header">
          {kicker && <span className="testimonials-kicker">{kicker}</span>}
          {heading && <h2 className="testimonials-heading">{heading}</h2>}
        </div>
        <div className="common-swiper-box">
          <div className="swiper testimonials-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {testimonials.map((item, idx) => (
                <div key={idx} className="swiper-slide testimonials-slide">
                  <article className="testimonial-showcase-card">
                    <div className="testimonial-quote-icon" aria-hidden="true">“</div>
                    {item.title && <h3 className="testimonial-title">{item.title}</h3>}
                    <p className="testimonial-quote-body">{item.quote}</p>
                    <div className="testimonial-author-wrap">
                      <h4 className="testimonial-author-name">{item.author || item.authorName}</h4>
                      <p className="testimonial-author-role">
                        {item.role || item.authorRole}
                        {item.company ? ` · ${item.company}` : ''}
                      </p>
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
