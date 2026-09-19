// ============================================================================
// PORTFOLIO DATA CONFIG
// ============================================================================
// Edit this single file to swap in all your real content.
// Every section of the site pulls from these exports.
// ============================================================================

export const personalInfo = {
  name: "Your Name",
  tagline: "I edit stories and build software",
  bio: "A CS engineering student with a passion for visual storytelling. I split my time between crafting cinematic edits and building elegant software — bridging the gap between creativity and code.",
};

// ---------------------------------------------------------------------------
// Skills — two tracks
// ---------------------------------------------------------------------------
export const skills = {
  videoEditing: [
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Color Grading",
    "Motion Graphics",
    "Sound Design",
    "Cinematic Transitions",
    "Storytelling",
  ],
  csEngineering: [
    "React / Next.js",
    "TypeScript",
    "Python",
    "Node.js",
    "Three.js / WebGL",
    "Data Structures & Algorithms",
    "System Design",
    "Git & CI/CD",
  ],
};

// ---------------------------------------------------------------------------
// Video Editing Projects
// ---------------------------------------------------------------------------
export interface VideoProject {
  id: string;
  title: string;
  description: string;
  thumbnailGradient: [string, string]; // [from, to] CSS gradient colors
  youtubeId: string; // Replace with real YouTube video IDs
}

export const videoProjects: VideoProject[] = [
  {
    id: "v1",
    title: "Mountain Escape",
    description:
      "A cinematic travel reel capturing the raw beauty of alpine landscapes with dynamic transitions and color grading.",
    thumbnailGradient: ["#a8b5a0", "#c5d1bf"],
    youtubeId: "dQw4w9WgXcQ", // placeholder
  },
  {
    id: "v2",
    title: "Urban Pulse",
    description:
      "High-energy city montage blending time-lapses, drone footage, and beat-synced cuts.",
    thumbnailGradient: ["#8fa085", "#b8c4b0"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "v3",
    title: "Product Launch — Aurelia",
    description:
      "Sleek product reveal video with 3D motion graphics and refined typography for a fictional tech brand.",
    thumbnailGradient: ["#c5d1bf", "#dfe8d8"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "v4",
    title: "Documentary Short: Roots",
    description:
      "A 5-minute documentary exploring local artisan culture with interview-driven storytelling.",
    thumbnailGradient: ["#b0bca8", "#a8b5a0"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "v5",
    title: "Music Video — Drift",
    description:
      "Narrative music video featuring choreographed sequences, lens flares, and experimental color science.",
    thumbnailGradient: ["#d4c5e0", "#c5b8d6"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "v6",
    title: "Event Highlight Reel",
    description:
      "Fast-paced event recap with multi-cam editing, smooth slow-motion, and an upbeat soundtrack.",
    thumbnailGradient: ["#b8c8d4", "#a0b4c4"],
    youtubeId: "dQw4w9WgXcQ",
  },
];

// ---------------------------------------------------------------------------
// CSE Projects
// ---------------------------------------------------------------------------
export interface CseProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export const cseProjects: CseProject[] = [
  {
    id: "p1",
    title: "DevFlow",
    description:
      "A real-time collaborative code editor with live cursors, syntax highlighting, and integrated terminal.",
    techStack: ["Next.js", "TypeScript", "WebSockets", "Monaco Editor"],
    githubUrl: "https://github.com/yourusername/devflow",
    liveUrl: "https://devflow.example.com",
  },
  {
    id: "p2",
    title: "NeuralViz",
    description:
      "Interactive 3D visualization of neural network architectures, letting you inspect layers and weights in the browser.",
    techStack: ["React", "Three.js", "Python", "TensorFlow"],
    githubUrl: "https://github.com/yourusername/neuralviz",
    liveUrl: "https://neuralviz.example.com",
  },
  {
    id: "p3",
    title: "CloudDeploy CLI",
    description:
      "A developer CLI tool for one-command deploys to AWS, GCP, and Azure with environment management.",
    techStack: ["Go", "Docker", "AWS SDK", "Cobra"],
    githubUrl: "https://github.com/yourusername/clouddeploy",
    liveUrl: "",
  },
  {
    id: "p4",
    title: "Markdown Garden",
    description:
      "A digital garden / wiki built with MDX, full-text search, and bi-directional linking between notes.",
    techStack: ["Next.js", "MDX", "Tailwind", "Fuse.js"],
    githubUrl: "https://github.com/yourusername/markdown-garden",
    liveUrl: "https://garden.example.com",
  },
  {
    id: "p5",
    title: "PixelSort",
    description:
      "Real-time pixel sorting art generator using WebGL shaders with adjustable parameters and export options.",
    techStack: ["TypeScript", "WebGL", "GLSL", "Canvas API"],
    githubUrl: "https://github.com/yourusername/pixelsort",
    liveUrl: "https://pixelsort.example.com",
  },
  {
    id: "p6",
    title: "SecureVault",
    description:
      "End-to-end encrypted password manager with zero-knowledge architecture and browser extension.",
    techStack: ["React", "Node.js", "PostgreSQL", "Web Crypto API"],
    githubUrl: "https://github.com/yourusername/securevault",
    liveUrl: "",
  },
];

// ---------------------------------------------------------------------------
// Social Links
// ---------------------------------------------------------------------------
export const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  instagram: "https://instagram.com/yourusername",
  youtube: "https://youtube.com/@yourusername",
  email: "hello@youremail.com",
};
