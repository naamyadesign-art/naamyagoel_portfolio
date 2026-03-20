
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
    title: "Typography",
    category: Section.TYPOGRAPHY,
    tagline: "Structural Expression",
    description: "An exploration of letterforms, hierarchy, and visual rhythm.",
    longDescription: "This project is a deep dive into the architecture of type. By deconstructing and reassembling letterforms, I explore how typography can function as both a carrier of meaning and a purely aesthetic structural element. The works focus on the tension between legibility and abstraction, utilizing grid systems and experimental layouts to create a cohesive visual language.",
    image: "https://i.ibb.co/35sfw4mV/ty.png" ,
    scrollImage: "https://i.ibb.co/KJ5BqY9/POSTER.png", // Placeholder: Replace with your 4923x12856px image URL
    isFullWidthScroll: true,
    tech: ["InDesign", "Illustrator", "Layout Design"]
  },
  {
    title: "Fine Arts & Explorations",
    category: Section.MISCELLANEOUS,
    tagline: "Mediums & Experiments",
    description: "A collection of fine arts and experimental medium explorations.",
    longDescription: "This section is a dedicated space for my explorations in fine arts and various creative mediums. It represents my interest in stepping away from digital constraints to play with textures, physical forms, and traditional techniques. From charcoal sketches to mixed-media experiments, these works are about the joy of discovery and the tactile process of creation. It's a playground where I test new design styles and push the boundaries of my visual language.",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://i.ibb.co/0jjKJ7W7/oil-on-canvas.jpg",
      "https://i.ibb.co/dswMfRY8/art2.jpg",
      "https://i.ibb.co/N2VryCxP/art3.jpg",
      "https://i.ibb.co/SX0Vv0Tt/art4.jpg",
      "https://i.ibb.co/1YZ6wnBb/art5.jpg",
      "https://i.ibb.co/gZFKycBY/Portrait-in-pencil.jpg",
       "https://i.ibb.co/TB37MHCq/art7.jpg" ,
       "https://i.ibb.co/0pp5Cy8M/art8.jpg" ,
       "https://i.ibb.co/ksmqn8ZX/art9.jpg" ,
       "https://i.ibb.co/vrFhWkk/art10.jpg" ,
      "https://i.ibb.co/2H1jkGZ/cynotype.jpg" ,
       "https://i.ibb.co/BH5m7Gkb/art12.jpg" ,
       "https://i.ibb.co/XrHgq0zM/acrylic-on-canvas.jpg" ,
     "https://i.ibb.co/6RtMQHCK/glass-2.jpg" ,
      "https://i.ibb.co/qFkY331j/glass-1.jpg" ,
      "https://i.ibb.co/mVvCR5KQ/glass-3.jpg" 
    ],
    captions: [
      "Study 1: Oil on canvas",
      "Study 2: Portrait in pencil",
      "Study 3: Portrait in pencil",
      "Study 4: Portrait in charcoal",
      "Study 5: Portrait in pencil",
      "Study 6: Portrait in pencil",
      "Study 7: Watercolor",
      "Study 8: Watercolor",
      "Study 9: Pencilcolor",
      "Study 10: Watercolor",
      "Study 11: Cyanotype",
      "Study 12: Illustration for school art magazine",
      "Study 13: Acrylic on canvas - Kolkata cityscape",
      "Study 14: Glass Study - An exploration of transparency and light",
      "Study 15: Glass Study - Capturing the intricate reflections on a glass surface",
      "Study 16: Glass Study - A study of form and clarity through the medium of glass"
    ],
    tech: ["Fine Arts", "Mixed Media", "Experimental"]
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