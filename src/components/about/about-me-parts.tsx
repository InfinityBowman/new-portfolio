import { motion } from 'motion/react';
import React from 'react';
import { FaEnvelope, FaLinkedin, FaGraduationCap } from 'react-icons/fa';

const listItemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 10,
    transition: {
      delay: i * 0.2,
    },
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.14 + 1,
    },
  }),
};

export function AboutMeHeader() {
  return (
    <motion.div
      className={`p-6 text-center flex items-center flex-col rounded-lg shadow-glow`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-3xl font-bold mb-4 gradient-text animate-gradient bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        About Me
      </motion.h2>
      <motion.p
        className="text-lg text-secondary-foreground max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        Hello! I'm Jacob Maynard, a senior at the University of Utah majoring in Computer Science with a Certificate in
        Data Science. I love blending programming with design to solve complex problems in beautiful ways. My journey in
        tech has been driven by curiosity and a desire to innovate, and I'm excited to continue building amazing things!
      </motion.p>
    </motion.div>
  );
}

export function Experience() {
  return (
    <motion.div
      className={`flex flex-col gap-2 p-6 rounded-lg shadow-glow`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
      >
        Experience
      </motion.h2>
      <motion.div
        className="mt-4 space-y-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
      >
        <div className="flex gap flex-col mb-4">
          <div className="flex justify-between">
            <p className="font-semibold">Computer/Data Scientist Intern</p>
            <p className="font-light">May 2024 - Aug 2024</p>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <p className="ml-2">Applied Research Associates (ARA)</p>
            <p className="italic">Rapid City, SD</p>
          </div>
        </div>
        <motion.ul
          className="list-disc list-inside space-y-1 custom-list pl-4 text-secondary-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
        >
          <li>Designed and implemented upgrades to Python-based Bokeh data plotting tools.</li>
          <li>
            Led the full stack design and development of a C# .NET application that plots data and computes metrics
            using JavaScript, HTML, CSS, and BokehJS.
          </li>
          <li>Implemented themes and redesigned layout for ARA’s core application.</li>
          <li>Improved speed and UI/UX of existing apps.</li>
          <li>Worked independently and in a team with weekly standup meetings.</li>
        </motion.ul>
      </motion.div>

      <motion.div
        className="mt-4 space-y-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1.4 }}
      >
        <div className="flex gap flex-col mb-4">
          <div className="flex justify-between">
            <p className="font-semibold">Audio Manager, Student Media</p>
            <p className="font-light">Fall 2024 - Present</p>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <p className="ml-2">University of Utah</p>
            <p className="italic">Salt Lake City, UT</p>
          </div>
        </div>
        <motion.ul
          className="list-disc list-inside space-y-1 custom-list pl-4 text-secondary-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.6 }}
        >
          <li>Manage studio equipment and software.</li>
          <li>Manage reservations and scheduling of studio.</li>
          <li>Provide training on studio equipment and update/maintain online training Canvas courses.</li>
        </motion.ul>
      </motion.div>

      <motion.div
        className="mt-4 space-y-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1.8 }}
      >
        <div className="flex gap flex-col mb-4">
          <div className="flex justify-between">
            <p className="font-semibold">Membership Services Associate, Campus Recreation Services</p>
            <p className="font-light">Sept 2022 - May 2024</p>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <p className="ml-2">University of Utah</p>
            <p className="italic">Salt Lake City, UT</p>
          </div>
        </div>
        <motion.ul
          className="list-disc list-inside space-y-1 custom-list pl-4 text-secondary-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 2 }}
        >
          <li>Responsible for sales to members and guests involving memberships, locker rentals and other services.</li>
          <li>Worked collaboratively with other sales team members and departments.</li>
          <li>Provided excellent customer service.</li>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

export function Coursework() {
  return (
    <motion.div
      className={`flex flex-col gap-2 p-6 rounded-lg shadow-glow`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
      >
        Coursework
      </motion.h2>
      <div className="flex flex-row justify-between px-2">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
        >
          <p className="font-semibold">Computer Science</p>
          <motion.ul
            className="list-disc list-inside space-y-1 custom-list pl-4 text-secondary-foreground"
            initial="hidden"
            animate="visible"
          >
            {[
              'Algorithms',
              'Discrete Structures',
              'Software Practice I, II',
              'Database Systems',
              'Computer Systems',
              'Scientific Computing',
              'Computer Organization',
              'Object Oriented Programming',
              'Capstone - Cross platform photo-sharing app',
            ].map((skill, index) => (
              <motion.li
                key={skill}
                custom={index}
                variants={listItemVariants}
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
        >
          <p className="font-semibold">Math & Data Science</p>
          <motion.ul
            className="list-disc list-inside space-y-1 custom-list pl-4 text-secondary-foreground"
            initial="hidden"
            animate="visible"
          >
            {[
              'Calculus 1-3',
              'Linear Algebra',
              'Relational Algebra',
              'Discrete Math',
              'Foundations of Data Analysis',
              'Applied Statistics I and II',
              'Data Wrangling',
              'Data Mining',
              'Visualization for Data Science',
              'Artificial Intelligence',
            ].map((skill, index) => (
              <motion.li
                key={skill}
                custom={index}
                variants={listItemVariants}
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Contact() {
  return (
    <motion.div
      className={`p-4 w-full max-w-xs rounded-lg flex flex-col gap-2 shadow-glow`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
      >
        Contact
      </motion.h2>
      <motion.p
        className="text-lg text-muted-foreground max-w-3xl"
        initial="hidden"
        animate="visible"
      >
        {[
          {
            href: 'mailto:jacobamaynard@proton.me',
            icon: <FaEnvelope className="mr-2 text-primary" />,
            text: 'jacobamaynard@proton.me',
          },
          {
            href: 'https://www.linkedin.com/in/jacob-maynard-283767230/',
            icon: <FaLinkedin className="mr-2 text-primary" />,
            text: 'LinkedIn',
          },
        ].map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="text-blue-500 hover:text-blue-700 flex items-center"
            custom={index}
            variants={listItemVariants}
          >
            {link.icon} {link.text}
          </motion.a>
        ))}
      </motion.p>
    </motion.div>
  );
}
export function Education() {
  return (
    <motion.div
      className={`p-4 w-full max-w-xs rounded-lg flex flex-col gap-2 shadow-glow`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
    >
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      >
        Education
      </motion.h2>
      <motion.ul
        className="text-lg text-muted-foreground max-w-3xl"
        initial="hidden"
        animate="visible"
      >
        {[
          {
            icon: (
              <FaGraduationCap
                size={26}
                className="mr-2 text-primary"
              />
            ),
            text: 'University of Utah',
            subtext: 'Bachelors in Computer Science (2021-2025)',
          },
        ].map((link, index) => (
          <motion.li
            key={link.text}
            className="text-primary flex items-center"
            custom={index}
            variants={listItemVariants}
          >
            <div className="flex flex-row justify-start">
              {link.icon}
              <div className="flex flex-col">
                <div>{link.text}</div>
                <div className="text-sm text-muted-foreground">{link.subtext}</div>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export function Skills() {
  return (
    <motion.div
      className={`p-4 rounded-lg w-full flex flex-col gap-2 shadow-glow`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
    >
      <motion.h2
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
      >
        Skills
      </motion.h2>
      <motion.ul
        className="text-lg text-left text-secondary-foreground max-w-3xl list-disc list-inside"
        initial="hidden"
        animate="visible"
      >
        {[
          'JavaScript & TypeScript',
          'React',
          'React Native',
          'Next.js',
          'Vite',
          'NodeJS',
          'Electron',
          'D3.js',
          'Chart.js',
          'Bokeh & BokehJS',
          'Motion.js',
          'TailwindCSS',
          'Figma',
          'Kotlin + Android',
          'SQL',
          '.NET',
          'C#',
          'C++',
          'Java',
          'Python',
        ].map((skill, index) => (
          <motion.li
            key={skill}
            custom={index}
            variants={listItemVariants}
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
