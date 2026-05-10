import React from 'react';
import TeamSection from '../componets/TeamSection';
import SoftwareCompanyFooter from '../componets/Footer';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="py-12">
        <TeamSection />
      </div>
      <SoftwareCompanyFooter />
    </div>
  );
}
