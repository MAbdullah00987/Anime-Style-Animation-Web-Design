import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 mix-blend-exclusion"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22.75" stroke="white" strokeWidth="2.5" />
        <path d="M18 16v16M24 16v16M30 16v16M16 24h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
