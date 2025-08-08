"use client";

import React from 'react';
import { Code } from 'lucide-react';

const ServiceCard = ({ service, index = 0 }) => {
    const IconComponent = service.icon;
    
    return (
        <div
            className="group relative bg-white  sm:w-[100%] m:w-[100%] lg:w-[100%] xl:w-[100%] 
                        rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl 
                       transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            style={{
                animationDelay: `${index * 100}ms`,
            }}
        >
            {/* Gradient background overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform"></div>
            
            <div className="relative z-10">
                {/* Icon with animated background */}
                <div className="relative mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                </div>
                
                {/* Service name */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {service.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                </p>
                
                {/* CTA Button */}
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors duration-300 cursor-pointer text-sm sm:text-base">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Learn More</span>
                    <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
            
            {/* Hover border effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"></div>
        </div>
    );
};

export default ServiceCard;