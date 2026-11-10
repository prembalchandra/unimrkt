'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { getStrapiMedia } from '../lib/strapi';

function formatBlog(b) {
  if (!b) return null;
  return {
    id: b.id || b.documentId || b.slug,
    title: b.title || '',
    snippet: b.excerpt || b.snippet || '',
    link: b.slug ? `/blog/${b.slug}` : '/blog',
    img: getStrapiMedia(b.featuredImage, getStrapiMedia('/uploads/market-trends-card-img1.png')),
  };
}

export default function CommonBlogSection({ initialBlogs = [], dynamicSection = null }) {
  const swiperRef = useRef(null);
  const [blogs, setBlogs] = useState(() => (initialBlogs || []).map(formatBlog).filter(Boolean));

  const displayKicker = dynamicSection?.kicker;
  const displayTitle = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;

  useEffect(() => {
    if (initialBlogs && initialBlogs.length > 0) {
      setBlogs(initialBlogs.map(formatBlog).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/blogs?populate=*&pagination[limit]=10`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setBlogs(d.data.map(formatBlog).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialBlogs]);

  useEffect(() => {
    let swiperInstance = null;

    if (swiperRef.current && blogs.length > 0) {
      swiperInstance = new Swiper(swiperRef.current, {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
        loop: blogs.length > 2,
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
  }, [blogs]);

  return (
    <section className="market-trends-section market-trends-blog-section">
      <div className="market-trends-bg-banner" aria-hidden="true"></div>
      <div className="market-trends-container">
        <div className="market-trends-layout">
          <div className="market-trends-left-col">
            <span className="market-trends-kicker sub-title-red">{displayKicker}</span>
            <h2 className="market-trends-title section-main-heading">
              {displayTitle}
            </h2>
            <p className="market-trends-desc section-sub-text">
              {displayDesc}
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
                {blogs.map((card) => (
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
          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
    </section>
  );
}
