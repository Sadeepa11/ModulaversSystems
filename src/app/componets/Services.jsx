'use client'
import React from 'react';
import { Code, Brush, Video, Image, Users, Earth, Star, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import ServiceCard from './ServiceCard'; // Import the separate card component

const ServicesSection = () => {
    const services = [
        {
            name: 'Web Development',
            href: '/products/web',
            icon: Code,
            description: 'We develop responsive and high-performance websites and web applications tailored to your business needs using modern technologies like React, Next.js, and Node.js.',
            features: ['Responsive Design', 'Performance Optimization', 'Modern Tech Stack', 'SEO Ready'],
            gradient: 'from-blue-600 to-purple-600',
            price: 'Starting at $2,999',
            duration: '2-4 weeks',
            projects: '150+ Projects'
        },
        {
            name: 'UI/UX Designing',
            href: '/products/ui',
            icon: Brush,
            description: 'We craft intuitive, visually pleasing interfaces and seamless user experiences through wireframing, prototyping, and user research, ensuring your product stands out and feels great to use.',
            features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
            gradient: 'from-pink-500 to-rose-500',
            price: 'Starting at $1,999',
            duration: '1-3 weeks',
            projects: '200+ Projects'
        },
        {
            name: 'Video Editing',
            href: '/products/video',
            icon: Video,
            description: 'From YouTube content to corporate promos, we edit and enhance videos with smooth transitions, sound design, subtitles, effects, and more — professionally and creatively.',
            features: ['Professional Editing', 'Sound Design', 'Motion Graphics', 'Color Grading'],
            gradient: 'from-orange-500 to-red-500',
            price: 'Starting at $499',
            duration: '3-7 days',
            projects: '300+ Projects'
        },
        {
            name: 'Graphic Designing',
            href: '/products/graphic',
            icon: Image,
            description: 'We design eye-catching graphics for branding, advertising, and digital platforms — including logos, banners, flyers, packaging, and social media creatives.',
            features: ['Logo Design', 'Brand Identity', 'Print Design', 'Social Media Graphics'],
            gradient: 'from-green-500 to-teal-500',
            price: 'Starting at $799',
            duration: '1-2 weeks',
            projects: '250+ Projects'
        },
        {
            name: 'Digital Marketing',
            href: '/products/digital_marketing',
            icon: Users,
            description: 'Boost your online presence through strategic campaigns including social media marketing, Google Ads, email campaigns, influencer outreach, and performance tracking.',
            features: ['Social Media Marketing', 'Google Ads', 'Email Campaigns', 'Analytics & Reporting'],
            gradient: 'from-indigo-500 to-blue-500',
            price: 'Starting at $1,499',
            duration: '2-6 weeks',
            projects: '180+ Projects'
        },
        {
            name: 'SEO',
            href: '/products/seo',
            icon: Earth,
            description: 'Our SEO services improve your websites ranking on Google and other search engines through keyword optimization, technical audits, backlink strategies, and content enhancement.',
            features: ['Keyword Research', 'Technical SEO', 'Link Building', 'Content Optimization'],
            gradient: 'from-purple-500 to-indigo-500',
            price: 'Starting at $999',
            duration: '1-3 months',
            projects: '120+ Projects'
        }
    ];

    return (
        <section className="relative z-0 w-[100%] py-20 bg-dark-bg overflow-hidden">
           
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.05),transparent)] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10 -translate-y-48 translate-x-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent to-primary rounded-full opacity-10 translate-y-48 -translate-x-48 blur-3xl"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mt-10">
                    <div className="inline-flex items-center bg-white/5 text-accent px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/10 shadow-lg">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Premium Services
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Professional Digital
                        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Solutions
                        </span>
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                        Transform your business with our comprehensive digital services. From stunning websites to powerful marketing campaigns, we deliver results that matter.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 mt-16">
                    {services.map((service, index) => (
                        <ServiceCard 
                            key={service.name} 
                            service={service} 
                            index={index} 
                        />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-dark-card/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Trusted by 500+ Companies
                        </h3>
                        <p className="text-white/60 text-lg">
                            Here's what we've accomplished together
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">1200+</div>
                            <div className="text-white/60">Projects Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">500+</div>
                            <div className="text-white/60">Happy Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">98%</div>
                            <div className="text-white/60">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-white/60">Support</div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Why Choose Our Services?
                        </h3>
                        <div className="space-y-4">
                            {[
                                'Expert team with 5+ years of experience',
                                'Cutting-edge technology and modern tools',
                                'Transparent pricing with no hidden costs',
                                'Dedicated project manager for each client',
                                'Fast turnaround time with quality assurance',
                                '24/7 support and maintenance services'
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10 -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10">
                            <Star className="w-12 h-12 text-accent mb-4" />
                            <h4 className="text-2xl font-bold text-white mb-4">
                                Premium Quality Guaranteed
                            </h4>
                            <p className="text-white/60 mb-6">
                                We don't just deliver projects, we deliver success. Every service comes with our quality guarantee and ongoing support to ensure your business thrives.
                            </p>
                            <button className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                Learn More About Our Process
                            </button>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full opacity-5 -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full opacity-5 translate-x-20 translate-y-20"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                            Join 500+ satisfied clients who have transformed their business with our services. 
                            Get a free consultation and custom quote today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center">
                                <span>Get Free Consultation</span>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors duration-300">
                                View Our Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;