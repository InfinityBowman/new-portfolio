import { useEffect, useMemo, useState } from 'preact/hooks';

const PHRASES = ['Software Engineer', 'Web Developer', 'Frontend Developer', 'Backend Developer', 'Web Performance'] as const;

type Phase = 'typing' | 'holding' | 'deleting';

export default function Phrases() {
  const phrases = PHRASES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [showCursor, setShowCursor] = useState(true);

  const currentPhrase = phrases[currentIndex] ?? '';
  const displayText = useMemo(() => currentPhrase.slice(0, subIndex), [currentPhrase, subIndex]);

  useEffect(() => {
    // Tunables
    const TYPE_MS = 80;
    const DELETE_MS = 40;
    const HOLD_MS = 1400;
    const BETWEEN_MS = 250;

    let delay = TYPE_MS;

    if (phase === 'typing') {
      if (subIndex >= currentPhrase.length) {
        delay = HOLD_MS;
      } else {
        delay = TYPE_MS;
      }
    }

    if (phase === 'deleting') {
      delay = subIndex === 0 ? BETWEEN_MS : DELETE_MS;
    }

    if (phase === 'holding') {
      delay = HOLD_MS;
    }

    const timeout = setTimeout(() => {
      if (phase === 'typing') {
        if (subIndex < currentPhrase.length) {
          setSubIndex((value) => value + 1);
          return;
        }
        setPhase('deleting');
        return;
      }

      if (phase === 'deleting') {
        if (subIndex > 0) {
          setSubIndex((value) => value - 1);
          return;
        }
        setCurrentIndex((value) => (value + 1) % phrases.length);
        setPhase('typing');
        return;
      }

      // holding
      setPhase('deleting');
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentPhrase, phase, phrases.length, subIndex]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="relative flex w-xl justify-center text-3xl sm:text-4xl lg:text-5xl opacity-80">
      <div className="flex items-center">
        <span>{displayText}</span>
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1`}>|</span>
      </div>
    </div>
  );
}
