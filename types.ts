
export type Position = {
  x: number;
  y: number;
};

export enum Section {
  NONE = 'NONE',
  ABOUT = 'ABOUT',
  BRANDING = 'BRANDING',
  MOTION = 'MOTION',
  ILLUSTRATION = 'ILLUSTRATION',
  TYPOGRAPHY = 'TYPOGRAPHY',
  WEB = 'WEB',
  EXPERIMENTAL = 'EXPERIMENTAL',
  GHOST = 'GHOST'
}

// Added 'badge' and 'tag' to StickerShape to fix type errors when these shapes are used or compared.
export type StickerShape = 'star' | 'blob' | 'tape' | 'seal' | 'skew' | 'stamp' | 'bubble' | 'badge' | 'tag';

export interface StickerDef {
  id: Section;
  label: string;
  top: string;
  left: string;
  rotation: number;
  color: string;
  textColor: string;
  shapeType: StickerShape;
  size: string; // Tailwind width class e.g. 'w-48'
}

export interface Project {
  title: string;
  category: Section;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
}

export interface Landmark {
  id: Section;
  name: string;
  x: number;
  y: number;
  rotation: number;
  color: string;
  icon: string;
}