'use client';

import React from 'react';
import HeroSection from '@/app/homesections/HeroSection';

export default function HomeHeroSection({ data = {} }) {
  return <HeroSection dynamicData={data} />;
}
