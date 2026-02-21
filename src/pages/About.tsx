import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin, MapPin, Cpu, Figma, Palette, Globe, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../../constants';

const About: React.FC = () => {
  return (
    <div className="min-h-screen text-white selection:bg-[#8A1800] selection:text-white overflow-x-hidden game-grid bg-[#050505]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 sm:px-12 flex justify-between items-center bg-gradient-to-b from-[#050505] to-transparent">
        <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8A1800] border-b border-[#8A1800]/40 pb-1 hover:text-white transition-colors">
          NAAMYA GOEL
        </Link>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8A1800] opacity-60">
          Profile_v2.5 // About
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[#8A1800] font-black tracking-[0.5em] uppercase text-[10px] px-3 py-1 border border-[#8A1800]/20 inline-block">
                Identity_Log
              </span>
              <h1 className="text-5xl sm:text-8xl font-serif-elegant tracking-tighter uppercase leading-none">
                Naamya <br />
                <span className="italic text-[#8A1800]">Goel</span>
              </h1>
            </div>
            
            <p className="text-sm sm:text-lg font-sans text-white/70 leading-relaxed max-w-xl">
              "A digital architect bridging the gap between raw technical systems and refined visual narratives."
            </p>

            <div className="space-y-6 text-sm sm:text-base font-black uppercase tracking-tight text-white/50 leading-relaxed max-w-lg">
              <p>
                Based in the intersection of design and development, I specialize in creating immersive digital experiences that feel as precise as they are expressive.
              </p>
              <p>
                My work is driven by a fascination with systems—how they break, how they scale, and how they can be humanized through thoughtful typography and motion.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative max-w-md mx-auto lg:ml-auto lg:mr-0"
          >
            <div className="aspect-[4/5] bg-neutral-900 rounded-2xl overflow-hidden border border-[#8A1800]/30 relative group">
              <img 
                src="https://i.ibb.co/5hbtkfX0/Whats-App-Image-2026-01-28-at-11-56-33-AM.jpg" 
                alt="Naamya Goel" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8A1800]/40 to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white">
                  <MapPin className="w-4 h-4 text-[#8A1800]" />
                  Global_Node // Remote
                </div>
              </div>
            </div>
            {/* Decorative Grid */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-t border-r border-[#8A1800]/40 -z-10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border-b border-l border-[#8A1800]/40 -z-10" />
          </motion.div>
        </section>

        {/* Tools Section */}
        <section className="mb-32 border-y border-white/5 py-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 sm:w-6 sm:h-6 text-[#8A1800]" />
                <span className="text-[7px] sm:text-[10px] font-black text-[#8A1800] tracking-[0.5em] uppercase">Tech_Stack // v2.0</span>
              </div>
              <h2 className="text-3xl sm:text-6xl font-serif-elegant tracking-tighter text-white uppercase leading-none">The Arsenal</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#8A1800]/10 border border-[#8A1800]/10">
            {TOOLS.map((tool, idx) => {
              const Icon = [Figma, Palette, Globe, Terminal][idx % 4];
              return (
                <div key={tool.name} className="bg-[#050505]/80 backdrop-blur-sm p-8 group hover:bg-[#8A1800]/5 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8A1800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-lg bg-[#8A1800]/10 flex items-center justify-center group-hover:bg-[#8A1800] group-hover:text-white transition-all duration-500">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[8px] font-mono text-[#8A1800] opacity-40">0{idx + 1}</span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[7px] font-black text-[#8A1800] tracking-widest uppercase opacity-60">{tool.category}</p>
                      <h3 className="text-xl font-serif-elegant text-white group-hover:translate-x-1 transition-transform duration-500">{tool.name}</h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[6px] font-black uppercase tracking-widest opacity-40">
                        <span>Efficiency</span>
                        <span>{tool.level}%</span>
                      </div>
                      <div className="h-0.5 w-full bg-white/5 overflow-hidden">
                        <div 
                          className="h-full bg-[#8A1800] transition-all duration-1000 ease-out group-hover:opacity-100 opacity-50"
                          style={{ width: `${tool.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact / Footer */}
        <section className="text-center space-y-12">
          <h2 className="text-4xl sm:text-7xl font-serif-elegant tracking-tighter uppercase">Connect_System</h2>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            <a href="mailto:hello@naamyagoel.com" className="group flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#8A1800] group-hover:border-[#8A1800] transition-all duration-500">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Email</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#8A1800] group-hover:border-[#8A1800] transition-all duration-500">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Instagram</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#8A1800] group-hover:border-[#8A1800] transition-all duration-500">
                <Linkedin className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">LinkedIn</span>
            </a>
          </div>
        </section>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#8A1800]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8A1800]/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

export default About;
