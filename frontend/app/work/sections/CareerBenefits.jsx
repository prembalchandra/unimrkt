import React from 'react';

const benefits = [
  { icon: '/asstes/images/icon/stock-icon-img.png', title: 'Stock Appreciation Rights (SARs)' },
  { icon: '/asstes/images/icon/compensatory-icon-img.png', title: 'Compensatory-Off Reimbursement' },
  { icon: '/asstes/images/icon/compensatory-icon-img.png', title: 'Annual Bonus' },
  { icon: '/asstes/images/icon/internal-job-posting-iocn-img.png', title: 'Internal Job Posting' },
  { icon: '/asstes/images/icon/mediclaim-icon-img.png', title: 'Mediclaim' },
  { icon: '/asstes/images/icon/transport-icon-img.png', title: 'Transport Facility' },
  { icon: '/asstes/images/icon/leave-encashment-iocn-img.png', title: 'Leave Encashment' },
  { icon: '/asstes/images/icon/meal-facility-icon-img.png', title: 'Meal Facility' },
];

export default function CareerBenefits() {
  return (
    <section className="career-benefits-section" id="career-benefits">
      <div className="srcn-container">
        <div className="career-benefits-layout">
          <div className="career-benefits-image">
            <img src="/asstes/images/jab-about-img.webp" alt="Colleagues reviewing research and data together" loading="lazy" />
          </div>

          <div className="career-benefits-content">
            <span className="career-benefits-kicker career-values-kicker">Why Join Unimrkt</span>
            <h2 className="section-main-heading">More Than Just A Job</h2>
            <p className="career-benefits-intro section-sub-text">
              We believe in supporting your well-being, growth and future. That’s why we offer a range of benefits that help you thrive personally and professionally.
            </p>

            <h3 className="career-benefits-label">Benefits:</h3>
            <div className="career-benefits-list">
              {benefits.map((b, i) => (
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
