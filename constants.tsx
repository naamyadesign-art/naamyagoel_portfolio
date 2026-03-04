
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
    longDescription: "This project focuses on developing a cohesive packaging system for No.3 Clive Road tea blends through the use of contemporary surface illustrations. Drawing inspiration from Indian decorative motifs and bazaar culture, I created repeat patterns that balance heritage aesthetics with a modern retail presence. Each blend was treated as part of a larger visual family, ensuring consistency in layout, hierarchy, and brand recognition while allowing individual identities to emerge through colour and pattern.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
    tech: ["Packaging Design", "Illustration", "Brand Study"],
    variations: [
      {
        title: "Baazar and Buzz",
        layoutType: 'a3-a4',
        description: "A vibrant, high-energy narrative inspired by the bustling markets of India. The illustration features warm, spicy tones and a dense, rhythmic composition that mirrors the chaotic charm of a bazaar.",
        images: [
          "https://i.ibb.co/dsq4sJq2/baazar-an-buxx.png" ,
          "https://i.ibb.co/v4VQdHqh/band-b-page-0001.jpg" 
        ]
      },
      {
        title: "Nature Retreat",
        layoutType: 'a3-a4',
        description: "A serene, organic visual language inspired by the quietude of protected biomes. The illustration uses layered green hues and geometric leaf forms to create a sense of calm and natural purity.",
        images: [
         "https://i.ibb.co/Vc5NgWfq/naamya-goel-illustrations-ansd-mockups-page-0001.jpg" ,
         "https://i.ibb.co/hRF8Rx4T/naamya-goel-illustrations-ansd-mockups-page-0006.jpg" 
        ]
      },
      {
        title: "Monsoon",
        layoutType: 'a3-a4',
        description: "Capturing the atmospheric depth of the rainy season. This variation uses deep blues and warm ambers to evoke the feeling of a cozy interior against a stormy, rain-slicked exterior.",
        images: [
          "https://i.ibb.co/NnyhtC2x/naamya-goel-illustrations-ansd-mockups-page-0004.jpg" ,
          "https://i.ibb.co/4RYGNzbQ/naamya-goel-illustrations-ansd-mockups-page-0002.jpg" 
        ]
      },
      
    ]
  },
  {
    title: "Conceptual Perfume Design 2025",
    category: Section.BRANDING,
    tagline: "Olfactory Architecture",
    description: "A study in glass, light, and liquid form.",
    longDescription: "This conceptual project explores the intersection of architectural form and olfactory experience. The bottle design utilizes parametric modeling to create a vessel that captures and refracts light in unique ways, mirroring the complexity of the fragrance within. The visual narrative focuses on the tactile quality of glass and the ethereal nature of scent, presented through a series of high-fidelity renders and material studies.",
    image: "https://i.ibb.co/BVWsyHNr/perfume-bottle-together.png",
    images: [
      "https://www.behance.net/gallery/243469599/Perfume-bottle-design",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512568433527-037a898bdcee?auto=format&fit=crop&q=80&w=800"
    ],
    tech: ["Parametric Design", "3D Rendering", "Visual Identity"]
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