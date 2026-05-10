import React from 'react';
import ContactDetectionForm from '../componets/Contact';
import SoftwareCompanyFooter from '../componets/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="py-12">
        <ContactDetectionForm />
      </div>
      <SoftwareCompanyFooter />
    </div>
  );
}
