'use client';

import React from 'react';
import SplitText from "../../blocks/TextAnimations/SplitText/SplitText";
import AutoCarousel from './Slider';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    
    return (
        <div
            className="relative h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden"
            style={{ backgroundImage: `url('/images/bgWelcome/bgWelcome.webp')` }}
        >
            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-dark-bg"></div>
            
            {/* Glowing background shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto">
                <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-ping"></span>
                    Innovating the Future
                </div>
                
                <SplitText
                    text="Welcome to Modulavers Systems"
                    className="text-2xl md:text-4xl lg:text-6xl font-bold text-center mb-6"
                    delay={50}
                    duration={0.1}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                
                <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Building reliable, modern, and scalable software solutions that empower your business to succeed in the digital era.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-20">
                    <button className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                        <span>Get Started</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                        <span>Learn More</span>
                    </button>
                </div>

                <div className="w-full max-w-4xl">
                    <AutoCarousel/>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
