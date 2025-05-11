import { motion } from 'motion/react';
import React from 'react';
import { LoaderCircle } from 'lucide-react';

interface Design {
  id: number;
  src: string;
  alt: string;
}

const designs: Design[] = [
  { id: 1, src: '/design-images/Relucent_Colors_Glow.png', alt: 'Design 1' },
  { id: 2, src: '/design-images/NotionCalendarDark.png', alt: 'Design 2' },
  { id: 3, src: '/design-images/NotionDark.png', alt: 'Design 3' },
  { id: 4, src: '/design-images/ProtonDark.png', alt: 'Design 4' },
];

interface DesignImageProps {
  design: Design;
  index: number;
}

function DesignImage({ design, index }: DesignImageProps) {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  return (
    <motion.div
      key={design.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className="relative overflow-hidden rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      {!isLoaded && (
        <div className="rounded-lg absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <LoaderCircle
            className="animate-spin"
            size={36}
          />
        </div>
      )}
      <img
        src={design.src}
        alt={design.alt}
        width={400}
        height={300}
        className={`rounded-lg object-cover object-center h-60 transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}

export default function GraphicDesign() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-center gradient-text animate-gradient bg-clip-text text-transparent">
        Graphic Design
      </h1>

      <div className="flex justify-center">
        <motion.div
          className="flex justify-center text-left p-6 mb-6 w-5/6 shadow-glow rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          I've always been interested in making cool looking graphics and over my senior year (2024-2025) I started
          picking up Photoshop. It has been an exciting journey. Since then, I've made a logo for my music artist name
          'Relucent' and some nice custom app icons for my phone.
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {designs.map((design, index) => (
          <DesignImage
            key={design.id}
            design={design}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
