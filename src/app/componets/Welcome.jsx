'use client';


import React from 'react';
import SplitText from "../../blocks/TextAnimations/SplitText/SplitText";
import AutoCarousel from './Slider';

const Welcome = () => {

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    return (
        <div
            className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
            style={{ backgroundImage: `url('/images/bgWelcome/bgWelcome.webp')` }}
        >
    
            <SplitText
                text="Welcome to ModulaVers Systems!!!"
                className="text-5xl font-bold text-center"
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
            <p className="text-lg md:text-2xl mb-6 max-w-2xl drop-shadow-md">
                Building reliable, modern, and scalable software solutions that empower your business to succeed in the digital era.
            </p>
            <button className=" mb-40 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition duration-300">
                Get Started
            </button>

            <AutoCarousel/>
        </div>
    );
};

export default Welcome;
