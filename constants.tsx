
import { Section, StickerDef, Project, Landmark } from './types';

export const WORLD_WIDTH = 4000;
export const WORLD_HEIGHT = 3000;

export const STICKERS: (StickerDef & { icon: string; extraClass?: string })[] = [
  {
    id: Section.BRANDING,
    label: "BRAND",
    top: "35%",
    left: "5%",
    rotation: -15,
    color: "bg-white",
    textColor: "text-black",
    icon: "🛸",
    shapeType: 'stamp',
    size: 'w-28 sm:w-36'
  },
  {
    id: Section.ILLUSTRATION,
    label: "AHEAD",
    top: "28%",
    left: "34%",
    rotation: 0,
    color: "bg-[#2D5BFF]",
    textColor: "text-white",
    icon: "🌼",
    shapeType: 'badge',
    size: 'w-32 sm:w-40'
  },
  {
    id: Section.WEB,
    label: "DAILY",
    top: "54%",
    left: "22%",
    rotation: 5,
    color: "bg-[#FFFDF5]",
    textColor: "text-black",
    icon: "☕",
    shapeType: 'blob',
    size: 'w-24 sm:w-32'
  },
  {
    id: Section.MOTION,
    label: "SWEET",
    top: "34%",
    left: "82%",
    rotation: 12,
    color: "bg-[#FFFDF5]",
    textColor: "text-black",
    icon: "🧇",
    shapeType: 'blob',
    size: 'w-28 sm:w-36'
  },
  {
    id: Section.EXPERIMENTAL,
    label: "FRESH",
    top: "54%",
    left: "72%",
    rotation: -5,
    color: "bg-[#4CAF50]",
    textColor: "text-white",
    icon: "🐸",
    shapeType: 'badge',
    size: 'w-28 sm:w-36'
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Eco Branding 2024",
    category: Section.BRANDING,
    tagline: "Sustainable Identity",
    description: "A complete visual identity project for a renewable energy startup. Focus on clean lines and natural color palettes.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
    tech: ["Illustrator", "Branding", "Concept"]
  },
  {
    title: "Cyberpunk Type",
    category: Section.TYPOGRAPHY,
    tagline: "Variable Font Experiments",
    description: "An exploration of variable fonts in a futuristic context. Letters that warp and change based on sound input.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    tech: ["Typography", "After Effects", "Web"]
  },
  {
    title: "Nature's Palette",
    category: Section.ILLUSTRATION,
    tagline: "Botanical Illustration",
    description: "A series of hand-drawn botanical illustrations converted into digital vector assets for a skincare line.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    tech: ["Illustration", "Procreate", "Color"]
  },
  {
    title: "Neon Interface",
    category: Section.WEB,
    tagline: "Immersive Web Design",
    description: "UX/UI design for a music streaming platform that focuses on dark mode aesthetics and fluid motion.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    tech: ["Figma", "UI/UX", "Motion"]
  }
];

export const LANDMARKS: Landmark[] = [];
