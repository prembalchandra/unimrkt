'use client';

import React, { useState, useEffect } from 'react';
import GalleryGrid from '@/app/gallery/sections/GalleryGrid';
import { getGalleryItems } from '@/lib/strapi';

export default function GalleryShowcaseSection({ data = {} }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getGalleryItems(30)
      .then((res) => {
        if (res && res.length > 0) setItems(res);
      })
      .catch(() => {});
  }, []);

  return <GalleryGrid initialGallery={items} />;
}
