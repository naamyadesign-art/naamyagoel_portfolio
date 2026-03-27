
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
    title: "Tiffany & Co. Catalogue Design 2025",
    category: Section.CATALOGUE,
    tagline: "High-End Editorial Design",
    description: "A sophisticated catalogue design for Tiffany & Co., focusing on elegance and brand heritage.",
    longDescription: `This catalogue was created as part of my Print Design module at the Unitedworld Institute of Design, Ahmedabad. The project focuses on exploring editorial layout systems through the lens of a luxury brand, allowing me to experiment with various grid structures, typographic hierarchies, and image–text compositions. I worked with different layout styles—from structured product grids to expressive, full-bleed editorial spreads—to understand balance, pacing, and visual rhythm in print. This project helped me develop a deeper understanding of layouting, spacing, and consistency while building a cohesive, high-end publication design.`,
    image: "https://i.postimg.cc/3xZwmKcp/front-header.png",
    headerEmbed: "https://online.anyflip.com/ukyzd/bhpp/index.html",
    link: "https://online.anyflip.com/ukyzd/bhpp/index.html",
    images: [
      "https://i.postimg.cc/d1fPrXFk/fanf_b.png",
      "https://i.postimg.cc/nz37k4SL/rings.png",
      "https://i.ibb.co/G3kHqqtP/contentus.png",
      "https://i.ibb.co/v4w00kBy/earrings.png",
      "https://i.ibb.co/YFs1k9xN/eatch-page.png",
      "https://i.ibb.co/gZ8BpG8j/front-header.png"
    ],
    tech: ["Editorial Design", "Typography", "Brand Identity"]
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
    title: "Illustration Book 2025",
    category: Section.ILLUSTRATION_BOOK,
    tagline: "Visual Narrative & Storytelling",
    description: "A curated collection of illustrations woven into a cohesive visual narrative.",
    longDescription: "This illustration book is a deep dive into the art of visual storytelling. Each page is a carefully composed scene that contributes to a larger, wordless narrative. The project explores the use of color, composition, and character design to evoke emotion and guide the viewer through an immersive world. It represents a synthesis of traditional drawing techniques and digital refinement, resulting in a tactile yet polished editorial experience.",
    image:"https://i.ibb.co/qLk4p6Zm/ill.png",
    scrollImage:"https://i.ibb.co/FkpLf366/warlock.jpg"  , // Placeholder for the full-width scroll image
    isFullWidthScroll: true,
    
    tech: ["Illustration", "Photoshop", "Fresco"]
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
      "https://i.ibb.co/TB37MHCq/art7.jpg",
      "https://i.ibb.co/0pp5Cy8M/art8.jpg",
      "https://i.ibb.co/ksmqn8ZX/art9.jpg",
      "https://i.ibb.co/vrFhWkk/art10.jpg",
      "https://i.ibb.co/2H1jkGZ/cynotype.jpg",
      "https://i.ibb.co/BH5m7Gkb/art12.jpg",
      "https://i.ibb.co/XrHgq0zM/acrylic-on-canvas.jpg",
      "https://i.ibb.co/6RtMQHCK/glass-2.jpg",
      "https://i.ibb.co/qFkY331j/glass-1.jpg",
      "https://i.ibb.co/mVvCR5KQ/glass-3.jpg",
      "https://i.ibb.co/VcKnDRY9/IMG-5951.jpg",
      "https://i.ibb.co/vxWMNhcV/IMG-5508.jpg",
      "https://i.ibb.co/d02ncvgp/IMG-3337.jpg",
      "https://i.ibb.co/RG1hNZY3/screen-printing.jpg",
      "https://i.ibb.co/fYq9PmwC/lino-and-binding.jpg"
    ],
    captions: [
      "Oil on Canvas: Exploration of pigment layering and surface impasto.",
      "Pencil Portrait: Graphite rendering focusing on anatomical proportions.",
      "Pencil Study: Line weight and hatching techniques on textured paper.",
      "Charcoal Study: Value range exploration using vine and compressed charcoal.",
      "Pencil Portrait: High-contrast tonal study of facial structure.",
      "Pencil Study: Gestural sketching for rapid form capture.",
      "Watercolor: Pigment diffusion study using wet-on-wet application.",
      "Watercolor: Glazing and layering techniques for color saturation.",
      "Pencilcolor: Wax-based pigment blending and burnishing.",
      "Watercolor: Controlled wash application for geometric clarity.",
      "Cyanotype: Photographic printing process using UV-sensitive chemicals.",
      "Illustration: Editorial composition combining traditional and digital elements.",
      "Acrylic on Canvas: Impasto urban study using palette knife techniques.",
      "Glass Study: Analysis of light refraction and caustic patterns.",
      "Glass Study: Rendering of specular highlights and internal reflections.",
      "Glass Study: Structural analysis of transparent geometric volumes.",
      "Leather Bag: Material construction and functional prototyping.",
      "Sodagari Block Print: Hand-carved block printing with traditional resist-dyeing.",
      "Resin: Polymer casting process exploring material encapsulation.",
      "Screen Printing: Multi-layered stencil application and ink viscosity study.",
      "Lino & Binding: Relief printing and manual bookbinding techniques."
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