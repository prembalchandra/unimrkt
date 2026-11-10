'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';

export default function Footer({ globalData: initialGlobalData = null }) {
  const [globalData, setGlobalData] = useState(initialGlobalData);

  useEffect(() => {
    if (!initialGlobalData) {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(
        `${STRAPI_URL}/api/global?populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[footerLogo][populate]=*&populate[footerCertificationLogos][populate]=*&populate[legalLinks][populate]=*`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json?.data) setGlobalData(json.data);
        })
        .catch(() => {});
    }
  }, [initialGlobalData]);

  const logoSrc = getStrapiMedia(globalData?.footerLogo);
  const footerDesc = globalData?.footerDescription;
  const copyright = globalData?.copyrightText;
  const socialLinks = globalData?.socialLinks || [];
  const legalLinks = globalData?.legalLinks || [];
  const certLogos = globalData?.footerCertificationLogos || [];
  const footerColumns = globalData?.footerColumns || [];

  return (
    <footer className="unimrkt-resarch-footer-area">
      <video
        className="footer-banner-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/asstes/images/video-banner.mp4" type="video/mp4" />
      </video>
      <div className="footer-video-overlay" aria-hidden="true"></div>
      <div className="srcn-container">
        <div className="footer-wapper-area">
          <div className="footer-wapper-grid">
            <div className="footer-wapper-lift-col">
              {logoSrc && (
                <div className="footer-wapper-logo-area">
                  <Link href="/" className="footer-logo-box">
                    <img src={logoSrc} alt={globalData?.siteName || ''} />
                  </Link>
                </div>
              )}
              {footerDesc && <p className="footer-wapper-title-area">{footerDesc}</p>}
              {certLogos.length > 0 && (
                <div className="footer-certifications-row">
                  {certLogos.map((cert, idx) => {
                    const certSrc = getStrapiMedia(cert);
                    if (!certSrc) return null;
                    return (
                      <img
                        key={cert.id || idx}
                        className="footer-certification-logo"
                        src={certSrc}
                        alt={cert.alternativeText || 'Certification logo'}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dynamic Footer Columns from Strapi */}
            {footerColumns.map((col, idx) => (
              <div key={col.id || idx} className="footer-nav-col">
                {col.title && <h3>{col.title}</h3>}
                {col.links && col.links.length > 0 && (
                  <ul>
                    {col.links.map((link, lIdx) => (
                      <li key={link.id || lIdx} className="footer-time-area">
                        <Link href={link.url || '/'} className="footer-menu-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Dynamic Social Links from Strapi */}
            {socialLinks.length > 0 && (
              <div className="footer-nav-col">
                <h3>Connect with us</h3>
                <div className="footer-social-links">
                  {socialLinks.map((s, idx) => (
                    <a
                      key={s.id || idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-icon"
                      aria-label={s.platform || 'Social Link'}
                    >
                      <i
                        className={`fa-brands fa-${
                          s.platform === 'twitter'
                            ? 'x-twitter'
                            : s.platform === 'linkedin'
                            ? 'linkedin-in'
                            : s.platform === 'facebook'
                            ? 'facebook-f'
                            : s.platform || 'globe'
                        }`}
                      ></i>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom-outer">
        <div className="srcn-container">
          <div className="footer-bottom-bar">
            {copyright && (
              <p className="footer-wapper-title-area" style={{ marginBottom: 0 }}>
                {copyright}
              </p>
            )}
            {legalLinks.length > 0 && (
              <div className="footer-bottom-links">
                {legalLinks.map((l, i) => (
                  <Link key={l.id || i} href={l.url || '/privacy-policy'}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
