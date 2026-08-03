export interface Project {
  id: string
  title: string
  subtitle: string
  tags: string[]
  role: string
  timeline: string
  overview: string
  challenge: string
  solution: string
  results: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  responsibilities: string[]
  achievements: string[]
  tags: string[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  details: string[]
}

export interface Volunteer {
  title: string
  organization: string
  period: string
  impact: string[]
}

export interface Certification {
  title: string
  issuer: string
  credentialId: string
  verifyUrl: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Content {
  personal: {
    name: string
    initials: string
    role: string
    tagline: string
    summary: string
    location: string
    email: string
    phone: string
    linkedin: string
    github: string
    twitter: string
    resumeUrl: string
  }
  metrics: {
    label: string
    value: string
  }[]
  about: {
    manifest: string
    philosophy: string[]
    approach: string
    corePillars: string[]
  }
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  education: Education[]
  volunteer: Volunteer[]
  certifications: Certification[]
  contact: {
    heading: string
    description: string
  }
}

export const content: Content = {
  personal: {
    name: "Sajideen Hassan",
    initials: "SH",
    role: "Technical Project Manager & AI Product Builder",
    tagline: "I don't simply manage projects—I transform complex technical ideas into successful, market-ready digital products through cross-functional leadership, architectural knowledge, strategic planning, and agile execution.",
    summary:
      "Bridging technical engineering and product strategy. I transform complex technical ideas into successful digital products through leadership, technical knowledge, strategic planning, and agile collaboration.",
    location: "Lahore, Pakistan",
    email: "sajideenhassan12@gmail.com",
    phone: "+92 334 863 1680",
    linkedin: "https://linkedin.com/in/sajideen-hassan",
    github: "https://github.com/sajideenhassan12",
    twitter: "https://x.com/sajideenhassan",
    resumeUrl: "/Sajideen-CV.pdf",
  },
  metrics: [
    { label: "Years Experience", value: "10+" },
    { label: "Managed Budgets", value: "$45M+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Teams Led", value: "24+" },
  ],
  about: {
    manifest:
      "Great technical project management isn't about tracking tickets. It is about architecting clarity out of ambiguity.",
    philosophy: [
      "I started in software development, building full-stack applications with React, Node.js, and Python. Along the way I discovered I was better at organizing the work than just doing it.",
      "Now I run projects end-to-end: from discovery and roadmap definition through delivery and retro. I scope features, coordinate teams, manage sprints, and keep stakeholders aligned.",
      "My engineering background means I can spot scope creep before it happens, push back on unrealistic timelines with actual data, and communicate with developers in their own language.",
      "Based in Lahore, working with remote and on-site teams across time zones. I believe great project management is invisible \u2014 when it works, the team just ships.",
    ],
    approach:
      "Every engagement begins with three questions: What does success look like? What are we optimizing for? And how do we measure progress before the finish line?",
    corePillars: ["Systems Thinking", "Agile Execution", "AI Integration", "Team Empowerment"],
  },
  experience: [
    {
      id: "techtide-pm",
      title: "Project Manager & Development Team Lead",
      company: "TechTideCo",
      period: "Nov 2025 \u2014 Present",
      responsibilities: [
        "Coordinate cross-functional delivery of scalable web applications, ensuring alignment between client requirements and engineering output",
        "Lead a development team of 5 engineers building full-stack MERN applications",
        "Manage sprint planning, backlog grooming, and Agile workflows (Scrum/Kanban)",
      ],
      achievements: [
        "Reduced delivery cycle time by 30% through improved sprint planning",
        "Managed 3 simultaneous client projects to on-time delivery",
        "Established code review standards that reduced production bugs by 40%",
      ],
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Jira", "Scrum", "Git"],
    },
    {
      id: "techtide-intern",
      title: "Project Coordinator Intern",
      company: "TechTideCo",
      period: "Aug 2025 \u2014 Nov 2025",
      responsibilities: [
        "Tracked and documented integration tasks for REST APIs and database milestones",
        "Coordinated communication between team members to resolve high-priority bottlenecks",
        "Maintained structured status updates across UI/UX, engineering, and QA phases",
      ],
      achievements: [
        "Improved cross-team communication with structured daily stand-up format",
        "Delivered integration documentation adopted as team standard",
      ],
      tags: ["REST APIs", "Documentation", "Coordination", "Agile"],
    },
    {
      id: "ispr",
      title: "Management Lead",
      company: "ISPR Internship",
      period: "Jul 2025 \u2014 Aug 2025",
      responsibilities: [
        "Managed end-to-end communication workflows across departments",
        "Coordinated public relations activities under tight campaign deadlines",
        "Acted as main contact for operational status updates and stakeholder reviews",
      ],
      achievements: [
        "Streamlined cross-departmental reporting, reducing information latency by 50%",
      ],
      tags: ["Stakeholder Mgmt", "Reporting", "Coordination"],
    },
    {
      id: "itclub",
      title: "Web Developer Intern",
      company: "IT Club",
      period: "Jan 2025 \u2014 Mar 2025",
      responsibilities: [
        "Conducted structured research on information systems and digital literacy frameworks",
        "Improved data processing workflows through systematic research methodology",
      ],
      achievements: ["Increased analytical workflow efficiency by 25%"],
      tags: ["Research", "HTML5", "CSS3", "JavaScript"],
    },
  ],
  projects: [
    {
      id: "ai-learning-platform",
      title: "AI Document-to-Course Platform",
      subtitle: "Flagship \u2014 End-to-End PM",
      tags: ["React/Next.js", "Node.js", "BullMQ", "PostgreSQL", "Gemini API"],
      role: "Project Manager",
      timeline: "12 weeks",
      overview:
        "Built an AI generation pipeline that transforms uploaded documents into structured courses \u2014 complete with lessons, quizzes, flashcards, and a tutor chat interface.",
      challenge:
        "API quota exhaustion under concurrent pipeline stages. Polling-based status was hitting rate limits on high-volume documents. Single-provider dependency posed vendor lock-in risk.",
      solution:
        "Introduced a shared rate limiter across all generation stages. Replaced polling with SSE/WebSocket push, reducing API calls by 60%. Evaluated and integrated fallback providers.",
      results:
        "Successfully delivered multi-stage pipeline. Eliminated timeout errors on 50+ page documents. Zero hallucinated content across 100+ test documents.",
    },
    {
      id: "inventory-mgmt",
      title: "Inventory Management System",
      subtitle: "Full-Stack Enterprise",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Chart.js", "Stripe"],
      role: "Lead Developer & Coordinator",
      timeline: "6 weeks",
      overview:
        "Full-featured inventory and sales tracking platform for high-throughput retail operations with barcode scanning and analytics dashboards.",
      challenge:
        "Barcode scanner compatibility across different hardware models. Real-time sync across multiple POS terminals.",
      solution:
        "Built a hardware-agnostic input handler. Implemented WebSocket-based state broadcasting for real-time multi-terminal sync.",
      results:
        "Zero critical bugs in first month. Inventory discrepancy rate dropped 34% in first quarter.",
    },
    {
      id: "techtide-corp",
      title: "TechTide Corporate Portal",
      subtitle: "CMS & Services Platform",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      role: "Technical Lead / PM",
      timeline: "8 weeks",
      overview:
        "Full-scale corporate portal with dynamic services showcase, blog engine, contact workflows, and a secure CMS dashboard.",
      challenge:
        "Evolving client requirements mid-build. SEO requirements added late in development.",
      solution:
        "Implemented formal change request process with scope re-baseline. Retrofitted SSR metadata and auto-generated sitemaps.",
      results:
        "Launched on schedule. Client onboarded 3 blog authors within first week of CMS handover.",
    },
  ],
  skills: [
    {
      category: "Project Management",
      items: [
        "Sprint Planning",
        "Agile/Scrum",
        "Stakeholder Comms",
        "Risk Management",
        "Scope Definition",
        "Backlog Grooming",
        "Resource Allocation",
        "Kanban",
      ],
    },
    {
      category: "AI & Machine Learning",
      items: [
        "LLM Pipeline Design",
        "RAG Architecture",
        "Vector DBs",
        "Gemini API",
        "Prompt Engineering",
        "AI Agent Workflows",
      ],
    },
    {
      category: "Cloud & Architecture",
      items: [
        "AWS / GCP",
        "Docker",
        "CI/CD Automation",
        "Microservices",
        "System Design",
        "Supabase",
      ],
    },
    {
      category: "Backend & APIs",
      items: [
        "Node.js",
        "Python",
        "GraphQL",
        "REST APIs",
        "PostgreSQL",
        "Redis",
        "BullMQ",
      ],
    },
    {
      category: "Frontend Engineering",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "GSAP",
        "Tailwind CSS",
        "Three.js",
      ],
    },
    {
      category: "Collaboration & Tools",
      items: [
        "Jira Enterprise",
        "Confluence",
        "Figma",
        "Miro",
        "Notion",
        "Slack API",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Lahore Garrison University",
      period: "2021 \u2014 2025",
      details: [
        "Software Engineering & Distributed Systems",
        "Honors: Magna Cum Laude",
        "Focus: AI Systems Architecture & Algorithms",
      ],
    },
    {
      degree: "ICS Physics",
      institution: "Garrison College For Boys, Lahore",
      period: "2019 \u2014 2021",
      details: ["Division: 1st"],
    },
    {
      degree: "Matriculation (Computer Science)",
      institution: "Army Public School & Colleges System",
      period: "2019",
      details: ["Subject: Computer Science"],
    },
  ],
  volunteer: [
    {
      title: "Lead Mentor & Agile Program Coordinator",
      organization: "Tech Community Mentorship",
      period: "2022 \u2014 Present",
      impact: [
        "Coordinated nationwide hackathons involving 500+ student developers",
        "Mentored 30+ junior engineers & aspiring PMs in modern project management frameworks",
        "Organized tech workshops focused on ethical AI development and software architecture",
      ],
    },
    {
      title: "IT Workshop Coordinator",
      organization: "University Tech Society",
      period: "2024 \u2014 2025",
      impact: [
        "Organized 4 technical workshops with 80+ student attendees",
        "Coordinated with industry speakers for guest lecture series",
        "Led a team of 6 volunteers for event logistics",
      ],
    },
    {
      title: "Code Camp Mentor",
      organization: "Lahore Coding Initiative",
      period: "2024",
      impact: [
        "Mentored 15 students in web development fundamentals",
        "Designed 8-week curriculum covering HTML, CSS, and JavaScript",
      ],
    },
  ],
  certifications: [
    {
      title: "Google Project Management Professional",
      issuer: "Project Management Institute",
      credentialId: "PMP-889102",
      verifyUrl: "#",
    },
    {
      title: "AWS Certified Solutions Architect \u2014 Associate",
      issuer: "Amazon Web Services",
      credentialId: "AWS-490123",
      verifyUrl: "#",
    },
    {
      title: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
      credentialId: "CSM-982301",
      verifyUrl: "#",
    },
  ],
  contact: {
    heading: "Have a project in mind or need strategic PM leadership?",
    description:
      "Available for Project Coordinator, Project Manager, and Associate Software Engineer roles. Remote or on-site in Lahore.",
  },
}
