'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Code, Zap, Users, Phone, ArrowRight, Video, BrushIcon, EarthIcon, Image } from 'lucide-react';

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
    //   href: '/',
      dropdown: [
        { name: 'Web Development', href: '/products/web', icon: Code },
        { name: 'UI/UX designing', href: '/products/ui', icon: BrushIcon },
        { name: 'Video Editting', href: '/products/video', icon: Video },
        { name: 'Graphic Designing', href: '/products/graphic', icon: Image },
        { name: 'Degital Marketing', href: '/products/degital_marketing', icon: Users },
        { name: 'SEO', href: '/products/seo', icon: EarthIcon }
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900 shadow-lg border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
{/* Logo */}
<div className="flex items-center">
  <img
    src="/logo/mylogo/mv.png" 
    alt="Modulavers Systems" 

    className="h-50 w-auto object-contain"
  />
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <button
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 transition-all duration-200 hover:bg-gray-900"
                  onClick={() => item.dropdown && handleDropdown(index)}
                  onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  <span className="font-medium  text-white font-bold">{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200  text-white font-bold ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-xl border border-gray-200/20 backdrop-blur-sm transition-all duration-200 ${
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
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-transparent hover:border-1 border-gray-500 transition-all duration-200 group"
                        >
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
                            <dropItem.icon className="h-4 w-4 text-white" />
                          </div>
                          <span className=" font-medium  text-white font-bold">{dropItem.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
              <span className="font-medium">Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all  duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="pt-4 space-y-2 rounded bg-gray-900">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:border-1 border-gray-500 bg-gray-900 transition-colors duration-200"
                  onClick={() => item.dropdown && handleDropdown(index)}
                >
                  <span className="font-medium text-white font-bold">{item.name}</span>
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
                        className="flex items-center space-x-3 p-2 rounded-lg bg-gray-900 hover:border-1 border-gray-500 transition-colors duration-200"
                      >
                        <dropItem.icon className="h-4 w-4 text-white" />
                        <span className=" text-white font-bold">{dropItem.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200">
                <span className="font-medium">Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;