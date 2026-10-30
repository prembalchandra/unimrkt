import React from 'react';

export default function AutomotiveAboutOverview() {
  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            <span className="telephonic-overview-kicker sub-title-red">What We Do</span>
            <h2 className="telephonic-overview-title">Our Automotive Research Services</h2>
            <div className='abou-Primary-overview'>
              <p>
                Unimrkt Research is a trusted automotive market research partner, delivering reliable data and actionable insights to help manufacturers, OEMs, suppliers, dealerships, EV companies, and mobility providers make informed business decisions. Our expertise spans consumer behavior, market trends, competitive intelligence, product validation, and emerging opportunities across the automotive ecosystem.
              </p>
              <p>
                Using advanced research methodologies such as CATI, Online Surveys, In-Depth Interviews (IDIs), Focus Group Discussions (FGDs), and Telephonic Surveys, we provide high-quality, accurate data tailored to your business objectives. From tracking regulatory changes and understanding customer preferences to evaluating new market opportunities, our research empowers organizations to reduce risk, drive innovation, and achieve sustainable growth in the evolving automotive industry.
              </p>
            </div>
           
          </div>

          <div className="telephonic-overview-visual-wrap">
            <div className="telephonic-overview-figure abou-Primary-img">
              <img src="/asstes/images/automotives-about-img.webp" alt="First-Hand Insights That Power Better Business Decisions" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
