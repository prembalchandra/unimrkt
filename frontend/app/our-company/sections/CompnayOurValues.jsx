'use client';

import React from 'react';

const metrics = [
  {
    icon: '/asstes/images/icon/clear-communication-icon-img.png',
    title: 'Clear Communication',
    desc: 'We communicate openly, clearly, and consistently to build trust and ensure shared understanding.',
  },
  {
    icon: '/asstes/images/icon/innovation-icon-img.png',
    title: 'Innovation',
    desc: 'We embrace new ideas, technologies, and approaches to deliver smarter, more effective research solutions.',
  },
  {
    icon: '/asstes/images/icon/team-work-icon-img2.png',
    title: 'Team Work',
    desc: 'We collaborate closely, combining diverse expertise to deliver stronger insights and better outcomes.',
  },
  {
    icon: '/asstes/images/icon/integrity-icon-img.png',
    title: 'Integrity',
    desc: 'We uphold honesty, transparency, and ethical practices across every project, partnership, and decision.',
  },
  {
    icon: '/asstes/images/icon/business-ethics-icon-img.png',
    title: 'Business Ethics',
    desc: 'We conduct business responsibly, ethically, and transparently, building lasting trust with every stakeholder.',
  },
  {
    icon: '/asstes/images/icon/transparency-icon-img2.png',
    title: 'Transparency',
    desc: 'We communicate openly, share information clearly, and build trust through every interaction.',
  },
  {
    icon: '/asstes/images/icon/wisdom-icon-img.png',
    title: 'Wisdom',
    desc: 'We apply knowledge, experience, and thoughtful judgment to create smarter business outcomes.',
  },
  {
    icon: '/asstes/images/icon/diversity-icon-img2.png',
    title: 'Diversity',
    desc: 'We value diverse perspectives, experiences, and ideas to create stronger, more inclusive outcomes.',
  },
];

export default function UnimrktResearchArea() {
  return (
    <section className="our-unimrkt-research-area">
      <div
        className="our-unimrkt-research-banner"
        aria-hidden="true"
      />

      <div className="srcn-container">
        <div className="our-unimrkt-research-wrapper-inner">
          <div className="our-unimrkt-research-top-content primary-services-header">
            <span className="our-unimrkt-research-sub-title">OUR VALUES</span>
            <h2 className="our-unimrkt-research-main-heading section-main-heading">
              The Principles Behind Our Work
            </h2>
            <p className="our-unimrkt-research-title">
              We believe that our values not only make us a reliable business
              partner and consumer research agency, but also a thoughtful one,
              with our focus on
            </p>
          </div>
          <div className="our-values-grid">
            {metrics.map((item, index) => (
              <div
                className="our-unimrkt-research-card-col"
                key={`${item.title}-${index}`}
              >
                <div className="our-unimrkt-research-card">
                  <div className="our-unimrkt-research-icon-box">
                    <img
                      src={item.icon}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="our-unimrkt-research-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}