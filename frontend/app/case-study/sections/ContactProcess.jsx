'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const testimonialsData = [
  {
    id: 1,
    title: 'Expertise That Drives Better Decisions',
    quote: '“Unimrkt brought strong research expertise and a clear understanding of our business challenge. The insights helped us make more confident, data-driven decisions.”',
    role: 'Marketing Director',
    company: 'Consumer Brand',
  },
  {
    id: 2,
    title: 'Insights That Strengthen Strategy',
    quote: '“The team was responsive, thorough and highly focused on data quality. Their research approach gave us actionable insights that directly supported our strategy.”',
    role: 'Director of Insights',
    company: 'Global Retail Group',
  },
  {
    id: 3,
    title: 'Turning Research Into Impact',
    quote: '“What stood out was Unimrkt’s ability to turn complex research findings into clear, practical insights. It was a valuable partnership from start to finish.”',
    role: 'VP Marketing & Strategy',
    company: 'Financial Services',
  },
  {
    id: 4,
    title: 'Exceptional Fieldwork Quality',
    quote: '“Their ability to reach niche decision-makers and C-suite leaders within tight timelines while keeping data pristine made all the difference in our market launch.”',
    role: 'Head of Market Research',
    company: 'Healthcare Innovations',
  },
  {
    id: 5,
    title: 'Global Scale, Local Nuance',
    quote: '“Deploying multi-country quantitative studies across multiple languages was completely seamless. Unimrkt is our go-to intelligence partner.”',
    role: 'Chief Strategy Officer',
    company: 'Mobility Systems',
  },
  {
    id: 6,
    title: 'Dependable Strategic Partner',
    quote: '“From rigorous validation to clear executive reporting, their team ensures we can make multi-million dollar investments with absolute data confidence.”',
    role: 'Vice President',
    company: 'Technology Solutions',
  },
];

export default function ContactProcess() {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const swiperInstance = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 18,
      watchOverflow: true,
      slidesPerGroup: 1,
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
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 22,
        },
      },
    });

    return () => {
      swiperInstance.destroy(true, true);
    };
  }, []);

  return (
    <section className="contact-process-section">
      <div className="srcn-container">
        <div className="contact-process-header">
          <span className="contact-process-kicker career-values-kicker">How it works</span>
          <h2 className="contact-process-title section-main-heading">What Happens After You Contact Us?</h2>
          <p className="contact-process-subtitle section-sub-text">
            A simple process designed to understand your requirement and connect you with the right research expert.
          </p>
        </div>
        <div className="swiper testimonial-process-slider" ref={sliderRef}>
          <div className="swiper-wrapper">
            {testimonialsData.map((item) => (
              <article key={item.id} className="swiper-slide contact-process-card">
                <div className="testimonial-process-card-box">
                  <div className="contact-process-icon">
                    <img src="/asstes/images/icon/testimonial-icon-img.png" alt="Testimonial quote icon" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.quote}</p>
                  <div className="contact-process-name-box">
                    <h4>{item.role}</h4>
                    <p>{item.company}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="contact-process-pagination" ref={paginationRef}></div>
        </div>
      </div>
    </section>
  );
}
