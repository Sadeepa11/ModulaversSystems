'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SplitText from "../../blocks/TextAnimations/SplitText/SplitText";
import AutoCarousel from './Slider';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden pt-20 pb-12 bg-dark-bg">
            
            {/* Dark Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-dark-bg pointer-events-none"></div>
            
            {/* Glowing Ambient Shapes with Smooth Pulse Animation */}
            <motion.div 
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div 
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
            />

            {/* Main Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto my-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg shadow-black/20"
                >
                    <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-ping"></span>
                    Innovating the Future
                </motion.div>
                
                <SplitText
                    text="Welcome to ModulaVers Systems"
                    className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-center mb-6 tracking-tight drop-shadow-lg"
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
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-base md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
                >
                    Building reliable, modern, and scalable software solutions that empower your business to succeed in the digital era.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 mb-14"
                >
                    <a 
                        href="#services"
                        className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <span>Get Started</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                    <a 
                        href="#about"
                        className="flex items-center justify-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:border-white/20"
                    >
                        <span>Learn More</span>
                    </a>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="w-full max-w-4xl"
                >
                    <AutoCarousel/>
                </motion.div>
            </div>
        </div>
    );
};

export default Welcome;
