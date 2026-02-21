
import { Section, Project, Landmark } from './types';

export const WORLD_WIDTH = 4000;
export const WORLD_HEIGHT = 3000;

export const PROJECTS: Project[] = [
  {
    title: "Eco Branding 2024",
    category: Section.BRANDING,
    tagline: "Sustainable Identity",
    description: "A complete visual identity project for a renewable energy startup.",
    longDescription: "This project explores the intersection of organic forms and industrial precision. We developed a custom modular typeface and a color system derived from satellite imagery of protected biomes. The goal was to move away from typical 'green' tropes toward a high-end, architectural interpretation of sustainability.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
    ],
    tech: ["Illustrator", "Branding", "Concept Strategy"]
  },
  {
    title: "Cyberpunk Type",
    category: Section.TYPOGRAPHY,
    tagline: "Variable Font Experiments",
    description: "An exploration of variable fonts in a futuristic context.",
    longDescription: "A study in fluid legibility. Using OpenType variable features, we created a typeface that reacts to UI states. As the user scrolls or interacts, the weight and slant of the characters shift to mirror the physical friction of a digital interface.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800"
    ],
    tech: ["Glyphs App", "CSS Variable Fonts", "Motion Design"]
  },
  {
    title: "Neon Interface",
    category: Section.WEB,
    tagline: "Immersive Web Design",
    description: "UX/UI design for a music streaming platform.",
    longDescription: "A high-fidelity prototype focused on sensory feedback. The interface uses depth-mapping and glassmorphism to create a tactile sense of space. Every transition is modeled on real-world light refraction to enhance the 'premium' feel of the platform.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&get=80&w=800",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800"
    ],
    tech: ["Figma", "React", "WebGL Shaders"]
  },
  {
    title: "Kinetic Motion",
    category: Section.MOTION,
    tagline: "Dynamic Storytelling",
    description: "A series of abstract motion graphics exploring geometry and rhythm.",
    longDescription: "This series serves as a visual playground for physics-based animation. Each piece starts with a simple primitive—a cube, a sphere, a line—and subjects it to complex mathematical forces like Lorenz attractors and Perlin noise.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=800"
    ],
    tech: ["After Effects", "Cinema 4D", "X-Particles"]
  }
];

// Added Landmark import to fix the 'Cannot find name Landmark' error
export const LANDMARKS: Landmark[] = [];

export const TOOLS = [
  { name: "Figma", category: "Design", level: 95 },
  { name: "Adobe Suite", category: "Creative", level: 90 },
  { name: "React", category: "Development", level: 85 },
  { name: "TypeScript", category: "Development", level: 80 },
  { name: "Tailwind CSS", category: "Styling", level: 95 },
  { name: "Framer Motion", category: "Animation", level: 85 },
  { name: "Three.js", category: "3D/Web", level: 70 },
  { name: "Git", category: "System", level: 90 }
];