/**
 * Demo sections – frontend-only (CV + certifications, interests, blog, pricing).
 */

export const DEMO_SECTIONS_ORDER = [
  'summary',
  'resume',
  'coverLetter',
  'experience',
  'education',
  'skills',
  'portfolio',
  'projects',
  'certifications',
  'blog',
  'pricing',
  'interests',
];

export const DEMO_SECTIONS_DATA = {
  summary: {
    title: 'Summary',
    content: `Fullstack Software Engineer with 3+ years of experience building scalable backend services and high-performance web applications. Expert in JavaScript, TypeScript, React, SQL, and backend frameworks including Node.js and FastAPI, with a proven track record of developing secure REST APIs and optimizing system reliability for mission-critical platforms. Focused on driving product safety and minimizing financial risk through robust Object-Oriented Programming (OOP) and collaborative engineering practices. Lawfully authorized to work in the US.`,
  },

  resume: {
    title: 'Resume',
    subtitle: 'Download my resume',
    // Use a relative URL so it works on GitHub Pages basePath (/<repo>/...)
    downloadUrl: 'Mohid_Hameed_Resume.pdf',
    downloadLabel: 'Download Resume',
  },

  coverLetter: {
    title: 'Cover Letter',
    greeting: 'Dear Hiring Manager,',
    body: `I'm writing to express my interest in software engineering opportunities within your team. I have over three years of experience working as a Full-Stack Software Engineer, mainly focused on JavaScript, TypeScript, React, Next.js, Node.js, FastAPI, and SQL-based systems. Throughout my career, I've worked on building and maintaining scalable backend services and user-focused web applications, particularly in healthcare and SaaS environments.

At Octek, I contributed to improving an EHR and clinic management platform where reliability and performance were extremely important. I worked on both frontend enhancements and backend APIs, helped optimize database queries, and collaborated closely with designers and QA to deliver stable releases. Before that, at Codenax, I developed cross-platform mobile applications and integrated AI-powered features using OpenAI APIs. These experiences really helped me understand how to build production-ready systems, not just prototypes.

I enjoy solving real problems and taking ownership of features from idea to deployment. I try to write clean, maintainable code and always think about long-term scalability — even if it takes a bit more effort upfront. I'm also someone who adapts quickly and learns fast when needed.

I am lawfully authorized to work in the United States and currently based in Michigan. I would genuinely appreciate the opportunity to contribute to your team and continue growing as an engineer.`,
    closing: 'Thank you for your time and consideration. I look forward to hearing from you.',
    signature: 'Sincerely,\nMohid Hameed',
  },

  experience: {
    title: 'Experience',
    items: [
      {
        id: 'octek',
        title: 'Full-Stack Software Engineer',
        company: 'Octek',
        period: 'Jan 2025 – Jan 2026',
        description: 'Maintained and enhanced the Akute Health EHR and practice management platform with React.js, Node.js, and TypeScript, reducing page load times and improving user satisfaction. Developed internal APIs and services with FastAPI where appropriate. Managed and improved the hospital/clinic portal using Node.js and PostgreSQL, streamlining patient-record access and scheduling workflows. Built secure RESTful APIs and improved database performance for better system reliability. Worked closely with designers, QA, and product teams to deliver stable and user-friendly solutions.',
      },
      {
        id: 'codenax',
        title: 'Application Developer',
        company: 'Codenax',
        period: 'Aug 2022 – Jan 2025',
        description: 'Built and maintained cross-platform mobile applications with React Native and TypeScript, integrating OpenAI APIs for AI features and using Firebase for backend services. Implemented advanced navigation with React Navigation, animations with Lottie, and offline storage via AsyncStorage. Utilized Redux, Axios, Supabase and Firebase for state management, API calls, and authentication. Collaborated with the team to test, debug, and optimize app performance on Android and iOS using Android Studio and Xcode Instruments.',
      },
    ],
  },

  education: {
    title: 'Education',
    items: [
      {
        id: 'ucp',
        degree: 'BS, Computer Science',
        school: 'University of Central Punjab',
        period: 'Oct 2020 – Aug 2024',
        description: 'Lahore, Punjab. GPA: 3.73',
      },
    ],
  },

  skills: {
    title: 'Skills',
    items: [
      { name: 'React Native', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original.svg' },
      { name: 'React.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'FastAPI', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'HTML/CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'GoLang', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
      { name: 'SQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'AWS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'REST APIs', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Backend Development', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg' },
      { name: 'System Design', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Supabase', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Problem-Solving', iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fbbf24'%3E%3Cpath d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z'/%3E%3C/svg%3E" },
      { name: 'Team Collaboration', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg' },
      { name: 'Clear Communication', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
      { name: 'Adaptability', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    ],
  },

  projects: {
    title: 'Projects',
    items: [
      {
        id: 'patient-tracking',
        title: 'Akute Health EHR',
        company: 'Octek',
        description: 'One year as freelancer full-stack developer on Akute Health, an automation-first EHR for modern practices. React.js, Node.js, TypeScript, and MongoDB for scheduling, calendar, task workflows, document management, charting, and patient engagement. HIPAA-aligned, encrypted.',
      },
      {
        id: 'backend-go',
        title: 'Standalone backend project',
        company: 'Octek',
        description: 'Complete backend implementation in Go (GoLang). Also built and maintained Python/FastAPI services for internal tooling and integrations.',
      },
      {
        id: 'saudi-project',
        title: 'Major project with Saudi Arabian company',
        company: 'Octek',
        description: 'Full-stack development using Next.js (frontend) and Spring Boot (backend).',
      },
      {
        id: 'izzy-ai',
        title: 'Izzy AI',
        company: 'Codenax',
        description: 'Mobile app providing personalized career guidance with career path exploration, expert Q&A, and tailored content. Built end-to-end in React Native with TypeScript, Node.js, and MongoDB; launched on App Store.',
        url: 'https://apps.apple.com/us/app/izzy-ai/id6737405359',
      },
      {
        id: 'gastrodev',
        title: 'GastroDev',
        company: 'Codenax',
        description: 'Full-stack restaurant management solution (React, TypeScript & Node.js) with user & staff management, document handling, notice boards, training modules, ticketing, smartlists, and invoice management. Multi-language support, push notifications, role-based access. MERN, Next.js, REST APIs, JWT, Redux.',
      },
      {
        id: 'small-projects',
        title: 'Multiple small projects',
        company: 'Codenax',
        description: 'Violin tuning app, delivery apps, and others.',
      },
    ],
  },

  portfolio: {
    title: 'Portfolio',
    subtitle: 'Selected work and case studies',
    items: [
      {
        id: 'izzy-ai',
        title: 'Izzy AI',
        company: 'Codenax',
        role: 'Full Stack Developer',
        description: 'Developed Izzy AI, a full-featured mobile app offering personalized career guidance. As a Full-Stack Developer, I handled frontend (React Native), backend (Node.js), RESTful APIs, and MongoDB database. Key features include career path exploration, expert Q&A, user onboarding, and personalized content. Focused on performance, security, and scalability. Launched on Google Play with live users and positive engagement.',
        tags: ['Mobile App Development', 'React Native', 'iOS & Android', 'Full Stack', 'API Integration', 'UI/UX Design', 'Firebase', 'Node.js', 'Scalable Apps', 'MVP', 'SaaS'],
        logoUrl: './izyLogo.jpg',
        images: ['./izy1.jpeg', './izy2.jpeg'],
        url: 'https://apps.apple.com/us/app/izzy-ai/id6737405359',
      },
      {
        id: 'gastrodev',
        title: 'GastroDev',
        company: 'Codenax',
        role: 'Full Stack Developer',
        description: 'GastroDev is a full-stack restaurant management solution built with React, TypeScript & Node.js, designed to streamline daily operations. It offers user & staff management, document handling, notice boards, training modules, ticketing, smartlists, and invoice management. With multi-language support, push notifications, and secure role-based access, GastroDev improves efficiency, reduces errors, and ensures smooth communication across teams.',
        tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'JWT Auth', 'Redux', 'Next.js', 'Full Stack Development', 'Web Apps', 'SaaS', 'CRM', 'LMS', 'ERP'],
        logoUrl: './gasLogo.png',
        images: ['./gas1.png', './gas2.png', './gas3.png', './gas4.png'],
      },
      {
        id: 'ehr',
        title: 'Akute Health EHR',
        company: 'Octek',
        role: 'Full Stack Developer',
        description: 'Worked for a year as a freelancer on Akute Health, an automation-first electronic health record (EHR) system for modern direct-to-patient practices. As a Full-Stack Developer, I built and maintained features using React.js, TypeScript, Node.js, and MongoDB. The platform streamlines practice management with customizable charting, flexible scheduling and calendar views, task workflows and smart triage (including fax-to-task automation), document management, and secure file storage. It also supports patient engagement via secure messaging, online intake forms, and appointment reminders. I contributed to HIPAA-aligned, encrypted data handling and helped deliver an intuitive UI that reduces administrative burden so providers can focus on care.',
        tags: ['React.js', 'TypeScript', 'Node.js', 'MongoDB', 'EHR', 'Healthcare', 'Full Stack', 'REST APIs', 'Practice Management', 'Task Workflows', 'Document Management', 'HIPAA', 'SaaS'],
        logoUrl: './akuteLogo.png',
        images: ['./akute1.jpg', './akute2.jpg', './akute3.jpg', './akute4.jpg', './akute5.jpg', './akute6.jpg', './akute7.jpg', './akute8.jpg'],
      },
    ],
  },

  certifications: {
    title: 'Certifications',
    items: [
      { id: '1', name: 'Full-Stack Development', issuer: 'Octek', year: '2025', imageUrl: null },
      { id: '2', name: 'React Native & Mobile Development', issuer: 'Codenax', year: '2023', imageUrl: null, documentUrl: 'experience-letter.pdf' },
      { id: '3', name: 'REST APIs & Backend Systems', issuer: 'Professional', year: '2024', imageUrl: null },
    ],
  },

  blog: {
    title: 'Blog',
    subtitle: 'Notes and articles',
    items: [
      { id: '1', title: 'Building scalable APIs with Node.js', date: 'Feb 2025', excerpt: 'Best practices for REST APIs and database design.', url: '#' },
      { id: '2', title: 'React Native in production', date: 'Jan 2025', excerpt: 'Lessons from shipping cross-platform apps.', url: '#' },
      { id: '4', title: 'FastAPI for modern Python backends', date: 'Jan 2025', excerpt: 'Quick, typed APIs with FastAPI and Pydantic.', url: '#' },
      { id: '3', title: 'EHR systems and developer experience', date: 'Dec 2024', excerpt: 'Improving reliability in healthcare software.', url: '#' },
    ],
  },

  pricing: {
    title: 'Pricing',
    subtitle: 'Hourly rate based on project complexity',
    hourlyMin: 35,
    hourlyMax: 75,
    unit: 'USD',
    description: 'Rates vary depending on scope, timeline, and technical requirements. Get in touch for a tailored quote.',
  },

  interests: {
    title: 'Languages & Interests',
    languages: ['English', 'Urdu'],
    interests: ['Photography', 'Road trips', 'Football'],
  },

  contact: {
    title: 'Contact',
    items: [
      { type: 'email', href: 'mailto:mr.mohid.hameed@gmail.com', label: 'mr.mohid.hameed@gmail.com' },
      { type: 'phone', href: 'tel:+16163158147', label: '+1 (616) 315-8147' },
      { type: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
      { type: 'website', href: 'https://github.com', label: 'GitHub' },
    ],
  },
};
