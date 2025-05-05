import { motion } from 'motion/react';

export const Phrases = () => {
  const phrases = [
    'I love making cool stuff!',
    'Creating awesome websites!',
    'Building sleek apps!',
    'Designing exciting interfaces!',
    'Working with cool people!',
  ];

  const duration = 20;

  return (
    <div className="relative flex w-80 justify-center mt-10">
      <motion.div
        className="absolute"
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          times: [0.8, 0.83, 0.97, 1],
          repeat: Infinity,
        }}
        style={box}
      >
        {phrases[4]}
      </motion.div>
      <motion.div
        className="absolute"
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          times: [0.6, 0.63, 0.77, 0.8],
          repeat: Infinity,
        }}
        style={box}
      >
        {phrases[3]}
      </motion.div>
      <motion.div
        className="absolute"
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          times: [0.4, 0.43, 0.57, 0.6],
          repeat: Infinity,
        }}
        style={box}
      >
        {phrases[2]}
      </motion.div>
      <motion.div
        className="absolute"
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          times: [0.2, 0.23, 0.37, 0.4],
          repeat: Infinity,
        }}
        style={box}
      >
        {phrases[1]}
      </motion.div>
      <motion.div
        className="absolute"
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          times: [0, 0.03, 0.17, 0.2],
          repeat: Infinity,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }}
        style={box}
      >
        {phrases[0]}
      </motion.div>
    </div>
  );
};

const box = {
  opacity: 0,
  bottom: 0,
  height: 50,
  borderRadius: 5,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
