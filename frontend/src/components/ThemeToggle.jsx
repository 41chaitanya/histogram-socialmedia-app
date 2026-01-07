import { useTheme } from '../context/ThemeContext';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const buttonRef = useRef();

  useEffect(() => {
    gsap.fromTo(buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out' }
    );
  }, [isDark]);

  const handleClick = () => {
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: toggleTheme
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
