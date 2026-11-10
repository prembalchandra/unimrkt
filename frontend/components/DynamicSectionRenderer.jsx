'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { getStrapiMedia } from '../lib/strapi';
import HeroSection from '../app/homesections/HeroSection';
import ResearchReachSection from '../app/services/sections/ResearchReachSection';
import CommonTrustedPartnersTestimonials from './CommonTrustedPartnersTestimonials';
import CommonBlogSection from './CommonBlogSection';

/**
 * Universal Dynamic Section Component Renderer for Strapi 5 Dynamic Zones
 * Supports all 18+ CMS components, media management, SVG/PNG icons, and secure HTML execution.
 */
export default function DynamicSectionRenderer({ sections = [] }) {
  const [openAccordions, setOpenAccordions] = useState({});

  if (!Array.isArray(sections) || sections.length === 0) return null;

  const toggleAccordion = (secKey, itemIdx) => {
    setOpenAccordions((prev) => {
      const current = prev[secKey];
      return {
        ...prev,
        [secKey]: current === itemIdx ? -1 : itemIdx,
      };
    });
  };

  return (
    <>
      {sections.map((section, idx) => {
        if (!section || section.enabled === false) return null;

        const key = section.id
          ? `sec-${section.__component}-${section.id}`
          : `sec-${idx}`;

        switch (section.__component) {
          // 1. Custom HTML Section (Admin can write & edit raw HTML with XSS sanitization)
          case 'sections.custom-html-section': {
            const sanitizedHtml = DOMPurify.sanitize(section.htmlCode || '', {
              ADD_TAGS: ['iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'svg', 'path', 'circle', 'rect'],
              ADD_ATTR: ['target', 'rel', 'allowfullscreen', 'frameborder', 'viewBox', 'fill', 'stroke', 'd'],
            });

            const content = (
              <div className={`custom-html-block ${section.customCssClass || ''}`}>
                {section.kicker && (
                  <span className="career-values-kicker">{section.kicker}</span>
                )}
                {section.title && (
                  <h2 className="section-main-heading">{section.title}</h2>
                )}
                <div
                  className="custom-html-rendered"
                  dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
              </div>
            );

            return (
              <section key={key} className="custom-html-section py-12">
                {section.renderInContainer !== false ? (
                  <div className="srcn-container">{content}</div>
                ) : (
                  content
                )}
              </section>
            );
          }

          // 2. Banner Section (Desktop, Mobile & Background Image Management)
          case 'sections.banner-section': {
            const desktopImg = getStrapiMedia(section.desktopBanner || section.image);
            const mobileImg = getStrapiMedia(section.mobileBanner || section.desktopBanner);
            const bgImg = getStrapiMedia(section.backgroundImage);

            return (
              <section
                key={key}
                className="cms-banner-section relative py-16 overflow-hidden"
                style={{
                  backgroundImage: bgImg ? `url(${bgImg})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="srcn-container">
                  <div className="banner-grid flex flex-col lg:flex-row items-center gap-8">
                    <div className="banner-content flex-1">
                      {section.kicker && (
                        <span className="career-values-kicker">{section.kicker}</span>
                      )}
                      {section.title && (
                        <h2 className="section-main-heading">{section.title}</h2>
                      )}
                      {section.description && (
                        <p className="section-sub-text">{section.description}</p>
                      )}
                      {section.button?.label && (
                        <Link
                          href={section.button.url || '/contact'}
                          className="hero-common-btn-area btn-sm mt-6 inline-flex items-center gap-2"
                        >
                          <span>{section.button.label}</span>
                          <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        </Link>
                      )}
                    </div>

                    {(desktopImg || mobileImg) && (
                      <div className="banner-image-wrap flex-1">
                        <picture>
                          {mobileImg && (
                            <source media="(max-width: 768px)" srcSet={mobileImg} />
                          )}
                          <img
                            src={desktopImg || mobileImg}
                            alt={section.altText || section.title || 'Banner'}
                            loading="lazy"
                            className="rounded-2xl max-w-full h-auto shadow-lg"
                          />
                        </picture>
                        {section.caption && (
                          <figcaption className="text-xs text-gray-500 mt-2 text-center">
                            {section.caption}
                          </figcaption>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // 3. Image Gallery Section
          case 'sections.image-gallery': {
            const galleryList = Array.isArray(section.images?.data)
              ? section.images.data
              : Array.isArray(section.images)
              ? section.images
              : [];

            const cols = section.columns || 3;

            return (
              <section key={key} className="cms-gallery-section py-16 bg-[#fcfcfc]">
                <div className="srcn-container">
                  <div className="section-header-area text-center mb-10">
                    {section.kicker && (
                      <span className="career-values-kicker">{section.kicker}</span>
                    )}
                    {section.heading && (
                      <h2 className="section-main-heading">{section.heading}</h2>
                    )}
                    {section.description && (
                      <p className="section-sub-text max-w-3xl mx-auto">
                        {section.description}
                      </p>
                    )}
                  </div>

                  <div
                    className="gallery-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
                      gap: '24px',
                    }}
                  >
                    {galleryList.map((imgItem, gIdx) => {
                      const imgUrl = getStrapiMedia(imgItem);
                      const altText =
                        imgItem.alternativeText ||
                        imgItem.caption ||
                        `${section.heading || 'Gallery'} image ${gIdx + 1}`;

                      return (
                        <div
                          key={imgItem.id || gIdx}
                          className="gallery-item group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                          <img
                            src={imgUrl}
                            alt={altText}
                            loading="lazy"
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {(imgItem.caption || imgItem.name) && (
                            <div className="gallery-caption p-3 bg-white text-xs text-gray-700">
                              {imgItem.caption || imgItem.name}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          // 4. Icon Cards Section (Icon Management with SVG, PNG, WEBP, Custom Sizes & Colors)
          case 'sections.icon-cards-section': {
            const cards = section.cards || [];
            return (
              <section key={key} className="cms-icon-cards-section py-16 bg-white">
                <div className="srcn-container">
                  <div className="section-header-area text-center mb-12">
                    {section.kicker && (
                      <span className="career-values-kicker">{section.kicker}</span>
                    )}
                    {section.heading && (
                      <h2 className="section-main-heading">{section.heading}</h2>
                    )}
                    {section.description && (
                      <p className="section-sub-text max-w-3xl mx-auto">
                        {section.description}
                      </p>
                    )}
                  </div>

                  <div
                    className="icon-cards-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
                      gap: '28px',
                    }}
                  >
                    {cards.map((c, cIdx) => {
                      const iconSrc = getStrapiMedia(c.iconImage || c.icon || c.image);
                      return (
                        <article
                          key={c.id || cIdx}
                          className="icon-card-item p-8 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#BE2C28]"
                        >
                          {c.iconSvgCode ? (
                            <div
                              className="icon-svg-wrap mb-5"
                              style={{ color: c.iconColor || '#BE2C28' }}
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(c.iconSvgCode),
                              }}
                            />
                          ) : iconSrc ? (
                            <div className="icon-img-wrap mb-5 w-14 h-14">
                              <img
                                src={iconSrc}
                                alt={c.altText || c.title || 'Icon'}
                                loading="lazy"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : null}

                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {c.title}
                          </h3>
                          {c.description && (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {c.description}
                            </p>
                          )}
                          {c.linkUrl && (
                            <Link
                              href={c.linkUrl}
                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#BE2C28] hover:underline"
                            >
                              <span>Learn more</span>
                              <i className="fa fa-arrow-right text-xs" />
                            </Link>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          // 5. Video Section
          case 'sections.video-section': {
            const poster = getStrapiMedia(section.videoPoster);
            return (
              <section key={key} className="cms-video-section py-16 bg-[#0a0a0a] text-white">
                <div className="srcn-container text-center">
                  {section.kicker && (
                    <span className="career-values-kicker text-[#e53935]">
                      {section.kicker}
                    </span>
                  )}
                  {section.heading && (
                    <h2 className="section-main-heading text-white">{section.heading}</h2>
                  )}
                  {section.description && (
                    <p className="section-sub-text text-gray-300 max-w-2xl mx-auto mb-8">
                      {section.description}
                    </p>
                  )}

                  <div className="video-player-wrap max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                    {section.videoUrl?.includes('embed') ||
                    section.videoUrl?.includes('youtube') ||
                    section.videoUrl?.includes('vimeo') ? (
                      <div className="aspect-video w-full">
                        <iframe
                          src={section.videoUrl}
                          title={section.heading || 'Video'}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video
                        controls
                        poster={poster}
                        className="w-full aspect-video object-cover"
                      >
                        <source src={section.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // 6. Home Hero
          case 'sections.home-hero':
            return <HeroSection key={key} dynamicData={section} />;

          // 7. Hero Common
          case 'sections.hero-common': {
            const heroBanner = getStrapiMedia(section.bannerImage);
            return (
              <section
                key={key}
                className="hero-common-section relative"
                style={{
                  padding: '120px 0 60px',
                  background: '#040112',
                  color: '#fff',
                  backgroundImage: heroBanner ? `url(${heroBanner})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="srcn-container text-center">
                  {section.kicker && (
                    <span
                      className="sub-title-red"
                      style={{ display: 'inline-block', marginBottom: '12px' }}
                    >
                      {section.kicker}
                    </span>
                  )}
                  <h1
                    className="section-main-heading"
                    style={{ color: '#fff', marginBottom: '20px' }}
                  >
                    {section.title}
                  </h1>
                  {section.description && (
                    <p
                      className="section-sub-text"
                      style={{ maxWidth: '800px', margin: '0 auto 30px', color: '#ccc' }}
                    >
                      {section.description}
                    </p>
                  )}
                </div>
              </section>
            );
          }

          // 8. Callout Box / About Overview
          case 'sections.callout-box': {
            const boxImage = getStrapiMedia(section.image);
            return (
              <section key={key} className="callout-box-section py-16 bg-[#f9f9f7]">
                <div className="srcn-container">
                  <div className="callout-box-grid flex flex-col lg:flex-row items-center gap-10">
                    <div className="callout-box-content flex-1">
                      {section.kicker && (
                        <span className="career-values-kicker">{section.kicker}</span>
                      )}
                      {section.title && (
                        <h2 className="section-main-heading">{section.title}</h2>
                      )}
                      {section.description && (
                        <p className="section-sub-text">{section.description}</p>
                      )}
                    </div>
                    {boxImage && (
                      <div className="callout-box-visual flex-1">
                        <img
                          src={boxImage}
                          alt={section.title || ''}
                          loading="lazy"
                          className="rounded-2xl max-w-full h-auto shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // 9. Accordion Solutions
          case 'sections.accordion-solutions': {
            const cards = section.cards || [];
            const activeIdx = openAccordions[key] ?? 0;

            return (
              <section key={key} className="accordion-solutions-section py-16 bg-white">
                <div className="srcn-container">
                  <div className="section-header-area text-center mb-10">
                    {section.kicker && (
                      <span className="career-values-kicker">{section.kicker}</span>
                    )}
                    {section.heading && (
                      <h2 className="section-main-heading">{section.heading}</h2>
                    )}
                    {section.description && (
                      <p className="section-sub-text max-w-3xl mx-auto">
                        {section.description}
                      </p>
                    )}
                  </div>

                  <div className="accordion-list max-w-3xl mx-auto flex flex-col gap-3">
                    {cards.map((c, cIdx) => {
                      const isOpen = activeIdx === cIdx;
                      return (
                        <div
                          key={c.id || cIdx}
                          className={`accordion-item border rounded-xl overflow-hidden transition-all ${
                            isOpen ? 'border-[#BE2C28] shadow-sm' : 'border-gray-200'
                          }`}
                        >
                          <button
                            type="button"
                            className="accordion-header w-full p-5 text-left flex items-center justify-between font-semibold text-gray-900 bg-white"
                            onClick={() => toggleAccordion(key, cIdx)}
                          >
                            <span>{c.title}</span>
                            <span className="text-[#BE2C28] font-bold text-lg">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="accordion-body px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                              <p>{c.description}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          // 10. Metrics Grid
          case 'sections.metrics-grid':
            return (
              <section key={key} className="research-impact-section py-16 bg-[#020a13] text-white">
                <div className="srcn-container">
                  {(section.heading || section.title) && (
                    <div className="section-header-area text-center mb-10">
                      {section.kicker && (
                        <span className="career-values-kicker text-[#BE2C28]">
                          {section.kicker}
                        </span>
                      )}
                      <h2 className="section-main-heading text-white">
                        {section.heading || section.title}
                      </h2>
                      {section.description && (
                        <p className="section-sub-text text-gray-300 max-w-3xl mx-auto">
                          {section.description}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="research-impact-grid flex flex-wrap justify-center gap-6">
                    {(section.metrics || []).map((m, mIdx) => (
                      <article key={m.id || mIdx} className="research-impact-col flex-1 min-w-[200px] text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="research-impact-number text-4xl font-extrabold text-white mb-2">
                          {m.number}
                        </div>
                        <p className="research-impact-label text-sm text-gray-300">
                          {m.label}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );

          // 11. Values Grid
          case 'sections.values-grid':
            return (
              <section key={key} className="research-value-section py-16 bg-[#f9f9f7]">
                <div className="srcn-container">
                  <div className="research-value-header text-center mb-10">
                    {section.kicker && (
                      <span className="career-values-kicker">{section.kicker}</span>
                    )}
                    <h2 className="section-main-heading">
                      {section.title || section.heading}
                    </h2>
                    {section.description && (
                      <p className="section-sub-text max-w-3xl mx-auto">
                        {section.description}
                      </p>
                    )}
                  </div>
                  <div className="research-value-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(section.values || []).map((val, vIdx) => (
                      <article
                        key={val.id || vIdx}
                        className="research-value-card p-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {val.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {val.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );

          // 12. Question CTA
          case 'sections.question-cta':
            return (
              <section key={key} className="research-cta-section py-12" id="cta">
                <div className="srcn-container">
                  <div
                    className="cta-container-box p-12 rounded-3xl text-center text-white"
                    style={{
                      background: 'linear-gradient(135deg, #1f0b15 0%, #3d1424 100%)',
                    }}
                  >
                    {section.kicker && (
                      <span className="career-values-kicker text-[#e53935]">
                        {section.kicker}
                      </span>
                    )}
                    <h2 className="section-main-heading text-white my-4">
                      {section.title}
                    </h2>
                    <p className="section-sub-text text-gray-200 max-w-xl mx-auto mb-6">
                      {section.description}
                    </p>
                    <Link
                      href={section.buttonUrl || section.button?.url || '/contact'}
                      className="hero-common-btn-area btn-sm inline-flex items-center gap-2 bg-[#BE2C28] text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#BE2C28] transition-all"
                    >
                      <span>
                        {section.buttonText || section.button?.label || 'Contact Us'}
                      </span>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </section>
            );

          // 13. Rich Text Block
          case 'sections.rich-text-block':
            return (
              <section key={key} className="rich-text-section py-12">
                <div className="srcn-container">
                  {section.title && (
                    <h2 className="section-main-heading mb-6">{section.title}</h2>
                  )}
                  <div className="rich-text-content prose max-w-none text-gray-800 leading-relaxed">
                    {typeof section.content === 'string' ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(section.content),
                        }}
                      />
                    ) : (
                      <p>{section.subtitle || section.title}</p>
                    )}
                  </div>
                </div>
              </section>
            );

          // 14. Research Reach
          case 'sections.research-reach':
            return <ResearchReachSection key={key} dynamicReach={section} />;

          default:
            return null;
        }
      })}
    </>
  );
}
