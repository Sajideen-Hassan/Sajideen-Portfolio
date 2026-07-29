export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  description: string[];
  pmContribution: string[];
  role: string;
  impact: string;
  liveLink?: string;
  githubLink?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  period: string;
  startDate: string; // ISO date string (YYYY-MM) for calculation
  endDate: string;   // ISO date string or 'Present'
  bullets: string[];
  techStack?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  details: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    primaryRole: string;
    rotatingRoles: string[];
    headline: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
  experiences: Experience[];
  projects: Project[];
  competencies: {
    category: string;
    skills: string[];
    details: string;
  }[];
  education: Education[];
  certifications: string[];
  volunteerExperience: string[];
  awards: string[];
  leadershipCommunity: string[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Sajideen Hassan",
    primaryRole: "Project Manager",
    rotatingRoles: [
      "Project Coordinator",
      "Technical Project Manager",
      "Software Engineer",
      "AI Product Enthusiast"
    ],
    headline: "Turning Ideas into Successful Digital Products through Strategic Project Management, Technical Leadership, and Cross-Functional Collaboration.",
    summary: "A technical Project Manager who can read the codebase, not just the status report. Bridging the gap between software development and stakeholder requirements with the discipline of a project coordinator and the expertise of a MERN stack developer.",
    email: "sajideenhassan12@gmail.com",
    phone: "+92 334 863 1680",
    location: "Al-Hafeez Garden Phase 5, Lahore, Pakistan",
    github: "https://github.com/sajideenhassan12",
    linkedin: "https://linkedin.com/in/sajideen-hassan"
  },
  experiences: [
    {
      id: "techtide-pm-lead",
      title: "Project Manager / Development Team Lead",
      company: "TechTideCo",
      period: "Nov 2025 – Present",
      startDate: "2025-11",
      endDate: "Present",
      bullets: [
        "Coordinated cross-functional delivery of scalable web applications, ensuring absolute alignment between client requirements and engineering output.",
        "Led a development team of 5 engineers to build and deploy complex full-stack MERN (MongoDB, Express, React, Node.js) applications.",
        "Architected scalable database designs and robust APIs to ensure high performance and application stability.",
        "Conducted code reviews, maintained Git repositories, and set standards for clean, modular, and reusable frontend/backend architectures.",
        "Facilitated transparent communication between developers and external stakeholders to eliminate bottlenecks and resolve active delivery risks.",
        "Managed sprint planning, backlog grooming, and Agile workflows (Scrum/Kanban) to ensure timeline compliance."
      ],
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Git", "Jira", "Agile", "Slack"]
    },
    {
      id: "techtide-pm-intern",
      title: "Project Manager Intern / Developer",
      company: "TechTideCo",
      period: "Aug 2025 – Nov 2025",
      startDate: "2025-08",
      endDate: "2025-11",
      bullets: [
        "Assisted in tracking, defining, and documenting integration tasks, ensuring REST API connections and core databases were delivered on schedule.",
        "Coordinated communication between team members to resolve high-priority data handling and application bottlenecks efficiently.",
        "Maintained structured updates on project status, contributing to smooth hands-off between UI/UX design, engineering, and quality assurance phases.",
        "Contributed to code execution on full-stack applications, optimizing database queries and frontend rendering performance."
      ],
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Vercel"]
    },
    {
      id: "ispr-lead",
      title: "Management Lead",
      company: "ISPR Internship",
      period: "July 2025 – Aug 2025",
      startDate: "2025-07",
      endDate: "2025-08",
      bullets: [
        "Managed end-to-end communication workflows, ensuring timely and highly accurate information flow across departments.",
        "Coordinated public relations activities and team tasks to build trust and meet crucial campaign deadlines.",
        "Supported cross-functional collaboration by acting as the main contact point for operational status updates and stakeholder reviews.",
        "Delivered structured, impactful reports and updates to senior coordinators under tight operational timelines."
      ],
      techStack: ["Communication", "Stakeholder Management", "Task Tracking", "Reporting"]
    },
    {
      id: "itclub-intern",
      title: "Web Developer Intern",
      company: "IT Club",
      period: "Jan 2025 – Mar 2025",
      startDate: "2025-01",
      endDate: "2025-03",
      bullets: [
        "Conducted structured research on information systems, fake news detection models, and digital literacy frameworks to support key club initiatives.",
        "Improved data processing and analytical workflows by 25% through systematic research methodology and documentation.",
        "Strengthened critical thinking and professional discipline in information evaluation and analysis."
      ],
      techStack: ["Research", "Data Analysis", "HTML5", "CSS3", "JavaScript"]
    }
  ],
  projects: [
    {
      id: "inventory-mgmt",
      title: "Inventory Management System",
      subtitle: "Full-Stack Enterprise Inventory Tracker",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Chart.js", "Recharts", "OTP Auth", "Stripe API"],
      description: [
        "Developed a secure, MERN-based inventory and sales tracking platform built for high-throughput retail operations.",
        "Built barcode scanning integration, automated sales workflows, and custom analytics dashboards with visual insights using Chart.js and Recharts.",
        "Created custom CRUD operations for full inventory, category management, and staff controls."
      ],
      pmContribution: [
        "Designed the system's role-based access control (RBAC) schemas to support Admin, PM, Developer, and client access points.",
        "Scoped and implemented multi-factor OTP authentication workflows to secure sensitive warehouse databases.",
        "Managed sprint timeline to deliver barcode and analytics modules within a compact 6-week release window."
      ],
      role: "Lead Developer & Project Coordinator",
      impact: "Increased tracking accuracy and reduced inventory discrepancy rates by providing real-time data visualizers and role-based operational logs.",
      liveLink: "#"
    },
    {
      id: "auraspeech",
      title: "AuraSpeech Platform",
      subtitle: "AI Text-to-Speech Web Platform",
      tech: ["Python", "FastAPI", "Microsoft Edge TTS", "Uvicorn", "React.js", "Tailwind CSS"],
      description: [
        "Built a full-stack AI-powered text-to-speech platform capable of real-time audio generation and parameter modifications.",
        "Created an intuitive client player for custom voice customization, playback, and high-quality MP3 audio downloads."
      ],
      pmContribution: [
        "Managed API design and server performance tuning using Uvicorn to achieve low-latency audio response streaming under load.",
        "Established technical requirements and coordinate user feedback loop to refine speech generation configuration."
      ],
      role: "Full-Stack Engineer & API Architect",
      impact: "Reduced voice synthesis processing lag and enabled seamless high-quality audio extraction for content creation workflows.",
      liveLink: "#"
    },
    {
      id: "brotchun",
      title: "Brotchun Website",
      subtitle: "High-Performance Modern Web Showcase",
      tech: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "Gsap"],
      description: [
        "Delivered a modern, highly interactive corporate web showcase utilizing advanced animation libraries for rich, fluid scroll journeys.",
        "Constructed custom layouts with smooth transitions, keeping layout shifts at near-zero levels."
      ],
      pmContribution: [
        "Coordinated UI/UX design specifications directly with client stakeholders to match visual identity and engagement targets.",
        "Set performance budgets for animations and media assets, optimizing client-side bundle size."
      ],
      role: "UI/UX Developer & Coordinator",
      impact: "Accelerated page load times and boosted average user session duration through engaging scroll interactions.",
      liveLink: "#"
    },
    {
      id: "techtide-corp",
      title: "TechTide Corporate Website",
      subtitle: "Corporate Services Platform & CMS",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      description: [
        "Designed and developed a responsive, full-scale corporate portal featuring custom services, active blog articles, and dynamic contact workflows.",
        "Built a secure content management system (CMS) dashboard for real-time portfolio and article updates."
      ],
      pmContribution: [
        "Mapped the end-to-end user navigation flows and directed backend API architecture for real-time validation and inquiry routing.",
        "Set up role-based admin security access control."
      ],
      role: "Technical Lead / PM",
      impact: "Provided the company with an automated leads capture and client engagement pipeline with robust security standards.",
      liveLink: "#"
    },
    {
      id: "task-mgmt",
      title: "Task Management Website",
      subtitle: "Multi-Role Workspace Collaboration Portal",
      tech: ["React (Vite)", "Tailwind CSS", "Node.js", "Express.js", "JWT", "RBAC"],
      description: [
        "Developed a multi-role team workspace supporting task assignation, status tracking, time logging, and automated invoicing outputs.",
        "Implemented priority management, performance scoring matrices, and workflow automations."
      ],
      pmContribution: [
        "Engineered the multi-role security framework supporting 5 distinct roles: Admin, PM, Developer, SQA, and Client.",
        "Designed RESTful endpoints for task progress tracking and automated performance scoring algorithms."
      ],
      role: "Full-Stack Engineer / Product Architect",
      impact: "Enhanced project visibility and task lifecycle tracking efficiency across distributed cross-functional teams.",
      liveLink: "#"
    },
    {
      id: "voice-speech",
      title: "Voice Speech Website",
      subtitle: "In-Browser Audio Transcription App",
      tech: ["Flask", "Python", "MediaRecorder API", "WebM-to-WAV", "REST APIs"],
      description: [
        "Developed an in-browser audio transcription tool leveraging Flask and native web recording interfaces.",
        "Built server-side audio processing conversion pipelines from WebM to standard WAV format for high-accuracy speech transcription."
      ],
      pmContribution: [
        "Scoped REST API endpoints and data storage logic to securely manage user transcription history.",
        "Defined browser compatibility requirements for native recording APIs across mobile and desktop clients."
      ],
      role: "Python Developer / Coordinator",
      impact: "Delivered a lightweight, zero-install recording and transcription environment with simple historical retrieval.",
      liveLink: "#"
    },
    {
      id: "n8n-workflow",
      title: "N8N Workflow Website",
      subtitle: "Secure Integration & Automation Hub",
      tech: ["Node.js", "Express.js", "MongoDB", "Stripe API", "Google OAuth", "n8n"],
      description: [
        "Built a central hub for micro-service integrations, featuring subscription checkout processing, automated workflows, and Google OAuth.",
        "Applied strict security layers including NoSQL injection prevention, rate limiting, and XSS sanitizers."
      ],
      pmContribution: [
        "Spearheaded Stripe integration and designed billing webhooks workflow to automate subscription provisioning.",
        "Enforced security audit controls to safeguard API keys and OAuth tokens from unauthorized operations."
      ],
      role: "Security Lead & PM",
      impact: "Established a secure payment gateway and OAuth dashboard, allowing rapid workflow automation and integration setups.",
      liveLink: "#"
    }
  ],
  competencies: [
    {
      category: "Project Management",
      skills: ["Sprint Planning", "Agile & Scrum Workflows", "Stakeholder Communication", "Task & Delivery Tracking", "Cross-team Collaboration", "Risk Mitigation"],
      details: "Experienced in leading sprint cycles, managing backlogs, aligning client specifications with developer task lists, and keeping project schedules on target."
    },
    {
      category: "Technical Skills",
      skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "Node.js (Express)", "Python (FastAPI, Flask)", "HTML5 / CSS3", "RESTful API Design"],
      details: "Solid development foundation. Capable of reading codebases, analyzing system bugs, writing endpoints, and performing deep code reviews."
    },
    {
      category: "Databases & Cloud",
      skills: ["MongoDB (Mongoose)", "PostgreSQL", "SupabaseDB", "MySQL", "Vercel", "Firebase"],
      details: "Proficient in designing scalable relational and non-relational database schemas, configuring security policies, and managing hosting environments."
    },
    {
      category: "Tools & Platforms",
      skills: ["Git / GitHub", "Jira", "Slack", "Figma", "n8n", "VS Code", "Stripe API"],
      details: "Fluent in project tracking platforms, design tools, code management pipelines, automation workflow engines, and payment processor APIs."
    }
  ],
  education: [
    {
      degree: "BSc Software Engineering",
      institution: "Lahore Garrison University",
      location: "Lahore, Pakistan",
      period: "2021 – 2025",
      details: [
        "Major: Web Development",
        "Minor: Mobile Application Development",
        "CGPA: 3.0"
      ]
    },
    {
      degree: "ICS Physics",
      institution: "Garrison College For Boys",
      location: "Lahore, Pakistan",
      period: "2019 – 2021",
      details: ["Division: 1st"]
    },
    {
      degree: "Matriculation (Computer Science)",
      institution: "Army Public School & Colleges System",
      location: "Lahore, Pakistan",
      period: "2019 – 2021",
      details: ["Subject: Computer Science"]
    }
  ],
  certifications: [],
  volunteerExperience: [],
  awards: [],
  leadershipCommunity: []
};

export function calculateExperience(): string {
  const start = new Date("2025-01-01");
  const end = new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = (diffDays / 365).toFixed(1);
  
  return `${years}+ Years`;
}
