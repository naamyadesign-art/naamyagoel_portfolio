
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
      <div className="flex justify-between items-center p-6 sm:p-10 sticky top-0 bg-[#050505]/95 backdrop-blur-md z-10 border-b border-[#8A1800]/20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8A1800] rounded-full flex items-center justify-center text-white font-black text-sm sm:text-xl shadow-[0_0_15px_rgba(138,24,0,0.5)]">
            {initial}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">{project.title}</h2>
            <p className="text-[10px] sm:text-xs font-bold text-white/60 tracking-[0.3em] uppercase">{categoryLabel}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8A1800]/10 hover:bg-[#8A1800] hover:text-white transition-all text-xl sm:text-2xl font-black">×</button>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 sm:px-8 py-10 sm:py-16 flex flex-col gap-10 sm:gap-16">
        <div className="w-full aspect-[4/3] sm:aspect-[16/9] bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#8A1800]/20">
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-start pb-24">
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg font-bold text-[#8A1800] tracking-[0.4em] uppercase">{project.tagline}</p>
            <p className="text-3xl sm:text-5xl font-inter-black leading-tight uppercase text-white">{project.description}</p>
          </div>
          <div className="space-y-10 sm:space-y-12">
            <div>
              <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#8A1800]/60 mb-4">Project Scope</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.tech.map(t => (
                  <span key={t} className="px-4 py-1.5 sm:px-6 sm:py-2 bg-[#8A1800]/10 border border-[#8A1800]/20 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-6 sm:p-8 border border-[#8A1800]/20 rounded-2xl sm:rounded-3xl bg-white/[0.02]">
              <p className="font-serif-elegant italic text-lg sm:text-xl text-white/80 leading-relaxed">
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

  const tiltFactor = isFlipped ? 0 : 12;
  const cardRotateX = (mousePos.y / (window.innerHeight || 1) - 0.5) * tiltFactor;
  const cardRotateY = (mousePos.x / (window.innerWidth || 1) - 0.5) * -tiltFactor;

  const glossX = (mousePos.x / (window.innerWidth || 1)) * 100;
  const glossY = (mousePos.y / (window.innerHeight || 1)) * 100;

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden game-grid min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden p-6">
        
        {/* Decorative HUD Accents - Visible only when flipped */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-in-out ${isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
          <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-[#8A1800]" />
          <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-[#8A1800]" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-[#8A1800]" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-[#8A1800]" />
        </div>

        {/* Header Name */}
        <div className="absolute top-10 w-full flex justify-between px-10 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-[#8A1800] z-10">
          <span className="font-black border-b-2 border-[#8A1800]">NAAMYA GOEL</span>
          <span className="opacity-80">PORTFOLIO ARCHIVE</span>
        </div>

        {/* 3D Flipping Card Container */}
        <div 
          className="relative z-20 w-full max-w-4xl h-[70vh] cursor-pointer"
          style={{ perspective: '2000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div 
            className="relative w-full h-full transition-transform duration-1000 ease-out shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(${cardRotateX}deg) rotateY(${cardRotateY + (isFlipped ? 180 : 0)}deg)`
            }}
          >
            {/* FRONT SIDE */}
            <div className="absolute inset-0 backface-hidden bg-[#8A1800] text-white p-8 sm:p-16 rounded overflow-hidden border-2 border-white/20 flex flex-col justify-between">
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: `radial-gradient(circle at ${glossX}% ${glossY}%, rgba(255,255,255,0.4) 0%, transparent 70%)` }}
              />
              
              <div className="relative z-10 flex flex-wrap gap-4 text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                <span className="bg-white/10 px-2 py-0.5 rounded">HI!</span>
                <span>WELCOME</span>
                <span>TO</span>
                <span>MY</span>
                <span>CREATIVE</span>
                <span>SPACE</span>
              </div>

              <div className="relative z-10 my-auto text-center flex justify-center">
                <h1 className="portfolio-text font-serif-elegant whitespace-nowrap text-white drop-shadow-[0_5px_25px_rgba(0,0,0,0.5)]" style={{ fontSize: 'clamp(2.5rem, 11vw, 8.5rem)', letterSpacing: '-0.04em' }}>
                  port<span className="f-italic" style={{ transform: 'translateX(-0.08em)' }}>f</span>olio
                </h1>
              </div>

              <div className="relative z-10 flex justify-between items-end mt-4">
                <div className="max-w-[140px] sm:max-w-xs space-y-2">
                  <p className="text-[8px] sm:text-[10px] leading-relaxed font-black uppercase tracking-widest">
                    A curated collection of visual experiences, technical explorations, and design logic.
                  </p>
                  <span className="block font-black text-[#FFD700] underline underline-offset-4 decoration-2 animate-pulse uppercase text-[8px] sm:text-[9px]">Click to Flip</span>
                </div>
                <div className="text-3xl sm:text-5xl font-serif-elegant leading-none opacity-40 italic">
                  NG
                </div>
              </div>
            </div>

            {/* BACK SIDE */}
            <div 
              className="absolute inset-0 backface-hidden bg-[#0A0A0A] text-white p-6 sm:p-12 rounded overflow-hidden border-2 border-[#8A1800] flex items-center justify-center"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center w-full max-w-3xl z-10">
                 <div className="relative order-1 flex justify-center">
                    <div className="aspect-[3/4] w-full max-w-[280px] overflow-hidden border-2 border-[#8A1800] rounded-lg shadow-[0_0_40px_rgba(138,24,0,0.4)] bg-neutral-900 relative">
                       <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" 
                          alt="Naamya Goel" 
                          className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700 hover:grayscale-0"
                       />
                       <div className="absolute top-0 left-0 w-full h-1 bg-[#8A1800] shadow-[0_0_15px_#8A1800] animate-[scan_3s_linear_infinite] pointer-events-none" />
                    </div>
                 </div>

                 <div className="space-y-4 order-2 text-center md:text-left">
                    <span className="text-[9px] font-black text-[#8A1800] tracking-[0.5em] uppercase border-b-2 border-[#8A1800] pb-1">The_Vision</span>
                    <h2 className="text-3xl sm:text-4xl font-serif-elegant uppercase leading-tight text-white">Naamya Goel</h2>
                    <p className="text-xs sm:text-sm font-black leading-relaxed opacity-80 uppercase tracking-tight max-w-xs mx-auto md:mx-0">
                       I am a creative technologist who believes interfaces should be as engaging as games. By merging technical precision with artistic spontaneity, I build digital worlds that invite curiosity and deliver impact.
                    </p>
                    <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
                       <span className="h-[2px] w-12 bg-[#8A1800]" />
                       <span className="text-[9px] font-black text-[#8A1800] tracking-widest uppercase">Digital Creator</span>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-6 left-6 text-[7px] font-black tracking-widest opacity-60 uppercase">Archive_System_Ready</div>
              <div className="absolute top-6 right-6 text-[7px] font-black tracking-widest opacity-60 uppercase">Return_to_Cover</div>
            </div>
          </div>
        </div>

        {/* Hand Scroll Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
          <div className="animate-hand text-4xl sm:text-5xl filter drop-shadow-[0_0_10px_rgba(138,24,0,0.7)] opacity-90">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8A1800] rotate-180">
              <path d="M18 11V6a2 2 0 0 0-2-2v0 a2 2 0 0 0-2 2v5" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0 a2 2 0 0 0-2 2v10" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0 a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.82-2.82L7 15" />
            </svg>
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#8A1800]">Archive Scroll</span>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-32 relative overflow-hidden">
        <header className="mb-16 sm:mb-20 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
           <div className="space-y-4">
              <span className="text-white bg-[#8A1800] font-black tracking-[0.6em] uppercase text-[10px] sm:text-xs px-4 py-1 border border-white/20">Archive_01</span>
              <h2 className="text-4xl sm:text-7xl font-serif-elegant tracking-tighter text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">Selected Works</h2>
           </div>
           <p className="max-w-xs text-white font-black text-[10px] sm:text-xs leading-relaxed uppercase tracking-widest opacity-80">
             A rigorous visual study of form, typography, and human experience. Curated selection.
           </p>
        </header>

        {/* Updated Grid: 1 col on mobile, 2 on tablet, 3 on desktop for a smaller look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14 relative z-10">
           {PROJECTS.map((project, idx) => (
             <div 
               key={project.title}
               onClick={() => setActiveProject(project)}
               className="group cursor-pointer space-y-6"
             >
                <div className="relative aspect-[4/5] bg-neutral-900 rounded-lg sm:rounded-xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.7)] border-2 border-[#8A1800]/40 transition-all group-hover:border-[#8A1800]">
                   <ImageWithFallback 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-black/60 group-hover:bg-[#8A1800]/20 transition-all" />
                </div>
                <div className="flex justify-between items-start pt-1">
                   <div className="space-y-1.5">
                      <h3 className="text-2xl sm:text-3xl font-serif-elegant uppercase tracking-tighter text-white group-hover:text-[#8A1800] transition-colors">{project.title}</h3>
                      <p className="text-[9px] sm:text-[10px] font-bold text-[#8A1800] tracking-[0.3em] uppercase opacity-60">
                        {project.category}
                      </p>
                   </div>
                   <span className="font-serif-elegant italic text-lg sm:text-xl text-[#8A1800]/40">0{idx + 1}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#8A1800]/40 py-24 sm:py-32 px-6 sm:px-10 text-center bg-[#020202]/90 backdrop-blur-md">
         <div className="max-w-4xl mx-auto space-y-12">
            <h4 className="text-3xl sm:text-5xl font-serif-elegant tracking-tighter text-white uppercase">Start a Dialogue</h4>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs text-[#8A1800]">
               <a href="#" className="hover:text-white transition-colors underline underline-offset-8 decoration-[#8A1800] decoration-2">Mail</a>
               <a href="#" className="hover:text-white transition-colors underline underline-offset-8 decoration-[#8A1800] decoration-2">Insta</a>
               <a href="#" className="hover:text-white transition-colors underline underline-offset-8 decoration-[#8A1800] decoration-2">Linked</a>
            </div>
            <div className="pt-12">
              <p className="text-[8px] sm:text-[10px] text-[#8A1800] uppercase tracking-[0.6em] opacity-40 font-black">Property of Naamya Goel — Creative Bold Archive</p>
            </div>
         </div>
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
