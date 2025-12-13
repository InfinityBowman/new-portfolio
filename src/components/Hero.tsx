import { motion } from 'motion/react';
import { useState, useEffect } from 'preact/hooks';
import Phrases from '@/src/components/Phrases';

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 3;

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              // Lock in characters progressively
              if (index < iteration / 3) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(''),
        );

        iteration++;

        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsComplete(true);
        }
      }, 40);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={isComplete ? '' : 'font-mono'}>
      {displayText ||
        text
          .split('')
          .map(() => ' ')
          .join('')}
    </span>
  );
}

export default function Hero() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="hero" className="min-h-screen relative flex flex-col gap-8 justify-center items-center">
      <div className="sr-only">Jacob Maynard's Portfolio Website</div>
      <motion.h1
        className="text-5xl lg:text-6xl font-bold gradient-text animate-gradient opacity-90 bg-clip-text text-transparent p-1 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ScrambleText text="Jacob Maynard" delay={0.3} />
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        // @ts-ignore
        variants={fadeUpVariants}
        custom={0.4}
      >
        <Phrases />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        // @ts-ignore
        variants={fadeUpVariants}
        custom={0.6}
      ></motion.div>
    </section>
  );
}
