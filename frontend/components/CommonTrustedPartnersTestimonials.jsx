'use client';

import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const defaultTestimonials = [
  {
    id: 1,
    title: 'Transformative Research & Actionable Results',
    quote: 'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends. Their insights played a key role in shaping our strategic decisions.',
    authorName: 'David Anderson',
    authorRole: 'Head of Market Strategy',
    companyName: 'Global Enterprise Group',
  },
  {
    id: 2,
    title: 'Flawless Execution of Multi-Country Fieldwork',
    quote: 'Working with Unimrkt on our multi-country healthcare study was seamless. Their ability to recruit verified specialist physicians across 12 countries within our tight timeline was extraordinary.',
    authorName: 'Elena Rostova',
    authorRole: 'Director of Strategic Intelligence',
    companyName: 'BioHealth Innovations',
  },
  {
    id: 3,
    title: 'Exceptional Turnaround & Analytical Depth',
    quote: 'The depth of analysis and executive-ready presentations delivered by Unimrkt provided our board with the clarity needed to greenlight our expansion into Southeast Asia.',
    authorName: 'Marcus Vance',
    authorRole: 'VP of Corporate Development',
    companyName: 'Apex Industrial Systems',
  },
];

export default function CommonTrustedPartnersTestimonials({
  dynamicTestimonials = null,
  initialTestimonials = null,
  dynamicSection = null,
  kicker = null,
  heading = null,
}) {
  const [items, setItems] = useState(
    dynamicTestimonials || initialTestimonials || defaultTestimonials
  );
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const displayKicker = kicker || dynamicSection?.kicker;
  const displayHeading = heading || dynamicSection?.heading || dynamicSection?.title;

  useEffect(() => {
    if (!dynamicTestimonials || dynamicTestimonials.length === 0) {
      fetch('http://127.0.0.1:1337/api/testimonials?populate=*&sort=order:asc')
        .then((res) => res.json())
        .then((json) => {
          if (Array.isArray(json?.data) && json.data.length > 0) {
            setItems(json.data);
          }
        })
        .catch(() => {});
    }
  }, [dynamicTestimonials]);

  useEffect(() => {
    if (!sliderRef.current || items.length === 0) return;

    swiperInstanceRef.current = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      loop: items.length > 1,
      speed: 700,
      autoplay: {
        delay: 3500,
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
  }, [items]);

  return (
    <section className="testimonials-showcase-section" id="testimonials">
      <div className="testimonials-showcase-container">
        <div className="testimonials-header">
          <span className="testimonials-kicker">{displayKicker}</span>
          <h2 className="testimonials-heading">{displayHeading}</h2>
        </div>
        <div className="common-swiper-box">
          <div className="swiper testimonials-swiper" ref={sliderRef}>
            <div className="swiper-wrapper">
              {items.map((item, idx) => {
                const title = item.title || item.attributes?.title;
                const quote = item.quote || item.attributes?.quote;
                const author = item.authorName || item.author || item.attributes?.authorName;
                const role = item.authorRole || item.role || item.attributes?.authorRole;
                const company = item.companyName || item.company || item.attributes?.companyName;

                return (
                  <div key={item.id || idx} className="swiper-slide testimonials-slide">
                    <article className="testimonial-showcase-card">
                      <div className="testimonial-quote-icon" aria-hidden="true">“</div>
                      <h3 className="testimonial-title">{title}</h3>
                      <p className="testimonial-quote-body">{quote}</p>
                      <div className="testimonial-author-wrap">
                        <h4 className="testimonial-author-name">{author}</h4>
                        <p className="testimonial-author-role">
                          {role}{company ? ` – ${company}` : ''}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
            <div className="testimonials-pagination" ref={paginationRef}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
