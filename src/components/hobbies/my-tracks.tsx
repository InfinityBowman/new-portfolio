import { motion } from 'motion/react';
import React, { Suspense, lazy } from 'react';
import { LoaderCircle } from 'lucide-react';

const AudioPlayer = lazy(() => import('@/components/hobbies/audio-player'));
const tracks = [
  {
    id: 1,
    src: '/audio/LiquidCaverns.mp3',
    alt: 'Liquid Caverns',
  },
  { id: 2, src: '/audio/NeuroFunStyle.mp3', alt: 'NeuroFun Style' },
  { id: 3, src: '/audio/Shattered.mp3', alt: 'Shattered' },
  { id: 4, src: '/audio/youjust.mp3', alt: 'You just' },
];

export default function MyTracks() {
  return (
    <section>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold my-4 text-center gradient-text animate-gradient bg-clip-text text-transparent">
          Music
        </h2>
        <div className="flex justify-center">
          <motion.div
            className="flex justify-center text-left p-6 mb-6 w-5/6 shadow-glow rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            I've been creating music on and off since my senior year of high school. I've made a few tracks that I'm
            fairly proud of and have them below. I love blending different genres together and making crazy sounds. No
            spotify profile or anything yet, I just post on Youtube but, if I manage to finish a few more tracks I may
            post there as well.
          </motion.div>
        </div>
        {tracks.map((track) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: track.id * 0.2 + 0.6 }}
          >
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-20 bg-background/30 backdrop-blur-sm rounded-lg my-4">
                  <LoaderCircle
                    className="animate-spin"
                    size={24}
                  />
                </div>
              }
            >
              <AudioPlayer
                url={track.src}
                title={track.alt}
              />
            </Suspense>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
