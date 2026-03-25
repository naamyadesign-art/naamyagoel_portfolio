import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, Section } from './types';
import { PROJECTS } from './constants';
import About from './src/pages/About';

const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const placeholder = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800";
  
  const isBehanceEmbed = src.includes('behance.net/embed');

  if (isBehanceEmbed) {
    return (
      <iframe 
        src={src} 
        className={`${className} border-0`}
        title={alt}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <img 
      src={error ? placeholder : src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`${className} block w-full transition-opacity duration-500`}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
};

const StickyImage: React.FC<{ src: string; alt: string; aspectRatio?: string; onClick?: () => void; noGrayscale?: boolean; scanColor?: string; borderColor?: string; gradientColor?: string }> = ({ src, alt, aspectRatio = "aspect-[16/10]", onClick, noGrayscale, scanColor = "#81D8D0", borderColor = "border-[#00474F]/10", gradientColor = "from-[#00474F]/10" }) => {
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
      className={`relative ${aspectRatio} bg-neutral-100 rounded-xl overflow-hidden border ${borderColor} shadow-2xl group cursor-crosshair ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="w-full h-full pointer-events-none">
        <ImageWithFallback 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-all duration-1000 ${noGrayscale ? 'grayscale-0' : (isHovered ? 'grayscale-0 scale-105' : 'grayscale brightness-105 scale-100')}`} 
        />
      </div>
      
      {/* Clickable Overlay */}
      {onClick ? (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          className="absolute inset-0 z-40 w-full h-full bg-transparent border-0 cursor-pointer appearance-none outline-none"
          aria-label={`View ${alt}`}
        />
      ) : (
        <div className="absolute inset-0 z-10 pointer-events-none" />
      )}

      <div className={`absolute inset-0 bg-gradient-to-t ${gradientColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none`} />
    </div>
  );
};

const ProjectDetail: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const galleryRef = React.useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const categoryLabel = project.category || 'Work';
  const initial = categoryLabel.charAt(0);

  const isMisc = project.category === Section.MISCELLANEOUS || project.category === Section.EXPERIMENTAL || project.category === Section.GHOST;
  const isCatalogue = project.category === Section.CATALOGUE;
  const allImages = isMisc ? (project.images || []) : [project.image, ...(project.images || [])];

  const theme = isCatalogue ? {
    bg: 'bg-white',
    text: 'text-[#00474F]',
    textMuted: 'text-[#00474F]/60',
    textMutedExtra: 'text-[#00474F]/40',
    border: 'border-[#00474F]/10',
    accent: '#81D8D0',
    accentText: 'text-[#81D8D0]',
    buttonBg: 'bg-[#00474F]',
    buttonHover: 'hover:bg-[#81D8D0] hover:text-[#00474F]',
    grid: 'catalogue-grid',
    stickyScan: '#00474F',
    stickyBorder: 'border-[#00474F]/10',
    stickyGradient: 'from-[#00474F]/10',
    shadow: 'shadow-[0_40px_120px_rgba(0,71,79,0.15)]',
    iconColor: '#00474F'
  } : {
    bg: 'bg-[#050505]',
    text: 'text-[#8A1800]',
    textMuted: 'text-[#8A1800]/60',
    textMutedExtra: 'text-[#8A1800]/40',
    border: 'border-[#8A1800]/20',
    accent: '#8A1800',
    accentText: 'text-[#8A1800]',
    buttonBg: 'bg-[#8A1800]',
    buttonHover: 'hover:bg-white hover:text-black',
    grid: 'red-grid',
    stickyScan: '#8A1800',
    stickyBorder: 'border-white/10',
    stickyGradient: 'from-[#8A1800]/20',
    shadow: 'shadow-[0_40px_120px_rgba(138,24,0,0.3)]',
    iconColor: '#8A1800'
  };

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const handleOpenLink = (url?: string | React.MouseEvent) => {
    let targetUrl = typeof url === 'string' ? url.trim() : project.link?.trim();
    
    if (targetUrl) {
      // If it's a Behance embed URL, transform it to a gallery URL
      if (targetUrl.includes('behance.net/embed/project/')) {
        const projectId = targetUrl.split('/project/')[1].split('?')[0];
        targetUrl = `https://www.behance.net/gallery/${projectId}/_`;
      }
      
      // Use a more standard way to open links that might be more reliable
      const link = document.createElement('a');
      link.href = targetUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [viewMode]);

  return (
    <div 
      ref={scrollContainerRef}
      className={`fixed inset-0 z-[100] flex flex-col transition-opacity duration-500 overflow-y-auto overflow-x-hidden custom-scrollbar ${theme.bg} ${theme.text} ${theme.grid}`}
    >
      {/* Header */}
      <div className={`flex justify-between items-center p-4 sm:p-8 sticky top-0 z-50 border-b ${theme.bg}/95 ${theme.border} ${theme.text} backdrop-blur-md`}>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-[10px] sm:text-lg shrink-0 ${theme.buttonBg} text-white ${!isCatalogue ? 'shadow-[0_0_15px_rgba(138,24,0,0.3)]' : ''}`}>
            {initial}
          </div>
          <div className="min-w-0">
            <h2 className={`text-xs sm:text-xl font-black uppercase tracking-tighter truncate leading-none ${!isCatalogue ? 'text-[#8A1800]' : theme.text}`}>{project.title}</h2>
            <p className={`text-[6px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mt-1 ${theme.textMutedExtra}`}>{categoryLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className={`hidden sm:block px-2 py-0.5 ${theme.buttonBg} text-white text-[8px] font-black tracking-[0.2em] uppercase rounded`}>
            Archive V2
          </div>
          {isMisc && viewMode === 'carousel' && (
            <button 
              onClick={() => setViewMode('grid')}
              className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${theme.text}/5 ${theme.buttonHover} transition-all`}
            >
              Back to Grid
            </button>
          )}
          <button onClick={onClose} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all text-lg sm:text-xl font-black shrink-0 ${theme.text}/10 ${theme.buttonHover}`}>×</button>
        </div>
      </div>

      <div className="w-full relative z-10">
        {project.isFullWidthScroll ? (
          <div className="w-full flex flex-col">
            {/* Full width images scroll - truly edge to edge */}
            <div className="w-full flex flex-col gap-0">
              {project.scrollImage && (
                <img 
                  src={project.scrollImage} 
                  alt={`${project.title} scroll`} 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              )}
              {project.images?.map((img, i) => (
                <img 
                  key={`img-${i}`}
                  src={img} 
                  alt={`${project.title} scroll ${i}`} 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              ))}
              {project.variations?.map((v, vIdx) => (
                v.images.map((img, iIdx) => (
                  <img 
                    key={`var-${vIdx}-${iIdx}`}
                    src={img} 
                    alt={`${v.title} scroll ${iIdx}`} 
                    className="w-full h-auto block"
                    referrerPolicy="no-referrer"
                  />
                ))
              ))}
            </div>
            
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-12 py-24 sm:py-40">
              <div className="flex items-center gap-4 opacity-40">
                 <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] ${theme.text}`}>End of Project Scroll</span>
              </div>
            </div>
          </div>
        ) : isMisc ? (
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-12 py-8 sm:py-16">
            {viewMode === 'grid' ? (
              <div className="space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {allImages.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        setActiveImageIndex(i);
                        setViewMode('carousel');
                      }}
                      className={`relative aspect-square ${theme.bg === 'bg-white' ? 'bg-neutral-100' : 'bg-neutral-900'} rounded-lg overflow-hidden border ${theme.border} shadow-xl group cursor-pointer`}
                    >
                      <ImageWithFallback 
                        src={img} 
                        alt={`${project.title} grid ${i}`} 
                        className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className={`bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${theme.border}`}>
                          View Study
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className={`border-t ${theme.border} pt-12 sm:pt-24 space-y-8`}>
                  <div>
                    <p className={`text-[9px] sm:text-xs font-black ${theme.text} tracking-[0.5em] uppercase mb-2`}>Archive_Ref: ARCHIVE_V2</p>
                    <h3 className={`text-xl sm:text-3xl font-serif-elegant italic ${theme.text} leading-none`}>{project.title}</h3>
                  </div>
                  <div>
                    <p className={`text-[9px] sm:text-xs font-black ${theme.text} tracking-[0.5em] uppercase mb-4`}>Entry // The Narrative</p>
                    <h4 className={`text-sm sm:text-lg font-sans leading-relaxed ${theme.text}/80 max-w-2xl`}>
                      {project.longDescription || project.description}
                    </h4>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[85vh] flex flex-col items-center justify-center py-8 sm:py-16">
                <div className="w-full max-w-6xl space-y-12">
                  <div className="flex justify-between items-center px-4">
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black ${theme.text} tracking-[0.4em] uppercase`}>Archive_Ref: 0{activeImageIndex + 1}</span>
                      <span className={`text-[10px] font-black ${theme.textMutedExtra} tracking-[0.2em] uppercase`}>{activeImageIndex + 1} / {allImages.length}</span>
                    </div>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-5 py-2.5 ${theme.text}/5 ${theme.buttonHover} rounded-full transition-all flex items-center gap-2`}
                    >
                      <span className="text-lg leading-none">×</span> Close Gallery
                    </button>
                  </div>

                  <div className="relative group flex flex-col items-center">
                    <div className="relative w-full flex items-center justify-center">
                      <button 
                        onClick={prevImage}
                        className={`absolute left-0 sm:left-4 z-20 p-4 ${theme.text}/20 hover:${theme.accentText} transition-colors ${theme.text}/5 sm:bg-transparent rounded-full`}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={48} strokeWidth={1} />
                      </button>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeImageIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          onClick={nextImage}
                          className="w-full flex justify-center cursor-pointer"
                        >
                          <ImageWithFallback 
                            src={allImages[activeImageIndex]} 
                            alt={`${project.title} gallery ${activeImageIndex}`} 
                            className={`max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded ${theme.shadow} border ${theme.border}`}
                          />
                        </motion.div>
                      </AnimatePresence>

                      <button 
                        onClick={nextImage}
                        className={`absolute right-0 sm:right-4 z-20 p-4 ${theme.text}/20 hover:${theme.accentText} transition-colors ${theme.text}/5 sm:bg-transparent rounded-full`}
                        aria-label="Next image"
                      >
                        <ChevronRight size={48} strokeWidth={1} />
                      </button>
                    </div>

                    <motion.div 
                      key={`caption-${activeImageIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full max-w-3xl pt-12 text-center space-y-6"
                    >
                      <div className="space-y-2">
                        <h4 className={`text-2xl sm:text-5xl font-serif-elegant italic ${theme.text} leading-tight`}>
                          {project.title} // ARCHIVE_V2 // Study_0{activeImageIndex + 1}
                        </h4>
                      </div>
                      <p className={`text-xs sm:text-base ${theme.textMuted} leading-relaxed font-sans max-w-2xl mx-auto`}>
                        {project.captions && project.captions[activeImageIndex] 
                          ? project.captions[activeImageIndex]
                          : `A detailed visual study exploring the intersection of form, texture, and digital abstraction. This entry represents a specific iteration within the ${project.title} experimental series, focusing on the nuanced balance between structure and play.`
                        }
                      </p>

                      <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
                         <div className="flex items-center gap-3">
                           <span className={`text-[8px] font-black uppercase tracking-widest ${theme.text}`}>Archive_Status</span>
                           <span className={`text-[8px] font-black uppercase tracking-widest ${theme.textMutedExtra}`}>Verified</span>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className={`text-[8px] font-black uppercase tracking-widest ${theme.text}`}>System_Log</span>
                           <span className={`text-[8px] font-black uppercase tracking-widest ${theme.textMutedExtra}`}>ARCHIVE_V2</span>
                         </div>
                         <button 
                          onClick={nextImage}
                          className={`mt-4 sm:mt-0 px-8 py-3 ${theme.buttonBg} text-white text-[10px] font-black uppercase tracking-[0.3em] rounded hover:opacity-80 transition-all shadow-lg flex items-center gap-3`}
                         >
                           Next Study <ChevronRight size={16} />
                         </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-12 py-8 sm:py-16 flex flex-col gap-12 sm:gap-20">
            {/* TOP: Image Archive Grid */}
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-[9px] sm:text-xs font-black ${theme.text} tracking-[0.5em] uppercase mb-4`}>Visual Catalog // Primary & Supplementary</p>
                  <h3 className={`text-2xl sm:text-5xl font-serif-elegant italic ${theme.text} leading-none`}>{project.tagline}</h3>
                </div>
                <span className={`text-[8px] sm:text-[10px] font-black ${theme.text}/20 uppercase tracking-[0.2em]`}>Archive_State: Full</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
                <div className="md:col-span-2">
                   {project.link ? (
                     <div className="block group/link relative">
                      <StickyImage 
                        src={project.image} 
                        alt={project.title} 
                        noGrayscale={project.title.toLowerCase().includes('perfume')} 
                        onClick={() => handleOpenLink()}
                        scanColor={theme.stickyScan}
                        borderColor={theme.stickyBorder}
                        gradientColor={theme.stickyGradient}
                      />
                       <div className={`absolute top-4 right-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity ${theme.buttonBg} text-white px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-2 pointer-events-none`}>
                         View on Behance <span className="text-xs">↗</span>
                       </div>
                     </div>
                   ) : (
                     <StickyImage src={project.image} alt={project.title} noGrayscale={project.title.toLowerCase().includes('perfume')} scanColor={theme.stickyScan} borderColor={theme.stickyBorder} gradientColor={theme.stickyGradient} />
                   )}
                </div>
                {project.images?.map((img, i) => (
                  <div key={i} className={i === (project.images?.length || 0) - 1 && (project.images?.length || 0) % 2 !== 0 ? "md:col-span-2" : "md:col-span-1"}>
                    <StickyImage src={img} alt={`${project.title} archive ${i}`} onClick={() => handleOpenLink(img)} scanColor={theme.stickyScan} borderColor={theme.stickyBorder} gradientColor={theme.stickyGradient} />
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM: Info & Narrative (Centered and Sidebar-free) */}
            <div className={`border-t ${theme.border} pt-12 sm:pt-24 flex flex-col gap-16 sm:gap-32`}>
              <div className="max-w-4xl space-y-8 sm:space-y-12">
                <div>
                  <p className={`text-[9px] sm:text-xs font-black ${theme.text} tracking-[0.5em] uppercase mb-6 sm:mb-10`}>Entry // The Narrative</p>
                  <h4 className={`text-sm sm:text-lg font-sans leading-relaxed ${theme.text}/80 max-w-2xl`}>
                    {project.longDescription || project.description}
                  </h4>
                </div>
              </div>

              {project.variations && (
                <div className="space-y-24 sm:space-y-40">
                  {project.variations.map((variation, vIdx) => (
                    <div key={vIdx} className="space-y-10 sm:space-y-16">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-4">
                          <span className={`text-[8px] sm:text-[10px] font-black ${theme.text} tracking-[0.4em] uppercase`}>Variation_0{vIdx + 1}</span>
                          <h5 className={`text-2xl sm:text-5xl font-serif-elegant italic ${theme.text}`}>{variation.title}</h5>
                        </div>
                        <p className={`max-w-md text-xs sm:text-sm font-sans ${theme.textMuted} leading-relaxed`}>
                          {variation.description}
                        </p>
                      </div>
                      <div className={`grid grid-cols-1 ${variation.layoutType === 'a3-a4' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-10 sm:gap-16`}>
                        {variation.images.map((img, iIdx) => (
                          <div key={iIdx} className={`space-y-4 ${variation.layoutType === 'a3-a4' ? (iIdx === 0 ? 'md:col-span-2' : 'md:col-span-1') : ''}`}>
                            <StickyImage 
                              src={img} 
                              alt={`${variation.title} - ${iIdx === 0 ? 'Mockup' : 'Illustration'}`} 
                              aspectRatio={variation.layoutType === 'a3-a4' ? (iIdx === 0 ? 'aspect-[1.414/1]' : 'aspect-[1/1.414]') : 'aspect-[16/10]'}
                              scanColor={theme.stickyScan}
                              borderColor={theme.stickyBorder}
                              gradientColor={theme.stickyGradient}
                            />
                            <p className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] opacity-30">
                              {iIdx === 0 ? 'Physical_Mockup' : 'Digital_Illustration'} // Archive_Ref: {vIdx}-{iIdx}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-4 pt-4 sm:pt-8 opacity-40">
                 <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] ${theme.text}`}>End of Log Entry</span>
              </div>
            </div>
          </div>
        )}
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

  const regularProjects = PROJECTS.filter(p => p.category !== Section.MISCELLANEOUS);
  const miscProject = PROJECTS.find(p => p.category === Section.MISCELLANEOUS);

  return (
    <div className={`selection:bg-[#8A1800] selection:text-white min-h-[100dvh] w-full overflow-x-hidden transition-colors duration-1000 relative bg-[#050505] red-grid`}>
      
      {/* Hero Section */}
      <section className={`relative w-full h-[100dvh] flex items-center justify-center overflow-hidden p-0 transition-all duration-1000 z-10`}>
        
        {/* HUD Elements */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ${isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
          <div className="absolute top-6 left-6 sm:top-12 sm:left-12 w-12 h-12 sm:w-32 sm:h-32 border-t border-l border-white/10" />
          <div className="absolute top-6 right-6 sm:top-12 sm:right-12 w-12 h-12 sm:w-32 sm:h-32 border-t border-r border-white/10" />
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 w-12 h-12 sm:w-32 sm:h-32 border-b border-l border-white/10" />
          <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 w-12 h-12 sm:w-32 sm:h-32 border-b border-r border-white/10" />
        </div>

        {/* Header */}
        <div className="absolute top-6 w-full flex justify-between px-6 sm:px-12 text-[7px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white z-30">
          <span className="border-b border-white/20 pb-1 pointer-events-none">NAAMYA GOEL</span>
          <div className="flex gap-8">
            <Link to="/about" className="hover:text-[#8A1800] transition-colors pointer-events-auto">ABOUT_ME</Link>
            <span className="opacity-60 pointer-events-none">SYSTEM_v2.5</span>
          </div>
        </div>

        {/* The Card Container - Flipbook Style */}
        <div 
          className="relative z-20 w-[85vw] h-[75vh] max-w-6xl max-h-[850px] transition-transform duration-500 cursor-pointer group/card"
          style={{ perspective: '2500px' }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a')) return;
            setIsFlipped(!isFlipped);
          }}
        >
          <div 
            className="relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(${cardRotateX * 0.5}deg) rotateY(${cardRotateY * 0.5 + (isFlipped ? 180 : 0)}deg)`
            }}
          >
            {/* FRONT SIDE - Page 1 */}
            <div className="absolute inset-0 backface-hidden bg-[#8A1800] text-white p-10 sm:p-20 overflow-hidden border border-white/10 flex flex-col justify-between select-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_0_120px_rgba(0,0,0,0.3)] rounded-[40px]">
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: `radial-gradient(circle at ${glossX}% ${glossY}%, rgba(255,255,255,0.4) 0%, transparent 70%)` }}
              />
              
              <div className="relative z-10 flex flex-wrap gap-6 sm:gap-10 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em]">
                <span className="bg-white/10 px-4 py-1.5 rounded-lg">INITIATE</span>
                <span className="opacity-50 py-1.5">SYSTEM</span>
                <span className="opacity-50 py-1.5">EXPLORATION</span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center flex-1">
                <h1 className="font-serif-elegant text-white leading-none text-center" 
                    style={{ fontSize: 'clamp(4rem, 18vw, 14rem)', letterSpacing: '-0.03em' }}>
                  portfolio
                </h1>
              </div>

              <div className="relative z-10 flex justify-between items-end gap-6">
                <div className="max-w-[200px] sm:max-w-[400px] space-y-4">
                  <p className="text-[8px] sm:text-[11px] leading-tight font-black uppercase tracking-[0.2em] opacity-90">
                    BOLD, STORY-DRIVEN WORK ACROSS BRANDING, TYPOGRAPHY, AND DIGITAL EXPERIENCES.
                  </p>
                  <span className="block font-black text-[#FFD700] uppercase text-[9px] sm:text-[12px] tracking-[0.5em]">TAP TO ACCESS</span>
                </div>
                <div className="text-5xl sm:text-9xl font-serif-elegant leading-none opacity-10 italic shrink-0">
                  NG
                </div>
              </div>
            </div>

            {/* BACK SIDE - Page 2 */}
            <div 
              className={`absolute inset-0 backface-hidden bg-[#050505] red-grid text-white p-5 sm:p-12 border border-white/10 flex items-center justify-center rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
              style={{ transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }}
            >
              <div 
                className="flex flex-col md:flex-row gap-6 sm:gap-16 items-center w-full max-w-4xl h-full py-6 md:py-0 relative"
                style={{ transform: 'translateZ(50px)' }}
              >
                 <div className="relative shrink-0 w-full max-w-[100px] sm:max-w-[200px]">
                    <div 
                      onMouseEnter={handleProfileEnter}
                      onMouseLeave={handleProfileLeave}
                      className="aspect-[3/4] w-full overflow-hidden border border-white/10 rounded-sm shadow-xl bg-neutral-900 relative cursor-crosshair"
                    >
                       <ImageWithFallback 
                          src="https://i.ibb.co/5hbtkfX0/Whats-App-Image-2026-01-28-at-11-56-33-AM.jpg" 
                          alt="Naamya Goel" 
                          className={`w-full h-full object-cover transition-all duration-1000 ${isStickyColor ? 'grayscale-0 brightness-105 scale-105' : 'grayscale brightness-100 scale-100'}`}
                       />
                    </div>
                 </div>

                 <div className="space-y-3 sm:space-y-6 text-center md:text-left">
                    <div className="space-y-1">
                      <span className="text-[7px] sm:text-[10px] font-black text-[#8A1800] tracking-[0.4em] uppercase">Digital_Architect</span>
                      <h2 className="text-2xl sm:text-6xl font-serif-elegant uppercase leading-none text-white tracking-tighter">Naamya Goel</h2>
                    </div>
                    <p className="text-[9px] sm:text-base font-black leading-relaxed opacity-60 uppercase tracking-tight max-w-sm mx-auto md:mx-0">
                       Visual Communication design student creating bold, story-driven work across branding, typography, packaging, and digital experiences. I love blending structure with play and storytelling.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-4 relative z-50">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToWorks();
                          }}
                          className="inline-block px-8 py-3 bg-[#8A1800] text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 rounded-sm cursor-pointer relative z-50"
                        >
                          Enter Archive
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate('/about');
                          }}
                          className="inline-block px-8 py-3 border border-white text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 rounded-sm cursor-pointer relative z-50"
                        >
                          View Profile
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Explore Archive Footer */}
        <div 
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 group/scroll cursor-pointer z-30 ${isFlipped ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
          onClick={scrollToWorks}
        >
          <div className="relative w-10 h-10 flex items-center justify-center text-[#8A1800]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
            <div className="absolute inset-0 bg-[#8A1800] blur-2xl opacity-20 group-hover/scroll:opacity-40 transition-opacity" />
          </div>
          <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.5em] text-[#8A1800] group-hover:text-white transition-colors">EXPLORE ARCHIVE</span>
        </div>
      </section>

      {/* Selected Works Section */}
      <section ref={worksSectionRef} className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-32 relative">
        <header className="mb-10 sm:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 relative z-10">
           <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-white bg-[#8A1800] font-black tracking-[0.5em] uppercase text-[7px] sm:text-[10px] px-3 py-1 border border-white/5 shadow-lg">ARCHIVE_V1</span>
              </div>
              <h2 className="text-3xl sm:text-8xl font-serif-elegant tracking-tighter text-white uppercase leading-none">
                Selected Works
              </h2>
           </div>
           <p className="max-w-[240px] sm:max-w-md text-white font-black text-[8px] sm:text-sm leading-relaxed uppercase tracking-widest opacity-60 border-l border-white/20 pl-5">
             A rigorous visual study of form, typography, and functional experience within modern digital systems.
           </p>
        </header>

        <div className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-20">
             {regularProjects.map((project, idx) => (
               <div 
                 key={project.title}
                 onClick={() => setActiveProject(project)}
                 className="group cursor-pointer space-y-4"
               >
                  <div className="relative aspect-square bg-neutral-900 rounded-lg overflow-hidden shadow-xl border border-white/10 transition-all group-hover:border-[#8A1800] group-hover:shadow-[0_15px_40px_rgba(138,24,0,0.1)]">
                     <ImageWithFallback 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                     />
                     <div className="absolute inset-0 bg-[#8A1800]/5 group-hover:bg-transparent transition-all" />
                     <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <div className="w-full py-2 bg-[#8A1800] text-white font-black uppercase text-[7px] tracking-[0.3em] rounded text-center">Open Index</div>
                     </div>
                  </div>
                  <div className="flex justify-between items-start px-1">
                     <div className="space-y-0.5">
                        <h3 className="text-lg sm:text-2xl font-serif-elegant uppercase tracking-tighter text-white group-hover:text-[#8A1800] transition-colors leading-none">{project.title}</h3>
                        <p className="text-[7px] sm:text-[9px] font-bold text-white/40 tracking-[0.1em] uppercase mt-1.5">
                          {project.category}
                        </p>
                     </div>
                     <span className="font-serif-elegant italic text-base sm:text-xl text-white/10 group-hover:text-white transition-colors leading-none">0{idx + 1}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Fine Arts & Explorations Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-32 relative border-t border-white/10">
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="px-2 py-0.5 bg-[#8A1800] text-white text-[8px] font-black tracking-[0.3em] uppercase rounded">
              Archive V2
            </div>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          {miscProject && (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setActiveProject(miscProject)}
                className="group cursor-pointer relative w-full aspect-[21/9] bg-neutral-900 rounded-xl overflow-hidden border border-white/10 hover:border-[#8A1800] transition-all shadow-2xl"
              >
                <ImageWithFallback 
                  src={miscProject.image} 
                  alt={miscProject.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-[#8A1800]/5 group-hover:bg-transparent transition-all" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="px-4 py-1.5 bg-[#8A1800] text-white text-[8px] sm:text-[10px] font-black tracking-[0.5em] uppercase rounded shadow-xl mb-4 sm:mb-8">
                    Archive V2
                  </div>
                  <h3 className="text-3xl sm:text-7xl font-serif-elegant italic text-white drop-shadow-[0_2px_10px_rgba(138,24,0,0.1)] transition-transform duration-700 group-hover:scale-110">
                    Fine Arts & Explorations
                  </h3>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="px-6 py-2 bg-[#8A1800] text-white font-black uppercase text-[8px] sm:text-[10px] tracking-[0.3em] rounded shadow-lg">Open Archive</div>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-6 px-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded">
                      <span className="text-[7px] sm:text-[9px] font-black text-white tracking-[0.4em] uppercase">Archive_Ref: ARCHIVE_V2</span>
                    </div>
                    <div className="h-[1px] w-8 bg-white/10" />
                    <h3 className="text-lg sm:text-2xl font-serif-elegant italic text-white leading-none">
                      Fine Arts & Explorations
                    </h3>
                  </div>
                  <p className="max-w-2xl text-white/60 font-sans text-[9px] sm:text-sm leading-relaxed">
                    Experiments, fine arts, and various medium explorations that push the boundaries of my visual language. This collection represents a continuous study of form, texture, and digital abstraction.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 sm:py-32 px-6 sm:px-12 text-center bg-[#050505] relative overflow-hidden">
         <div className="max-w-4xl mx-auto space-y-8 sm:space-y-16 relative z-10">
            <h4 className="text-2xl sm:text-6xl font-serif-elegant tracking-tighter text-[#8A1800] uppercase leading-none">Initiate Dialogue</h4>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-16 font-black uppercase tracking-[0.3em] text-[8px] sm:text-xs text-white">
               <div className="flex flex-col items-center gap-4">
                 <a 
                   href="mailto:naamya.design@gmail.com?subject=Portfolio Inquiry" 
                   onClick={(e) => {
                     e.preventDefault();
                     const mailtoUrl = "mailto:naamya.design@gmail.com?subject=Portfolio Inquiry";
                     const iframe = document.createElement('iframe');
                     iframe.style.display = 'none';
                     iframe.src = mailtoUrl;
                     document.body.appendChild(iframe);
                     setTimeout(() => {
                       document.body.removeChild(iframe);
                     }, 1000);
                   }}
                   className="hover:text-[#8A1800] transition-all underline underline-offset-[10px] decoration-white/20 decoration-1"
                 >
                   Email
                 </a>
                 <button 
                   onClick={() => {
                     navigator.clipboard.writeText("naamya.design@gmail.com");
                   }}
                   className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                 >
                   (Copy Address)
                 </button>
               </div>
               <a href="https://www.behance.net/naamyagoel1" target="_blank" rel="noopener noreferrer" className="hover:text-[#8A1800] transition-all underline underline-offset-[10px] decoration-white/20 decoration-1">Behance</a>
               <a href="https://www.linkedin.com/in/naamya-goel-99a5a9257/" target="_blank" rel="noopener noreferrer" className="hover:text-[#8A1800] transition-all underline underline-offset-[10px] decoration-white/20 decoration-1">LinkedIn</a>
            </div>
            <div className="pt-10">
              <p className="text-[6px] sm:text-[10px] text-white uppercase tracking-[0.4em] opacity-30 font-black">Archive Protected // 2025 © Naamya Goel</p>
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
