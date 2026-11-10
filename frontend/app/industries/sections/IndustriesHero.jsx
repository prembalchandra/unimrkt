
import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../../../lib/strapi';

export default function IndustriesHero({ dynamicHero = null }) {
  if (!dynamicHero) return null;

  const kicker = dynamicHero.kicker;
  const title = dynamicHero.title || dynamicHero.heading;
  const description = dynamicHero.description;
  const bannerImage = getStrapiMedia(dynamicHero.bannerImage);
  const primaryBtnLabel = dynamicHero.primaryButton?.label;
  const primaryBtnUrl = dynamicHero.primaryButton?.url;
  const arrowIcon = getStrapiMedia(dynamicHero.arrowIcon);
  const breadcrumbHome =
    dynamicHero.breadcrumbHome || 'Home';
  const breadcrumbCurrent =
    dynamicHero.breadcrumbCurrent;
  return (
    <>
      <section className="hero-common-area">

        {bannerImage && (
          <div className="hero-common-banner">
            <img
              src={bannerImage}
              className="hero-common-banner-area"
              alt={
                dynamicHero.bannerImage?.alternativeText ||
                title ||
                ''
              }
            />
          </div>
        )}

        <div className="srcn-container">
          <div className="hero-common-row">
            <div className="hero-common-content">
              <div className="hero-common-content-area">
                {kicker && (
                  <span className="hero-common-sub-title-area">
                    {dynamicHero.showKickerIcon !== false && (
                      <i
                        className="fa-solid fa-bolt"
                        aria-hidden="true"
                      />
                    )}
                    {kicker}
                  </span>
                )}
                {title && (
                  <h1 className="hero-commmon-heading-area">
                    {title}
                  </h1>
                )}

                {description && (
                  <p className="hero-common-title">
                    {description}
                  </p>
                )}

              </div>

              {primaryBtnLabel && primaryBtnUrl && (
                <div className="hero-btn-area">
                  <Link
                    href={primaryBtnUrl}
                    className="hero-common-btn-area btn-sm"
                  >
                    <span>{primaryBtnLabel}</span>

                    {arrowIcon && (
                      <img
                        src={arrowIcon}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
      {dynamicHero.showBreadcrumb !== false && (
        <div className="team-breadcrumb">
          <div className="srcn-container">
            <nav aria-label="Breadcrumb">
              {dynamicHero.homeUrl && (
                <Link href={dynamicHero.homeUrl}>
                  {breadcrumbHome}
                </Link>
              )}
              {dynamicHero.homeUrl && breadcrumbCurrent && (
                <span aria-hidden="true">›</span>
              )}
              {breadcrumbCurrent && (
                <span aria-current="page">
                  {breadcrumbCurrent}
                </span>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
