'use client';

import React, { useState, useEffect } from 'react';
import CaseStudyExplorer from '@/app/case-study/sections/CaseStudyExplorer';
import { getCaseStudies } from '@/lib/strapi';

export default function CaseStudiesSliderSection({ data = {} }) {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    getCaseStudies(20)
      .then((res) => {
        if (res && res.length > 0) setStudies(res);
      })
      .catch(() => {});
  }, []);

  return <CaseStudyExplorer initialCaseStudies={studies} />;
}
