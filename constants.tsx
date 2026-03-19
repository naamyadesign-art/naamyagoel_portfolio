
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
    image: "https://i.ibb.co/zh862kzc/hero-image.png", // This remains the thumbnail/cover
    scrollImage: "https://i.ibb.co/N6JGDSqQ/clive-road-full.jpg" , // Replace with your 4961x23027px image
    isFullWidthScroll: true,
    tech: ["Packaging Design", "Illustration", "Brand Study"],
  },
  {
    title: "Conceptual Perfume Design 2025",
    category: Section.BRANDING,
    tagline: "Olfactory Architecture",
    description: "A study in glass, light, and liquid form.",
    longDescription: "This conceptual project explores the intersection of architectural form and olfactory experience. The bottle design utilizes parametric modeling to create a vessel that captures and refracts light in unique ways, mirroring the complexity of the fragrance within. The visual narrative focuses on the tactile quality of glass and the ethereal nature of scent, presented through a series of high-fidelity renders and material studies.",
    image: "https://i.ibb.co/BVWsyHNr/perfume-bottle-together.png",
    link: "https://www.behance.net/gallery/243469599/Perfume-bottle-design",
    images: [
      "https://www.behance.net/embed/project/243469599?ilo0=1",
      "https://www.behance.net/embed/project/243728099?ilo0=1",
     "https://www.behance.net/embed/project/243761961?ilo0=1" ,
     "https://www.behance.net/embed/project/243751353?ilo0=1",
      "https://www.behance.net/embed/project/243715405?ilo0=1"
    ],
    tech: ["Parametric Design", "3D Rendering", "Visual Identity"]
  },
  {
    title: "Catalogue Design",
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
  },
  {
    title: "Miscellaneous",
    category: Section.MISCELLANEOUS,
    tagline: "Uncategorized Artifacts",
    description: "A collection of visual experiments and projects that defy singular categorization.",
    longDescription: "This gallery serves as a living archive for spontaneous experiments, quick visual studies, and projects that exist outside the boundaries of my primary work categories. It is a space for raw creativity, material exploration, and the 'happy accidents' that occur during the creative process.",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
    ],
    tech: ["Mixed Media", "Digital Art", "Experimental"]
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