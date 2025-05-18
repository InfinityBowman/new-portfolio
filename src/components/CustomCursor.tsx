import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback(
    (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    },
    [isVisible],
  );

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Handle cursor disappearing when leaving the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clean up
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, updatePosition]);

  // Don't render if not visible
  if (!isVisible) return null;

  const size = 10;
  const smallerSize = 8;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
        style={{
          width: isClicking ? `${smallerSize}px` : `${size}px`,
          height: isClicking ? `${smallerSize}px` : `${size}px`,
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          transform: `translate3d(${position.x - (isClicking ? smallerSize / 2 : size / 2)}px, ${
            position.y - (isClicking ? smallerSize / 2 : size / 2)
          }px, 0)`,
        }}
      />

      {/* Secondary larger dot with trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        initial={{ x: position.x - 15, y: position.y - 15 }}
        animate={{
          x: position.x - 15,
          y: position.y - 15,
          borderColor: isClicking ? 'rgba(243, 103, 175, 0.5)' : 'rgba(243, 103, 175, 0.3)',
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.25,
          borderColor: { duration: 0.1 },
        }}
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: '2px',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};

export default CustomCursor;
