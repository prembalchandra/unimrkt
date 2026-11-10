'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function Footer({ globalData: initialGlobalData = null }) {
  const [globalData, setGlobalData] = useState(initialGlobalData);

  useEffect(() => {
    if (!initialGlobalData) {
      fetch('http://127.0.0.1:1337/api/global?populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[footerLogo][populate]=*&populate[legalLinks][populate]=*')
        .then((res) => res.json())
        .then((json) => {
          if (json?.data) setGlobalData(json.data);
        })
        .catch(() => {});
    }
  }, [initialGlobalData]);

  const logoSrc = getStrapiMedia(globalData?.footerLogo, '/asstes/images/unimrkt-resarch-logo.webp');
  const footerDesc = globalData?.footerDescription || 'Delivering global market research, data collection, and actionable insights that drive smarter business decisions.';
  const copyright = globalData?.copyrightText || '© 2026 Unimrkt Research. All rights reserved.';
  const socialLinks = globalData?.socialLinks || [];
  const legalLinks = globalData?.legalLinks || [];

  return (
    <footer className="unimrkt-resarch-footer-area">
      <video className="footer-banner-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="/asstes/images/video-banner.mp4" type="video/mp4" />
      </video>
      <div className="footer-video-overlay" aria-hidden="true"></div>
      <div className="srcn-container">
        <div className="footer-wapper-area">
          <div className="footer-wapper-grid">
            <div className="footer-wapper-lift-col">
              <div className="footer-wapper-logo-area">
                <Link href="/" className="footer-logo-box">
                  <img src={logoSrc} alt="Unimrkt Research" />
                </Link>
              </div>
              <p className="footer-wapper-title-area">
                {footerDesc}
              </p>
              <div className="footer-certifications-row">
                <img className="footer-certification-logo" src="/asstes/images/icon/mr-footer-logo.png" alt="ISO 27001 certification" />
                <img className="footer-certification-logo" src="/asstes/images/icon/mr-footer-logo.png" alt="ISO 27001 certification" />
                <img className="footer-certification-logo" src="/asstes/images/icon/msri-logo-img.png" alt="MRSI corporate member" />
              </div>
            </div>

            {/* Dynamic Footer Columns from Strapi */}
            {globalData?.footerColumns && globalData.footerColumns.length > 0 ? (
              globalData.footerColumns.map((col, idx) => (
                <div key={col.id || idx} className="footer-nav-col">
                  <h3>{col.title}</h3>
                  <ul>
                    {(col.links || []).map((link, lIdx) => (
                      <li key={link.id || lIdx} className="footer-time-area">
                        <Link href={link.url || '/'} className="footer-menu-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <>
                <div className="footer-nav-col">
                  <h3>Our Company</h3>
                  <ul>
                    <li className="footer-time-area"><Link href="/about" className="footer-menu-link">About Us</Link></li>
                    <li className="footer-time-area"><Link href="/team" className="footer-menu-link">Our Leadership</Link></li>
                    <li className="footer-time-area"><Link href="/work" className="footer-menu-link">Careers</Link></li>
                    <li className="footer-time-area"><Link href="/services" className="footer-menu-link">Global Panel</Link></li>
                    <li className="footer-time-area"><Link href="/gallery" className="footer-menu-link">Gallery</Link></li>
                  </ul>
                </div>
                <div className="footer-nav-col">
                  <h3>Services</h3>
                  <ul>
                    <li className="footer-time-area"><Link href="/primary-research" className="footer-menu-link">Primary Research</Link></li>
                    <li className="footer-time-area"><Link href="/services" className="footer-menu-link">Secondary Research</Link></li>
                    <li className="footer-time-area"><Link href="/telephonic-surveys" className="footer-menu-link">CATI / Telephonic</Link></li>
                    <li className="footer-time-area"><Link href="/services" className="footer-menu-link">Online Surveys</Link></li>
                    <li className="footer-time-area"><Link href="/services" className="footer-menu-link">Data Analytics</Link></li>
                  </ul>
                </div>
                <div className="footer-nav-col">
                  <h3>Quick Links</h3>
                  <ul>
                    <li className="footer-time-area"><Link href="/blog" className="footer-menu-link">Blogs &amp; Articles</Link></li>
                    <li className="footer-time-area"><Link href="/case-study" className="footer-menu-link">Case Studies</Link></li>
                    <li className="footer-time-area"><Link href="/blog" className="footer-menu-link">Whitepapers</Link></li>
                    <li className="footer-time-area"><Link href="/primary-research" className="footer-menu-link">Methodologies</Link></li>
                    <li className="footer-time-area"><Link href="/faq" className="footer-menu-link">FAQs</Link></li>
                  </ul>
                </div>
              </>
            )}

            {/* Column 5: Connect with us */}
            <div className="footer-nav-col">
              <h3>Connect with us</h3>
              <div className="footer-social-links">
                {socialLinks.length > 0 ? (
                  socialLinks.map((s, idx) => (
                    <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label={s.platform}>
                      <i className={`fa-brands fa-${s.platform === 'twitter' ? 'x-twitter' : s.platform === 'linkedin' ? 'linkedin-in' : s.platform === 'facebook' ? 'facebook-f' : s.platform}`}></i>
                    </a>
                  ))
                ) : (
                  <>
                    <a href="https://linkedin.com/company/unimrkt-research" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://twitter.com/unimrktresearch" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Twitter / X">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="https://facebook.com/unimrktresearch" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="https://youtube.com/@unimrktresearch" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="YouTube">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom-outer">
        <div className="srcn-container">
          <div className="footer-bottom-bar">
            <p className="footer-wapper-title-area" style={{ marginBottom: 0 }}>
              {copyright}
            </p>
            <div className="footer-bottom-links">
              {legalLinks.length > 0 ? (
                legalLinks.map((l, i) => (
                  <Link key={i} href={l.url || '/privacy-policy'}>{l.label}</Link>
                ))
              ) : (
                <>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <Link href="/privacy-policy">Terms &amp; Conditions</Link>
                  <Link href="/privacy-policy">Security</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
