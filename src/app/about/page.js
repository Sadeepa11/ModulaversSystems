import React from 'react';
import ModulaversAboutSection from '../componets/About';
import SoftwareCompanyFooter from '../componets/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="py-12">
        <ModulaversAboutSection />
      </div>
      <SoftwareCompanyFooter />
    </div>
  );
}
