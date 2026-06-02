export const personal = {
  name: "Sajideen Hassan",
  title: "Web & AI Developer",
  tagline: "Building Clean Web Apps & AI Tools",
  bio: "I build fast web apps, smart AI tools, and modern digital platforms. I focus on speed, clean code, and simple design that works well.",
  photo: profilePhoto,
  email: "sajideenhassan12@gmail.com",
  location: "Pakistan",
  cvUrl: "/Sajideen-Resume.pdf",
  social: {
    github: "https://github.com/Sajideen-Hassan",
    linkedin: "https://www.linkedin.com/in/sajideen-hassan",
  },
};

export const roles = [
  "Web & AI Developer",
  "React & Next.js Expert",
  "Node.js Backend Developer",
  "AI Tools Builder",
  "Full Stack Creator",
];

export const skills = [
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3', 'Redux'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'GraphQL', 'REST APIs', 'WebSockets'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Redis', 'Prisma'],
  },
  {
    category: 'AI & Automation',
    items: ['OpenAI API', 'LangChain', 'Claude API', 'n8n', 'AI Agents', 'Workflow Automation', 'Vector Databases'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Vercel', 'Railway', 'Linux', 'Figma', 'Stripe API'],
  },
];

import asCover from '../assets/AS_coverImage.webp';
import brotchunCover from '../assets/Brotchun_coverImage.webp';
import imgGenCover from '../assets/Image_generator.webp';
import ivCover from '../assets/IV_coverImage.webp';
import n8nCover from '../assets/n8n_workflow_01.webp';
import profilePhoto from '../assets/SajideenHassanprofile.webp';

export const projects = [
  {
    id: 1,
    title: "AuraSpeech",
    description: "AI tool that turns speech into text, finds who is speaking, and lets you search through audio files quickly.",
    tags: ["Next.js", "Python", "OpenAI", "MongoDB", "WebSockets"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: asCover,
  },
  {
    id: 2,
    title: "Inventory Management System",
    description: "Track stock and manage orders in real time. Supports barcode scanning and works across multiple warehouses.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: ivCover,
  },
  {
    id: 3,
    title: "Brotchun",
    description: "A social platform where creators share content, chat in real time, and get smart recommendations powered by AI.",
    tags: ["Next.js", "TypeScript", "MongoDB", "AWS", "GraphQL"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: brotchunCover,
  },
  {
    id: 4,
    title: "N8N Workflow Marketplace",
    description: "A marketplace to find and share n8n workflow templates. Includes auto setup, version tracking, and user ratings.",
    tags: ["React", "Node.js", "PostgreSQL", "n8n", "Stripe"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: n8nCover,
  },
  {
    id: 5,
    title: "Image Generator",
    description: "Create images with AI using text prompts. Supports different styles and can process multiple images at once.",
    tags: ["React", "Python", "AI", "OpenAI", "Node.js"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: imgGenCover,
  },
];

export const experience = [
  {
    role: "Associate Software Engineer",
    company: "TechTideCo",
    period: "Nov 2025 - Present",
    description: "Built web apps using React, Node.js, and MongoDB. Created fast APIs and clean interfaces. Worked in a team using Agile methods and helped review code.",
    tech: ["MERN", "Node.js", "Express", "MongoDB", "React", "REST APIs", "GitHub", "Agile"],
  },
  {
    role: "Software Engineer Intern",
    company: "TechTideCo",
    period: "Aug 2025 - Nov 2025",
    description: "Helped build web apps in a real production setting. Built APIs with login systems and connected them to the frontend. Fixed performance issues to make apps run faster.",
    tech: ["Full Stack", "REST APIs", "Auth", "Frontend", "Backend", "Performance"],
  },
  {
    role: "Management Lead",
    company: "ISPR Internship",
    period: "July 2025 - Aug 2025",
    description: "Managed communication workflows and supported public relations operations. Coordinated team activities to ensure timely execution of assigned tasks. Assisted in organizing and distributing structured informational content.",
    tech: ["Communication", "PR", "Coordination", "Content Mgmt"],
  },
  {
    role: "Web Developer Intern",
    company: "IT Club",
    period: "Jan 2025 - Mar 2025",
    description: "Conducted research on information systems and digital literacy frameworks. Improved data processing efficiency through structured analysis methods.",
    tech: ["Research", "Info Systems", "Data Analysis"],
  },
];

export const education = [
  {
    degree: "BS. Software Engineering",
    institution: "Lahore Garrison University",
    period: "2021-2025",
    grade: "Division: 1st",
    major: "Web Development",
    minor: "Mobile Application Development",
  },
  {
    degree: "ICS Physics",
    institution: "Garrison College For Boys",
    period: "2019-2021",
  },
  {
    degree: "Matriculation",
    institution: "Army Public School & Colleges System",
    period: "2019-2021",
  },
];

