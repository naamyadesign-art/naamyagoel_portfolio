import React, { useState, useRef } from 'react';
import { Project, Section, SectionType } from '../types';
import { PROJECTS } from '../constants';
import { getGhostResponse } from '../services/geminiService';

interface ModalProps {
  onClose: () => void;
  section?: SectionType;
}

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

const ModalWrapper: React.FC<{ children: React.ReactNode; onClose: () => void; title: string; subtitle?: string; color?: string }> = ({ children, onClose, title, subtitle, color = "bg-white" }) => (
  <div className={`${color} rounded-3xl max-w-5xl w-full text-black shadow-2xl relative overflow-hidden h-[85vh] flex flex-col animate-in fade-in zoom-in duration-300 border-2 border-black/5`}>
    
    <div className="flex items-center justify-between px-8 py-6 z-50 bg-[#FFFDF5]/80 backdrop-blur-sm border-b border-black/5">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-[#8A1800] rounded-full shadow-[0_0_10px_rgba(138,24,0,0.3)]" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">Section</span>
          <span className="text-xs font-black uppercase">{title}</span>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xl font-black hover:bg-[#8A1800] transition-colors cursor-pointer"
      >
        ×
      </button>
    </div>

    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-16 relative bg-[#FFFDF5]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <p className="text-[10px] font-black tracking-[0.6em] uppercase text-[#8A1800] mb-4">{subtitle}</p>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-none">{title}</h2>
          <div className="h-1 w-24 bg-[#8A1800] mt-8" />
        </header>
        
        {children}
      </div>
    </div>

    <div className="px-8 py-4 flex justify-between items-center bg-[#FFFDF5] border-t border-black/5">
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-[#8A1800]" />
      </div>
      <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-40 italic">ARCHIVE_SYSTEM_2025</span>
    </div>
  </div>
);

export const BioModal: React.FC<ModalProps> = ({ onClose }) => {
  const [isStickyColor, setIsStickyColor] = useState(false);
  const stickyTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleProfileEnter = () => {
    if (stickyTimeout.current) clearTimeout(stickyTimeout.current);
    setIsStickyColor(true);
  };

  const handleProfileLeave = () => {
    stickyTimeout.current = setTimeout(() => {
      setIsStickyColor(false);
    }, 2000);
  };

  return (
    <ModalWrapper onClose={onClose} title="About" subtitle="Identity Log" color="bg-[#FFFDF5]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <p className="text-3xl sm:text-5xl leading-tight font-black text-black">
            Designing the <span className="text-[#8A1800] italic font-serif-elegant">unexpected</span> with technical precision.
          </p>
          <p className="text-lg text-black/60 leading-relaxed font-medium">
            I'm a creative technologist focused on building experiences that feel tactile, bold, and human. My work bridges the gap between high-end editorial logic and digital wonder.
          </p>
          
          <div className="space-y-8">
             <div className="border-l-2 border-[#8A1800] pl-6 py-2">
               <h4 className="text-xs font-black uppercase mb-2">Focus</h4>
               <p className="text-sm font-medium opacity-60">Creative Engineering, Interactive UI, Visual Systems</p>
             </div>
             <div className="border-l-2 border-black pl-6 py-2">
               <h4 className="text-xs font-black uppercase mb-2">Philosophy</h4>
               <p className="text-sm font-medium opacity-60">Code is just another medium for creative expression.</p>
             </div>
          </div>
        </div>

        <div className="relative p-4 group">
          <div 
            onMouseEnter={handleProfileEnter}
            onMouseLeave={handleProfileLeave}
            className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-black/5 shadow-2xl bg-neutral-100 relative cursor-crosshair"
          >
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
              alt="Profile" 
              className={`w-full h-full object-cover object-[center_35%] transition-all duration-1000 ${isStickyColor ? 'grayscale-0 brightness-110' : 'grayscale brightness-90'}`}
            />
          </div>
          <div className={`absolute -bottom-8 -left-8 bg-[#8A1800] text-white px-6 py-4 rounded-xl shadow-lg border border-white/10 transition-transform duration-500 ${isStickyColor ? 'scale-110 -rotate-12' : 'scale-100 -rotate-6'}`}>
            <span className="font-black text-xs uppercase tracking-widest">Digital Curator</span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export const ProjectsModal: React.FC<ModalProps & { category: SectionType }> = ({ onClose, category }) => {
  const filtered = PROJECTS.filter(p => p.category === category);

  return (
    <ModalWrapper onClose={onClose} title={category.toString()} subtitle="Creative Works" color="bg-[#FFFDF5]">
      <div className="space-y-32">
        {filtered.length > 0 ? filtered.map((project, idx) => (
          <div key={project.title} className="group flex flex-col gap-12">
            <div className="relative w-full aspect-[16/10] bg-white rounded-3xl overflow-hidden shadow-xl border border-black/5">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                 <span className="text-4xl font-serif-elegant italic text-[#8A1800]">0{idx + 1}.</span>
                 <h3 className="text-4xl sm:text-6xl font-black uppercase">{project.title}</h3>
              </div>
              <p className="text-lg font-bold text-[#8A1800] tracking-widest uppercase italic">{project.tagline}</p>
              <p className="text-black/60 text-xl leading-relaxed font-medium max-w-3xl">{project.description}</p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {project.tech.map(t => (
                  <span key={t} className="px-6 py-2 bg-white rounded-full border border-black/10 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )) : (
          <div className="py-32 text-center opacity-20">
            <p className="text-2xl font-black uppercase tracking-widest">Entry Pending...</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export const GhostModal: React.FC<ModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ghost', text: string }[]>([
    { role: 'ghost', text: 'HELLO. I AM THE RESIDENT ARCHIVIST. HOW CAN I HELP?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    const ghostText = await getGhostResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ghost', text: ghostText }]);
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Ghost" subtitle="Archive AI" color="bg-[#FFFDF5]">
      <div className="bg-white p-8 rounded-[2rem] border-2 border-black/5 shadow-inner min-h-[500px] flex flex-col justify-between">
        <div className="space-y-8 mb-10 overflow-y-auto max-h-[400px] custom-scrollbar pr-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-6 rounded-2xl ${m.role === 'user' ? 'bg-[#8A1800] text-white shadow-lg' : 'bg-gray-100 text-black border border-black/5'}`}>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] mb-3 block opacity-50">
                  {m.role === 'user' ? 'User_Input' : 'System_Output'}
                </span>
                <p className="text-lg font-bold uppercase tracking-tight">{m.text}</p>
              </div>
            </div>
          ))}
          {loading && <div className="text-xs animate-pulse font-black text-[#8A1800]">QUERYING_NEURAL_LINKS...</div>}
        </div>

        <div className="flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="TYPE_A_COMMAND..."
            className="flex-1 bg-gray-50 border border-black/10 px-8 py-5 text-black outline-none focus:border-[#8A1800] font-bold uppercase tracking-widest text-sm rounded-2xl"
          />
          <button onClick={handleSend} className="bg-black text-white px-10 py-5 font-black uppercase text-sm hover:bg-[#8A1800] transition-all tracking-widest rounded-2xl shadow-lg">
            SEND
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};