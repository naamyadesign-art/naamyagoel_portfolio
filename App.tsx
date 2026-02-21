import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Project } from './types';
import { PROJECTS } from './constants';
import About from './src/pages/About';

const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const placeholder = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800";
  
  return (
    <img 
      src={error ? placeholder : src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`${className} transition-opacity duration-500`}
    />
  );
};

const StickyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setIsHovered(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => setIsHovered(false), 2000);
  };

  return (
    <div 
      onMouseEnter={handleEnter} 
      onMouseLeave={handleLeave}
      className="relative aspect-[16/10] bg-neutral-900 rounded-xl overflow-hidden border border-white/5 shadow-2xl group cursor-crosshair"
    >
      <ImageWithFallback 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'grayscale-0 scale-105' : 'grayscale brightness-75 scale-100'}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#8A1800] shadow-[0_0_15px_#8A1800] scan-line pointer-events-none" />
    </div>
  );
};

const ProjectDetail: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const categoryLabel = project.category || 'Work';
  const initial = categoryLabel.charAt(0);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col animate-in fade-in duration-500 overflow-y-auto custom-scrollbar text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-10 sticky top-0 bg-[#050505]/95 backdrop-blur-md z-50 border-b border-[#8A1800]/20">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-11 sm:h-11 bg-[#8A1800] rounded-full flex items-center justify-center text-white font-black text-[10px] sm:text-xl shadow-[0_0_15px_rgba(138,24,0,0.5)] shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-2xl font-black uppercase tracking-tighter truncate leading-none">{project.title}</h2>
            <p className="text-[7px] sm:text-xs font-bold text-white/40 tracking-[0.2em] uppercase mt-1">{categoryLabel}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8A1800]/10 hover:bg-[#8A1800] hover:text-white transition-all text-lg sm:text-2xl font-black shrink-0">×</button>
      </div>

      <div className="max-w-7xl mx-auto w-full px-5 sm:px-12 py-8 sm:py-20 flex flex-col gap-12 sm:gap-24">
        
        {/* TOP: Image Archive Grid */}
        <div className="space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] sm:text-xs font-black text-[#8A1800] tracking-[0.5em] uppercase mb-4">Visual Catalog // Primary & Supplementary</p>
              <h3 className="text-2xl sm:text-5xl font-serif-elegant italic text-white leading-none">{project.tagline}</h3>
            </div>
            <span className="text-[8px] sm:text-[10px] font-black opacity-20 uppercase tracking-[0.2em]">Archive_State: Full</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div className="md:col-span-2">
               <StickyImage src={project.image} alt={project.title} />
            </div>
            {project.images?.map((img, i) => (
              <div key={i} className={i === (project.images?.length || 0) - 1 && (project.images?.length || 0) % 2 !== 0 ? "md:col-span-2" : "md:col-span-1"}>
                <StickyImage src={img} alt={`${project.title} archive ${i}`} />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: Info & Narrative (Centered and Sidebar-free) */}
        <div className="border-t border-white/5 pt-12 sm:pt-24 flex justify-start">
          <div className="max-w-4xl space-y-8 sm:space-y-12">
            <div>
              <p className="text-[9px] sm:text-xs font-black text-[#8A1800] tracking-[0.5em] uppercase mb-6 sm:mb-10">Entry // The Narrative</p>
              <h4 className="text-2xl sm:text-6xl font-serif-elegant leading-tight text-white/90">
                {project.longDescription || project.description}
              </h4>
            </div>
            
            <div className="flex items-center gap-4 pt-4 sm:pt-8 opacity-40">
               <div className="h-[1px] w-12 bg-[#8A1800]" />
               <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em]">End of Log Entry</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer padding */}
      <div className="h-24 sm:h-40" />
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isStickyColor, setIsStickyColor] = useState(false);
  const stickyTimeout = useRef<NodeJS.Timeout | null>(null);
  const worksSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProfileEnter = () => {
    if (stickyTimeout.current) clearTimeout(stickyTimeout.current);
    setIsStickyColor(true);
  };

  const handleProfileLeave = () => {
    stickyTimeout.current = setTimeout(() => {
      setIsStickyColor(false);
    }, 2000); 
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const tiltFactor = isFlipped ? 0 : (isMobile ? 1.5 : 4); 
  const cardRotateX = (mousePos.y / (window.innerHeight || 1) - 0.5) * tiltFactor;
  const cardRotateY = (mousePos.x / (window.innerWidth || 1) - 0.5) * -tiltFactor;

  const glossX = (mousePos.x / (window.innerWidth || 1)) * 100;
  const glossY = (mousePos.y / (window.innerHeight || 1)) * 100;

  const scrollToWorks = () => {
    worksSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`selection:bg-[#8A1800] selection:text-white min-h-[100dvh] w-full overflow-x-hidden transition-colors duration-1000 game-grid ${isFlipped ? 'bg-[#0F0505]' : 'bg-[#050505]'}`}>
      
      {/* Hero Section */}
      <section className={`relative w-full h-[100dvh] flex items-center justify-center overflow-hidden p-4 sm:p-10 transition-all duration-1000 ${isFlipped ? 'opacity-90' : 'opacity-100'}`}>
        
        {/* HUD Elements */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ${isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
          <div className="absolute top-6 left-6 sm:top-12 sm:left-12 w-12 h-12 sm:w-32 sm:h-32 border-t border-l border-[#8A1800]/50" />
          <div className="absolute top-6 right-6 sm:top-12 sm:right-12 w-12 h-12 sm:w-32 sm:h-32 border-t border-r border-[#8A1800]/50" />
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 w-12 h-12 sm:w-32 sm:h-32 border-b border-l border-[#8A1800]/50" />
          <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-12 h-12 sm:w-32 sm:h-32 border-b border-r border-[#8A1800]/50" />
        </div>

        {/* Header */}
        <div className="absolute top-6 w-full flex justify-between px-6 sm:px-12 text-[7px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-[#8A1800] z-30">
          <span className="border-b border-[#8A1800]/40 pb-1 pointer-events-none">NAAMYA GOEL</span>
          <div className="flex gap-8">
            <Link to="/about" className="hover:text-white transition-colors pointer-events-auto">ABOUT_ME</Link>
            <span className="opacity-60 pointer-events-none">SYSTEM_v2.5</span>
          </div>
        </div>

        {/* The Card Container */}
        <div 
          className="relative z-20 w-full max-w-4xl h-[50dvh] sm:h-[75dvh] scale-[0.75] sm:scale-100 transition-transform duration-500 cursor-pointer"
          style={{ perspective: '2000px' }}
          onClick={(e) => {
            // Only flip if clicking the card background, not interactive elements
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a')) return;
            setIsFlipped(!isFlipped);
          }}
        >
          <div 
            className="relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(${cardRotateX}deg) rotateY(${cardRotateY + (isFlipped ? 180 : 0)}deg)`
            }}
          >
            {/* FRONT SIDE */}
            <div className="absolute inset-0 backface-hidden bg-[#8A1800] text-white p-6 sm:p-20 rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between select-none shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]">
              <div 
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{ background: `radial-gradient(circle at ${glossX}% ${glossY}%, rgba(255,255,255,0.4) 0%, transparent 70%)` }}
              />
              
              <div className="relative z-10 flex flex-wrap gap-2 sm:gap-6 text-[6px] sm:text-[10px] font-black uppercase tracking-[0.3em] opacity-80">
                <span className="bg-white/20 px-2 py-0.5 rounded">INITIATE</span>
                <span>SYSTEM</span>
                <span className="hidden sm:inline">EXPLORATION</span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center flex-1">
                <h1 className="font-serif-elegant whitespace-nowrap text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex items-center leading-none" 
                    style={{ fontSize: 'clamp(2.4rem, 14vw, 11rem)', letterSpacing: '-0.02em' }}>
                  port<span className="f-italic">f</span>olio
                </h1>
              </div>

              <div className="relative z-10 flex justify-between items-end gap-6 sm:gap-10">
                <div className="max-w-[130px] sm:max-w-xs space-y-2">
                  <p className="text-[6px] sm:text-[10px] leading-relaxed font-black uppercase tracking-widest opacity-80">
                    A curated archive of creative systems and visual artifacts.
                  </p>
                  <span className="block font-black text-[#FFD700] uppercase text-[6px] sm:text-[9px] tracking-[0.2em] animate-pulse">Tap to Access</span>
                </div>
                <div className="text-2xl sm:text-6xl font-serif-elegant leading-none opacity-20 italic shrink-0">
                  NG
                </div>
              </div>
            </div>

            {/* BACK SIDE */}
            <div 
              className={`absolute inset-0 backface-hidden bg-[#0A0A0A] text-white p-5 sm:p-12 rounded-2xl border border-[#8A1800]/50 flex items-center justify-center shadow-[inset_0_0_80px_rgba(138,24,0,0.1)] ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
              style={{ transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }}
            >
              <div 
                className="flex flex-col md:flex-row gap-6 sm:gap-16 items-center w-full max-w-4xl h-full py-6 md:py-0 relative"
                style={{ transform: 'translateZ(100px)' }}
              >
                 <div className="relative shrink-0 w-full max-w-[100px] sm:max-w-[200px]">
                    <div 
                      onMouseEnter={handleProfileEnter}
                      onMouseLeave={handleProfileLeave}
                      className="aspect-[3/4] w-full overflow-hidden border border-[#8A1800]/50 rounded-lg shadow-[0_0_40px_rgba(138,24,0,0.3)] bg-neutral-900 relative cursor-crosshair"
                    >
                       <ImageWithFallback 
                          src="https://i.ibb.co/5hbtkfX0/Whats-App-Image-2026-01-28-at-11-56-33-AM.jpg" 
                          alt="Naamya Goel" 
                          className={`w-full h-full object-cover transition-all duration-1000 ${isStickyColor ? 'grayscale-0 brightness-110 scale-105' : 'grayscale brightness-90 scale-100'}`}
                       />
                       <div className="absolute top-0 left-0 w-full h-[2px] bg-[#8A1800] shadow-[0_0_15px_#8A1800] scan-line pointer-events-none" />
                    </div>
                 </div>

                 <div className="space-y-3 sm:space-y-6 text-center md:text-left">
                    <div className="space-y-1">
                      <span className="text-[7px] sm:text-[10px] font-black text-[#8A1800] tracking-[0.4em] uppercase opacity-80">Digital_Architect</span>
                      <h2 className="text-2xl sm:text-6xl font-serif-elegant uppercase leading-none text-white tracking-tighter">Naamya Goel</h2>
                    </div>
                    <p className="text-[9px] sm:text-base font-black leading-relaxed opacity-60 uppercase tracking-tight max-w-sm mx-auto md:mx-0">
                       Melding creative intuition with systemic precision. Crafting digital artifacts that live within high-end visual frameworks.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
                       <span className="h-[2px] w-8 sm:w-12 bg-[#8A1800]/50" />
                       <span className="text-[7px] sm:text-[11px] font-black text-[#8A1800] tracking-widest uppercase">Archive 2025</span>
                    </div>
                    <div className="pt-4 relative z-50">
                       <button 
                         onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           console.log('Navigating to about...');
                           navigate('/about');
                         }}
                         className="inline-block px-8 py-3 border border-[#8A1800] text-[#8A1800] text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#8A1800] hover:text-white transition-all duration-500 rounded-sm shadow-[0_0_20px_rgba(138,24,0,0.1)] hover:shadow-[0_0_30px_rgba(138,24,0,0.4)] cursor-pointer relative z-50"
                       >
                         View Full Profile
                       </button>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-4 left-6 text-[5px] sm:text-[8px] font-black tracking-widest opacity-40 uppercase">STATUS // ACTIVE</div>
              <div className="absolute top-4 right-6 text-[5px] sm:text-[8px] font-black tracking-widest opacity-40 uppercase">CLOSE // CARD</div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div 
          onClick={scrollToWorks}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 pointer-events-auto cursor-pointer group/scroll"
        >
          <div className="animate-hand opacity-60 group-hover/scroll:opacity-100 transition-opacity">
            <div className="rotate-180">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A1800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8">
                <path d="M7 13V6a2 2 0 1 1 4 0v7" />
                <path d="M11 13V4a2 2 0 1 1 4 0v9" />
                <path d="M15 13V6a2 2 0 1 1 4 0v7" />
                <path d="M19 13V11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2.17a2 2 0 0 1-1.42-.59l-4.41-4.41a2 2 0 0 1 2.83-2.83L11 15.17" />
              </svg>
            </div>
          </div>
          <span className="text-[6px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[#8A1800] drop-shadow-sm group-hover/scroll:text-white transition-colors">Explore Archive</span>
        </div>
      </section>

      {/* Grid Section */}
      <section ref={worksSectionRef} className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-32 relative">
        <header className="mb-10 sm:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 relative z-10">
           <div className="space-y-3">
              <span className="text-white bg-[#8A1800] font-black tracking-[0.5em] uppercase text-[7px] sm:text-[10px] px-3 py-1 border border-white/5 shadow-lg">ARCHIVE_V1</span>
              <h2 className="text-3xl sm:text-8xl font-serif-elegant tracking-tighter text-white uppercase leading-none">Selected Works</h2>
           </div>
           <p className="max-w-[240px] sm:max-w-md text-white font-black text-[8px] sm:text-sm leading-relaxed uppercase tracking-widest opacity-60 border-l border-[#8A1800] pl-5">
             A rigorous visual study of form, typography, and functional experience within modern digital systems.
           </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 relative z-10">
           {PROJECTS.map((project, idx) => (
             <div 
               key={project.title}
               onClick={() => setActiveProject(project)}
               className="group cursor-pointer space-y-4"
             >
                <div className="relative aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden shadow-xl border border-[#8A1800]/10 transition-all group-hover:border-[#8A1800] group-hover:shadow-[0_15px_40px_rgba(138,24,0,0.3)]">
                   <ImageWithFallback 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                   />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                   <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <div className="w-full py-2 bg-white text-black font-black uppercase text-[7px] tracking-[0.3em] rounded text-center">Open Index</div>
                   </div>
                </div>
                <div className="flex justify-between items-start px-1">
                   <div className="space-y-0.5">
                      <h3 className="text-lg sm:text-2xl font-serif-elegant uppercase tracking-tighter text-white group-hover:text-[#8A1800] transition-colors leading-none">{project.title}</h3>
                      <p className="text-[7px] sm:text-[9px] font-bold text-[#8A1800] tracking-[0.1em] uppercase opacity-50 mt-1.5">
                        {project.category}
                      </p>
                   </div>
                   <span className="font-serif-elegant italic text-base sm:text-xl text-[#8A1800]/40 group-hover:text-[#8A1800] transition-colors leading-none">0{idx + 1}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#8A1800]/20 py-16 sm:py-32 px-6 sm:px-12 text-center bg-[#030303] relative overflow-hidden">
         <div className="max-w-4xl mx-auto space-y-8 sm:space-y-16 relative z-10">
            <h4 className="text-2xl sm:text-6xl font-serif-elegant tracking-tighter text-white uppercase leading-none">Initiate Dialogue</h4>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-16 font-black uppercase tracking-[0.3em] text-[8px] sm:text-xs text-[#8A1800]">
               <a href="#" className="hover:text-white transition-all underline underline-offset-[10px] decoration-[#8A1800] decoration-1">Email</a>
               <a href="#" className="hover:text-white transition-all underline underline-offset-[10px] decoration-[#8A1800] decoration-1">Instagram</a>
               <a href="#" className="hover:text-white transition-all underline underline-offset-[10px] decoration-[#8A1800] decoration-1">LinkedIn</a>
            </div>
            <div className="pt-10">
              <p className="text-[6px] sm:text-[10px] text-[#8A1800] uppercase tracking-[0.4em] opacity-30 font-black">Archive Protected // 2025 © Naamya Goel</p>
            </div>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[#8A1800]/5 rounded-full blur-[100px] pointer-events-none" />
      </footer>

      {activeProject && (
        <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
