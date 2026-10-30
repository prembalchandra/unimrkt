'use client';

import React, { useState, useEffect } from 'react';
import CommonBlogSection from '@/components/CommonBlogSection';
import { getBlogPosts } from '@/lib/strapi';

export default function BlogsSliderSection({ data = {} }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogPosts(10)
      .then((res) => {
        if (res && res.length > 0) setBlogs(res);
      })
      .catch(() => {});
  }, []);

  return <CommonBlogSection dynamicBlogs={blogs} data={data} />;
}
