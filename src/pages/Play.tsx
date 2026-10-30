import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Volume2, VolumeX, RotateCcw, Sparkles, Camera, Monitor, Layers, ArrowLeft } from 'lucide-react';
import { PHOTOBOOTH_PROJECT } from '../../constants';

// Sound synthesizer using Web Audio API (no external audio assets required)
class DinoSoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  jump() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Audio context error ignore
    }
  }

  hit() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio context error ignore
    }
  }

  score() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = now + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.1, start);
        gain.gain.linearRampToValueAtTime(0.001, start + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.09);
      });
    } catch {
      // Audio context error ignore
    }
  }
}

const sounds = new DinoSoundEffects();

// Red Dino Runner Mini-Game Component
const RedDinoGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('red_dino_high_score');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [soundMuted, setSoundMuted] = useState(false);

  // Game internal variables in ref to avoid re-rendering loop
  const gameRef = useRef({
    dinoY: 0,
    dinoVY: 0,
    isGrounded: true,
    obstacles: [] as { x: number; width: number; height: number; type: number }[],
    groundOffset: 0,
    speed: 5.5,
    distance: 0,
    lastObstacleDist: 0,
    lastMilestone: 0,
    runningFrame: 0,
    animTick: 0,
    reqId: 0
  });

  const dinoImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/aistudio/red_dino.png';
    dinoImgRef.current = img;
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.enabled = soundMuted;
    setSoundMuted(!soundMuted);
  };

  const jump = useCallback(() => {
    if (gameState === 'IDLE') {
      setGameState('PLAYING');
      gameRef.current.dinoVY = -12.5;
      gameRef.current.isGrounded = false;
      sounds.jump();
      return;
    }

    if (gameState === 'GAMEOVER') {
      restartGame();
      return;
    }

    if (gameRef.current.isGrounded) {
      gameRef.current.dinoVY = -12.5;
      gameRef.current.isGrounded = false;
      sounds.jump();
    }
  }, [gameState]);

  const restartGame = useCallback(() => {
    gameRef.current = {
      dinoY: 0,
      dinoVY: 0,
      isGrounded: true,
      obstacles: [],
      groundOffset: 0,
      speed: 5.5,
      distance: 0,
      lastObstacleDist: 0,
      lastMilestone: 0,
      runningFrame: 0,
      animTick: 0,
      reqId: 0
    };
    setScore(0);
    setGameState('PLAYING');
    sounds.jump();
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const groundY = height - 36;
      const dinoHeight = 44;
      const dinoWidth = 40;
      const dinoX = 50;

      // Clear with dark atmospheric background
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);

      // Subtle retro red-grid accents in game background
      ctx.strokeStyle = 'rgba(138, 24, 0, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (gameState === 'PLAYING') {
        // Physics update
        const g = gameRef.current;
        g.distance += g.speed * 0.1;
        const currentScore = Math.floor(g.distance);
        setScore(currentScore);

        if (currentScore > 0 && currentScore % 100 === 0 && currentScore !== g.lastMilestone) {
          g.lastMilestone = currentScore;
          sounds.score();
        }

        // Gradual speed up
        g.speed = Math.min(13, 5.5 + g.distance * 0.0035);

        // Dino gravity
        g.dinoY += g.dinoVY;
        g.dinoVY += 0.72; // Gravity

        if (g.dinoY >= 0) {
          g.dinoY = 0;
          g.dinoVY = 0;
          g.isGrounded = true;
        }

        // Running animation legs tick
        g.animTick++;
        if (g.animTick % 6 === 0) {
          g.runningFrame = (g.runningFrame + 1) % 2;
        }

        // Ground scrolling
        g.groundOffset = (g.groundOffset + g.speed) % 20;

        // Obstacle spawning
        if (g.distance - g.lastObstacleDist > 55 + Math.random() * 45) {
          const type = Math.floor(Math.random() * 3);
          const obsHeight = type === 0 ? 30 : type === 1 ? 40 : 25;
          const obsWidth = type === 0 ? 18 : type === 1 ? 26 : 38;
          g.obstacles.push({
            x: width + 20,
            width: obsWidth,
            height: obsHeight,
            type
          });
          g.lastObstacleDist = g.distance;
        }

        // Move obstacles and check collisions
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          obs.x -= g.speed;

          // Collision detection bounding box
          const dinoBox = {
            left: dinoX + 6,
            right: dinoX + dinoWidth - 6,
            top: groundY - dinoHeight + g.dinoY + 4,
            bottom: groundY + g.dinoY - 2
          };

          const obsBox = {
            left: obs.x + 3,
            right: obs.x + obs.width - 3,
            top: groundY - obs.height + 2,
            bottom: groundY
          };

          const isColliding =
            dinoBox.right > obsBox.left &&
            dinoBox.left < obsBox.right &&
            dinoBox.bottom > obsBox.top &&
            dinoBox.top < obsBox.bottom;

          if (isColliding) {
            setGameState('GAMEOVER');
            sounds.hit();
            setHighScore(prev => {
              const newHigh = Math.max(prev, currentScore);
              if (typeof window !== 'undefined') {
                localStorage.setItem('red_dino_high_score', newHigh.toString());
              }
              return newHigh;
            });
            break;
          }

          // Remove off-screen obstacles
          if (obs.x + obs.width < -20) {
            g.obstacles.splice(i, 1);
          }
        }
      }

      // Draw Horizon Ground Line
      ctx.strokeStyle = '#8A1800';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Ground pixel ticks
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (let x = -gameRef.current.groundOffset; x < width; x += 16) {
        ctx.fillRect(x, groundY + 4, 3, 2);
        if (x % 32 === 0) {
          ctx.fillRect(x + 4, groundY + 9, 2, 2);
        }
      }

      // Draw Obstacles (Retro pixel cacti & blocks in vivid red & silver)
      gameRef.current.obstacles.forEach((obs) => {
        const obsY = groundY - obs.height;
        ctx.fillStyle = '#8A1800';
        ctx.fillRect(obs.x, obsY, obs.width, obs.height);

        // Highlight line on obstacles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(obs.x + 2, obsY + 2, 2, obs.height - 4);

        // Branching for taller cactus
        if (obs.type === 1) {
          ctx.fillRect(obs.x - 4, obsY + 8, 4, 12);
          ctx.fillRect(obs.x + obs.width, obsY + 14, 4, 12);
        }
      });

      // Draw Red Dino
      const dinoCurrentY = groundY - dinoHeight + gameRef.current.dinoY;
      const img = dinoImgRef.current;

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        // Draw the red dino sprite
        ctx.drawImage(img, dinoX, dinoCurrentY, dinoWidth, dinoHeight);
        ctx.restore();
      } else {
        // Fallback pixel rect
        ctx.fillStyle = '#8A1800';
        ctx.fillRect(dinoX, dinoCurrentY, dinoWidth, dinoHeight);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#080808] shadow-[0_25px_70px_rgba(138,24,0,0.18)]">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8A1800] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">RED_DINO // ARCADE RUNNER</span>
          </div>
          <span className="hidden sm:inline-block text-[9px] font-mono text-white/40">v1.0.8</span>
        </div>

        <div className="flex items-center gap-5 sm:gap-8">
          <div className="flex items-center gap-4 text-xs font-mono font-bold tracking-wider">
            <div className="text-white/50">
              <span className="text-[9px] uppercase tracking-widest text-white/30 mr-1.5 font-sans">HI</span>
              {highScore.toString().padStart(5, '0')}
            </div>
            <div className="text-white">
              <span className="text-[9px] uppercase tracking-widest text-[#8A1800] mr-1.5 font-sans">SCORE</span>
              <span className="text-white font-mono">{score.toString().padStart(5, '0')}</span>
            </div>
          </div>

          <button
            onClick={toggleSound}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {soundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div
        className="relative w-full h-[240px] sm:h-[300px] cursor-pointer select-none overflow-hidden"
        onClick={jump}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="w-full h-full block"
        />

        {/* Start Overlay */}
        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 text-center p-6">
            <img
              src="/assets/aistudio/red_dino.png"
              alt="Red Dino"
              className="w-14 h-14 object-contain filter drop-shadow-[0_0_15px_rgba(138,24,0,0.8)] animate-pulse"
            />
            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-serif-elegant text-white uppercase italic tracking-wider">
                Red Dino Runner
              </h4>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-[#8A1800]">
                PRESS SPACEBAR OR TAP TO RUN
              </p>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px] flex flex-col items-center justify-center gap-4 text-center p-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#8A1800]/20 border border-[#8A1800] flex items-center justify-center text-[#8A1800]">
              <RotateCcw size={22} className="animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8A1800]">
                COLLISION DETECTED
              </span>
              <h4 className="text-3xl sm:text-4xl font-serif-elegant text-white uppercase tracking-tight italic">
                GAME OVER
              </h4>
              <p className="text-xs font-mono text-white/60">
                Final Score: <span className="text-white font-bold">{score}</span> • High Score: <span className="text-[#8A1800] font-bold">{highScore}</span>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                restartGame();
              }}
              className="mt-2 px-6 py-2 rounded-full bg-[#8A1800] hover:bg-white hover:text-black text-white font-black uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>RESTART RUN</span>
              <span className="text-xs">↺</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="px-6 py-3 bg-black/80 border-t border-white/5 flex flex-wrap items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
        <span className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[8px]">SPACE</span> or <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[8px]">UP ARROW</span> to jump
        </span>
        <span className="text-white/30 hidden sm:inline">Tap screen on mobile devices</span>
      </div>
    </div>
  );
};

// Main Play Page
const Play: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'embed' | 'gallery'>('embed');
  const project = PHOTOBOOTH_PROJECT;

  return (
    <div className="min-h-screen text-white selection:bg-[#8A1800] selection:text-white overflow-x-hidden bg-[#050505] red-grid">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 sm:px-12 flex justify-between items-center bg-[#050505]/85 backdrop-blur-md border-b border-white/10">
        <Link
          to="/"
          className="text-[10px] font-black uppercase tracking-[0.4em] text-white border-b border-white/40 pb-1 hover:text-[#8A1800] transition-colors"
        >
          NAAMYA GOEL
        </Link>
        <div className="flex items-center gap-6 sm:gap-8 text-[10px] font-black uppercase tracking-[0.4em]">
          <Link to="/" className="text-white/60 hover:text-[#8A1800] transition-colors">
            HOME
          </Link>
          <Link to="/about" className="text-white/60 hover:text-[#8A1800] transition-colors">
            ABOUT_ME
          </Link>
          <div className="flex items-center gap-2 text-[#8A1800] border-b border-[#8A1800] pb-0.5">
            <img
              src="/assets/aistudio/red_dino.png"
              alt="Play"
              className="w-4 h-4 object-contain filter drop-shadow-[0_0_8px_rgba(138,24,0,0.9)]"
            />
            <span className="font-black">PLAY</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-28 sm:pt-36 pb-24 space-y-24 sm:space-y-36">
        {/* Header Hero */}
        <section className="space-y-8 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8A1800]/20 border border-[#8A1800]/40 text-[#8A1800] text-[9px] sm:text-[10px] font-black tracking-[0.35em] uppercase">
              <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
              <span>DIGITAL SANDBOX & INTERACTIVE LAB</span>
            </div>

            <h1 className="text-5xl sm:text-8xl font-serif-elegant tracking-tight uppercase leading-none">
              Play & <span className="italic text-[#8A1800]">Experiments</span>
            </h1>

            <p className="text-sm sm:text-base font-sans text-white/70 max-w-2xl mx-auto leading-relaxed">
              A playful realm dedicated to nostalgic arcade interactions, creative front-end experiments, and tactile digital products that turn technology into an engaging playground.
            </p>
          </motion.div>

          {/* Mini-Game Sandbox */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pt-4"
          >
            <RedDinoGame />
          </motion.div>
        </section>

        {/* Section 2: Photobooth Web Application */}
        <section id="photobooth" className="space-y-12 border-t border-white/10 pt-16 sm:pt-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8A1800]" />
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#8A1800]">
                  SECTION // 02 • INTERACTIVE APPLICATION
                </span>
              </div>
              <h2 className="text-3xl sm:text-6xl font-serif-elegant uppercase tracking-tight text-white leading-none">
                Vintage Photobooth <br />
                <span className="italic text-[#8A1800]">Web Experience</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl">
                {project.tagline || 'Interactive Digital Experience & Nostalgic Camera System'}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.link || "https://photoboothbynaamya.vercel.app/"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#8A1800] hover:bg-white hover:text-black text-white font-black uppercase text-[10px] tracking-[0.25em] transition-all flex items-center gap-2 shadow-[0_10px_25px_rgba(138,24,0,0.3)] hover:scale-105 active:scale-95"
              >
                <span>Launch Photobooth</span>
                <ExternalLink size={13} />
              </a>

              <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  onClick={() => setActiveTab('embed')}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'embed' ? 'bg-white text-black shadow' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Monitor size={12} />
                  <span>Live App</span>
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'gallery' ? 'bg-white text-black shadow' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Layers size={12} />
                  <span>Strips & UI</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Frame / Gallery */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl">
            {/* Window Chrome Header */}
            <div className="px-6 py-3.5 bg-neutral-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8A1800]/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-[10px] font-mono text-white/50 tracking-wider hidden sm:inline">
                  photoboothbynaamya.vercel.app
                </span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                <Camera size={12} className="text-[#8A1800]" />
                <span>Camera Stream Ready</span>
              </div>
            </div>

            {/* View container */}
            <div className="min-h-[550px] sm:min-h-[700px] w-full bg-black relative flex flex-col justify-center">
              {activeTab === 'embed' ? (
                <div className="relative w-full h-[600px] sm:h-[750px]">
                  <iframe
                    src={project.link || "https://photoboothbynaamya.vercel.app/"}
                    className="w-full h-full border-0 bg-neutral-950"
                    title={project.title}
                    allow="camera; microphone; clipboard-write; fullscreen"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 right-4 z-20">
                    <a
                      href={project.link || "https://photoboothbynaamya.vercel.app/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-black/80 hover:bg-[#8A1800] text-white text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 shadow-xl"
                    >
                      <span>Open Fullscreen Window</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.images && project.images.length > 0 ? (
                      project.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl"
                        >
                          <img
                            src={img}
                            alt={`Photobooth documentation ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                            <span className="text-[10px] font-black tracking-widest uppercase text-white">
                              Preview Strip 0{idx + 1}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                        <img
                          src={project.image}
                          alt="Photobooth overview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Narrative and Technical Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-6">
            <div className="lg:col-span-2 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8A1800]">
                Concept & Narrative
              </span>
              <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="space-y-6 lg:border-l lg:border-white/10 lg:pl-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Technology & Disciplines
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-wider text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block">
                  Project Direct Link
                </span>
                <a
                  href={project.link || "https://photoboothbynaamya.vercel.app/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8A1800] hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1.5"
                >
                  <span>photoboothbynaamya.vercel.app</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Back navigation CTA */}
        <section className="text-center pt-8 border-t border-white/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 hover:bg-[#8A1800] text-white border border-white/10 hover:border-[#8A1800] transition-all font-black uppercase text-[10px] tracking-[0.3em] shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio & Selected Works</span>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-6 sm:px-12 text-center bg-[#050505]">
        <div className="max-w-4xl mx-auto space-y-8">
          <h4 className="text-2xl sm:text-5xl font-serif-elegant tracking-tighter text-[#8A1800] uppercase leading-none">
            Initiate Dialogue
          </h4>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-16 font-black uppercase tracking-[0.3em] text-[8px] sm:text-xs text-white">
            <a
              href="mailto:naamya.design@gmail.com?subject=Portfolio Inquiry"
              className="hover:text-[#8A1800] transition-all underline underline-offset-[10px] decoration-white/20 decoration-1"
            >
              Email
            </a>
            <a
              href="https://www.behance.net/naamyagoel1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8A1800] transition-all underline underline-offset-[10px] decoration-white/20 decoration-1"
            >
              Behance
            </a>
            <a
              href="https://www.linkedin.com/in/naamya-goel-99a5a9257/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8A1800] transition-all underline underline-offset-[10px] decoration-white/20 decoration-1"
            >
              LinkedIn
            </a>
          </div>
          <div className="pt-8">
            <p className="text-[7px] sm:text-[10px] text-white uppercase tracking-[0.4em] opacity-30 font-black">
              Archive Protected // 2025 © Naamya Goel
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Play;
