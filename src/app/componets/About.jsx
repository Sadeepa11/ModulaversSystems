"use client";

import React, { useState, useEffect } from 'react';
import { Code, Zap, Users, Target, Award, Globe, Lightbulb, Rocket } from 'lucide-react';

const ModulaversAboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

//   const stats = [
//     { icon: <Code className="w-6 h-6" />, number: "50+", label: "Projects" },
//     { icon: <Users className="w-6 h-6" />, number: "100+", label: "Clients" },
//     { icon: <Award className="w-6 h-6" />, number: "15+", label: "Years" },
//     { icon: <Globe className="w-6 h-6" />, number: "25+", label: "Countries" }
//   ];

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Cutting-edge technology solutions"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description: "Quality-driven development"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Growth",
      description: "Scalable business solutions"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white w-[100%] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                About
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ml-4">
                  Modulavers
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8"></div>
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-xl text-gray-600 leading-relaxed">
                Modulavers Systems is a pioneering technology company specializing in innovative digital solutions. 
                We transform businesses through cutting-edge modular systems and scalable architectures.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our expert team combines years of experience with the latest technologies to deliver solutions 
                that drive growth, efficiency, and digital transformation for businesses worldwide.
              </p>
            </div>

            {/* Stats Grid
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                Get Started
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-100 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Why Choose Us
                  </h3>

                  <div className="space-y-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 group"
                        style={{ transitionDelay: `${index * 200}ms` }}
                      >
                        <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mission Statement */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-500">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h4>
                    <p className="text-gray-600 leading-relaxed">
                      To deliver exceptional technology solutions that empower businesses to achieve 
                      their digital transformation goals through innovative, scalable, and sustainable platforms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-blue-300 rounded-full animate-pulse"></div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-20 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulaversAboutSection;