
import React from 'react';
import { Position } from '../types';

interface PlayerProps {
  pos: Position;
  direction: 'left' | 'right' | 'up' | 'down';
  isMoving: boolean;
}

const Player: React.FC<PlayerProps> = ({ pos, direction, isMoving }) => {
  return (
    <div 
      className={`
        fixed z-50 pointer-events-none transition-all duration-300 ease-out
        ${isMoving ? 'scale-125' : 'scale-100'}
      `}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Core Dot */}
        <div className="w-2.5 h-2.5 bg-[#0047FF] rounded-full shadow-[0_0_15px_rgba(0,71,255,0.4)]" />
        
        {/* Orbiting Ring */}
        <div className={`absolute inset-0 border border-black/10 rounded-full transition-transform duration-500 ${isMoving ? 'scale-150 rotate-45' : 'scale-100'}`} />
        
        {/* Crosshair accents */}
        <div className="absolute h-4 w-[1px] bg-black/20 top-[-8px]" />
        <div className="absolute h-4 w-[1px] bg-black/20 bottom-[-8px]" />
        <div className="absolute w-4 h-[1px] bg-black/20 left-[-8px]" />
        <div className="absolute w-4 h-[1px] bg-black/20 right-[-8px]" />

        {/* Direction Indicator */}
        <div className={`absolute w-1 h-1 bg-[#0047FF] rounded-full transition-all duration-300 opacity-60
          ${direction === 'up' ? 'translate-y-[-16px]' : ''}
          ${direction === 'down' ? 'translate-y-[16px]' : ''}
          ${direction === 'left' ? 'translate-x-[-16px]' : ''}
          ${direction === 'right' ? 'translate-x-[16px]' : ''}
        `} />
      </div>
    </div>
  );
};

export default Player;
