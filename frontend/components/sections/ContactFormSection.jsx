'use client';

import React from 'react';
import ContactForm from '@/app/contact/sections/ContactForm';

export default function ContactFormSection({ data = {} }) {
  return <ContactForm dynamicData={data} />;
}
