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
  achievements: string[]
  tags: string[]
}

export interface Education {
  degree: string
  institution: string
  period: string
}

export interface Certification {
  title: string
  issuer: string
  period: string
  platform: string
  platformColor: string
  icon: string
  focus: string
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
    location: string
    email: string
    linkedin: string
    github: string
    resumeUrl: string
  }
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  education: Education[]
  certifications: Certification[]
  contact: {
    description: string
  }
}

export const content: Content = {
  personal: {
    name: "Sajideen Hassan",
    initials: "SH",
    role: "Associate Software Engineer",
    location: "Lahore, Pakistan",
    email: "sajideenhassan12@gmail.com",
    linkedin: "https://www.linkedin.com/in/sajideen-hassan",
    github: "https://github.com/Sajideen-Hassan",
    resumeUrl: "/Sajideen-CV.pdf",
  },
  experience: [
    {
      id: "techtide-pm",
      title: "Associate Software Engineer",
      company: "TechTideCo",
      period: "Nov 2025 \u2014 Present",
      achievements: [
        "Delivered full-stack features end to end, from requirement discussions to deployment",
        "Helped the team stay aligned by writing clear requirements and keeping tasks tracked",
        "Fixed production bugs and improved existing features based on client feedback",
        "Coordinated handoffs between frontend and backend developers to cut down integration issues",
      ],
      tags: ["MERN", "JavaScript", "REST APIs", "MongoDB", "Client Communication", "Scrum", "Git"],
    },
    {
      id: "techtide-intern",
      title: "Associate Software Engineer (Intern)",
      company: "TechTideCo",
      period: "Aug 2025 \u2014 Nov 2025",
      achievements: [
        "Set up a daily stand-up format the team still uses",
        "Documented integration work so handoffs between developers got faster",
        "Helped clear blockers faster by keeping one clear list of what was being worked on",
      ],
      tags: ["REST APIs", "Documentation", "Jira", "Coordination"],
    },
    {
      id: "ispr",
      title: "Management Lead",
      company: "ISPR Internship",
      period: "Jul 2025 \u2014 Aug 2025",
      achievements: [
        "Kept reporting on schedule by coordinating across departments",
        "Supervised volunteer teams so every task had an owner and a deadline",
        "Kept the whole project moving on schedule through day-to-day discipline",
      ],
      tags: ["Coordination", "Stakeholder Comms", "Reporting"],
    },
    {
      id: "itclub",
      title: "Web Developer Intern",
      company: "IT Club",
      period: "Jan 2025 \u2014 Mar 2025",
      achievements: [
        "Improved internal data-processing workflows through structured research",
        "Delivered reports on digital literacy shared with faculty and peers",
      ],
      tags: ["HTML", "CSS", "JavaScript", "Research"],
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
        "An AI healthcare app that identifies common skin conditions from an uploaded photo. I trained a CNN model on a medical image dataset and built the API that serves predictions. The React interface turns the model output into something a user can actually act on: the possible diagnosis, precautionary steps, and treatment guidance, plus a list of dermatologists to consult.",
      challenge:
        "Getting consistent, reliable predictions from medical images with limited labeled data, and making sure the app never sounds more confident than the model actually is.",
      solution:
        "I trained a TensorFlow/Keras CNN on an augmented dataset, used OpenCV to normalize lighting and noise, and served predictions through a Flask/FastAPI backend with a React upload interface.",
      results:
        "The model reaches over 89% accuracy, and the app turns that into something usable: possible diagnoses, treatment guidance, and prevention tips alongside dermatologist recommendations.",
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
        "The official Raynova Tech website plus an admin dashboard for the business. I built the public pages and the dashboard, wired up quotation requests and client inquiries, and added an AI chatbot to answer visitors automatically. The platform started on MongoDB and was later moved to TursoDB for faster reads.",
      challenge:
        "Switching the database from MongoDB to TursoDB without breaking the live site, while the dashboard, quotation flow, and chatbot were all new features.",
      solution:
        "I handled the database migration carefully behind the API, wrapped the endpoints in JWT auth for the dashboard, and built the chatbot to engage visitors on the React front end.",
      results:
        "Raynova got a working business site with automated quotation handling, a chatbot for visitors, and an admin dashboard the team uses day to day.",
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
        "A voice-enabled support chatbot for an international furniture business. Built on ElevenLabs Conversational AI, it answers product questions, walks customers through the collections, and makes recommendations based on what they're looking for, handling common support requests without a human in the loop.",
      challenge:
        "Teaching a voice assistant to understand furniture-specific questions, and keeping the conversation natural and fast enough to actually be useful.",
      solution:
        "I configured the ElevenLabs conversation flow, connected it to a React front end through a small Node/Express API, and wired intent-driven recommendation logic into the responses.",
      results:
        "Customers get answers in seconds instead of waiting, and the business cut response time on routine questions without adding support staff.",
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
        "A company website built around animation and storytelling. I implemented page transitions, scroll effects, and interactive layouts that make the content feel alive, while keeping the site fast and clean on a range of devices.",
      challenge:
        "Making heavy animation and story-driven scrolling feel smooth on lower-end devices rather than slow and janky.",
      solution:
        "I used GSAP and Framer Motion with lazy-loaded routes and GPU-friendly transforms, so the cinematic moments play out without tanking performance.",
      results:
        "An immersive, animation-driven site that stays responsive on desktop and phone.",
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
        "Work on TechTide's public website and internal developer dashboard. I added features, cleaned up existing modules, fixed production bugs, and improved the task management flow that developers and admins use every day.",
      challenge:
        "Making a dashboard that had been growing for a while more consistent, both in how it looks and in how tasks actually move through it.",
      solution:
        "I refactored parts of the React code with Material UI, optimized Firestore queries, and shipped usability fixes to the task workflow.",
      results:
        "A cleaner, faster dashboard that developers actually prefer working in.",
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
        "A marketplace where creators sell n8n automation workflows. Buyers can read the documentation, implementation guides, and workflow diagrams before buying, and after payment the workflow is unlocked in their dashboard for download.",
      challenge:
        "Making purchases secure and access control airtight, so only buyers can download what they paid for.",
      solution:
        "I built it on the MERN stack with Stripe payment webhooks and JWT-based roles, so a success payment unlocks the workflow in the buyer's dashboard automatically.",
      results:
        "A working creator economy with secure payments, instant access, and clear documentation for every workflow sold.",
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
        "An inventory system that runs on barcode scanning. Staff scan a product to add it to stock, and sales automatically deduct the quantity at the billing counter in real time, so there is no manual counting, fewer entry errors, and clear reports on stock levels when needed.",
      challenge:
        "Keeping stock counts accurate in real time, when every scan and every sale changes them.",
      solution:
        "I integrated an OpenCV-based barcode scanner and built the MERN billing flow so each sale immediately decrements inventory and updates the reports.",
      results:
        "Accurate, up-to-date stock tracking with less manual work and fewer errors at the counter.",
    },
  ],
  skills: [
    {
      category: "Development",
      items: [
        "React.js",
        "JavaScript",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "HTML",
        "CSS",
      ],
    },
    {
      category: "Databases",
      items: [
        "MongoDB",
        "PostgreSQL",
        "Supabase",
        "Turso",
        "Firebase / Firestore",
      ],
    },
    {
      category: "APIs & Integration",
      items: [
        "REST APIs",
        "JWT",
        "Stripe API",
        "AI APIs",
        "Third-party API Integration",
      ],
    },
    {
      category: "AI & Automation",
      items: [
        "AI Integration",
        "Generative AI APIs",
        "ElevenLabs",
        "n8n",
        "Prompt Engineering",
      ],
    },
    {
      category: "Development Tools",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Postman",
        "VS Code",
      ],
    },
    {
      category: "Coordination & Delivery",
      items: [
        "Client Communication",
        "Requirement Gathering",
        "Task Coordination",
        "Agile / Scrum",
        "Sprint Planning",
        "Progress Tracking",
        "Documentation",
        "Risk & Issue Tracking",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Lahore Garrison University",
      period: "2021 \u2014 2025",
    },
    {
      degree: "ICS Physics",
      institution: "Garrison College For Boys, Lahore",
      period: "2019 \u2014 2021",
    },
    {
      degree: "Matriculation (Computer Science)",
      institution: "Army Public School & Colleges System",
      period: "2019",
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
      focus: "Built practical spreadsheets with formulas, pivot tables, data cleaning, and reporting workflows to turn raw data into reports I can actually use.",
    },
    {
      title: "Business Analysis & Process Management",
      issuer: "Coursera",
      period: "Completed",
      platform: "Coursera",
      platformColor: "#0056D2",
      icon: "Diagram",
      focus: "Practiced requirements gathering, stakeholder mapping, process modeling, and change management to scope and streamline business workflows.",
    },
    {
      title: "CHATGPT Series: Prompt Engineering Masterclass",
      issuer: "Development Island",
      period: "Completed",
      platform: "Development Island",
      platformColor: "#10B981",
      icon: "Bot",
      focus: "Learned structured prompt design, context framing, and evaluation loops to get consistent, useful results from LLMs for real product features.",
    },
    {
      title: "Complete Web Development",
      issuer: "Udemy",
      period: "Completed",
      platform: "Udemy",
      platformColor: "#EC5252",
      icon: "Code",
      focus: "Covered HTML, CSS, and JavaScript end-to-end, including responsive layouts, the DOM, and shipping real front-end interfaces.",
    },
    {
      title: "MERN Stack Development",
      issuer: "NAVTTC",
      period: "Completed",
      platform: "NAVTTC",
      platformColor: "#6366F1",
      icon: "Layers",
      focus: "Built full-stack applications on MongoDB, Express, React, and Node.js, from database design to REST APIs and interactive UIs.",
    },
    {
      title: "Prompt Engineering by AWS",
      issuer: "Amazon Web Services",
      period: "Completed",
      platform: "AWS",
      platformColor: "#FF9900",
      icon: "Cloud",
      focus: "Studied production-grade prompt engineering on AWS, including foundational model behaviour, context windows, and evaluation for reliable AI systems.",
    },
  ],
  contact: {
    description:
      "Available for Associate Software Engineer roles. I work remotely or on-site in Lahore.",
  },
}
