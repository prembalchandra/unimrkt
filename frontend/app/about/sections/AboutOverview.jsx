import React from 'react';
import Link from 'next/link';

const defaultStats = [
  { count: '90+', label: 'Countries Covered' },
  { count: '16+', label: 'Years of Excellence' },
  { count: '120M+', label: 'Verified Global Panellists' },
  { count: '450+', label: 'Multilingual CATI Stations' },
];

const defaultPillars = [
  {
    icon: '/asstes/images/icon/Research-icon-img.png',
    title: 'ISO-Certified Integrity',
    desc: 'ISO 20252 and ISO 27001 certified protocols safeguarding data accuracy, strict digital device fingerprinting, and ethical respondent engagement.',
  },
  {
    icon: '/asstes/images/icon/countries-icon-img.png',
    title: 'Global Footprint (90+ Countries)',
    desc: 'Localized qualitative interviewing and multi-language CATI survey instruments reaching hard-to-find B2B decision-makers and specialized consumers worldwide.',
  },
  {
    icon: '/asstes/images/icon/every-stage-icon-img.png',
    title: 'Speed & Execution Rigor',
    desc: 'Dedicated project managers, 24/7 follow-the-sun field capabilities, and real-time dashboard progress tracking for every research study.',
  },
  {
    icon: '/asstes/images/icon/experience-icon-img.png',
    title: 'Domain-Specialist Teams',
    desc: 'Sector-trained analysts and research directors with over 16+ years of specialized experience in Healthcare, Automotive, BFSI, Tech, and Consumer verticals.',
  },
];

export default function AboutOverview({ dynamicMetrics = null, dynamicValues = null }) {
  const stats =
    dynamicMetrics?.metrics && dynamicMetrics.metrics.length > 0
      ? dynamicMetrics.metrics.map((m) => ({ count: m.number, label: m.label }))
      : defaultStats;

  const pillarsHeading = dynamicValues?.heading || 'Why Global Enterprises Trust Unimrkt Research';
  const pillarsKicker = dynamicValues?.kicker || 'OUR CORE PILLARS';

  const pillars =
    dynamicValues?.values && dynamicValues.values.length > 0
      ? dynamicValues.values.map((v, i) => ({
          icon: defaultPillars[i % defaultPillars.length].icon,
          title: v.title,
          desc: v.description,
        }))
      : defaultPillars;

  return (
    <>
      {/* Editorial Story Section */}
      <section className="insights-editorial-section" style={{ padding: '80px 0' }}>
        <div className="srcn-container">
          <div className="insights-editorial-box">
            <span className="sub-title-red">OUR STORY</span>
            <h2 className="insights-editorial-heading section-main-heading">
              Transforming Complex Market Ambiguity Into Strategic Confidence
            </h2>
            <div className="insights-editorial-text-wrap">
              <p>
                Founded with a mission to deliver uncompromised research fidelity, Unimrkt Research has evolved into one of the world's most trusted primary research partners. We serve leading Fortune 500 enterprises, management consultancies, global agencies, and high-growth innovators.
              </p>
              <p>
                From CATI telephonic interviewing across 450+ native-language stations to cutting-edge web panels and AI-assisted qualitative text analysis, our global infrastructure empowers leadership teams to navigate market disruptions with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Numbers Banner */}
      <section className="impact-section" style={{ padding: '40px 0 80px' }}>
        <div className="srcn-container">
          <div className="impact-wrapper" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="impact-card">
                <h3 className="impact-counter">{stat.count}</h3>
                <p className="impact-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="research-value-section" style={{ paddingTop: '0' }}>
        <div className="srcn-container">
          <div className="research-value-wrap">
            <div className="research-value-header">
              <span className="research-value-kicker career-values-kicker">{pillarsKicker}</span>
              <h2 className="research-value-title section-main-heading">
                {pillarsHeading}
              </h2>
            </div>

            <div className="research-value-grid">
              {pillars.map((pillar, idx) => (
                <article key={idx} className="research-value-card">
                  <div className="value-icon-wrap">
                    <img src={pillar.icon} alt={pillar.title} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <Link href="/team" className="btn-sm">
                <span>Meet Our Team</span>
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
              </Link>
              <Link href="/work" className="btn-white" style={{ border: '1px solid #ddd' }}>
                <span>Careers &amp; Culture</span>
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
