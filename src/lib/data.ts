export const MY_STACK = {
  languages: [
    {
      name: 'Javascript',
      icon: '/logo/js.svg',
    },
    {
      name: 'Typescript',
      icon: '/logo/ts.svg',
    },
    {
      name: 'Python',
      icon: '/logo/python.svg',
    },
    {
      name: 'Rust',
      icon: '/logo/rust.svg',
    },
    {
      name: 'C#',
      icon: '/logo/csharp.svg',
    },
    {
      name: 'C',
      icon: '/logo/c.svg',
    },
  ],
  frontend: [
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
    {
      name: 'TanStack',
      icon: '/logo/tanstack.png',
    },
    {
      name: 'Electron',
      icon: '/logo/electron.svg',
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
    {
      name: 'Hono',
      icon: '/logo/hono.svg',
    },
    {
      name: 'FastAPI',
      icon: '/logo/fastapi.svg',
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
    {
      name: 'Drizzle',
      icon: '/logo/drizzle.svg',
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
    {
      name: 'MCP',
      icon: '/logo/mcp.svg',
    },
    {
      name: 'Terraform',
      icon: '/logo/terraform.svg',
    },
    {
      name: 'Nginx',
      icon: '/logo/nginx.svg',
    },
    {
      name: 'Traefik',
      icon: '/logo/traefik.svg',
    },
    {
      name: 'Airflow',
      icon: '/logo/airflow.svg',
    },
    {
      name: 'TortoiseSVN',
      icon: '/logo/tortoisesvn.svg',
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
    tech: ['.NET/C#', 'C', 'C++', 'JavaScript', 'D3.js', 'Python', 'Winforms', 'Webview2'],
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
    title: 'PaleoWaifu',
    description:
      'A prehistoric animal waifu gacha game. Collect 101 creatures spanning the Cambrian through the Pleistocene, trade with other players, and build your ultimate paleontology collection. Features gacha pulls with a full pity system, rate-up banners, an encyclopedia with real paleontology data, a trading marketplace, daily rewards, and a Discord bot with slash commands and an XP leveling system. Built with TanStack Start, React 19, Tailwind CSS v4, shadcn/ui, Drizzle ORM, Cloudflare D1, and deployed on Cloudflare Workers.',
    media: '/projects/paleowaifu.png',
    link: 'https://paleo-waifu.jacobmaynard.dev',
    refUrl: 'https://github.com/InfinityBowman/paleo-waifu',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'HomeLab PaaS',
    description:
      'A mini Platform-as-a-Service built in Rust, running on a home server (Ubuntu Server 24.04). Features a full CI/CD pipeline via GitHub Actions with a self-hosted runner, automatic Docker container deployment, Cloudflare Tunnel networking with wildcard DNS, and Traefik reverse proxy with Docker label auto-discovery. The Rust workspace includes 7 crates covering a REST API (Axum), SQLite persistence (sqlx), Docker management (bollard), and Cloudflare integration. Also hosts services like Plausible analytics, n8n workflow automation, and Dozzle log viewer.',
    media: '/projects/homelab.png',
    refUrl: 'https://github.com/InfinityBowman/home-lab',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'Civic Data Warehouse',
    description:
      'An ETL data pipeline for civic data built with Apache Airflow, PostgreSQL, and LocalStack (S3). Uses Astronomer CLI for local development with Docker Compose orchestrating Airflow, Postgres, and LocalStack containers. Designed to ingest, transform, and warehouse civic datasets for analysis and visualization.',
    media: '/projects/civic-data-warehouse.png',
    refUrl: 'https://github.com/InfinityBowman/civic-data-warehouse',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'Urban STL Analytics',
    description:
      'HackSLU Hackathon Grand Prize Winner. A unified urban data analytics platform for the City of St. Louis with an AI agent that can control the entire interface. Users ask a question about St. Louis and the agent toggles map overlays, filters datasets, builds charts, and performs RAG over the data to answer it. Combines 311 complaints, crime data, transit equity, vacancy triage, food access, census demographics, and ARPA fund expenditures into a fullscreen Map Explorer with seven toggleable Mapbox GL layers, cross-dataset analysis, custom vacancy triage scoring, transit equity algorithms, and a ChartBuilder. Built with TanStack Start, React 19, Mapbox GL JS, Recharts, and deployed on Cloudflare Workers.',
    media: '/projects/urban-stl-analytics.png',
    link: 'https://jacobmaynard.dev/urbanstl',
    refUrl: 'https://github.com/InfinityBowman/urban-stl-analytics',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'RepoHub',
    description:
      'A macOS desktop app for managing local development projects. Scans your repos directory, auto-detects project types (Node.js, Python, Rust, Go, Java, Swift, monorepos), and lets you run, monitor, and navigate everything from one place. Features inline terminals with auto-detected commands, monorepo support with per-package terminals, dependency health auditing, GitHub PR integration, git status tracking, and port monitoring. Built with Electron, React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, node-pty, and xterm.js.',
    media: '/projects/repohub.png',
    refUrl: 'https://github.com/InfinityBowman/repohub',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'NetRadar',
    description:
      'A macOS desktop app that visualizes all network signals around your Mac in real time: Wi-Fi access points, LAN devices, Bluetooth devices, Bonjour/mDNS services, and active connections. Uses tshark (Wireshark CLI) for deep packet inspection, streaming live protocol dissection to color-coded arc visualizations around each node. Leverages Wireshark\'s OUI database for MAC vendor identification and TTL-based OS fingerprinting. Features an interactive D3.js force-directed graph with force and radial layout modes, real-time scanning, and signal-type filtering. Built with Electron, React 19, D3.js, TypeScript, Vite, and Tailwind CSS v4.',
    media: '/projects/netradar.png',
    refUrl: 'https://github.com/InfinityBowman/NetRadar',
    source: 'Github',
    isVideo: false,
  },
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
