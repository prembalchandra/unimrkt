import React from 'react';
import Link from 'next/link';

function getPillarIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('iso') || t.includes('integrity') || t.includes('security')) return '/asstes/images/icon/Research-icon-img.png';
  if (t.includes('global') || t.includes('footprint') || t.includes('countries')) return '/asstes/images/icon/countries-icon-img.png';
  if (t.includes('speed') || t.includes('execution') || t.includes('rigor')) return '/asstes/images/icon/every-stage-icon-img.png';
  return '/asstes/images/icon/experience-icon-img.png';
}

export default function AboutOverview({ dynamicMetrics = null, dynamicValues = null }) {
  const stats = (dynamicMetrics?.metrics || []).map((m) => ({
    count: m.number || '',
    label: m.label || '',
  }));

  const pillarsHeading = dynamicValues?.heading || dynamicValues?.title || 'Why Global Enterprises Trust Unimrkt Research';
  const pillarsKicker = dynamicValues?.kicker || 'OUR CORE PILLARS';

  const pillars = (dynamicValues?.values || []).map((v) => ({
    icon: getPillarIcon(v.title),
    title: v.title || '',
    desc: v.description || '',
  }));

  return (
    <div className="about-overview-container">
      {/* Intro Narrative Section */}
      <section className="about-narrative-section">
        <div className="srcn-container">
          <div className="narrative-grid">
            <div className="narrative-col text-col">
              <span className="narrative-kicker career-values-kicker">WHO WE ARE</span>
              <h2 className="section-main-heading">
                Pioneering Precision Research Since 2009
              </h2>
              <p className="narrative-lead section-sub-text">
                Unimrkt Research is a global market research and intelligence firm empowering enterprises, consulting leaders, and agencies to make high-conviction decisions.
              </p>
              <p className="section-sub-text">
                With operational headquarters in Gurugram, India, and strategic client hubs in the United States and the United Kingdom, our reach spans 90+ countries across North America, Europe, APAC, Latin America, and the Middle East.
              </p>
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

            <div className="narrative-col visual-col">
              <div className="narrative-image-card">
                <img
                  src="/asstes/images/about-narrative-img.png"
                  alt="Unimrkt Research executive intelligence in action"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <div className="section-header-area">
              <span className="career-values-kicker">{pillarsKicker}</span>
              <h2 className="section-main-heading">{pillarsHeading}</h2>
            </div>
            <div className="about-pillars-grid">
              {pillars.map((p, i) => (
                <article key={i} className="about-pillar-card">
                  <div className="pillar-icon-box">
                    <img src={p.icon} alt={p.title} loading="lazy" />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
