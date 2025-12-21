export const MY_STACK = {
  frontend: [
    {
      name: 'Javascript',
      icon: '/logo/js.svg',
    },
    {
      name: 'Typescript',
      icon: '/logo/ts.svg',
    },
    {
      name: 'SolidJS',
      icon: '/logo/solid.svg',
    },
    {
      name: 'React',
      icon: '/logo/react.svg',
    },
    {
      name: 'Next.js',
      icon: '/logo/next.svg',
    },
    {
      name: 'Zustand',
      icon: '/logo/zustand.svg',
    },
    {
      name: 'Tailwind CSS',
      icon: '/logo/tailwind.svg',
    },
    {
      name: 'GSAP',
      icon: '/logo/gsap.svg',
    },
    {
      name: 'Framer Motion',
      icon: '/logo/framer-motion.png',
    },
    {
      name: 'Motion',
      icon: '/logo/motion.png',
    },
    {
      name: 'React Native',
      icon: '/logo/react.svg',
    },
    {
      name: 'D3',
      icon: '/logo/d3.svg',
    },
    {
      name: 'Bokeh',
      icon: '/logo/bokeh.svg',
    },
  ],
  backend: [
    {
      name: '.Net',
      icon: '/logo/dotnet.svg',
    },
    {
      name: 'Bun',
      icon: '/logo/bun.svg',
    },
    {
      name: 'Node.js',
      icon: '/logo/node.svg',
    },
    {
      name: 'AWS',
      icon: '/logo/aws.svg',
    },
    {
      name: 'Cloudflare',
      icon: '/logo/cloudflare.svg',
    },
  ],
  database: [
    {
      name: 'MySQL',
      icon: '/logo/mysql.svg',
    },
    {
      name: 'PostgreSQL',
      icon: '/logo/postgreSQL.png',
    },
    {
      name: 'SQLite',
      icon: '/logo/sqlite.svg',
    },
  ],
  tools: [
    {
      name: 'Git',
      icon: '/logo/git.png',
    },
    {
      name: 'Vite',
      icon: '/logo/vite.svg',
    },
    {
      name: 'Vitest',
      icon: '/logo/vitest.svg',
    },
    {
      name: 'Docker',
      icon: '/logo/docker.svg',
    },
  ],
};

export interface ExperienceItem {
  company: string;
  title: string;
  duration: string;
  description?: string;
  highlights?: string[];
  tech?: string[];
}

export const MY_EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Applied Research Associates',
    title: 'Software Engineering Intern',
    duration: 'Full-time onsite: May–Aug 2025; Part-time remote: Aug 2025–Present',
    description:
      'ARA is an international research and engineering firm that provides innovative, practical solutions to complex problems in defense, space, security, and critical infrastructure.',
    highlights: [
      'Developed and maintained classified data visualization software for the U.S. Air Force, contributing across the full stack with a focus on analytical tooling and visualization',
      'Built tools and applications in .NET/C# and implemented D3.js-based interactive visualizations for complex datasets',
      'Supported data analysis workflows using Python and collaborated with researchers and engineers to translate analytical requirements into performant, user-facing visual tools',
      'Went above and beyond to identify and solve hard problems and introduce new ideas and technologies to improve productivity and capabilities',
      'Invited to continue part-time remotely during the academic year based on outstanding performance and impact during the summer internships',
      '"Jacob is a high-achieving, goal-oriented individual, and he is a pleasure to work with." - Project Lead Feedback',
    ],
    tech: ['.NET/C#', 'JavaScript', 'D3.js', 'Python', 'Winforms', 'Webview2'],
  },
  {
    company: 'University of Utah',
    title: 'Audio Manager, Student Media',
    duration: 'September 2024 - May 2025',
    highlights: [
      'This was a fun role I took during my final two semesters of undergrad between two summer internships at ARA.',
      'My experience in music production and audio engineering allowed me to manage audio equipment, assist in recording sessions, and support live broadcasts for university events.',
      'I also gave recommendations for new equipment purchases and processes to ensure the longevity of the equipment',
    ],
  },
  {
    company: 'Applied Research Associates',
    title: 'Computer/Data Scientist Intern',
    duration: 'May 2024 - August 2024',
    description:
      'ARA is an international research and engineering firm that provides innovative, practical solutions to complex problems in defense, space, security, and critical infrastructure.',
    highlights: [
      'Maintained and developed software that provided digital modeling, simulation, and analysis tools for aircraft survivability.',
      'Responsible for re-imagining and creating a software product based on an engineering-level prototype developed in Python. As lead for the project, I was responsible for all phases of application development: deriving requirements; building user documentation; and working with senior software professionals to address distribution challenges associated with deploying software on U.S. Air Force networks',
      'The project was also used as a testing ground for more modern technologies that I recommended be introduced into the company’s development stack.',
    ],
    tech: ['.NET/C#', 'JavaScript', 'Bokeh', 'Python', 'Winforms', 'Webview2'],
  },
  {
    company: 'University of Utah',
    title: 'Membership Services Associate',
    duration: 'September 2022 - May 2024',
    highlights: [
      'Provided excellent customer service to gym members, assisting with check-ins, membership inquiries, and facility usage.',
      'Maintained a clean and organized front desk area, ensuring a welcoming environment for all members.',
    ],
  },
];

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

export const MY_EDUCATION: EducationItem[] = [
  {
    institution: 'Saint Louis University',
    degree: 'Master of Science in Artificial Intelligence',
    duration: 'August 2025 - May 2027 (Expected)',
  },
  {
    institution: 'University of Utah',
    degree: 'Bachelor of Science in Computer Science',
    duration: 'August 2021 - May 2025',
    description: 'with Certificate in Data Science',
  },
];

interface Project {
  title: string;
  description: string;
  media: string;
  refUrl?: string;
  source?: string;
  isVideo: boolean;
  link?: string;
  readMore?: string;
}

export const MY_PROJECTS: Project[] = [
  {
    title: 'CoRATES',
    description:
      'CoRATES is a Collaborative Research Appraisal Tool for Evidence Synthesis. It is a real-time, collaborative web application for conducting systematic reviews and meta-analyses, enabling multiple researchers to concurrently appraise studies with conflict-free synchronization. The platform is designed as a local-first PWA on Cloudflare Workers, using Durable Objects and Yjs (CRDTs) for real-time collaboration, with D1 and R2 for persistent storage. It features full authentication and billing flows (OAuth, magic links, optional 2FA, admin impersonation, Stripe), as well as a custom MCP server to improve agent-driven development workflows.',
    media: '/projects/corates.png',
    link: 'https://corates.org',
    isVideo: false,
    readMore: '/blog/corates',
  },
  {
    title: "Where's Religion?",
    description:
      'Maintained and added features to an open source platform at SLU with Next.js website and React Native cross platform mobile app. I worked with a client and lead a team of undergraduate capstone students to fix bugs and roll out new features and redesigns.',
    media: '/projects/wheres-religion.png',
    link: 'https://wheresreligion.netlify.app',
    refUrl: 'https://github.com/oss-slu/lrda_mobile',
    source: 'Github',
    isVideo: false,
    readMore: '/blog/wheres-religion',
  },
  {
    title: 'BeThere Landing Page',
    description:
      'Landing page created for my senior capstone React Native mobile app project. Built with React, Emotion.js, and Motion/Framer Motion. I wanted to see what the CSS in JS was about, and it is neat but I do prefer Tailwind due to its nice coupling of components and CSS.',
    media: '/projects/bethere-landing.png',
    link: 'https://bethere.jacobmaynard.dev',
    refUrl: 'https://github.com/InfinityBowman/bethere-landing',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'BeThere Photo Sharing App',
    description:
      'A real-time cross-platform photo sharing app built in React Native with Expo, Zustand, Auth0, Axios, and React Native Maps. It features a camera, photo feed, friends system, reporting, liking, content filtering, and more. It used a .NET web server hosted on AWS EC2 with photos stored in S3. This was my senior capstone project.',
    media: '/projects/albums.mp4',
    refUrl: 'https://bethere.jacobmaynard.dev',
    source: 'Landing Page',
    isVideo: true,
  },
  {
    title: 'This Website',
    description:
      'My portfolio website made with React, TailwindCSS, GSAP, Motion/Framer Motion, Lenis (smooth scrolling), Vite, and TypeScript.',
    media: '/projects/new-portfolio.png',
    refUrl: 'https://github.com/InfinityBowman/new-portfolio',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'League Dashboard',
    description:
      'Dashboard of visualizations built purely with D3.js utilizing a Node.js server with Express and Axios to fetch live summoner data from the Riot API. This was my first experience with D3 and I’ve continued using it and improving at it.',
    media: '/projects/league-dashboard.jpg',
    refUrl: 'https://github.com/InfinityBowman/LeagueOfLegendsDashboard',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'Markdown Notes App',
    description:
      'Notes app made in Electron + Vite with React and Typescript. Accesses filesystem to create and autosave notes. Supports markdown editing. Uses Jotai for state management and TailwindCSS, Tailwind Merge for styling. This was my first time trying out Electron. It’s pretty cool but I definitely also want to try out Tauri.',
    media: '/projects/notes-plus.jpg',
    refUrl: 'https://github.com/InfinityBowman/notes-app',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'MoonBlight',
    description:
      "Video game made in Unity with C#. A 2D bullet hell conceptualized, designed, and created within 48 Hours for the University of Utah's March 2022 Game Jam. Worked with a large team of programmers, designers, and artists to create a neat little game.",
    media: '/projects/moon-blight.jpg',
    refUrl: 'https://monkeybarrelgames.itch.io/moonblight',
    source: 'Itch.io',
    isVideo: false,
  },
];

export const ABOUT = {
  title: "Hi, I'm Jacob",
  description:
    "I'm passionate about building applications that bring value to people. I enjoy learning all I can as a student and software developer, and love exploring new things and applying that knowledge. I'm currently pursuing a Masters in Artificial Intelligence at Saint Louis University. My goal is to be a great software developer so I can work with awesome people to continue learning and building cool stuff.",
};
