import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../lib/strapi';
import HeroSection from '../app/homesections/HeroSection';
import GlobalResearchSection from '../app/homesections/GlobalResearchSection';
import ResearchReachSection from '../app/services/sections/ResearchReachSection';
import CommonTrustedPartnersTestimonials from './CommonTrustedPartnersTestimonials';
import CommonBlogSection from './CommonBlogSection';

/**
 * Dynamic Section Component Resolver for Strapi 5 Dynamic Zones
 */
export default function DynamicSectionRenderer({ sections = [] }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, idx) => {
        const key = section.id ? `sec-${section.__component}-${section.id}` : `sec-${idx}`;

        switch (section.__component) {
          case 'sections.home-hero':
            return <HeroSection key={key} dynamicData={section} />;

          case 'sections.hero-common':
            return (
              <section key={key} className="hero-common-section" style={{ padding: '120px 0 60px', background: '#0a0a0a', color: '#fff' }}>
                <div className="srcn-container text-center">
                  {section.kicker && <span className="sub-title-red" style={{ display: 'inline-block', marginBottom: '12px' }}>{section.kicker}</span>}
                  <h1 className="section-main-heading" style={{ color: '#fff', marginBottom: '20px' }}>{section.title}</h1>
                  {section.subtitle && <p className="section-sub-text" style={{ maxWidth: '800px', margin: '0 auto 30px', color: '#ccc' }}>{section.subtitle}</p>}
                </div>
              </section>
            );

          case 'sections.metrics-grid':
            return (
              <section key={key} className="research-impact-section">
                <div className="srcn-container">
                  {(section.heading || section.title) && (
                    <div className="section-header-area research-impact-header">
                      {section.kicker && <span className="career-values-kicker">{section.kicker}</span>}
                      <h2 className="section-main-heading">{section.heading || section.title}</h2>
                      {section.description && <p className="section-sub-text">{section.description}</p>}
                    </div>
                  )}
                  <div className="research-impact-grid">
                    {(section.metrics || []).map((m, mIdx) => (
                      <article key={m.id || mIdx} className="research-impact-col">
                        <div className="research-impact-card">
                          <div className="research-impact-content-area">
                            <h3 className="research-impact-number">{m.number}</h3>
                            <p className="research-impact-label">{m.label}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'sections.values-grid':
            return (
              <section key={key} className="research-value-section">
                <div className="srcn-container">
                  <div className="research-value-header">
                    {section.kicker && <span className="career-values-kicker">{section.kicker}</span>}
                    <h2 className="section-main-heading">{section.title || section.heading}</h2>
                    {section.subtitle && <p className="section-sub-text">{section.subtitle}</p>}
                  </div>
                  <div className="research-value-grid">
                    {(section.values || []).map((val, vIdx) => (
                      <article key={val.id || vIdx} className="research-value-card">
                        <h3>{val.title}</h3>
                        <p>{val.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'sections.research-reach':
            return <ResearchReachSection key={key} dynamicReach={section} />;

          case 'sections.faq-accordion':
            return (
              <section key={key} className="faq-section-area">
                <div className="srcn-container">
                  <div className="section-header-area">
                    {section.kicker && <span className="career-values-kicker">{section.kicker}</span>}
                    <h2 className="section-main-heading">{section.title || section.heading}</h2>
                  </div>
                  <div className="faq-accordion-container">
                    {(section.items || []).map((faq, fIdx) => (
                      <div key={faq.id || fIdx} className="faq-accordion-item">
                        <div className="faq-accordion-header">
                          <span className="faq-question-text">{faq.question}</span>
                        </div>
                        <div className="faq-accordion-body" style={{ display: 'block' }}>
                          <p className="faq-accordion-answer">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'sections.question-cta':
            return (
              <section key={key} className="research-cta-section" id="cta">
                <div className="srcn-container">
                  <div className="cta-container-box" style={{ background: 'linear-gradient(135deg, #1f0b15 0%, #3d1424 100%)', borderRadius: '16px', padding: '60px 40px', textAlign: 'center', color: '#fff' }}>
                    <span className="career-values-kicker" style={{ color: '#e53935' }}>{section.kicker}</span>
                    <h2 className="section-main-heading" style={{ color: '#fff', margin: '16px 0' }}>{section.title}</h2>
                    <p className="section-sub-text" style={{ color: '#e0e0e0', maxWidth: '640px', margin: '0 auto 28px' }}>{section.description}</p>
                    <Link href={section.buttonUrl || '/contact'} className="hero-common-btn-area btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e53935', color: '#fff', padding: '12px 28px', borderRadius: '30px' }}>
                      <span>{section.buttonText || 'Contact Us'}</span>
                      <i className="fa fa-long-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </section>
            );

          case 'sections.rich-text-block':
            return (
              <section key={key} className="rich-text-section" style={{ padding: '60px 0' }}>
                <div className="srcn-container">
                  {section.title && <h2 className="section-main-heading" style={{ marginBottom: '24px' }}>{section.title}</h2>}
                  <div className="rich-text-content" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#333' }}>
                    {typeof section.content === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    ) : (
                      <p>{section.summary || section.title}</p>
                    )}
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
