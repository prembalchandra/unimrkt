import React from 'react';

export default function TrustedClients() {
  return (
    <section className="trusted-clients-section">
      <div className="srcn-container">
        <div className="trusted-clients-inner">
          <span className="trusted-clients-title">Trusted by Global Enterprises</span>
          <div className="trusted-clients-row">
            <div className="trusted-client-item">
              <img src="/asstes/logo/suzki-logo-img.png" alt="Maruti Suzuki" />
            </div>
            <div className="trusted-client-item">
              <img src="/asstes/logo/cocacola-logo-img.png" alt="Coca-Cola" />
            </div>
            <div className="trusted-client-item">
              <img src="/asstes/logo/hdfc-bank-logo-img.png" alt="HDFC Bank" />
            </div>
            <div className="trusted-client-item">
              <img src="/asstes/logo/amazom-logo-img.png" alt="Amazon" />
            </div>
            <div className="trusted-client-item">
              <img src="/asstes/logo/airtel-logo-img.png" alt="Airtel" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
