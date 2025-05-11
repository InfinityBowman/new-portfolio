import { motion } from 'framer-motion';

export const Phrases = () => {
  const phrases = ['Software Engineer', 'Web Developer', 'Frontend Developer', 'Web Performance'];

  // Each phrase is 4 seconds long
  const duration = phrases.length * 4;

  // Calculate the times for each phrase to animate the way I want
  const times = phrases.map((_, index) => {
    const totalLength = 1;
    const phraseLength = totalLength / phrases.length;

    const pauseRatio = 0.03 / 0.34;
    const activeRatio = 0.14 / 0.34;

    const start = index * phraseLength;

    const p1 = start;
    const p2 = p1 + pauseRatio * phraseLength + 0.01;

    const p4 = p1 + (pauseRatio + activeRatio + pauseRatio) * phraseLength;
    const end = p4 + activeRatio * phraseLength;

    const p3 = p4 + 0.05;

    return [
      parseFloat(p1.toFixed(4)),
      parseFloat(p2.toFixed(4)),
      parseFloat(p3.toFixed(4)),
      parseFloat(end.toFixed(4)),
    ];
  });

  const box = {
    opacity: 0,
    bottom: 0,
    height: 50,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="relative flex w-xl justify-center mt-10 text-3xl sm:text-4xl lg:text-5xl opacity-80">
      {phrases.map((phrase, index) => (
        <motion.div
          key={index}
          className="absolute"
          animate={{
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: duration,
            ease: 'linear',
            times: times[index],
            repeat: Infinity,
            // First phrase should bounce in on initial load
            ...(index === 0
              ? {
                  scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
                }
              : {}),
          }}
          style={{ ...box, paddingBottom: '8px' }}
        >
          {phrase}
        </motion.div>
      ))}
    </div>
  );
};
