"use client"

import React, { useState } from 'react';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sadeepa Sri Rohanasinghe",
      position: "Chief Executive Officer & Founder",
      description: "Visionary leader with 15+ years of experience in tech innovation and strategic business development. Passionate about driving digital transformation.",
      image: "/images/team/sadeepa.jpg",
      color: "from-blue-600 to-blue-400"
    },
    {
      id: 2,
      name: "Hasitha Lakmak Edirisinghe",
      position: "Co - Founder & Director of Technology  ",
      description: "Technical architect and engineering leader specializing in scalable solutions and cutting-edge development practices. Expert in full-stack technologies.",
      image:"/images/team/hasitha.jpeg" ,
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen w-[100%] bg-gradient-to-br from-black via-gray-900 to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Meet Our
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-4">
              Leadership
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Driven by innovation and excellence, our leadership team brings decades of combined experience
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                index === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Card Background */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-lg group-hover:scale-125 transition-transform duration-700"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Image Container - Full Width */}
                  <div className="relative mb-10  h-120 group-hover:h-84 transition-all duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full h-full object-cover rounded-2xl border-4 border-white/30 group-hover:border-white/50 transition-all duration-500 group-hover:scale-105"
                    />
                    {/* Pulse Ring */}
                    <div className={`absolute inset-0 rounded-2xl border-2 border-white/30 ${
                      hoveredMember === member.id ? 'animate-ping' : ''
                    }`}></div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                      {member.name}
                    </h3>
                    
                    <div className="relative mb-6">
                      <p className={`text-lg font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                        {member.position}
                      </p>
                      <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${member.color} group-hover:w-full transition-all duration-500`}></div>
                    </div>

                    <p className={`text-gray-300 leading-relaxed transition-all duration-500 ${
                      hoveredMember === member.id ? 'text-white' : ''
                    }`}>
                      {member.description}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className={`absolute top-6 left-6 w-3 h-3 rounded-full bg-gradient-to-r ${member.color} transition-all duration-500 ${
                    hoveredMember === member.id ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
                  }`}></div>
                </div>
              </div>

              {/* Shadow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-20 text-center">
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TeamSection;