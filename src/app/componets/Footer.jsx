"use client"

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github,
  Send,
  ArrowUp,
  Code,
  Globe,
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const SoftwareCompanyFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-bg w-[100%] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative w-[100%] z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <img
                  src="/logo/mylogo/mv.png" 
                  alt="Modulavers Systems" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering businesses with innovative software solutions. We specialize in web development, mobile apps, and enterprise software.
            </p>
            
            <div className="flex space-x-4 pt-2">
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <Award className="w-4 h-4 text-accent" />
                <span>ISO 9001 Certified</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              {[
                'Web Development',
                'Mobile App Development',
                'Cloud Solutions',
                'Enterprise Software',
                'UI/UX Design',
                'DevOps & Deployment',
                'Software Consulting',
                'Maintenance & Support'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-white/40 hover:text-accent transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {[
                'About Us',
                'Our Team',
                'Careers',
                'Portfolio',
                'Case Studies',
                'Blog',
                'Contact Us',
                'Privacy Policy'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-white/40 hover:text-accent transition-colors duration-200 text-sm flex items-center space-x-2">
                    <span className="w-1 h-1 bg-secondary rounded-full"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/60">No: 8/2, Neelammahara Road,</p>
                    <p className="text-sm text-white/60">Katuwawala,Boralesgamuwa,Western Province,Sri Lanka</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <p className="text-sm text-white/60">+94 76 577 2504</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <p className="text-sm text-white/60">info@modulavers.lk</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-white">Stay Updated</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/20"
                />
                <button
                  onClick={handleNewsletter}
                  disabled={subscribed}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-200 flex items-center space-x-1 disabled:opacity-50"
                >
                  {subscribed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-xs">Thanks for subscribing!</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/40">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-white/40">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/40">Support Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-white/40">Uptime Guarantee</div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="text-center mb-6">
            <h5 className="text-sm font-semibold text-white mb-4">Technologies We Use</h5>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'Next.js', 'Node.js', 'Python', 'Java', 'Flutter', 'AWS', 'Docker', 'MongoDB'].map((tech, index) => (
                <span key={index} className="px-4 py-1.5 bg-white/5 text-white/60 rounded-full text-xs hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: 'hover:text-primary' },
                { icon: Twitter, color: 'hover:text-primary' },
                { icon: Linkedin, color: 'hover:text-primary' },
                { icon: Instagram, color: 'hover:text-accent' },
                { icon: Github, color: 'hover:text-white' }
              ].map((social, index) => (
                <a key={index} href="#" className={`text-white/40 ${social.color} transition-colors duration-200 p-2 rounded-lg hover:bg-white/5`}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-white/40">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/50 backdrop-blur-xl border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/40">
              © {new Date().getFullYear()} Modulavers Systems. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-white/40 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-1 z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default SoftwareCompanyFooter;;