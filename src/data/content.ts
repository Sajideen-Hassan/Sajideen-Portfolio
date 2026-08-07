export interface Project {
  id: string
  title: string
  subtitle: string
  tags: string[]
  role: string
  timeline: string
  domain: string
  year: number
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
  period: string
  platform: string
  platformColor: string
  icon: string
  credentialId?: string
  verifyUrl?: string
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
    role: "Project Coordinator & AI Product Builder",
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
    { label: "Lines of Code", value: "100K+" },
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
      title: "Project Coordinator",
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
        "Coordinated daily stand-ups that kept cross-functional teams aligned and blockers resolved within 24 hours",
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
        "Reduced integration delays by 20% by tracking REST API milestones proactively",
        "Supported 4 sprint cycles with accurate status tracking and blocker escalation",
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
        "Maintained discipline across the entire project and kept every task moving on schedule",
        "Managed food distribution so that every participant and volunteer was properly provided",
        "Led and supervised sub-volunteering teams, assigning roles and resolving issues on the ground",
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
      achievements: [
        "Increased analytical workflow efficiency by 25%",
        "Delivered research on digital literacy frameworks adopted in team resources",
        "Built structured research methodology now reused across information system projects",
        "Documented findings in clear reports shared with faculty and peers",
      ],
      tags: ["Research", "HTML5", "CSS3", "JavaScript"],
    },
  ],
  projects: [
    {
      id: "ai-skin-disease-identifier",
      title: "AI Skin Disease Identifier",
      subtitle: "AI Healthcare Application",
      tags: ["Python", "TensorFlow/Keras", "OpenCV", "Flask/FastAPI", "React", "MongoDB"],
      role: "AI Engineer & Full-Stack Developer",
      timeline: "8 weeks",
      domain: "ai",
      year: 2024,
      overview:
        "An AI-powered healthcare application that helps users identify common skin conditions through image analysis. Trained on a diverse medical image dataset, the system delivers over 89% prediction accuracy with possible diagnoses, precautionary measures, treatment guidance, and tips to prevent the condition from spreading. It also recommends experienced dermatologists for professional consultation.",
      challenge:
        "Achieving high prediction accuracy across diverse skin conditions on color-graded medical images with limited labeled data and avoiding false-confidence predictions.",
      solution:
        "Trained a TensorFlow/Keras CNN over an augmented medical dataset, applied OpenCV preprocessing to normalize lighting and noise, and exposed predictions through a Flask/FastAPI service with a React-based upload and results interface.",
      results:
        "Delivered over 89% prediction accuracy, giving users possible diagnoses, treatment guidance, and prevention tips alongside recommended dermatologists.",
    },
    {
      id: "raynova-tech",
      title: "Raynova Tech \u2013 Company Website",
      subtitle: "Company Website & Admin Dashboard",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "TursoDB", "Tailwind CSS", "JWT"],
      role: "Full-Stack Developer",
      timeline: "10 weeks",
      domain: "web",
      year: 2024,
      overview:
        "Designed and developed the official Raynova Tech website with a custom administrative dashboard to streamline quotation requests, client inquiries, and business operations. Integrated an AI-powered chatbot to improve customer engagement and automate responses. Initially built on MongoDB, the platform was later migrated to TursoDB for improved performance and modern edge database capabilities.",
      challenge:
        "Migrating from MongoDB to TursoDB without service disruption while adding a custom dashboard and AI chatbot to handle quotations and inquiries at scale.",
      solution:
        "Migrated the data layer to TursoDB for edge performance and scalability, wrapped REST APIs in JWT authentication, and deployed an AI chatbot to automate client engagement on the React front end.",
      results:
        "Delivered a performant company platform with automated quotation handling, AI-driven customer engagement, and an admin dashboard for smooth business operations.",
    },
    {
      id: "ai-furniture-chatbot",
      title: "AI Furniture Support Chatbot",
      subtitle: "ElevenLabs Conversational AI",
      tags: ["ElevenLabs AI", "React", "Node.js", "REST APIs", "JavaScript"],
      role: "AI Integration Developer",
      timeline: "6 weeks",
      domain: "ai",
      year: 2024,
      overview:
        "Built an intelligent customer support chatbot using ElevenLabs Conversational AI for an international furniture business. The chatbot answers product-related questions, guides customers through furniture collections, provides recommendations based on user preferences, and handles common support requests with natural voice interactions, significantly cutting response time.",
      challenge:
        "Training a voice-enabled chatbot to understand furniture-specific intent, product queries, and recommendations with natural, low-latency voice interactions.",
      solution:
        "Configured an ElevenLabs conversational flow, wired intent-driven recommendation logic through React and a Node/Express REST API, and deployed it to the sustain business site.",
      results:
        "Reduced customer response time and improved the experience by handling product questions, collection guidance, and recommendations through natural voice.",
    },
    {
      id: "brotchun-website",
      title: "Brotchun Website",
      subtitle: "Animated Editorial Website",
      tags: ["MERN", "GSAP", "Framer Motion", "React", "Tailwind CSS"],
      role: "Frontend Engineer",
      timeline: "5 weeks",
      domain: "creative",
      year: 2023,
      overview:
        "Developed a modern company website focused on animations, storytelling, and user experience. Implemented smooth page transitions, interactive scroll effects, and responsive layouts to create an immersive browsing experience while keeping fast performance and clean design.",
      challenge:
        "Balancing heavy animation, scroll effects, and page transitions with fast performance on lower-end devices.",
      solution:
        "Used GSAP and Framer Motion with lazy-loaded routes and GPU-friendly transforms to create cinematic transitions and scroll storytelling without sacrificing performance.",
      results:
        "Shipped an immersive, animation-driven company website with smooth transitions, interactive scroll effects, and responsive layouts.",
    },
    {
      id: "techtide-platform",
      title: "TechTide Platform",
      subtitle: "Website & Developer Dashboard",
      tags: ["React.js", "Firebase", "JavaScript", "Material UI", "Firestore"],
      role: "Software Engineer",
      timeline: "7 weeks",
      domain: "web",
      year: 2023,
      overview:
        "Contributed to the enhancement of TechTide's official website and internal developer dashboard. Implemented new features, optimized existing modules, fixed production issues, and improved task management workflows for developers and administrators, focusing on usability, performance, and efficient collaboration.",
      challenge:
        "Improving the developer dashboard with solid, and maintainable structures, a consistent task management workflow, reducing production issues visible to users.",
      solution:
        "Refactored React modules with Material UI, optimized Firestore queries and real-time subscriptions, and shipped usability fixes for team collaboration workflows.",
      results:
        "Improved dashboard usability, performance, and task management for developers and administrators across the platform.",
    },
    {
      id: "n8n-workflow-marketplace",
      title: "n8n Workflow Marketplace",
      subtitle: "Digital Marketplace",
      tags: ["MERN", "Stripe API", "JWT", "MongoDB", "React", "Express.js"],
      role: "Full-Stack Developer",
      timeline: "9 weeks",
      domain: "commerce",
      year: 2024,
      overview:
        "Developed a full-stack platform where creators upload, manage, and sell n8n automation workflows. Each workflow includes detailed documentation, implementation guides, and workflow diagrams for buyers to review. Integrated Stripe for secure payments, after which purchased workflows are automatically unlocked in a user's personalized dashboard for download.",
      challenge:
        "Implementing secure purchases, and JWT-secured multi-role access so creators can sell workflows and buyers unlock them after Stripe payment.",
      solution:
        "Built a MERN marketplace with Stripe payment webhooks and JWT authorization, auto-unlocking purchased workflows in a user's dashboard with documentation and diagrams.",
      results:
        "Launched a functioning creator economy with secure Stripe payments and instant, personalized access to purchased workflows.",
    },
    {
      id: "smart-inventory-system",
      title: "Smart Inventory Management System",
      subtitle: "Barcode-Based Full-Stack",
      tags: ["MERN", "Python", "OpenCV", "Barcode Scanner", "React", "MongoDB"],
      role: "Full-Stack Developer",
      timeline: "6 weeks",
      domain: "infra",
      year: 2024,
      overview:
        "Built a complete inventory management solution that automates stock tracking using barcode technology. Products are added to inventory by scanning barcodes, while sales automatically reduce stock quantities in real time through the billing counter. The system provides accurate inventory monitoring, minimizes manual errors, minimizes and generates reports for stock efficiency.",
      challenge:
        "Automating stock entry with barcode scanning and keeping inventory counts in real time as sales reduce stock at the billing counter.",
      solution:
        "Integrated an OpenCV barcode scanner to add stock and built a real-time MERN billing flow where sales automatically decrement inventory and generate reports.",
      results:
        "Delivered accurate, real-time inventory tracking that minimizes manual errors and reports stock levels with only barcode-driven workflows.",
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
      title: "Introduction to Microsoft Excel",
      issuer: "Coursera",
      period: "Completed",
      platform: "Coursera",
      platformColor: "#0056D2",
      icon: "Table",
    },
    {
      title: "Business Analysis & Process Management",
      issuer: "Coursera",
      period: "Completed",
      platform: "Coursera",
      platformColor: "#0056D2",
      icon: "Diagram",
    },
    {
      title: "CHATGPT Series: Prompt Engineering Masterclass",
      issuer: "Development Island",
      period: "Completed",
      platform: "Development Island",
      platformColor: "#10B981",
      icon: "Bot",
    },
    {
      title: "Complete Web Development",
      issuer: "Udemy",
      period: "Completed",
      platform: "Udemy",
      platformColor: "#EC5252",
      icon: "Code",
    },
    {
      title: "MERN Stack Development",
      issuer: "NAVTTC",
      period: "Completed",
      platform: "NAVTTC",
      platformColor: "#6366F1",
      icon: "Layers",
    },
    {
      title: "Prompt Engineering by AWS",
      issuer: "Amazon Web Services",
      period: "Completed",
      platform: "AWS",
      platformColor: "#FF9900",
      icon: "Cloud",
    },
  ],
  contact: {
    heading: "Have a project in mind or need strategic PM leadership?",
    description:
      "Available for Project Coordinator, Project Manager, and Associate Software Engineer roles. Remote or on-site in Lahore.",
  },
}
