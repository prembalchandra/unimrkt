
'use client';

import React from 'react';


const metrics = [
  {
    icon: '/asstes/images/icon/team-members-icon-img.png',
    title: '450+',
    desc: 'CATI analytics team members',
  },
  {
    icon: '/asstes/images/icon/on-time-icon-img.png',
    title: 'On-time',
    desc: 'Project deliveries',
  },
  {
    icon: '/asstes/images/icon/repeat-business-icon-img.png',
    title: '80%',
    desc: 'Repeat business',
  },
  {
    icon: '/asstes/images/icon/surveys-complet-year-icon-img.png',
    title: '250,000+ CATI',
    desc: 'Surveys completed every year',
  },
  {
    icon: '/asstes/images/icon/State-of-the-art-icon-img.png',
    title: 'State-of-the-art',
    desc: 'CATI systems integrated with predictive dialers',
  },
  {
    icon: '/asstes/images/icon/average-cost-savings-icon-img.png',
    title: '35-40%',
    desc: 'Average cost savings',
  },
  {
    icon: '/asstes/images/icon/moderators-icon-img.png',
    title: '300+',
    desc: 'Moderators with rich professional backgrounds',
  },
  {
    icon: '/asstes/images/icon/certified-icon-img.png',
    title: 'ISO20252',
    desc: 'A ESOMAR certified firm',
  },
  {
    icon: '/asstes/images/icon/projects-of-combined-icon-img.png',
    title: '1000+',
    desc: 'Projects of combined experience with 100% QA',
  },
  {
    icon: '/asstes/images/icon/scalability-icon-img.png',
    title: '30,000 sq. ft.',
    desc: 'The usability of more than 460 seats',
  },
  {
    icon: '/asstes/images/icon/support-icon-img.png',
    title: '24*7',
    desc: 'Support with access to dedicated analysts',
  },
  {
    icon: '/asstes/images/icon/norms-followed-icon-img.png',
    title: 'ESOMAR',
    desc: 'Norms followed',
  },
  {
    icon: '/asstes/images/icon/countries-icon-img2.png',
    title: '90 countries',
    desc: 'Across 22+ foreign languages for multi-industry research',
  },
  {
    icon: '/asstes/images/icon/compliant-icon-img.png',
    title: 'GDPR',
    desc: 'Compliant',
  },
  {
    icon: '/asstes/images/icon/years-of-experience-icon-img.png',
    title: '16+',
    desc: 'Years of experience',
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
            <h2 className="our-unimrkt-research-main-heading section-main-heading">
              Why Unimrkt Research?
            </h2>
            <p className="our-unimrkt-research-title">
              Delivering accurate first-hand data through expert
              research methodologies, seasoned professionals,
              and rigorous quality control processes, helping
              businesses make informed decisions and achieve
              sustainable growth.
            </p>
          </div>

          {/* Research metrics */}
          <div className="our-unimrkt-research-grid">
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
