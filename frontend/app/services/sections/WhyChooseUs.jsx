
import React from "react";
import Image from "next/image";

const whyChooseItems = [
  {
    icon: "/asstes/images/icon/cup-research excellence-icon-img.png",
    stat: "16+ Years",
    label: "of Research Excellence",
  },
  {
    icon: "/asstes/images/icon/global-icon-img.png",
    stat: "90+ Countries",
    label: "Covered",
  },
  {
    icon: "/asstes/images/icon/language-square.png",
    stat: "22+ Languages",
    label: "Supported",
  },
  {
    icon: "/asstes/images/icon/profile-2user.png",
    stat: "Experienced",
    label: "Research Professionals",
  },
  {
    icon: "/asstes/images/icon/3d-cube-scan.png",
    stat: "Customized",
    label: "Research Solutions",
  },
  {
    icon: "/asstes/images/icon/trust-shield-tick-icon-img.png",
    stat: "Accurate",
    label: "& Actionable Insights",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-unimrkt-section">
      <div className="srcn-container">
        <div className="why-choose-header">
          <h2 className="why-choose-title">
            Why Choose Unimrkt?
          </h2>

          <p className="why-choose-desc">
            With 16+ years of expertise, global research capabilities,
            advanced methodologies, and trusted data quality, Unimrkt
            delivers accurate insights that empower smarter business
            decisions and sustainable growth.
          </p>
        </div>

        <div className="why-choose-grid">
          {whyChooseItems.map((item) => (
            <div className="why-choose-card" key={item.stat}>
              <div className="why-choose-icon-box">
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="why-choose-icon"
                />
              </div>

              <div className="why-choose-stat">
                {item.stat}
              </div>

              <div className="why-choose-label">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
