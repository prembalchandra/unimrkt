'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutSubmenuOpen, setIsAboutSubmenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAboutSubmenuOpen(false);
    setIsSubmenuOpen(false);
  }, [pathname]);

  // Handle Escape key and window resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsAboutSubmenuOpen(false);
        setIsSubmenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1111) {
        setIsMobileMenuOpen(false);
        setIsAboutSubmenuOpen(false);
        setIsSubmenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const toggleAboutSubmenu = (e) => {
    if (window.innerWidth <= 1110) {
      e.preventDefault();
      setIsAboutSubmenuOpen((prev) => !prev);
    }
  };

  const toggleSubmenu = (e) => {
    if (window.innerWidth <= 1110) {
      e.preventDefault();
      setIsSubmenuOpen((prev) => !prev);
    }
  };

  return (
    <header className={`unimrkt-resarch-header-area ${isSticky ? 'header-sticky' : ''}`}>
      <div className="srcn-container">
        <div className="header-wapper-area">
          <div className={`header-row-area ${isMobileMenuOpen ? 'menu-open' : ''}`}>
            {/* Brand Logo */}
            <div className="header-col-lift-area">
              <div className="header-logo-area">
                <Link href="/" className="logo">
                  <img src="/asstes/images/unimrkt-resarch-logo.webp" alt="Unimrkt Research" />
                </Link>
              </div>
            </div>

            {/* Center Navigation Menu (Desktop & Mobile) */}
            <div className="header-col-conter-area">
              <div className="header-drawer-logo-area">
                <Link href="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/asstes/images/unimrkt-resarch-logo.webp" alt="Unimrkt Research" />
                </Link>
              </div>
              <div className="header-menu-area">
                <nav className="header-menu-navber">
                  <ul className="header-listing-area">
                    {/* ABOUT UNIMRKT Dropdown (Matches User Screenshot) */}
                    <li
                      className={`header-itme-area header-itme-submenu-toggle header-about-dropdown-toggle ${
                        isAboutSubmenuOpen ? 'submenu-open' : ''
                      }`}
                    >
                      <Link
                        href="/about"
                        className="header-link-area"
                        aria-expanded={isAboutSubmenuOpen}
                        onClick={toggleAboutSubmenu}
                      >
                        ABOUT UNIMRKT{' '}
                        <i
                          className="fa-solid fa-angle-down header-chevron-icon"
                          style={{ fontSize: '0.75rem', marginLeft: '4px' }}
                        ></i>
                      </Link>
                      <div className="about-sub-menu-wrapper">
                        <ul className="about-dropdown-list">
                          <li className="about-dropdown-item">
                            <Link
                              href="/about"
                              className="about-dropdown-link"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="about-dropdown-title">Our Company</span>
                              <span className="about-dropdown-desc">The story behind us</span>
                            </Link>
                          </li>
                          <li className="about-dropdown-item">
                            <Link
                              href="/services#why-choose-us"
                              className="about-dropdown-link"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="about-dropdown-title">Why Choose Us?</span>
                              <span className="about-dropdown-desc">The unimrkt advantage</span>
                            </Link>
                          </li>
                          <li className="about-dropdown-item">
                            <Link
                              href="/case-study-details"
                              className="about-dropdown-link"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="about-dropdown-title">Our Approach</span>
                              <span className="about-dropdown-desc">How we make a difference</span>
                            </Link>
                          </li>
                          <li className="about-dropdown-item">
                            <Link
                              href="/team"
                              className="about-dropdown-link"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="about-dropdown-title">Team Unimrkt</span>
                              <span className="about-dropdown-desc">The people behind progress</span>
                            </Link>
                          </li>
                          <li className="about-dropdown-item">
                            <Link
                              href="/services"
                              className="about-dropdown-link"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="about-dropdown-title">Global Panel</span>
                              <span className="about-dropdown-desc">Insights without borders</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>

                    {/* Services Dropdown */}
                    <li className={`header-itme-area header-itme-submenu-toggle ${isSubmenuOpen ? 'submenu-open' : ''}`}>
                      <a
                        href="/services"
                        className="header-link-area"
                        aria-expanded={isSubmenuOpen}
                        onClick={toggleSubmenu}
                      >
                        Services <i className="fa-solid fa-angle-down" style={{ fontSize: '0.75rem' }}></i>
                      </a>
                      <div className="header-sub-menu-area-wrapper">
                        <ul>
                          <li className="header-submenu-time-area">
                            <Link href="/primary-research" className="header-sub-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              Primary Research
                            </Link>
                          </li>
                          <li className="header-submenu-time-area">
                            <Link href="/services" className="header-sub-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              Secondary Research
                            </Link>
                          </li>
                          <li className="header-submenu-time-area">
                            <Link href="/telephonic-surveys" className="header-sub-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              CATI / Telephonic Surveys
                            </Link>
                          </li>
                          <li className="header-submenu-time-area">
                            <Link href="/services" className="header-sub-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              Online Survey &amp; Panels
                            </Link>
                          </li>
                          <li className="header-submenu-time-area">
                            <Link href="/services" className="header-sub-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              B2B Market Research
                            </Link>
                          </li>
                          <li className="header-submenu-time-area">
                            <Link href="/services" className="header-sub-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              Healthcare Research
                            </Link>
                          </li>
                          <li className="header-submenu-time-area">
                            <Link href="/services" className="header-sub-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                              Data Analytics &amp; Tech
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="header-itme-area">
                      <Link href="/industries" className="header-link-area" onClick={() => setIsMobileMenuOpen(false)}>
                        Industries
                      </Link>
                    </li>
                    <li className="header-itme-area">
                      <Link href="/blog" className="header-link-area" onClick={() => setIsMobileMenuOpen(false)}>
                        Blogs
                      </Link>
                    </li>
                    <li className="header-itme-area">
                      <Link href="/gallery" className="header-link-area" onClick={() => setIsMobileMenuOpen(false)}>
                        Gallery
                      </Link>
                    </li>
                    <li className="header-itme-area">
                      <Link href="/contact" className="header-link-area" onClick={() => setIsMobileMenuOpen(false)}>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Right Header Action Area */}
            <div className="header-right-action-area">
              <div className="header-btn-area">
                <Link href="/contact" className="btn-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Talk to Experts</span>
                  <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right" />
                </Link>
              </div>
              <div className="header-toggle-navigation-area">
                <button
                  className={`toggle-navigation hamburgerBtn ${isMobileMenuOpen ? 'active' : ''}`}
                  aria-label="Toggle navigation"
                  aria-controls="header-mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
