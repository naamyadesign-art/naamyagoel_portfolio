
import { Section, Project, Landmark } from './types';

export const WORLD_WIDTH = 4000;
export const WORLD_HEIGHT = 3000;

export const PROJECTS: Project[] = [
  {
    title: "Photobooth Website 2025",
    category: Section.WEB,
    tagline: "Interactive Digital Experience",
    description: "A high-end interactive platform for a modern photobooth service.",
    longDescription: "Vintage Photobooth Web Experience is an interactive web design project that explores nostalgia, immersion, and playful storytelling through a digital interface. Inspired by classic carnival photobooths and old cinema aesthetics, the website transforms a simple camera interaction into a full experiential journey. Users step into a virtual booth, choose from multiple photostrip presets — including cinematic film rolls, retro strips, ticket frames, and postcard-inspired layouts — capture photos through a guided booth flow, and download stylized outputs. The project combines UI/UX design, visual identity, and creative coding to recreate the emotional charm of analog photobooths within a contemporary web environment. Through warm textures, grain overlays, and theatrical visuals, the goal was to design an experience that feels tactile, nostalgic, and memorable rather than purely functional.",
    image: "https://i.ibb.co/JjbnNJTL/photoboothbynaamya-vercel-app.png",
    link: "https://photoboothbynaamya.vercel.app/",
    images: [
      "https://i.ibb.co/qFkpzkfL/photoboothbynaamya-vercel-app-1.png",
      "https://i.ibb.co/LDF0KHWj/photoboothbynaamya-vercel-app-2.png"
    ],
    tech: ["React", "WebGL", "UI/UX Design"]
  },
  {
    title: "Clive Road No. 3 Packaging 2025",
    category: Section.BRANDING,
    tagline: "Clive Road No. 3",
    description: "Bespoke packaging design for an artisanal product line.",
    longDescription: "Clive Road No. 3 is a study in material honesty and typographic elegance. The project features three distinct visual narratives—Nature Retreat, Monsoon, and Baazar and Buzz—each exploring a different facet of the artisanal experience through custom illustrations and tactile packaging mockups.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
    tech: ["Packaging Design", "Typography", "Print Production"],
    variations: [
      {
        title: "Nature Retreat",
        layoutType: 'a3-a4',
        description: "A serene, organic visual language inspired by the quietude of protected biomes. The illustration uses layered green hues and geometric leaf forms to create a sense of calm and natural purity.",
        images: [
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=800"
        ]
      },
      {
        title: "Monsoon",
        layoutType: 'a3-a4',
        description: "Capturing the atmospheric depth of the rainy season. This variation uses deep blues and warm ambers to evoke the feeling of a cozy interior against a stormy, rain-slicked exterior.",
        images: [
          "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        ]
      },
      {
        title: "Baazar and Buzz",
        layoutType: 'a3-a4',
        description: "A vibrant, high-energy narrative inspired by the bustling markets of India. The illustration features warm, spicy tones and a dense, rhythmic composition that mirrors the chaotic charm of a bazaar.",
        images: [
          "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
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
  { name: "WordPress", category: "Development", level: 85 },
  { name: "VS Code", category: "System", level: 90 }
];