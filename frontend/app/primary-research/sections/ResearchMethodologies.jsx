'use client';

import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const steps = [
  { num: '01', title: 'Understand Objectives', desc: 'Helping manufacturers understand market trends, customer expectations, and product opportunities.' },
  { num: '02', title: 'Research Design', desc: 'Helping manufacturers understand market trends, customer expectations, and product opportunities.' },
  { num: '03', title: 'Questionnaire Development', desc: 'Helping manufacturers understand market trends, customer expectations, and product opportunities.' },
  { num: '04', title: 'Respondent Recruitment', desc: 'Helping manufacturers understand market trends, customer expectations, and product opportunities.' },
  { num: '05', title: 'Data Collection', desc: 'Gathering first-hand feedback through carefully managed interviews and surveys.' },
  { num: '06', title: 'Quality Control', desc: 'Reviewing responses and validating data to maintain accuracy and consistency.' },
  { num: '07', title: 'Data Analysis', desc: 'Finding meaningful patterns in the data to reveal customer needs and market trends.' },
  { num: '08', title: 'Strategic Recommendations', desc: 'Applying research findings to inform next steps and support business growth.' },
];

export default function ResearchMethodologies() {
  const sliderRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const swiperInstance = new Swiper(sliderRef.current, {
      modules: [Pagination, Autoplay],
      slideClass: 'research-methodologies-col',
      wrapperClass: 'research-methodologies-grid',
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      loop: true,
      speed: 650,
      grabCursor: true,
      observer: true,
      observeParents: true,
      watchOverflow: true,
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
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 16,
        },
        580: {
          slidesPerView: 1.8,
          slidesPerGroup: 1,
          spaceBetween: 18,
        },
        768: {
          slidesPerView: 2.3,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3.4,
          slidesPerGroup: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3.4,
          slidesPerGroup: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 3.4,
          slidesPerGroup: 3,
          spaceBetween: 24,
        },
      },
    });

    return () => {
      swiperInstance.destroy(true, true);
    };
  }, []);

  return (
    <section className="research-methodologies-area">
      <div className="research-methodologies-container">
        <div className="research-methodologies-wapper">
          <div className="research-methodologies-conten-top primary-services-header">
            <div className="research-methodologies-content">
              <span className="sub-title-red" style={{ display: 'inline-block', marginBottom: '8px' }}>
                PROCESS
              </span>
              <h2 className="research-methodologies-heading">Research Methodologies</h2>
              <p className="research-methodologies-tilte">
                We leverage proven qualitative and quantitative research methodologies to collect accurate, reliable data, delivering actionable insights that support smarter decisions, innovation, and sustainable business growth.
              </p>
            </div>
          </div>
          <div className="research-methodologies-slider swiper" ref={sliderRef} id="research-methodologies-slider">
            <div className="research-methodologies-grid swiper-wrapper">
              {steps.map((step, index) => (
                <div key={index} className="research-methodologies-col swiper-slide">
                  <div className="research-methodologies-card">
                    <div className="research-methodologies-number">
                      <span className="number-area">{step.num}</span>
                    </div>
                    <div className="research-methodologies-content-area">
                      <div className="research-methodologies-content">
                        <h3 className="research-methodologies-heading research-methodologies-card-title">{step.title}</h3>
                        <p className="research-methodologies-title research-methodologies-card-desc">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="research-methodologies-pagination" ref={paginationRef} aria-label="Research methodology slides"></div>
        </div>
      </div>
    </section>
  );
}
