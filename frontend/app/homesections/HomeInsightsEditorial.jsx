
import React from 'react';

export default function HomeInsightsEditorial({
  title = 'Global Research, Local Understanding',

  paragraph1 = 'At Unimrkt Research, we empower organizations with reliable market intelligence, actionable insights, and data-driven strategies that support confident decision-making. Since 2009, we have been helping businesses across industries uncover opportunities, understand consumer behavior, and navigate evolving market landscapes through comprehensive research solutions.',

  paragraph2 = 'With a strong global presence across 90+ countries and 22+ languages, we combine worldwide research capabilities with deep local expertise to deliver accurate, relevant, and impactful insights. Our services span qualitative and quantitative research, CATI surveys, business research, global panel solutions, data analytics, and end-to-end research support.',

  paragraph3 = 'Backed by 16+ years of research excellence, 500+ CATI workstations, and 250,000+ surveys completed annually, we are committed to delivering high-quality data and meaningful intelligence that drive growth, innovation, and business success. By transforming complex information into clear strategic direction, we help organizations make smarter decisions and achieve lasting impact in competitive markets.',
} = {}) {
  return (
    <section className="insights-editorial-section">
      <div className="srcn-container">
        <div className="insights-editorial-box">
          <h2 className="insights-editorial-heading section-main-heading">
            {title}
          </h2>
          <div className="insights-editorial-text-wrap">
            <p>{paragraph1}</p>
            {paragraph2 && <p>{paragraph2}</p>}
            {paragraph3 && <p>{paragraph3}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
