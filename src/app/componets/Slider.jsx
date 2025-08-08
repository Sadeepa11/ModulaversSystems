'use client';
import React, { useState, useEffect } from 'react';

const AutoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample images - replace with your actual images
  const images = [
    {
      src: "https://websitedemos.net/web-agency-04/wp-content/uploads/sites/1533/elementor/thumbs/Img-3-r50luoy4dqftf0qc2moi94kuhyv9ee49xdmpca520g.png",
      alt: "Modulavers Systems"
    },
    {
      src: "https://websitedemos.net/web-agency-04/wp-content/uploads/sites/1533/elementor/thumbs/Img-2-r50luqtsreie28nlrnhre43roqlztsbqlmxoau29o0.png",
      alt: "Modulavers Systems"
    },
    {
      src: "https://websitedemos.net/web-agency-04/wp-content/uploads/sites/1533/elementor/thumbs/hero-r4ogbolf0ahsppy9wo3igc870bl9pcp9d49f76bib4.jpg",
      alt: "Modulavers Systems"
    }
  ];

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full z-1 px-4 absolute sm:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-[90vh]">
      {/* Container with proper max-width and centering */}
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl xl:rounded-[2rem]   p-3 md:p-4 lg:p-6">
          {/* Main carousel container */}
          <div className="relative h-56 sm:h-64 md:h-72 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden">
            {/* Images container with smooth transform */}
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>



        

          

            {/* Optional: Add subtle glow effect for large screens */}
            <div className="absolute inset-0 rounded-xl lg:rounded-2xl xl:rounded-3xl ring-1 ring-white/10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoCarousel;