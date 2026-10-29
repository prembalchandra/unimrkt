'use client';

import React, { useState } from 'react';

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-form-section" id="cta">
      <div className="srcn-container">
        <div className="contact-form-layout">
          <div className="contact-form-heading">
            <span className="contact-form-kicker">GET IN TOUCH WITH US</span>
            <h2 className="section-main-heading">
              Let's Discuss Your<br />Research Needs
            </h2>
            <p className="section-sub-text">
              Our experts are ready to help you design and execute primary research that delivers answers to your critical business questions.
            </p>
          </div>

          <div className="contact-form-card-box">
            {submitted ? (
              <div style={{ padding: '30px', textAlign: 'center', background: '#fff', borderRadius: '12px' }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: '#10B981', marginBottom: '16px' }}></i>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#1B212D' }}>Thank You!</h3>
                <p style={{ color: '#4B5563' }}>Your inquiry has been received. Our research team will reach out to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label className="contact-form-field">
                  <span className="visually-hidden">Name</span>
                  <input type="text" name="Name" placeholder="Name*" autoComplete="name" required />
                </label>
                <label className="contact-form-field">
                  <span className="visually-hidden">Email ID</span>
                  <input type="email" name="Email" placeholder="Email ID*" autoComplete="email" required />
                </label>
                <div className="contact-form-phone">
                  <label className="contact-form-country">
                    <span className="visually-hidden">Country calling code</span>
                    <select name="Country code" aria-label="Country calling code" defaultValue="+91">
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+49">🇩🇪 +49</option>
                    </select>
                  </label>
                  <label className="contact-form-field">
                    <span className="visually-hidden">Phone number</span>
                    <input type="tel" name="Phone" placeholder="Phone number*" autoComplete="tel" required />
                  </label>
                </div>
                <label className="contact-form-field">
                  <span className="visually-hidden">Company / Requirements</span>
                  <input type="text" name="Company" placeholder="Company / Research Requirements*" required />
                </label>
                <label className="contact-form-consent">
                  <input type="checkbox" name="Consent" value="I agree to be contacted" required />
                  <span>I agree to be contacted regarding my research enquiry.</span>
                </label>
                <button className="contact-form-submit btn-sm" type="submit">
                  Submit <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right"></img>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
