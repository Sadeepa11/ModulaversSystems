'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Code, Zap, Users, Phone, ArrowRight, Video, BrushIcon, EarthIcon, Image } from 'lucide-react';
import Link from 'next/link';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      dropdown: [
        { name: 'Web Development', href: '/services/web', icon: Code },
        { name: 'UI/UX designing', href: '/services/ui', icon: BrushIcon },
        { name: 'Video Editting', href: '/services/video', icon: Video },
        { name: 'Graphic Designing', href: '/services/graphic', icon: Image },
        { name: 'Digital Marketing', href: '/services/digital_marketing', icon: Users },
        { name: 'SEO', href: '/services/seo', icon: EarthIcon }
      ]
    },
    { name: 'Team', href: '/team' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Orders', href: '/orders' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl mx-auto ${
      isScrolled || isMenuOpen
        ? 'bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10' 
        : 'bg-gray-900/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-2xl md:rounded-none border border-white/10 md:border-transparent'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo/mylogo/mv.png" 
              alt="Modulavers Systems" 
              className="h-50 md:h-52 w-auto object-contain"
            />
            {/* <span className="ml-2 font-bold text-xl text-white">Modulavers</span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button
                    className="flex items-center space-x-1 px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-xl text-white/80 hover:text-white transition-all duration-200 hover:bg-white/10 text-xs lg:text-sm whitespace-nowrap"
                    onClick={() => handleDropdown(index)}
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-xl text-white/80 hover:text-white transition-all duration-200 hover:bg-white/10 text-xs lg:text-sm whitespace-nowrap"
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 ${
                    activeDropdown === index 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                    <div className="p-2">
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                        >
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
                            <dropItem.icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-white/90 group-hover:text-white">{dropItem.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a href="/#contact" className="group flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 lg:px-6 lg:py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-105 whitespace-nowrap text-xs lg:text-sm">
              <span className="font-medium">Get Started</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-[80vh] opacity-100 pb-4 overflow-y-auto' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="pt-4 space-y-2 bg-gray-900 rounded-xl p-4 border border-white/10">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors duration-200"
                  onClick={() => item.dropdown && handleDropdown(index)}
                >
                  <span className="font-medium text-white">{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className={`h-4 w-4 text-white transition-transform duration-200 ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  )}
                </a>
                
                {/* Mobile Dropdown */}
                {item.dropdown && activeDropdown === index && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.dropdown.map((dropItem) => (
                      <a
                        key={dropItem.name}
                        href={dropItem.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
                      >
                        <dropItem.icon className="h-4 w-4 text-white" />
                        <span className="text-white/80">{dropItem.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-white/10">
              <a href="/#contact" className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200">
                <span className="font-medium">Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;