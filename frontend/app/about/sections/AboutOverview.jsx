import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

function getPillarIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('iso') || t.includes('integrity') || t.includes('security')) return getStrapiMedia('/uploads/Research-icon-img.png');
  if (t.includes('global') || t.includes('footprint') || t.includes('countries')) return getStrapiMedia('/uploads/countries-icon-img.png');
  if (t.includes('speed') || t.includes('execution') || t.includes('rigor')) return getStrapiMedia('/uploads/every-stage-icon-img.png');
  return getStrapiMedia('/uploads/experience-icon-img.png');
}

export default function AboutOverview({ dynamicMetrics = null, dynamicValues = null, dynamicOverview = null }) {
  const introKicker = dynamicOverview?.kicker;
  const introHeading = dynamicOverview?.heading || dynamicOverview?.title;
  const introLead = dynamicOverview?.description;
  const introImage = dynamicOverview?.image ? getStrapiMedia(dynamicOverview.image) : getStrapiMedia('/uploads/company-about-img.png');

  const stats = (dynamicMetrics?.metrics || []).map((m) => ({
    count: m.number || '',
    label: m.label || '',
  }));

  const pillarsHeading = dynamicValues?.heading || dynamicValues?.title;
  const pillarsKicker = dynamicValues?.kicker;

  const pillars = (dynamicValues?.values || []).map((v) => ({
    icon: v.icon ? getStrapiMedia(v.icon) : getPillarIcon(v.title),
    title: v.title || '',
    desc: v.description || '',
  }));

  return (
    <div className="about-overview-container">
      {/* Intro Narrative Section */}
      {(introHeading || introLead) && (
        <section className="about-narrative-section">
          <div className="srcn-container">
            <div className="narrative-grid">
              <div className="narrative-col text-col">
                {introKicker && <span className="narrative-kicker career-values-kicker">{introKicker}</span>}
                {introHeading && <h2 className="section-main-heading">{introHeading}</h2>}
                {introLead && <p className="narrative-lead section-sub-text">{introLead}</p>}
                <div className="narrative-actions">
                  <Link href="/services" className="narrative-cta-btn btn-border-sm">
                    <span>OUR METHODOLOGIES</span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </Link>
                  <Link href="/contact" className="narrative-secondary-btn btn-sm">
                    <span>DISCUSS A PROJECT</span>
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>

              {introImage && (
                <div className="narrative-col visual-col">
                  <div className="narrative-image-card">
                    <img
                      src={introImage}
                      alt={introHeading || 'About Unimrkt Research'}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Global Impact Stats Grid */}
      {stats.length > 0 && (
        <section className="about-stats-strip">
          <div className="srcn-container">
            <div className="about-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="about-stat-item">
                  <span className="about-stat-number">{s.count}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Operational Pillars */}
      {pillars.length > 0 && (
        <section className="about-pillars-section">
          <div className="srcn-container">
            {(pillarsKicker || pillarsHeading) && (
              <div className="section-header-area">
                {pillarsKicker && <span className="career-values-kicker">{pillarsKicker}</span>}
                {pillarsHeading && <h2 className="section-main-heading">{pillarsHeading}</h2>}
              </div>
            )}
            <div className="about-pillars-grid">
              {pillars.map((p, i) => (
                <article key={i} className="about-pillar-card">
                  {p.icon && (
                    <div className="pillar-icon-box">
                      <img src={p.icon} alt={p.title} loading="lazy" />
                    </div>
                  )}
                  {p.title && <h3>{p.title}</h3>}
                  {p.desc && <p>{p.desc}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
