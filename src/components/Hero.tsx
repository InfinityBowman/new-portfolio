import { motion } from 'motion/react';
import Phrases from '@/src/components/Phrases';

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Jacob Maynard
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
