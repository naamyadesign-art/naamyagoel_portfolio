
export type Position = {
  x: number;
  y: number;
};

export const Section = {
  NONE: 'NONE',
  ABOUT: 'ABOUT',
  BRANDING: 'BRANDING',
  MOTION: 'MOTION',
  ILLUSTRATION: 'ILLUSTRATION',
  TYPOGRAPHY: 'TYPOGRAPHY',
  WEB: 'WEB',
  EXPERIMENTAL: 'EXPERIMENTAL',
  GHOST: 'GHOST'
} as const;

export type SectionType = typeof Section[keyof typeof Section];

export type StickerShape = 'star' | 'blob' | 'tape' | 'seal' | 'skew' | 'stamp' | 'bubble' | 'badge' | 'tag';

export interface StickerDef {
  id: SectionType;
  label: string;
  top: string;
  left: string;
  rotation: number;
  color: string;
  textColor: string;
  shapeType: StickerShape;
  size: string; 
}

export interface Variation {
  title: string;
  description: string;
  images: string[];
  layoutType?: 'default' | 'a3-a4';
}

export interface Project {
  title: string;
  category: SectionType;
  tagline: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  tech: string[];
  link?: string;
  variations?: Variation[];
}

export interface Landmark {
  id: SectionType;
  name: string;
  x: number;
  y: number;
  rotation: number;
  color: string;
  icon: string;
}
