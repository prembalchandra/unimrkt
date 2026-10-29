'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BlogDetailContent({ dynamicHero = null }) {
  const [shareStatus, setShareStatus] = useState('');
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const title = dynamicHero?.title || 'Key Trends Shaping the Future of the Automotive Industry';
  const kicker = dynamicHero?.kicker || 'Market Research';
  const deck =
    dynamicHero?.description ||
    'From electrification and software-defined vehicles to new mobility expectations, the automotive landscape is changing at unprecedented speed.';

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    if (!navigator.clipboard?.writeText) {
      setShareStatus('Copy this page address from your browser to share the article.');
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('Article link copied.');
      setTimeout(() => setShareStatus(''), 4000);
    } catch {
      setShareStatus(
        'Could not copy automatically. Copy this page address from your browser to share the article.'
      );
      setTimeout(() => setShareStatus(''), 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Send email using mailto link
    const subject = encodeURIComponent(`Quick Enquiry from ${enquiryForm.name}`);
    const body = encodeURIComponent(
      `Name: ${enquiryForm.name}\nPhone: ${enquiryForm.phone}\nEmail: ${enquiryForm.email}\n\nMessage:\n${enquiryForm.message}`
    );
    window.location.href = `mailto:sales@unimrkt.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="blog-detail-section">
      <div className="srcn-container">
        <div className="blog-detail-layout">
          <article className="blog-detail-article">
            <header className="blog-detail-header">
              <span className="blog-detail-category">
                {kicker} <span aria-hidden="true">•</span> Automotive
              </span>
              <h1>{title}</h1>
              <p className="blog-detail-deck">
                {deck}
              </p>
              <div className="blog-detail-meta">
                <span>
                  <i className="fa-regular fa-calendar" aria-hidden="true"></i> 8 min read
                </span>
                <span>
                  <i className="fa-regular fa-clock" aria-hidden="true"></i> Industry insights
                </span>
                <button
                  type="button"
                  className="blog-share-button"
                  id="blogShareButton"
                  onClick={handleShare}
                >
                  <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> Share
                </button>
              </div>
              {shareStatus && (
                <p className="blog-share-status" id="blogShareStatus" aria-live="polite" style={{ display: 'block', color: 'var(--brand-primary, #d32f2f)', marginTop: '8px', fontSize: '0.9rem' }}>
                  {shareStatus}
                </p>
              )}
            </header>

            <figure className="blog-detail-hero-image">
              <img
                src="/asstes/images/market-trends-card-img1.png"
                alt="Market research professionals reviewing industry data and trends"
              />
              <figcaption>
                Understanding the forces reshaping customer expectations and the automotive market.
              </figcaption>
            </figure>

            <div className="blog-detail-body">
              <p className="blog-detail-lead">
                The automotive industry is at a turning point. Electrification, connected technologies, changing ownership models and higher expectations for sustainability are transforming how vehicles are designed, built and experienced. For businesses across the value chain, understanding these shifts is essential to making confident decisions.
              </p>
              <p>
                Here are some of the major forces shaping the next chapter of mobility—and the questions organizations should be asking as they plan for it.
              </p>

              <section id="electrification">
                <h2>1. Electrification moves from ambition to adoption</h2>
                <p>
                  Electric vehicles (EVs) are moving beyond early adopters as manufacturers broaden their portfolios and battery technology improves. At the same time, customers continue to weigh purchase price, driving range, charging access and resale value when considering an EV.
                </p>
                <p>
                  The transition is not uniform across regions or customer groups. Local incentives, energy costs, charging infrastructure and vehicle use cases all influence adoption. Automakers and suppliers need a clear view of these differences before making investment and launch decisions.
                </p>
                <ul>
                  <li>Understand the practical barriers that prevent interested buyers from switching.</li>
                  <li>Track how charging convenience and total cost of ownership affect preference.</li>
                  <li>Compare adoption intent across markets, segments and vehicle categories.</li>
                </ul>
              </section>

              <section id="software">
                <h2>2. Software-defined vehicles create new value</h2>
                <p>
                  Vehicles are increasingly designed around connected software platforms that can support feature updates, personalization and new services throughout the vehicle lifecycle. This shift changes the competitive landscape: value is no longer defined only by hardware and performance, but also by the quality of the digital experience.
                </p>
                <p>
                  Customers expect intuitive interfaces and dependable connectivity. They also want control over how features work and how their information is used. Listening to users early and continuously helps manufacturers prioritize useful features rather than simply adding technology for its own sake.
                </p>
              </section>

              <section id="connectivity">
                <h2>3. Connected experiences raise customer expectations</h2>
                <p>
                  Drivers increasingly expect their vehicle to work seamlessly with their phones, home devices and digital services. Navigation, remote access, in-car entertainment and personalized settings are becoming part of the overall ownership experience.
                </p>
                <p>
                  Yet convenience must be balanced with trust. Clear data practices, reliable performance and a consistent experience across devices matter as much as the feature list. Research can reveal which connected services customers value, which they will pay for, and where friction leads to disengagement.
                </p>
              </section>

              <section id="assistance">
                <h2>4. Advanced driver assistance evolves carefully</h2>
                <p>
                  Driver-assistance technologies are expanding, offering support with tasks such as parking, lane keeping and collision avoidance. Adoption depends not only on technical capability but also on how confidently people understand and use these systems.
                </p>
                <p>
                  Clear communication is important: drivers need to know what a system can do, where its limits are, and when they must remain in control. Human-centered testing and transparent education help build appropriate trust and safer usage.
                </p>
              </section>

              <section id="sustainability">
                <h2>5. Sustainability extends beyond the tailpipe</h2>
                <p>
                  As electrification grows, attention is widening to the full lifecycle impact of a vehicle. Battery materials, manufacturing energy, supply-chain transparency, repairability and end-of-life recycling all contribute to how sustainable a product is perceived to be.
                </p>
                <p>
                  Customers and business buyers may interpret sustainability differently. Credible evidence and clear explanations help companies distinguish meaningful progress from claims that are difficult to verify.
                </p>
              </section>

              <section id="mobility">
                <h2>6. Mobility models and ownership preferences diversify</h2>
                <p>
                  Ownership remains important, but leasing, subscriptions, shared mobility and flexible access can appeal to customers seeking alternatives. The right model varies by location, income, life stage and travel needs.
                </p>
                <p>
                  For manufacturers and mobility providers, understanding the full journey—from discovering an option to using it day to day—can uncover where new services solve real problems and where conventional ownership still offers the best fit.
                </p>
              </section>

              <section id="research">
                <h2>Why market research matters for automotive innovation</h2>
                <p>
                  Rapid change makes assumptions risky. Combining quantitative measurement with qualitative exploration helps teams understand both the scale of a trend and the reasons behind it. Research can assess unmet needs, compare concepts, test messaging and track experience after launch.
                </p>
                <p>
                  Strong insight programs are continuous and market-specific. They bring together customer voices, competitive context and operational evidence so decision-makers can prioritize investments with greater confidence.
                </p>
              </section>

              <aside className="blog-detail-callout">
                <h2>Turn changing mobility needs into clearer decisions</h2>
                <p>
                  Unimrkt Research helps teams explore customer expectations and market opportunities across industries and geographies.
                </p>
                <Link href="/contact" className="blog-detail-cta">
                  Talk to our research team <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </aside>

              <div className="blog-detail-tags">
                <span>Topics:</span>
                <Link href="/blog">Automotive</Link>
                <Link href="/blog">Market Research</Link>
                <Link href="/blog">Consumer Insights</Link>
              </div>
            </div>
          </article>

          <aside className="blog-detail-sidebar" aria-label="Quick enquiry and recent posts">
            <section className="blog-sidebar-card blog-enquiry-card">
              <h2>Quick Enquiry</h2>
              <p className="blog-enquiry-subtitle">Customer Service, We Make It Better</p>
              <form onSubmit={handleSubmit} className="blog-enquiry-form">
                <label>
                  <span className="visually-hidden">Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    autoComplete="name"
                    required
                    value={enquiryForm.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span className="visually-hidden">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone*"
                    autoComplete="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span className="visually-hidden">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    autoComplete="email"
                    required
                    value={enquiryForm.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span className="visually-hidden">Message</span>
                  <textarea
                    name="message"
                    placeholder="Message*"
                    rows="4"
                    required
                    value={enquiryForm.message}
                    onChange={handleInputChange}
                  ></textarea>
                </label>
                <button type="submit">
                  {formSubmitted ? 'Enquiry Sent!' : 'Submit'}{' '}
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                </button>
              </form>
            </section>

            <section className="blog-sidebar-card blog-recent-posts">
              <h2>Recent Posts</h2>
              <ol>
                <li>
                  <Link href="/blog">
                    <span className="blog-post-number">01</span>
                    <span>
                      How to Clarify and Align Your Research Goals for Maximum Impact
                      <small>6 min · 3.8K views</small>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <span className="blog-post-number">02</span>
                    <span>
                      Mining Valuable Data: The Driving Force for an Effective Growth Marketing Strategy
                      <small>6 min · 3.8K views</small>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <span className="blog-post-number">03</span>
                    <span>
                      Speaking the Customers Language: Tips for Meaningful Qualitative Research
                      <small>6 min · 3.8K views</small>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <span className="blog-post-number">04</span>
                    <span>
                      Creating Value for Investors: The Benefits of Primary Market Research
                      <small>6 min · 3.8K views</small>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <span className="blog-post-number">05</span>
                    <span>
                      Utilizing Closed-Ended Questions for Quantitative Market Research
                      <small>6 min · 3.8K views</small>
                    </span>
                  </Link>
                </li>
              </ol>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
