'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  loop?: boolean;
  pauseDuration?: number;
}

export default function TypewriterText({ 
  text, 
  className = '', 
  delay = 0, 
  speed = 100,
  loop = false,
  pauseDuration = 2000
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    let timer: NodeJS.Timeout;

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting) {
      if (currentIndex > 0) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        }, speed / 2); // Delete faster than typing
      } else {
        // Finished deleting, start typing again
        setIsDeleting(false);
      }
    } else {
      if (currentIndex < text.length) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else if (loop) {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, isStarted, isDeleting, isPaused, loop, pauseDuration]);

  return (
    <h2 className={className}>
      {displayedText}
      {(currentIndex < text.length || isDeleting || isPaused) && (
        <span className="animate-pulse text-blue-400">|</span>
      )}
    </h2>
  );
}