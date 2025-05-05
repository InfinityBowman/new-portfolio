import { FaExternalLinkAlt } from 'react-icons/fa';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const buttonVariants = ({ variant }: { variant: string }): string => {
  const variants: Record<string, string> = {
    outline: 'px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors',
  };
  return variants[variant] || '';
};

const animations = {
  fadeInBottom: (delay: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
  }),
  fadeInRight: (delay: number) => ({
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { delay, duration: 0.5 } },
  }),
  fadeInLeft: (delay: number) => ({
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { delay, duration: 1 } },
  }),
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.article
      key={index}
      className="flex md:flex-row flex-col md:justify-between gap-2"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.5 }}
      ref={ref}
      role="article"
    >
      <div className="flex flex-col">
        <motion.h2
          id={`project-title-${index}`}
          className="text-xl font-semibold mb-2"
          variants={animations.fadeInRight(0.3)}
        >
          {project.title}
        </motion.h2>
        <motion.p
          className="subtext max-w-lg"
          variants={animations.fadeInRight(0.4)}
        >
          {project.description}
        </motion.p>

        <motion.div variants={animations.fadeInRight(0.4)}>
          <a
            className={`${buttonVariants({ variant: 'outline' })} my-4 w-28 flex gap-2`}
            href={project.refUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on ${project.source} (opens in new tab)`}
          >
            <span>{project.source}</span>
            <FaExternalLinkAlt
              className="mb-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>

      <motion.video
        variants={animations.fadeInLeft(0.4)}
        className="flex md:max-w-lg max-w-xs h-60 md:h-96 border border-white rounded-lg overflow-hidden w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-label={`Demo video for ${project.title}`}
      >
        <source
          src={project.videoUrl}
          type="video/mp4"
        />
        <p>Your browser does not support the video tag.</p>
      </motion.video>
    </motion.article>
  );
};

ProjectCard.displayName = 'ProjectCard';

interface Project {
  title: string;
  description: string;
  videoUrl: string;
  refUrl: string;
  source: string;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // TODO Move projects data to separate file if it grows larger
  const projects: Project[] = [
    {
      title: 'League Dashboard',
      description:
        'Dashboard of visualizations built purely with D3.js utilizing a Node.js server with Express and Axios to fetch live summoner data from the Riot API.',
      videoUrl: '/leagueDashboard.mp4',
      refUrl: 'https://github.com/InfinityBowman/LeagueOfLegendsDashboard',
      source: 'Github',
    },
    {
      title: 'This Website!',
      description:
        'Porfolio website made with TailwindCSS, and TypeScript. Utilizes Axios for getting song info. Motion/Framer Motion is used for all of the amazing animations.',
      videoUrl: '/portfolioDemo.mp4',
      refUrl: 'https://github.com/InfinityBowman/portfolio',
      source: 'Github',
    },
    {
      title: 'Markdown Notes App',
      description:
        'Notes app made in Electron + Vite with React and Typescript. Accesses filesystem to create and autosave notes. Supports markdown editing. Uses Jotai for state management and TailwindCSS, Tailwind Merge for styling.',
      videoUrl: '/NotesPlusDemo.mp4',
      refUrl: 'https://github.com/InfinityBowman/notes-app',
      source: 'Github',
    },
    {
      title: 'Local AI Chatbot',
      description:
        'Adapted out of the Notes to be a clone of the ChatGPT MacOS app that uses local Ollama models. The app allows the model to write in rich text and remember context of the conversation with the user.',
      videoUrl: '/InvisibleChatDemo.mp4',
      refUrl: 'https://github.com/InfinityBowman/invisible-chat',
      source: 'Github',
    },
    {
      title: 'MoonBlight',
      description:
        "Video game made in Unity with C#. A 2D bullet hell conceptualized, designed, and created within 48 Hours for the University of Utah's March 2022 Game Jam. Worked with a large team of programmers, desginers, and artists to create a neat little game.",
      videoUrl: '/moonBlight.mp4',
      refUrl: 'https://monkeybarrelgames.itch.io/moonblight',
      source: 'Itch.io',
    },
  ];

  return (
    <section
      className="w-full"
      aria-label="Projects Section"
    >
      <motion.div
        className={`my-4 p-2 rounded-lg shadow-glow`}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        variants={animations.fadeInBottom(0)}
        ref={ref}
      >
        <motion.h1
          className="text-center text-3xl p-4 font-bold gradient-text animate-gradient bg-clip-text text-transparent"
          variants={animations.fadeInBottom(0)}
        >
          Projects
        </motion.h1>
        <div className="flex flex-col rounded-lg p-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
