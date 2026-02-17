
import React from 'react';
import { Position, Landmark, Section } from '../types';
import { WORLD_WIDTH, WORLD_HEIGHT, LANDMARKS } from '../constants';

interface WorldMapProps {
  playerPos: Position;
  onLandmarkClick: (landmark: Landmark) => void;
}

const EntryCard: React.FC<{ landmark: Landmark; onClick: () => void; isNear: boolean }> = ({ landmark, onClick, isNear }) => {
  const isAlt = landmark.id === Section.EXPERIMENTAL || landmark.id === Section.GHOST;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-700 hover:scale-[1.02] z-40 group"
      style={{ 
        left: landmark.x, 
        top: landmark.y,
        transform: `translate(-50%, -50%) rotate(${landmark.rotation}deg)`
      }}
      onClick={onClick}
    >
      <div className={`
        ${landmark.color} p-6 sm:p-10 border border-black/10 shadow-sm
        flex flex-col items-start justify-between min-w-[200px] sm:min-w-[320px] aspect-[4/3]
        transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2
        relative overflow-hidden
      `}>
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        
        <div className="flex justify-between w-full items-start z-10">
          <span className={`text-xs font-bold tracking-[0.3em] uppercase ${isAlt ? 'text-white' : 'text-black/30'}`}>
            {landmark.icon}
          </span>
          <div className={`w-3 h-3 rounded-full ${isAlt ? 'bg-white' : 'bg-[#0047FF]'} group-hover:scale-150 transition-transform`} />
        </div>

        <div className="z-10 mt-auto">
          <h3 className={`font-bold text-2xl sm:text-3xl leading-tight tracking-tighter uppercase ${isAlt ? 'text-white' : 'text-black'}`}>
            {landmark.name.split(' // ')[1]}
          </h3>
          <p className={`text-[10px] mt-2 font-medium tracking-widest uppercase opacity-40 ${isAlt ? 'text-white' : 'text-black'}`}>
            INDEX_{landmark.name.split(' // ')[0]}
          </p>
        </div>
      </div>
      
      {isNear && (
        <div className="absolute -bottom-12 left-0 font-bold text-[9px] uppercase tracking-[0.4em] text-[#0047FF] animate-pulse">
          Click to View Entry —
        </div>
      )}
    </div>
  );
};

const WorldMap: React.FC<WorldMapProps> = ({ playerPos, onLandmarkClick }) => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  const cameraX = -(playerPos.x - screenWidth / 2);
  const cameraY = -(playerPos.y - screenHeight / 2);

  return (
    <div 
      className="fixed inset-0 bg-[#F5F5F5] transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] will-change-transform"
      style={{
        transform: `translate(${cameraX}px, ${cameraY}px)`,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
      }}
    >
      {/* Background Structural Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />
      
      {/* Large Decorative Labels */}
      <div className="absolute font-black text-[#0047FF] opacity-[0.04] text-[40rem] select-none pointer-events-none leading-none tracking-tighter"
           style={{ left: 1000, top: 1200 }}>
        ART
      </div>
      <div className="absolute font-black text-black opacity-[0.03] text-[30rem] select-none pointer-events-none leading-none tracking-tighter"
           style={{ left: 2400, top: 2200 }}>
        SYS
      </div>

      {/* Hero Composition */}
      <div 
        className="absolute z-30 pointer-events-none flex flex-col items-center select-none"
        style={{ left: 2000, top: 1700, transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          <h1 className="portfolio-title text-[#1A1A1A]">
            ARCHIVE
          </h1>
          <div className="absolute -top-12 -right-16 w-48 h-10 bg-black flex items-center justify-center px-4 font-bold text-[9px] text-white tracking-[0.5em] uppercase">
            SELECTED WORKS
          </div>
          <div className="absolute -bottom-8 left-0 h-1 w-full bg-[#0047FF]" />
        </div>
        <div className="flex gap-12 mt-8 text-[10px] font-bold tracking-[0.4em] uppercase text-black/40">
           <span>2024—2025</span>
           <span>VOL. 01</span>
           <span>EDITION_A</span>
        </div>
      </div>

      {/* Structured Landmarks */}
      {LANDMARKS.map((landmark) => {
        const isNear = Math.sqrt(Math.pow(playerPos.x - landmark.x, 2) + Math.pow(playerPos.y - landmark.y, 2)) < 350;
        return (
          <EntryCard 
            key={landmark.id} 
            landmark={landmark} 
            onClick={() => onLandmarkClick(landmark)}
            isNear={isNear}
          />
        );
      })}

      {/* Subtle Editorial Accents */}
      <div className="absolute w-[800px] h-[1px] bg-black/10" style={{ left: 1600, top: 2000 }} />
      <div className="absolute w-[1px] h-[600px] bg-black/10" style={{ left: 2000, top: 1700 }} />
      
      {/* Decorative Floating Text Fragments */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute select-none pointer-events-none font-bold text-[10px] uppercase tracking-[0.6em] text-black/10"
          style={{
            left: (i * 1234) % WORLD_WIDTH,
            top: (i * 741) % WORLD_HEIGHT,
            transform: `rotate(${i % 2 === 0 ? 90 : 0}deg)`,
          }}
        >
          {['SYSTEMS', 'CURATED', 'VISUAL', 'AESTHETIC', 'ARCHIVE', 'MOTION', 'EDITION'][i % 7]}
        </div>
      ))}
    </div>
  );
};

export default WorldMap;
