import React from 'react';
import { Code, Brush, Video, Image, Users, Earth, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const serviceData = {
  web: {
    name: 'Web Development',
    icon: Code,
    description: 'We develop responsive and high-performance websites and web applications tailored to your business needs using modern technologies like React, Next.js, and Node.js.',
    features: ['Responsive Design', 'Performance Optimization', 'Modern Tech Stack', 'SEO Ready'],
    gradient: 'from-blue-600 to-purple-600',
    projects: '150+ Projects',
    process: ['Discovery & Planning', 'UI/UX Design', 'Development', 'Testing & Launch'],
    techStack: ['React', 'Next.js', 'Node.js', 'TailwindCSS', 'MongoDB']
  },
  ui: {
    name: 'UI/UX Designing',
    icon: Brush,
    description: 'We craft intuitive, visually pleasing interfaces and seamless user experiences through wireframing, prototyping, and user research, ensuring your product stands out and feels great to use.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    gradient: 'from-pink-500 to-rose-500',
    projects: '200+ Projects',
    process: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design & Testing'],
    techStack: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop']
  },
  video: {
    name: 'Video Editing',
    icon: Video,
    description: 'From YouTube content to corporate promos, we edit and enhance videos with smooth transitions, sound design, subtitles, effects, and more — professionally and creatively.',
    features: ['Professional Editing', 'Sound Design', 'Motion Graphics', 'Color Grading'],
    gradient: 'from-orange-500 to-red-500',
    projects: '300+ Projects',
    process: ['Footage Review', 'Rough Cut', 'Sound & Effects', 'Final Polish & Export'],
    techStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition']
  },
  graphic: {
    name: 'Graphic Designing',
    icon: Image,
    description: 'We design eye-catching graphics for branding, advertising, and digital platforms — including logos, banners, flyers, packaging, and social media creatives.',
    features: ['Logo Design', 'Brand Identity', 'Print Design', 'Social Media Graphics'],
    gradient: 'from-green-500 to-teal-500',
    projects: '250+ Projects',
    process: ['Concept Sketching', 'Digital Rendering', 'Revisions', 'Final Delivery'],
    techStack: ['Photoshop', 'Illustrator', 'InDesign', 'Canva']
  },
  seo: {
    name: 'SEO',
    icon: Earth,
    description: 'Our SEO services improve your websites ranking on Google and other search engines through keyword optimization, technical audits, backlink strategies, and content enhancement.',
    features: ['Keyword Research', 'Technical SEO', 'Link Building', 'Content Optimization'],
    gradient: 'from-purple-500 to-indigo-500',
    projects: '120+ Projects',
    process: ['Site Audit', 'Keyword Strategy', 'On-Page Optimization', 'Link Building'],
    techStack: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog']
  }
};

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link href="/" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <div 
        className="relative bg-cover bg-center -mt-16 pt-48 pb-20 px-4 overflow-hidden"
        style={{ backgroundImage: `url('/images/bgWelcome/bgWelcome.webp')` }}
      >
        {/* Dark overlay with service-specific gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-dark-bg/90"></div>
        <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-30`}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="text-white/80 hover:text-white flex items-center mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <Icon className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{service.name}</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">{service.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="space-y-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Service Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Pricing</span>
                <span className="font-semibold text-accent">Custom Quote</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Duration</span>
                <span className="font-semibold">Project Dependent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Experience</span>
                <span className="font-semibold">{service.projects}</span>
              </div>
            </div>
            <Link href="/orders" className={`w-full mt-6 bg-gradient-to-r ${service.gradient} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center`}>
              Inquire Now
            </Link>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className="relative bg-dark-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step}</h3>
                {index < service.process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-20 mb-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Technologies & Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {service.techStack.map((tech, index) => (
              <div key={index} className="px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                <span className="font-medium text-white/80">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
