import React, { useState, useEffect } from 'react';
import { Section, Project } from './types';
import { PROJECTS } from './constants';

const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const placeholder = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800";
  
  return (
    <img 
      src={error ? placeholder : src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`${className} transition-opacity duration-500`}
    />
  );
};

const ProjectDetail: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const categoryLabel = project.category || 'Work';
  const initial = categoryLabel.charAt(0);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col animate-in fade-in duration-500 overflow-y-auto custom-scrollbar text-white">
      <div className="flex justify-between items-center p-4 sm:p-10 sticky top-0 bg-[#050505]/95 backdrop-blur-md z-10 border-b border-[#8A1800]/20">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8A1800] rounded-full flex items-center justify-center text-white font-black text-[10px] sm:text-xl shadow-[0_0_15px_rgba(138,24,0,0.5)] shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-2xl font-black uppercase tracking-tighter truncate">{project.title}</h2>
            <p className="text-[7px] sm:text-xs font-bold text-white/60 tracking-[0.2em] sm:tracking-[0.3em] uppercase">{categoryLabel}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8A1800]/10 hover:bg-[#8A1800] hover:text-white transition-all text-lg sm:text-2xl font-black shrink-0">×</button>
      </div>

      <div className="max-w-6xl mx-auto w-full px-5 sm:px-8 py-8 sm:py-16 flex flex-col gap-6 sm:gap-16">
        <div className="w-full aspect-[4/5] sm:aspect-[16/9] bg-neutral-900 rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#8A1800]/20">
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-start pb-24">
          <div className="space-y-4 sm:space-y-8">
            <p className="text-[10px] sm:text-lg font-bold text-[#8A1800] tracking-[0.3em] sm:tracking-[0.4em] uppercase">{project.tagline}</p>
            <p className="text-2xl sm:text-5xl font-inter-black leading-tight uppercase text-white">{project.description}</p>
          </div>
          <div className="space-y-6 sm:space-y-12">
            <div>
              <h4 className="text-[8px] sm:text-xs font-black uppercase tracking-widest text-[#8A1800]/60 mb-3 sm:mb-4">Project Scope</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 sm:px-6 sm:py-2 bg-[#8A1800]/10 border border-[#8A1800]/20 rounded-full text-[7px] sm:text-[10px] font-black uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-5 sm:p-8 border border-[#8A1800]/20 rounded-xl sm:rounded-3xl bg-white/[0.02]">
              <p className="font-serif-elegant italic text-sm sm:text-xl text-white/80 leading-relaxed">
                A meticulous focus on clarity and engagement, this work serves as a foundational piece in the 2025 archival series.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tiltFactor = isFlipped ? 0 : 6; 
  const cardRotateX = (mousePos.y / (window.innerHeight || 1) - 0.5) * tiltFactor;
  const cardRotateY = (mousePos.x / (window.innerWidth || 1) - 0.5) * -tiltFactor;

  const glossX = (mousePos.x / (window.innerWidth || 1)) * 100;
  const glossY = (mousePos.y / (window.innerHeight || 1)) * 100;

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden game-grid min-h-screen selection:bg-[#8A1800] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden p-4 sm:p-6">
        
        {/* Decorative HUD Accents */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out ${isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 sm:w-24 sm:h-24 border-t-2 border-l-2 border-[#8A1800]" />
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 sm:w-24 sm:h-24 border-t-2 border-r-2 border-[#8A1800]" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-12 h-12 sm:w-24 sm:h-24 border-b-2 border-l-2 border-[#8A1800]" />
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-24 sm:h-24 border-b-2 border-r-2 border-[#8A1800]" />
        </div>

        {/* Header Name */}
        <div className="absolute top-6 sm:top-10 w-full flex justify-between px-6 sm:px-10 text-[7px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#8A1800] z-10">
          <span className="font-black border-b-2 border-[#8A1800]">NAAMYA GOEL</span>
          <span className="opacity-80">PORTFOLIO ARCHIVE 2.5</span>
        </div>

        {/* 3D Flipping Card Container */}
        <div 
          className="relative z-20 w-full max-w-4xl h-[60vh] sm:h-[70vh] cursor-pointer touch-manipulation group"
          style={{ perspective: '2000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div 
            className="relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] sm:shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(${cardRotateX}deg) rotateY(${cardRotateY + (isFlipped ? 180 : 0)}deg)`
            }}
          >
            {/* FRONT SIDE */}
            <div className="absolute inset-0 backface-hidden bg-[#8A1800] text-white p-6 sm:p-16 rounded-xl overflow-hidden border-2 border-white/10 flex flex-col justify-between">
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: `radial-gradient(circle at ${glossX}% ${glossY}%, rgba(255,255,255,0.4) 0%, transparent 70%)` }}
              />
              
              <div className="relative z-10 flex flex-wrap gap-2 sm:gap-4 text-[6px] sm:text-[10px] font-black uppercase tracking-widest">
                <span className="bg-white/10 px-2 py-0.5 rounded">INITIATE</span>
                <span>CREATIVE</span>
                <span className="hidden sm:inline">EXPLORATION</span>
                <span>SYSTEM</span>
              </div>

              <div className="relative z-10 my-auto text-center flex justify-center items-center h-full">
                <h1 className="portfolio-text font-serif-elegant whitespace-nowrap text-white drop-shadow-[0_5px_25px_rgba(0,0,0,0.5)] select-none" style={{ fontSize: 'clamp(3rem, 16vw, 11rem)', letterSpacing: '-0.04em' }}>
                  port<span className="f-italic">f</span>olio
                </h1>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <div className="max-w-[140px] sm:max-w-xs space-y-1 sm:space-y-2">
                  <p className="text-[6px] sm:text-[10px] leading-relaxed font-black uppercase tracking-widest opacity-80">
                    A curated digital archive of creative logic and visual artifacts.
                  </p>
                  <span className="block font-black text-[#FFD700] underline underline-offset-4 decoration-2 animate-pulse uppercase text-[6px] sm:text-[9px]">Tap / Click to Flip</span>
                </div>
                <div className="text-xl sm:text-5xl font-serif-elegant leading-none opacity-30 italic shrink-0">
                  NG
                </div>
              </div>
            </div>

            {/* BACK SIDE */}
            <div 
              className="absolute inset-0 backface-hidden bg-[#0A0A0A] text-white p-5 sm:p-12 rounded-xl overflow-hidden border-2 border-[#8A1800]/50 flex items-center justify-center"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-12 items-center w-full max-w-3xl z-10 h-full overflow-y-auto sm:overflow-visible no-scrollbar py-4 md:py-0">
                 <div className="relative flex justify-center shrink-0 w-full max-w-[180px] md:max-w-none">
                    <div className="aspect-[3/4] w-full md:max-w-[260px] overflow-hidden border-2 border-[#8A1800] rounded-lg shadow-[0_0_40px_rgba(138,24,0,0.3)] bg-neutral-900 relative group/pic">
                       <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" 
                          alt="Naamya Goel" 
                          className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700 group-hover/pic:grayscale-0 group-hover/pic:brightness-100"
                       />
                       <div className="absolute top-0 left-0 w-full h-1 bg-[#8A1800] shadow-[0_0_15px_#8A1800] animate-[scan_3s_linear_infinite] pointer-events-none" />
                       <div className="absolute inset-0 border-[10px] border-black/20 pointer-events-none" />
                    </div>
                 </div>

                 <div className="space-y-3 sm:space-y-5 text-center md:text-left">
                    <span className="text-[7px] sm:text-[9px] font-black text-[#8A1800] tracking-[0.5em] uppercase border-b border-[#8A1800] pb-1 inline-block">Vision_Profile</span>
                    <h2 className="text-xl sm:text-4xl font-serif-elegant uppercase leading-tight text-white tracking-tighter">Naamya Goel</h2>
                    <p className="text-[8px] sm:text-sm font-black leading-relaxed opacity-80 uppercase tracking-tight max-w-xs mx-auto md:mx-0">
                       A creative engineer merging technical precision with artistic audacity. Building immersive interfaces that function like digital artifacts. Curiosity is the core engine.
                    </p>
                    <div className="pt-1 flex items-center justify-center md:justify-start gap-4">
                       <span className="h-[2px] w-6 sm:w-12 bg-[#8A1800]" />
                       <span className="text-[7px] sm:text-[9px] font-black text-[#8A1800] tracking-widest uppercase">Lead Designer</span>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-3 left-6 text-[5px] sm:text-[7px] font-black tracking-widest opacity-40 uppercase">System_Active // Port_01</div>
              <div className="absolute top-3 right-6 text-[5px] sm:text-[7px] font-black tracking-widest opacity-40 uppercase">Return_to_Cover</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 z-30 pointer-events-none">
          <div className="animate-hand opacity-80">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#8A1800] rotate-180 sm:w-8 sm:h-8">
              <path d="M18 11V6a2 2 0 0 0-2-2v0 a2 2 0 0 0-2 2v5" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0 a2 2 0 0 0-2 2v10" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0 a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.82-2.82L7 15" />
            </svg>
          </div>
          <span className="text-[6px] sm:text-[8px] font-black uppercase tracking-[0.4em] text-[#8A1800]">Archive Scroll</span>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-10 py-16 sm:py-32 relative">
        <header className="mb-10 sm:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-5 sm:gap-8 relative z-10">
           <div className="space-y-2 sm:space-y-4">
              <span className="text-white bg-[#8A1800] font-black tracking-[0.5em] uppercase text-[7px] sm:text-[10px] px-3 py-1 border border-white/20">Archive_01</span>
              <h2 className="text-3xl sm:text-7xl font-serif-elegant tracking-tighter text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none">Selected Works</h2>
           </div>
           <p className="max-w-[240px] sm:max-w-xs text-white font-black text-[8px] sm:text-xs leading-relaxed uppercase tracking-widest opacity-80 border-l border-[#8A1800] pl-4">
             A rigorous visual study of form, typography, and experience. Modern digital archives.
           </p>
        </header>

        {/* 3-Column Grid for projects (Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 relative z-10">
           {PROJECTS.map((project, idx) => (
             <div 
               key={project.title}
               onClick={() => setActiveProject(project)}
               className="group cursor-pointer space-y-3 sm:space-y-5"
             >
                <div className="relative aspect-[4/5] bg-neutral-900 rounded-lg sm:rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-[#8A1800]/10 transition-all group-hover:border-[#8A1800] group-hover:shadow-[0_20px_50px_rgba(138,24,0,0.3)]">
                   <ImageWithFallback 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                   />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                   <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <button className="w-full py-2 bg-white text-black font-black uppercase text-[8px] tracking-[0.2em] rounded">View Details</button>
                   </div>
                </div>
                <div className="flex justify-between items-start px-1">
                   <div className="space-y-0.5">
                      <h3 className="text-lg sm:text-2xl font-serif-elegant uppercase tracking-tighter text-white group-hover:text-[#8A1800] transition-colors">{project.title}</h3>
                      <p className="text-[7px] sm:text-[9px] font-bold text-[#8A1800] tracking-[0.1em] uppercase opacity-60">
                        {project.category}
                      </p>
                   </div>
                   <span className="font-serif-elegant italic text-sm sm:text-lg text-[#8A1800]/30 group-hover:text-[#8A1800] transition-colors">0{idx + 1}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#8A1800]/10 py-16 sm:py-32 px-5 sm:px-10 text-center bg-[#020202]/90 backdrop-blur-md relative overflow-hidden">
         <div className="max-w-4xl mx-auto space-y-6 sm:space-y-12 relative z-10">
            <h4 className="text-2xl sm:text-5xl font-serif-elegant tracking-tighter text-white uppercase leading-none">Initiate Dialogue</h4>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-16 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[8px] sm:text-xs text-[#8A1800]">
               <a href="#" className="hover:text-white transition-all underline underline-offset-8 decoration-[#8A1800] decoration-2">Email</a>
               <a href="#" className="hover:text-white transition-all underline underline-offset-8 decoration-[#8A1800] decoration-2">Instagram</a>
               <a href="#" className="hover:text-white transition-all underline underline-offset-8 decoration-[#8A1800] decoration-2">LinkedIn</a>
            </div>
            <div className="pt-8 sm:pt-12">
              <p className="text-[6px] sm:text-[9px] text-[#8A1800] uppercase tracking-[0.4em] sm:tracking-[0.5em] opacity-40 font-black">Design & Code © Naamya Goel — Archival System 2025</p>
            </div>
         </div>
         {/* Decorative Background Elements for Footer */}
         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#8A1800]/5 rounded-full blur-[80px]" />
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8A1800]/5 rounded-full blur-[80px]" />
      </footer>

      {activeProject && (
        <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />
      )}
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;