'use client';

import React, { useEffect, useRef, useState } from 'react';

const offices = [
  {
    id: 'india',
    name: 'India Office',
    city: 'Gurugram, India',
    coords: [28.4946, 77.088],
    zoom: 5,
    address: '5th floor, Nimai Tower, 412-415, Udyog Vihar, Phase IV, Gurugram, Haryana-122015',
    email: 'sales@unimrkt.com',
    phones: 'Sales & Business Queries: +91 124 424 5210, +91 9870 377 557',
    image: '/uploads/contact_india_gate_4f64565937.jpg',
  },
  {
    id: 'usa',
    name: 'United States of America',
    city: 'Great Neck, USA',
    coords: [40.8007, -73.7285],
    zoom: 5,
    address: '98 Cuttermill Road Suite 466, Great Neck, NY 11021, USA',
    email: 'sales@unimrkt.com',
    phones: '+1.646.712.9302',
    image: null,
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    city: 'Oxford, UK',
    coords: [51.7632, -1.2065],
    zoom: 5,
    address: 'The Old Dairy, 12 Stephen Road, Headington, Oxford, Oxfordshire, United Kingdom OX3 9AY',
    email: 'sales@unimrkt.com',
    phones: '+1.646.712.9302',
    image: null,
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
      if (typeof window === 'undefined') return;

      const L = (await import('leaflet')).default;
      if (!isMounted || !mapContainerRef.current) return;

      // Clean existing instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [30, 20],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Create custom pin icon
      const createPin = (isActive) =>
        L.divIcon({
          className: 'custom-office-pin',
          html: `<div style="
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: ${isActive ? '#be2c28' : '#04264e'};
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 11px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
            border: 2px solid #fff;
            cursor: pointer;
            transition: all 0.3s ease;
          ">${isActive ? '●' : '📍'}</div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

      offices.forEach((office) => {
        const marker = L.marker(office.coords, {
          icon: createPin(office.id === activeOffice),
        }).addTo(map);

        marker.on('click', () => {
          setActiveOffice(office.id);
        });

        markersRef.current[office.id] = marker;
      });

      mapInstanceRef.current = map;
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

  // Pan map when activeOffice changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const office = offices.find((o) => o.id === activeOffice);
    if (office) {
      map.flyTo(office.coords, 4, { duration: 1.5 });
    }
  }, [activeOffice]);

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-14 pt-14 sm:px-6 lg:pb-[64px] lg:pt-[73px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[999px] bg-[length:1900px_1411px] bg-[position:center_top] bg-repeat"
        style={{ backgroundImage: "url('/images/gallery/wave-pattern.png')" }}
        aria-hidden="true"
      ></div>
      <div
        className="pointer-events-none absolute inset-x-0 top-[422px] h-[577px] bg-gradient-to-b from-white/0 to-white"
        aria-hidden="true"
      ></div>

      <div className="relative text-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f]">
          Office Address
        </p>
        <h2 className="mt-[19px] font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px]">
          Our Presence
        </h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1740px] overflow-hidden rounded-[24px] border border-[#e5e5e5] bg-[#d9d9d9] p-4 sm:p-6 lg:mt-[49px] lg:min-h-[868px] lg:rounded-[40px] lg:p-0">
        {/* Left column office tabs */}
        <div className="relative z-10 flex flex-col gap-[21px] lg:my-[74px] lg:ml-[5.17%] lg:w-[645px] lg:max-w-[37.07%]">
          {offices.map((office) => {
            const isActive = activeOffice === office.id;
            return (
              <div
                key={office.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => setActiveOffice(office.id)}
                className={`relative cursor-pointer overflow-hidden rounded-[24px] border px-5 py-8 transition-all duration-300 sm:px-[37px] lg:min-h-[223px] lg:px-6 lg:py-[36px] xl:px-[37px] ${
                  isActive
                    ? 'border-transparent shadow-[6px_6px_54px_0px_rgba(0,0,0,0.12)]'
                    : 'border-[#e0e0df] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] hover:border-brand-500'
                }`}
              >
                {/* Active Gradient and Photo Background */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] transition-opacity duration-300 ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                ></div>

                {office.image && (
                  <img
                    alt={office.name}
                    src={office.image}
                    className={`pointer-events-none absolute inset-0 size-full object-cover mix-blend-luminosity transition-opacity duration-300 ease-in-out ${
                      isActive ? 'opacity-[0.22]' : 'opacity-0'
                    }`}
                  />
                )}

                {/* USA Statue of Liberty Silhouette */}
                {office.id === 'usa' && (
                  <svg
                    viewBox="0 0 90 140"
                    fill="currentColor"
                    className={`pointer-events-none absolute bottom-0 right-6 h-[88%] w-auto text-white transition-opacity duration-300 ease-in-out ${
                      isActive ? 'opacity-20' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M71 2c5 6 4 11 0 14-4-3-5-8 0-14z"></path>
                    <path d="M66 15h10v7H66z"></path>
                    <path d="M57 54l6-3 9-29-7-2z"></path>
                    <circle cx="44" cy="39" r="8"></circle>
                    <path
                      d="M33 33l-8-6M37 29l-4-9M44 27v-11M51 29l4-9M55 33l8-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    ></path>
                    <path d="M35 48h18l6 14 8 50H21l8-50z"></path>
                    <path d="M12 112h66v10H12zM20 122h50v18H20z"></path>
                  </svg>
                )}

                {/* UK Big Ben Silhouette */}
                {office.id === 'uk' && (
                  <svg
                    viewBox="0 0 60 140"
                    fill="currentColor"
                    className={`pointer-events-none absolute bottom-0 right-6 h-[88%] w-auto text-white transition-opacity duration-300 ease-in-out ${
                      isActive ? 'opacity-20' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M30 0l7 34H23z"></path>
                    <path d="M21 36h18v8H21zM19 44h22v76H19z"></path>
                    <circle cx="30" cy="62" r="9" fill="none" stroke="currentColor" strokeWidth="3"></circle>
                    <path d="M30 56v6l4 2" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    <path d="M14 120h32v20H14z"></path>
                  </svg>
                )}

                <div className="relative flex flex-col gap-[22px]">
                  <p
                    className={`font-sans text-[22px] font-semibold leading-[1.34] tracking-[-1px] transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-[#04264e]'
                    }`}
                  >
                    {office.name}
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-[14px]">
                      <img
                        src={isActive ? '/figma-contact/loc-white.svg' : '/figma-contact/loc-red.svg'}
                        alt=""
                        width="24"
                        height="24"
                        className="size-6 shrink-0"
                      />
                      <p
                        className={`max-w-[533px] font-sans text-[16px] font-normal leading-[1.4] transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-black/70'
                        }`}
                      >
                        {office.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-[14px]">
                      <img
                        src={isActive ? '/figma-contact/sms-white.svg' : '/figma-contact/sms-red.svg'}
                        alt=""
                        width="24"
                        height="24"
                        className="size-6 shrink-0"
                      />
                      <p
                        className={`font-sans text-[16px] font-normal leading-[1.4] transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-black/70'
                        }`}
                      >
                        {office.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-[14px]">
                      <img
                        src={isActive ? '/figma-contact/call-white.svg' : '/figma-contact/call-red.svg'}
                        alt=""
                        width="24"
                        height="24"
                        className="size-6 shrink-0"
                      />
                      <p
                        className={`font-sans text-[16px] font-normal leading-[1.4] transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-black/70'
                        }`}
                      >
                        {office.phones}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side Leaflet Map container */}
        <div className="mt-4 h-[320px] overflow-hidden rounded-[18px] lg:absolute lg:inset-0 lg:z-0 lg:mt-0 lg:h-auto lg:rounded-none">
          <div ref={mapContainerRef} className="size-full bg-[#e9e9e9]" role="region" aria-label="Office locations map"></div>
        </div>
      </div>
    </section>
  );
}
