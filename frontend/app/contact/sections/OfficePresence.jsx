'use client';

import React, { useEffect, useRef, useState } from 'react';

const offices = [
  {
    id: 'india',
    name: 'India Office',
    city: 'Gurugram, India',
    flag: '🇮🇳',
    coordinates: [28.4946, 77.088],
    address: '5th floor, Nirmal Tower, 412-415, Udyog Vihar, Phase IV, Gurugram, Haryana-122015',
    email: 'sales@unimrkt.com',
    phones: 'Sales & Business Queries: +91 124 424 5210, +91 9870 377 557',
    banner: '/asstes/images/contact-map-banner-img.png',
  },
  {
    id: 'usa',
    name: 'United States of America',
    city: 'Great Neck, USA',
    flag: '🇺🇸',
    coordinates: [40.8007, -73.7285],
    address: '98 Cuthbert Road Suite 466, Great Neck, NY 11021, USA',
    email: 'sales@unimrkt.com',
    phones: '+1 646 712 9302',
    banner: '/asstes/images/contact-banner-usa.jpg',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    city: 'Oxford, UK',
    flag: '🇬🇧',
    coordinates: [51.7632, -1.2065],
    address: 'The Old Dairy, 12 Stephen Rd, Headington, Oxford, Oxfordshire, United Kingdom OX3 9AY',
    email: 'sales@unimrkt.com',
    phones: '+1 646 712 9302',
    banner: '/asstes/images/contact-banner-uk.jpg',
  },
];

export default function OfficePresence() {
  const [activeOffice, setActiveOffice] = useState('india');
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, { scrollWheelZoom: false });
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const bounds = [];

      offices.forEach((office) => {
        const markerIcon = L.divIcon({
          className: '',
          html: `<span class="office-map-marker"><span>${office.flag}</span></span>`,
          iconSize: [42, 42],
          iconAnchor: [21, 42],
        });

        const marker = L.marker(office.coordinates, { icon: markerIcon }).addTo(map);
        marker.bindTooltip(
          `<span class="office-map-tooltip-country">${office.flag}</span>${office.name}<span class="office-map-tooltip-city">${office.city}</span>`,
          { className: 'office-map-tooltip', direction: 'top', offset: [0, -30], opacity: 1 }
        );

        marker.on('click', () => {
          setActiveOffice(office.id);
        });

        markersRef.current[office.id] = marker;
        bounds.push(office.coordinates);
      });

      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 4 });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSelectOffice = (office) => {
    setActiveOffice(office.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(office.coordinates, 6, {
        duration: 1.2,
      });
      const marker = markersRef.current[office.id];
      if (marker) {
        marker.openTooltip();
      }
    }
  };

  return (
    <section className="office-presence-section">
      <div className="srcn-container">
        <div className="office-presence-shell">
          <div className="office-presence-header">
            <span className="section-kicker career-values-kicker">Office Address</span>
            <h2 className="office-presence-title section-main-heading">Our Presence</h2>
          </div>

          <div className="office-presence-map-board">
            <div className="office-presence-list">
              {offices.map((office) => {
                const isActive = activeOffice === office.id;
                return (
                  <article
                    key={office.id}
                    className={`office-card ${isActive ? 'office-card--active' : ''}`}
                    onClick={() => handleSelectOffice(office)}
                    style={{
                      cursor: 'pointer',
                      ...(isActive && office.banner
                        ? {
                            backgroundImage: `linear-gradient(90deg, rgba(108, 42, 74, 0.82) 0%, rgba(190, 44, 40, 0.82) 100%), url(${office.banner})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderColor: 'transparent',
                          }
                        : {}),
                    }}
                  >
                    <h3>{office.name}</h3>
                    <ul>
                      <li>
                        <span className="office-icon">
                          <i className="fa-solid fa-location-dot"></i>
                        </span>
                        <span>{office.address}</span>
                      </li>
                      <li>
                        <span className="office-icon">
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <span>{office.email}</span>
                      </li>
                      <li>
                        <span className="office-icon">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <span>{office.phones}</span>
                      </li>
                    </ul>
                  </article>
                );
              })}
            </div>

            <div
              className="office-map-panel"
              id="officeMap"
              ref={mapContainerRef}
              role="region"
              aria-label="Office locations map"
              style={{ minHeight: '380px', width: '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
