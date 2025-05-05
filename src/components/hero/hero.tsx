import { motion } from 'motion/react';
import { Phrases } from './phrases';
// import { Button } from '../button';
import BackgroundCanvas from '../background-particles';

export const Hero = () => {
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
    <section className="relative flex flex-col gap-8 items-center text-center py-20">
      <BackgroundCanvas opacity={1} />
      <div className="sr-only">Jacob Maynard Portfolio Website</div>
      <motion.h2
        className="text-5xl lg:text-6xl font-bold gradient-text animate-gradient opacity-90 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Jacob Maynard
      </motion.h2>
      <motion.p
        className="text-xl sm:text-2xl lg:text-3xl opacity-80"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        custom={0.4}
      >
        Software Engineer
      </motion.p>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        custom={0.6}
      >
        <Phrases />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        custom={0.8}
      >
        <a href="/about">
          <button
            className={`text-lg shadow-glow text-primary bg-background/80 hover:bg-secondary transition-colors py-1 px-3 rounded-lg`}
          >
            Learn More
          </button>
        </a>
      </motion.div>
    </section>
  );
};
