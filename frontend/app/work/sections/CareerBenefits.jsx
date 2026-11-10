import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getBenefitIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('stock') || t.includes('sar')) return getStrapiMedia('/uploads/stock-icon-img.png');
  if (t.includes('compensatory') || t.includes('bonus')) return getStrapiMedia('/uploads/compensatory-icon-img.png');
  if (t.includes('job') || t.includes('posting')) return getStrapiMedia('/uploads/internal-job-posting-iocn-img.png');
  if (t.includes('mediclaim') || t.includes('health') || t.includes('insur')) return getStrapiMedia('/uploads/mediclaim-icon-img.png');
  if (t.includes('transport') || t.includes('cab')) return getStrapiMedia('/uploads/transport-icon-img.png');
  if (t.includes('leave') || t.includes('encash')) return getStrapiMedia('/uploads/leave-encashment-iocn-img.png');
  if (t.includes('meal') || t.includes('food')) return getStrapiMedia('/uploads/meal-facility-icon-img.png');
  return getStrapiMedia('/uploads/stock-icon-img.png');
}

export default function CareerBenefits({ dynamicBenefits = null }) {
  const kicker = dynamicBenefits?.kicker;
  const heading = dynamicBenefits?.title || dynamicBenefits?.heading;
  const description = dynamicBenefits?.subtitle || dynamicBenefits?.description;
  const bannerImage = dynamicBenefits?.image ? getStrapiMedia(dynamicBenefits.image) : getStrapiMedia('/uploads/jab-about-img.png');

  const benefitsList = (dynamicBenefits?.values || []).map((b) => ({
    icon: b.icon ? getStrapiMedia(b.icon) : getBenefitIcon(b.title),
    title: b.title || '',
  }));

  if (benefitsList.length === 0 && !heading) return null;

  return (
    <section className="career-benefits-section" id="career-benefits">
      <div className="srcn-container">
        <div className="career-benefits-layout">
          {bannerImage && (
            <div className="career-benefits-image">
              <img src={bannerImage} alt={heading || 'Unimrkt Benefits'} loading="lazy" />
            </div>
          )}

          <div className="career-benefits-content">
            {kicker && (
              <span className="career-benefits-kicker career-values-kicker">
                {kicker}
              </span>
            )}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
            {description && (
              <p className="career-benefits-intro section-sub-text">
                {description}
              </p>
            )}

            {benefitsList.length > 0 && (
              <div className="career-benefits-list">
                {benefitsList.map((b, i) => (
                  <div key={i} className="career-benefit-item">
                    {b.icon && (
                      <span className="career-benefit-icon">
                        <img src={b.icon} alt={b.title} />
                      </span>
                    )}
                    {b.title && <span>{b.title}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
