import React from 'react';

function getBenefitIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('stock') || t.includes('sar')) return '/asstes/images/icon/stock-icon-img.png';
  if (t.includes('compensatory') || t.includes('bonus')) return '/asstes/images/icon/compensatory-icon-img.png';
  if (t.includes('job') || t.includes('posting')) return '/asstes/images/icon/internal-job-posting-iocn-img.png';
  if (t.includes('mediclaim') || t.includes('health') || t.includes('insur')) return '/asstes/images/icon/mediclaim-icon-img.png';
  if (t.includes('transport') || t.includes('cab')) return '/asstes/images/icon/transport-icon-img.png';
  if (t.includes('leave') || t.includes('encash')) return '/asstes/images/icon/leave-encashment-iocn-img.png';
  if (t.includes('meal') || t.includes('food')) return '/asstes/images/icon/meal-facility-icon-img.png';
  return '/asstes/images/icon/stock-icon-img.png';
}

export default function CareerBenefits({ dynamicBenefits = null }) {
  const benefitsList = (dynamicBenefits?.values || []).map((b) => ({
    icon: getBenefitIcon(b.title),
    title: b.title || '',
  }));

  if (benefitsList.length === 0) return null;

  return (
    <section className="career-benefits-section" id="career-benefits">
      <div className="srcn-container">
        <div className="career-benefits-layout">
          <div className="career-benefits-image">
            <img src="/asstes/images/jab-about-img.png" alt="Colleagues reviewing research and data together" loading="lazy" />
          </div>

          <div className="career-benefits-content">
            <span className="career-benefits-kicker career-values-kicker">
              {dynamicBenefits?.kicker || 'Why Join Unimrkt'}
            </span>
            <h2 className="section-main-heading">
              {dynamicBenefits?.title || 'More Than Just A Job'}
            </h2>
            <p className="career-benefits-intro section-sub-text">
              {dynamicBenefits?.subtitle ||
                'We believe in supporting your well-being, growth and future. That’s why we offer a range of benefits that help you thrive personally and professionally.'}
            </p>

            <h3 className="career-benefits-label">Benefits:</h3>
            <div className="career-benefits-list">
              {benefitsList.map((b, i) => (
                <div key={i} className="career-benefit-item">
                  <span className="career-benefit-icon">
                    <img src={b.icon} alt={b.title} />
                  </span>
                  <span>{b.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
