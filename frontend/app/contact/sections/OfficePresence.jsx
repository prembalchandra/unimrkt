'use client';

import React, { useEffect, useRef, useState } from 'react';

function formatOffice(office) {
  if (!office) return null;
  const country = office.country || '';
  let id = 'india';
  let flag = '🇮🇳';
  let banner = '/asstes/images/contact-map-banner-img.png';
  let city = 'Gurugram, India';

  if (country.includes('United States') || country.includes('USA')) {
    id = 'usa';
    flag = '🇺🇸';
    banner = '/asstes/images/contact-banner-usa.jpg';
    city = 'Great Neck, USA';
  } else if (country.includes('United Kingdom') || country.includes('UK')) {
    id = 'uk';
    flag = '🇬🇧';
    banner = '/asstes/images/contact-banner-uk.jpg';
    city = 'Oxford, UK';
  }

  return {
    id,
    name: office.officeName || country,
    city,
    flag,
    coordinates: [Number(office.latitude) || 28.4946, Number(office.longitude) || 77.088],
    address: office.address || '',
    email: office.email || 'sales@unimrkt.com',
    phones: office.phoneNumbers || '',
    banner,
  };
}

export default function OfficePresence({
  initialOffices = [],
  kicker = 'Office Address',
  heading = 'Our Presence',
  dynamicSection = null,
}) {
  const displayKicker = dynamicSection?.kicker || kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || heading;

  const [offices, setOffices] = useState(() => (initialOffices || []).map(formatOffice).filter(Boolean));
  const [activeOffice, setActiveOffice] = useState('india');
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (initialOffices && initialOffices.length > 0) {
      setOffices(initialOffices.map(formatOffice).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/office-locations?sort=order:asc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setOffices(d.data.map(formatOffice).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialOffices]);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) return;
      if (!offices || offices.length === 0) return;

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

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [32, 32], maxZoom: 4 });
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [offices]);

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
            <span className="section-kicker career-values-kicker">{displayKicker}</span>
            <h2 className="office-presence-title section-main-heading">{displayHeading}</h2>
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
