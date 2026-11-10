'use client';

import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { getStrapiMedia } from '@/lib/strapi';

function formatTestimonial(t) {
  if (!t) return null;
  return {
    id: t.id || t.documentId || Math.random(),
    title: t.title || '',
    quote: t.quote || t.content || '',
    role: t.clientRole || t.authorTitle || t.role || '',
    company: t.companyName || t.clientCompany || t.company || '',
  };
}

export default function ContactProcess({
  initialTestimonials = [],
  dynamicSection = null,
  kicker,
  title,
  description,
}) {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);
  const [items, setItems] = useState(() => (initialTestimonials || []).map(formatTestimonial).filter(Boolean));

  const displayKicker = dynamicSection?.kicker || kicker;
  const displayTitle = dynamicSection?.heading || dynamicSection?.title || title;
  const displayDesc = dynamicSection?.description || description;

  useEffect(() => {
    if (initialTestimonials && initialTestimonials.length > 0) {
      setItems(initialTestimonials.map(formatTestimonial).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/testimonials?sort=order:asc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setItems(d.data.map(formatTestimonial).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialTestimonials]);

  useEffect(() => {
    if (!sliderRef.current || items.length === 0) return;

    const swiperInstance = new Swiper(sliderRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 18,
      watchOverflow: true,
      slidesPerGroup: 1,
      loop: items.length > 2,
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
  }, [items]);

  return (
    <section className="contact-process-section">
      <div className="srcn-container">
        <div className="contact-process-header">
          <span className="contact-process-kicker career-values-kicker">{displayKicker}</span>
          <h2 className="contact-process-title section-main-heading">{displayTitle}</h2>
          <p className="contact-process-subtitle section-sub-text">{displayDesc}</p>
        </div>
        <div className="swiper testimonial-process-slider" ref={sliderRef}>
          <div className="swiper-wrapper">
            {items.map((item) => (
              <article key={item.id} className="swiper-slide contact-process-card">
                <div className="testimonial-process-card-box">
                  <div className="contact-process-icon">
                    <img src={getStrapiMedia("/uploads/testimonial-icon-img.png")} alt="Testimonial quote icon" />
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
