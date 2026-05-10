"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sadeepa Sri Rohanasinghe",
      position: "Chief Executive Officer & Founder",
      description: "Visionary leader with 15+ years of experience in tech innovation and strategic business development. Passionate about driving digital transformation.",
      image: "/images/team/sadeepa.jpg",
      color: "from-primary to-secondary"
    },
    {
      id: 2,
      name: "Hasitha Lakmak Edirisinghe",
      position: "Co - Founder & Director of Technology  ",
      description: "Technical architect and engineering leader specializing in scalable solutions and cutting-edge development practices. Expert in full-stack technologies.",
      image:"/images/team/hasitha.jpeg" ,
      color: "from-secondary to-accent"
    }
  ];

  return (
    <div className="min-h-screen w-[100%] bg-dark-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-white/5 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/10">
            Our Team
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Meet Our
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-4">
              Leadership
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Driven by innovation and excellence, our leadership team brings decades of combined experience
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={`group relative transform transition-all duration-500 ${
                hoveredMember !== null && hoveredMember !== member.id ? 'opacity-40 scale-[0.95]' : 'opacity-100 scale-100'
              } hover:scale-[1.02]`}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Glow Effect Background */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${member.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              {/* Card Main Body */}
              <div className="relative bg-dark-card/90 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                
                {/* Image Section */}
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Gradient Overlay on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className={`text-sm font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition-all duration-500">
                      {member.name}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-500">
                      {member.description}
                    </p>
                  </div>

                  {/* Social & Action */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                    <div className="flex gap-4">
                      <a href="#" className="text-white/40 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                      <a href="#" className="text-white/40 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.986-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                      </a>
                    </div>
                    <button className={`text-xs font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent hover:scale-105 transition-transform`}>
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-20 text-center">
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"
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