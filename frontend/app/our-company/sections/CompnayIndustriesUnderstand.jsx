
import React from "react";
import Link from "next/link";


const services = [
  {
    title: "Automotive",
    description: "Driving mobility insights and automotive market growth.",
    image: "/asstes/images/automotive-card-img.png",
    alt: "Automotive industry",
    href: "/services",
  },
  {
    title: "Healthcare",
    description: "Healthcare research insights for better patient experiences and informed decisions.",
    image: "/asstes/images/healthcare-card-img.png",
    alt: "Healthcare industry",
    href: "/services",
  },
  {
    title: "Consumer",
    description: "Understanding consumer preferences, purchasing habits, and changing market trends.",
    image: "/asstes/images/consumer-card-img.png",
    alt: "Consumer industry",
    href: "/services",
  },
  {
    title: "Technology",
    description: "Exploring technology trends, digital innovation, and emerging market opportunities.",
    image: "/asstes/images/technology-card-img.png",
    alt: "Technology industry",
    href: "/services",
  },
  {
    title: "Financial Services",
    description: "Actionable financial insights that support smarter business and investment decisions.",
    image: "/asstes/images/financial-services-card-img.png",
    alt: "Financial services industry",
    href: "/services",
  },
  {
    title: "B2B & Industrial",
    description: "Industry intelligence that strengthens B2B relationships and business growth.",
    image: "/asstes/images/b2b-industrial-card-img.png",
    alt: "B2B and industrial industry",
    href: "/services",
  },
  {
    title: "Retail & E-commerce",
    description: "Retail research uncovering shopper behavior and e-commerce opportunities.",
    image: "/asstes/images/retail-ecommerce-card-img.png",
    alt: "Retail and e-commerce industry",
    href: "/services",
  },
  {
    title: "Media & Entertainment",
    description: "Audience insights that reveal content preferences and evolving entertainment trends.",
    image: "/asstes/images/media-entertainment-card-img.png",
    alt: "Media and entertainment industry",
    href: "/services",
  },
];

export default function CompnayIndustriesUnderstand() {
  return (
    <section className="primary-services-section">
      <div className="srcn-container">
        <div className="primary-services-header">
          <span className="primary-services-kicker">
            INDUSTRIES WE UNDERSTAND
          </span>

          <h2 className="primary-services-title">
            Deep Knowledge Across Diverse Industries
          </h2>

          <p className="primary-services-desc">
            Industry-specific expertise that helps us understand complex
            markets and deliver insights that drive informed business decisions.
          </p>
        </div>

        <div className="primary-services-grid">
          {services.map((service) => (
            <Link
              href={service.href}
              className="primary-service-card"
              key={service.title}
              aria-label={`${service.title}: ${service.description}`}
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
