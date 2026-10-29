
'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


const segmentSlides = [
  {
    id: 1,
    title: 'Automotive Manufacturers & OEMs',
    desc: 'Assisting motor vehicle manufacturers with buyer persona mapping, brand health tracking, vehicle concept clinics, and price sensitivity modeling for new model launches. Our research delivers actionable insights on brand awareness, customer satisfaction, and product improvement to drive sustainable automotive growth.',
    icon: '/asstes/images/icon/automotive-icon-img.png',
  },
  {
    id: 2,
    title: 'Auto Component Suppliers',
    desc: 'Providing engineering and component suppliers with OEM procurement intelligence, technology adoption roadmaps, and competitive benchmarking across global markets. We help component makers identify new product opportunities, optimize supply chain efficiency, and make informed strategic decisions that strengthen market presence.',
    icon: '/asstes/images/icon/auto-component-suppliers-icon-img.png',
  },
  {
    id: 3,
    title: 'EV & Mobility Companies',
    desc: 'Empowering electric vehicle and smart mobility innovators with battery technology perceptions, charging infrastructure acceptance, consumer range anxiety analysis, and urban micromobility trends. We deliver critical data on consumer adoption barriers, pricing models, and regulatory landscape impacts to accelerate adoption.',
    icon: '/asstes/images/icon/EV-icon-img.png',
  },
  {
    id: 4,
    title: 'Dealerships, Fleet & Technology Companies',
    desc: 'Equipping auto dealerships, fleet management firms, and automotive software developers with actionable consumer insights, connected vehicle data expectations, DMS software usability studies, and aftermarket service satisfaction metrics to navigate disruption and identify high-value commercial opportunities.',
    icon: '/asstes/images/icon/dealerships-icon-img.png',
  },
];

export default function AutomotiveSegmentsSlider() {
  const sliderRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const swiper = new Swiper(sliderRef.current, {
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
        el: sliderRef.current.querySelector(
          '.auto-segments-pagination'
        ),
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        540: {
          slidesPerView: 1.15,
          spaceBetween: 18,
        },
        720: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 22,
        },
        1240: {
          slidesPerView: 3.5,
          spaceBetween: 22,
        },
      },
    });

    swiperInstanceRef.current = swiper;

    return () => {
      swiper.destroy(true, true);
      swiperInstanceRef.current = null;
    };
  }, []);

  return (
    <section className="auto-segments-section" id="auto-segments">
      <div className="auto-segments-container">
        <div className="auto-segments-header">
          <span className="auto-segments-kicker">
            WHO WE SERVE
          </span>
          <h2 className="auto-segments-heading">
            Supporting Every Automotive Segment
          </h2>
        </div>
        <div className='common-swiper-box'>
        <div
          className="swiper auto-segments-swiper"
          ref={sliderRef}
        >
          <div className="swiper-wrapper">
            {segmentSlides.map((slide) => (
              <div
                key={slide.id}
                className="swiper-slide auto-segments-slide"
              >
                <article className="auto-segment-card">
                  <h3 className="auto-segment-title">
                    {slide.title}
                  </h3>

                  <p className="auto-segment-desc">
                    {slide.desc}
                  </p>

                  <div className="auto-segment-bottom-icon">
                    <img
                      src={slide.icon}
                      alt={slide.title}
                      loading="lazy"
                    />
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="auto-segments-pagination" />
        </div>
        </div>
      </div>
    </section>
  );
}
