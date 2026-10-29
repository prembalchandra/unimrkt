import React from 'react';

export default function MarketplacesSection() {
  return (
    <section className="global-marketplaces-section" id="marketplaces">
            <div className="moments-pattern-backdrop"></div>
      <div className="srcn-container">
        <div className="marketplaces-header text-center">
          <h2 className="marketplaces-title">
            Unlock The Power<br />Of <span className="highlight-red">Marketplaces</span>
          </h2>
          <p className="marketplaces-subtitle">
            Unimrkt conducts multi-industry research across 90 countries in over 22 languages.
          </p>
        </div>
        <div className="office-cards-grid">
          <div className="office-hub-card">
            <div className="office-image-box">
              <img
                src="/asstes/images/office-india.png"
                alt="India Office - Gurugram & New Delhi"
              />
            </div>
            <div className="office-content">
              <h3 className="office-name">India Office</h3>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">LOCATION</span>
                  <p className="office-info-text">
                    5th floor, Nimai Tower, 412-415, Udyog Vihar, Phase IV, Gurugram, Haryana-122015
                  </p>
                </div>
              </div>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">EMAIL</span>
                  <p className="office-info-text">
                    <a href="mailto:sales@unimrkt.com">sales@unimrkt.com</a>
                  </p>
                </div>
              </div>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">SALES & BUSINESS QUERIES</span>
                  <p className="office-info-text">+91 124 424 5210, +91 9870 377 557</p>
                </div>
              </div>
            </div>
          </div>

          <div className="office-hub-card">
            <div className="office-image-box">
              <img
                src="/asstes/images/office-usa.png"
                alt="United States of America Office - New York"
              />
            </div>
            <div className="office-content">
              <h3 className="office-name">United States of America Office</h3>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">LOCATION</span>
                  <p className="office-info-text">98 Cuttermill Road Suite 466, Great Neck, NY 11021, USA</p>
                </div>
              </div>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">EMAIL</span>
                  <p className="office-info-text">
                    <a href="mailto:sales@unimrkt.com">sales@unimrkt.com</a>
                  </p>
                </div>
              </div>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">QUERIES</span>
                  <p className="office-info-text">+1.646.712.9302</p>
                </div>
              </div>
            </div>
          </div>
          <div className="office-hub-card">
            <div className="office-image-box">
              <img
                src="/asstes/images/office-uk.png"
                alt="United Kingdom Office - Oxford & London"
              />
            </div>
            <div className="office-content">
              <h3 className="office-name">United Kingdom Office</h3>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">LOCATION</span>
                  <p className="office-info-text">
                    The Old Dairy, 12 Stephen Road, Headington, Oxford, Oxfordshire, United Kingdom OX3 9AY
                  </p>
                </div>
              </div>

              <div className="office-info-item">
                <div className="office-icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="office-details">
                  <span className="office-info-label">EMAIL</span>
                  <p className="office-info-text">
                    <a href="mailto:sales@unimrkt.com">sales@unimrkt.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Email / Coverage Bar */}
        <div className="marketplaces-bottom-bar text-center">
          <span className="marketplaces-coverage-text">To know more about our global coverage, please email us at</span>
          <a href="mailto:sales@unimrkt.com" className="marketplaces-email-pill">
            SALES@UNIMRKT.COM
          </a>
        </div>
      </div>
    </section>
  );
}
