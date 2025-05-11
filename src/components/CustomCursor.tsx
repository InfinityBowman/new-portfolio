import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide the default cursor

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Make cursor visible after it first moves
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterLink = (e: MouseEvent) => {
      // Check if hovering over a link or button
      const target = e.target as HTMLElement;
      const isLink =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer');

      if (isLink) setIsHoveringLink(true);
    };

    const handleMouseLeaveLink = (e: MouseEvent) => {
      setIsHoveringLink(false);
    };

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
    document.addEventListener('mouseover', handleMouseEnterLink);
    document.addEventListener('mouseout', handleMouseLeaveLink);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clean up
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnterLink);
      document.removeEventListener('mouseout', handleMouseLeaveLink);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Don't render if not visible
  if (!isVisible) return null;

  const size = 10;
  const smallerSize = 8;

  const normalOffset = size / 2;
  const clickingOffset = smallerSize / 2;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          width: isClicking ? `${smallerSize}px` : `${size}px`,
          height: isClicking ? `${smallerSize}px` : `${size}px`,
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          transform: `translate(${position.x - (isClicking ? clickingOffset : normalOffset)}px, ${
            position.y - (isClicking ? clickingOffset : normalOffset)
          }px)`,
        }}
      />

      {/* Secondary larger dot with trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        initial={{ x: position.x - 15, y: position.y - 15 }}
        animate={{
          x: position.x - 15,
          y: position.y - 15,
          borderColor: isClicking || isHoveringLink ? 'rgba(243, 103, 175, 0.5)' : 'rgba(243, 103, 175, 0.3)',
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
