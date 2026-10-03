'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SplitText from "../../blocks/TextAnimations/SplitText/SplitText";
import AutoCarousel from './Slider';
import { ArrowRight, Code, Smartphone, Cpu, Sparkles, Terminal, Layers } from 'lucide-react';

const Welcome = () => {
  // Motion values for mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D physics movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Tilt rotations
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);

  // Parallax offsets for floating items
  const floatX1 = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const floatY1 = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35]);

  const floatX2 = useTransform(smoothMouseX, [-0.5, 0.5], [45, -45]);
  const floatY2 = useTransform(smoothMouseY, [-0.5, 0.5], [45, -45]);

  // Dynamic light torch position
  const torchX = useTransform(smoothMouseX, [-0.5, 0.5], ['20%', '80%']);
  const torchY = useTransform(smoothMouseY, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize coordinates from -0.5 to 0.5
    const normalizedX = (clientX / innerWidth) - 0.5;
    const normalizedY = (clientY / innerHeight) - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden pt-24 pb-16 bg-slate-950 select-none"
    >
      {/* 100% Pure Code Cyber Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/70 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Dynamic 3D Cursor Following Neon Torch Glow */}
      <motion.div
        className="absolute w-[650px] h-[650px] bg-gradient-to-r from-blue-600/30 via-indigo-600/25 to-purple-600/20 rounded-full blur-[130px] pointer-events-none transform-gpu transition-all duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: torchX,
          top: torchY,
        }}
      />

      {/* Pure Code Cyber Matrix Grid with 3D Depth */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden"
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)] origin-top" />
      </motion.div>

      {/* Pure Code Glowing Neon Ambient Light Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.6, 0.35]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/6 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-purple-600/25 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-[90px] pointer-events-none"
      />

      {/* Floating 3D Interactive Code & Tech Nodes (Pure Code Elements) */}
      <motion.div
        style={{ x: floatX1, y: floatY1 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-32 left-10 xl:left-20 bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 px-4 py-3 rounded-2xl shadow-2xl shadow-blue-500/10 items-center gap-3 pointer-events-none z-20"
      >
        <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/30">
          <Terminal className="w-5 h-5" />
        </div>
        <div className="text-left font-mono">
          <span className="text-xs font-bold text-white block">const app = new System();</span>
          <span className="text-[10px] text-blue-300">✓ React 19 • Next.js 15</span>
        </div>
      </motion.div>

      <motion.div
        style={{ x: floatX2, y: floatY2 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex absolute top-40 right-10 xl:right-20 bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 px-4 py-3 rounded-2xl shadow-2xl shadow-purple-500/10 items-center gap-3 pointer-events-none z-20"
      >
        <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400 border border-purple-500/30">
          <Smartphone className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="text-xs font-bold text-white block">Mobile Applications</span>
          <span className="text-[10px] text-purple-300 font-medium">Cross-Platform iOS & Android</span>
        </div>
      </motion.div>

      <motion.div
        style={{ x: floatX1, y: floatY2 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden lg:flex absolute bottom-36 left-12 bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-500/10 items-center gap-3 pointer-events-none z-20"
      >
        <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
          <Cpu className="w-5 h-5" />
        </div>
        <div className="text-left font-mono">
          <span className="text-xs font-bold text-white block">Cloud Infrastructure</span>
          <span className="text-[10px] text-emerald-300">High Scalability 99.9%</span>
        </div>
      </motion.div>

      {/* Main 3D Interactive Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto my-auto transition-transform duration-100 ease-out"
      >
        {/* Top Innovation Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center bg-blue-500/10 backdrop-blur-md border border-blue-500/30 px-4.5 py-2 rounded-full text-xs font-semibold mb-6 shadow-xl shadow-blue-500/10"
        >
          <Sparkles className="w-4 h-4 text-blue-400 mr-2 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Innovating Digital Transformation
          </span>
        </motion.div>

        {/* 3D Animated Split Title */}
        <div className="[transform:translateZ(45px)]">
          <SplitText
            text="Welcome to ModulaVers Systems"
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-center mb-6 tracking-tight drop-shadow-2xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
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
        </div>

        {/* Hero Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-xl text-slate-300/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light [transform:translateZ(30px)] drop-shadow"
        >
          Building reliable, modern, and scalable software solutions that empower your business to succeed in the digital era.
        </motion.p>

        {/* Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-14 [transform:translateZ(50px)]"
        >
          <a
            href="#services"
            className="group flex items-center justify-center space-x-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 scale-100 active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#about"
            className="flex items-center justify-center space-x-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-800 hover:border-slate-700 transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            <span>Learn More</span>
          </a>
        </motion.div>

        {/* Carousel Container with 3D Glass Platform */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-full max-w-4xl p-2 bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl shadow-2xl [transform:translateZ(25px)]"
        >
          <AutoCarousel />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
