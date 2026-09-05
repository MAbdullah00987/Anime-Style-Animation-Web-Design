import { useEffect, useRef, useState } from 'react';

const LEFT_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4";
const RIGHT_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const isLoaded = loadedCount >= 2;
  
  const [isTouch] = useState(typeof window !== 'undefined' ? ('ontouchstart' in window || navigator.maxTouchPoints > 0) : false);

  const handleLoadedData = () => {
    setLoadedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (!isLoaded) return;
    
    const leftVid = leftVideoRef.current;
    const rightVid = rightVideoRef.current;
    if (!leftVid || !rightVid) return;

    if (isTouch) {
      // Touch: auto-play alternating
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      leftVid.style.display = 'block';
      rightVid.style.display = 'none';
      
      const playLeft = () => {
        leftVid.style.display = 'block';
        rightVid.style.display = 'none';
        leftVid.currentTime = 0;
        leftVid.play().catch(() => {});
      };
      
      const playRight = () => {
        rightVid.style.display = 'block';
        leftVid.style.display = 'none';
        rightVid.currentTime = 0;
        rightVid.play().catch(() => {});
      };

      leftVid.addEventListener('ended', playRight);
      rightVid.addEventListener('ended', playLeft);
      
      playLeft();
      
      return () => {
        leftVid.removeEventListener('ended', playRight);
        rightVid.removeEventListener('ended', playLeft);
      };
    } else {
      // Desktop: scrub based on cursor
      let mouseX = window.innerWidth / 2;
      let activeSide: 'left' | 'right' | null = null;
      let animationFrameId: number;
      
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      const loop = () => {
        const width = window.innerWidth;
        const center = width / 2;
        const deadZone = Math.max(30, width * 0.05); // Use max of 30 or 5% of width as dead zone
        
        if (mouseX > center - deadZone && mouseX < center + deadZone) {
          // Dead zone
          if (activeSide === 'left' || activeSide === 'right') {
            const activeVid = activeSide === 'left' ? leftVid : rightVid;
            if (!activeVid.seeking) {
              activeVid.currentTime = 0;
            }
          }
        } else if (mouseX <= center - deadZone) {
          // Left side of screen -> show RIGHT video
          activeSide = 'right';
          rightVid.style.display = 'block';
          leftVid.style.display = 'none';
          
          const availableRange = center - deadZone;
          const distance = availableRange - mouseX; // 0 at edge of deadzone, availableRange at left edge
          const progress = distance / availableRange;
          
          if (!rightVid.seeking && rightVid.duration) {
            rightVid.currentTime = Math.min(progress * rightVid.duration, rightVid.duration - 0.01);
          }
        } else if (mouseX >= center + deadZone) {
          // Right side of screen -> show LEFT video
          activeSide = 'left';
          leftVid.style.display = 'block';
          rightVid.style.display = 'none';
          
          const availableRange = width - (center + deadZone);
          const distance = mouseX - (center + deadZone); // 0 at edge of deadzone, availableRange at right edge
          const progress = distance / availableRange;
          
          if (!leftVid.seeking && leftVid.duration) {
            leftVid.currentTime = Math.min(progress * leftVid.duration, leftVid.duration - 0.01);
          }
        }
        
        animationFrameId = requestAnimationFrame(loop);
      };
      
      animationFrameId = requestAnimationFrame(loop);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isLoaded, isTouch]);

  return (
    <div
      id="main-canvas"
      ref={containerRef}
      className={`pointer-events-none overflow-hidden transition-opacity duration-300 ease-in-out
        max-sm:fixed max-sm:left-0 max-sm:top-[220px] max-sm:w-[100vw] max-sm:h-[calc(100vh-220px)] max-sm:z-0
        lg:fixed lg:inset-0 lg:w-full lg:h-full lg:z-0
        ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <video
        ref={leftVideoRef}
        src={LEFT_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover hidden"
        onLoadedData={handleLoadedData}
      />
      <video
        ref={rightVideoRef}
        src={RIGHT_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover block"
        onLoadedData={handleLoadedData}
      />
    </div>
  );
}
