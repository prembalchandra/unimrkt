import React from "react";
import Link from "next/link";

const services = [
  {
    title: "Telephonic Surveys",
    description:
      "Efficient phone-based surveys capturing valuable respondent insights.",
    image: "/asstes/images/telephonic-surveys-card-img.png",
    alt: "Telephonic Surveys",
    href: "/telephonic-surveys",
  },
  {
    title: "Online Surveys",
    description:
      "Scalable digital questionnaires connecting you with verified global respondents.",
    image: "/asstes/images/online-surveys-card-img.png",
    alt: "Online Surveys",
    href: "/services",
  },
  {
    title: "In-Depth Interviews",
    description:
      "One-on-one expert conversations uncovering profound qualitative market perspectives.",
    image: "/asstes/images/interview-controls-card-img.png",
    alt: "In-Depth Interviews",
    href: "/services",
  },
  {
    title: "CATI Surveys",
    description:
      "Structured computer-assisted interviewing ensuring speed, compliance, and accuracy.",
    image: "/asstes/images/smart-survey-management-card-img.png",
    alt: "CATI Surveys",
    href: "/telephonic-surveys",
  },
];

export default function PrimaryServices() {
  return (
    <section className="primary-services-section">
      <div className="srcn-container">
        <div className="primary-services-header">
          <span className="primary-services-kicker">
            WHAT WE DO
          </span>
          <h2 className="primary-services-title">
            Our Primary Research Services
          </h2>
          <p className="primary-services-desc">
            Delivering actionable data through custom research
            methodologies designed to help you understand your market,
            your competitors, and your customers.
          </p>
        </div>
        <div className="primary-services-grid">
          {services.map((service) => (
            <Link
              href={service.href}
              className="primary-service-card"
              key={service.title}
            >
              <img
                src={service.image}
                alt={service.alt}
                className="primary-service-card-img"
                loading="lazy"
              />

              <div
                className="primary-service-card-overlay"
                aria-hidden="true"
              />

              <div className="primary-service-card-body">
                <h3 className="primary-service-card-title">
                  {service.title}
                </h3>

                <p className="primary-service-card-desc">
                  {service.description}
                </p>

                <div className="primary-service-card-btn-wrap btn-sm">
                  <span
                    className="primary-service-card-btn"
                    aria-hidden="true"
                  >
                    <img src="/asstes/images/icon/arrow-right-icon-img.png" alt="Arrow Right"/>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}