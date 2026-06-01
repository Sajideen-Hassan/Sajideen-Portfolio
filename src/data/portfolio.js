export const personal = {
  name: "Sajideen Hassan",
  title: "Full Stack Software Engineer",
  tagline: "Building Modern Web, AI & Scalable Systems",
  bio: "I design and engineer high-performance applications, intelligent automation systems, and modern digital platforms with a focus on scalability, speed, and clean architecture.",
  photo: profilePhoto,
  email: "sajideenhassan12@gmail.com",
  location: "Pakistan",
  cvUrl: "/Sajideen_CV.pdf",
  social: {
    github: "https://github.com/Sajideen-Hassan",
    linkedin: "https://www.linkedin.com/in/sajideen-hassan",
  },
};

export const roles = [
  "Full Stack Software Engineer",
  "React & Next.js Specialist",
  "Node.js Backend Architect",
  "AI Systems Engineer",
  "Scalable Platform Builder",
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

import asCover from '../assets/AS_coverImage.png';
import brotchunCover from '../assets/Brotchun_coverImage.png';
import imgGenCover from '../assets/Image_generator.png';
import ivCover from '../assets/IV_coverImage.png';
import n8nCover from '../assets/n8n_workflow_01.png';
import profilePhoto from '../assets/SajideenHassanprofile.jpg';

export const projects = [
  {
    id: 1,
    title: "AuraSpeech",
    description: "AI-powered voice transcription and analytics platform with real-time processing, speaker diarization, and intelligent search across thousands of hours of audio.",
    tags: ["Next.js", "Python", "OpenAI", "MongoDB", "WebSockets"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: asCover,
  },
  {
    id: 2,
    title: "Inventory Management System",
    description: "Real-time inventory tracking and order management system with predictive analytics, barcode scanning, and multi-warehouse support.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: ivCover,
  },
  {
    id: 3,
    title: "Brotchun",
    description: "Full-stack social content platform with AI-driven recommendations, real-time messaging, and creator analytics dashboard.",
    tags: ["Next.js", "TypeScript", "MongoDB", "AWS", "GraphQL"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: brotchunCover,
  },
  {
    id: 4,
    title: "N8N Workflow Marketplace",
    description: "A marketplace for n8n workflow templates with automated deployment, version control, and community ratings.",
    tags: ["React", "Node.js", "PostgreSQL", "n8n", "Stripe"],
    github: "https://github.com/sajideen",
    website: "https://github.com/sajideen",
    coverImage: n8nCover,
  },
  {
    id: 5,
    title: "Image Generator",
    description: "AI-powered image generation platform with prompt-based creation, style transfer, and batch processing capabilities.",
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
    description: "Built scalable MERN stack applications with focus on performance and clean architecture. Developed RESTful APIs using Node.js, Express, and MongoDB for reliable backend systems. Created responsive React interfaces to improve user experience across devices. Maintained modular GitHub codebases and contributed through peer code reviews. Worked in Agile teams with active participation in sprint planning and delivery cycles.",
    tech: ["MERN", "Node.js", "Express", "MongoDB", "React", "REST APIs", "GitHub", "Agile"],
  },
  {
    role: "Software Engineer Intern",
    company: "TechTideCo",
    period: "Aug 2025 - Nov 2025",
    description: "Supported development of full stack applications in a production environment. Built and integrated REST APIs with secure authentication flows. Connected frontend interfaces with backend services for smooth data handling. Identified and resolved performance issues to improve application efficiency.",
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

export const academicProjects = [
  {
    title: "TechTide Corporate Website",
    subject: "Computer Science",
    level: "Matriculation",
    institution: "Army Public School & Colleges System",
    period: "2019-2021",
  },
];
