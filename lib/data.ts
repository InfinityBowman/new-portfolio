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
      name: 'Emotion CSS',
      icon: '/logo/emotion.png',
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
      name: 'Deno.js',
      icon: '/logo/deno.svg',
    },
    {
      name: 'Node.js',
      icon: '/logo/node.svg',
    },
    {
      name: 'Express.js',
      icon: '/logo/express.png',
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
      name: 'Docker',
      icon: '/logo/docker.svg',
    },
    {
      name: 'AWS',
      icon: '/logo/aws.png',
    },
  ],
};

export const MY_EXPERIENCE = [
  {
    company: 'Applied Research Associates',
    title: 'Software Engineering Intern',
    duration: 'May 2025 - August 2025',
  },
  {
    company: 'University of Utah',
    title: 'Audio Manager, Student Media',
    duration: 'September 2025 - May 2025',
  },
  {
    company: 'Applied Research Associates',
    title: 'Computer/Data Scientist Intern',
    duration: 'May 2024 - August 2024',
  },
  {
    company: 'University of Utah',
    title: 'Membership Services Associate',
    duration: 'September 2022 - May 2024',
  },
];

interface Project {
  title: string;
  description: string;
  media: string;
  refUrl: string;
  source: string;
  isVideo: boolean;
  link?: string;
}

export const MY_PROJECTS: Project[] = [
  {
    title: 'BeThere Landing Page',
    description:
      'Landing page created for my senior capstone React Native mobile app project. Built with React, Emotion.js, and Motion/Framer Motion.',
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
    description: 'My porfolio website made with React, TailwindCSS, GSAP, Motion/Framer Motion, Lenis, Vite, and TypeScript.',
    media: '/projects/new-portfolio.png',
    refUrl: 'https://github.com/InfinityBowman/new-portfolio',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'League Dashboard',
    description:
      'Dashboard of visualizations built purely with D3.js utilizing a Node.js server with Express and Axios to fetch live summoner data from the Riot API.',
    media: '/projects/league-dashboard.jpg',
    refUrl: 'https://github.com/InfinityBowman/LeagueOfLegendsDashboard',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'Markdown Notes App',
    description:
      'Notes app made in Electron + Vite with React and Typescript. Accesses filesystem to create and autosave notes. Supports markdown editing. Uses Jotai for state management and TailwindCSS, Tailwind Merge for styling.',
    media: '/projects/notes-plus.jpg',
    refUrl: 'https://github.com/InfinityBowman/notes-app',
    source: 'Github',
    isVideo: false,
  },
  {
    title: 'MoonBlight',
    description:
      "Video game made in Unity with C#. A 2D bullet hell conceptualized, designed, and created within 48 Hours for the University of Utah's March 2022 Game Jam. Worked with a large team of programmers, desginers, and artists to create a neat little game.",
    media: '/projects/moon-blight.jpg',
    refUrl: 'https://monkeybarrelgames.itch.io/moonblight',
    source: 'Itch.io',
    isVideo: false,
  },
];

export const ABOUT = {
  title: "Hi, I'm Jacob",
  description:
    "I’m passionate about building great applications that bring value to people. I enjoy learning all I can as a student and software developer, and love applying my acquired knowledge in the real world. I’m driven to figure out how things work on a foundational level, and often find myself engrossed in the details. Starting Fall 2025, I'll be pursuing a Masters in Computer Science at Saint Louis University. After that my goal is to pursue a career as a software developer and apply my skills in Javascript and C# to build powerful applications.",
};
