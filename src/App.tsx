import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import type { GalleryRef } from './components/Gallery';
import { UIOverlays } from './components/UIOverlays';
import { Cursor } from './components/Cursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<GalleryRef>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => {
      setVh(window.innerHeight);
      if (galleryRef.current) {
        const wrapHeight = galleryRef.current.getScrollHeight();
        setMaxScroll(Math.max(0, wrapHeight - window.innerHeight));
      }
    };
    
    // Initial measurement after a short delay to ensure images/layout are ready
    const timer = setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const loop = (time: number) => {
      const scrollY = window.scrollY;
      const v = window.innerHeight;
      
      const panel = galleryRef.current?.panelRef.current;
      const wrapper = galleryRef.current?.wrapperRef.current;
      const cards = galleryRef.current?.cardsRef.current || [];
      
      if (panel && wrapper) {
        if (scrollY <= v) {
          // Phase 1: Panel slides up
          gsap.set(panel, { y: v - scrollY });
          gsap.set(wrapper, { y: 0 });
        } else if (scrollY > v && scrollY <= v + maxScroll) {
          // Phase 2: Panel is fixed, wrapper translates up
          gsap.set(panel, { y: 0 });
          gsap.set(wrapper, { y: -(scrollY - v) });
        } else {
          // Outro: Panel is fixed, wrapper is fully translated up
          gsap.set(panel, { y: 0 });
          gsap.set(wrapper, { y: -maxScroll });
        }
        
        // Card behavior
        cards.forEach((card) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const top = rect.top;
          const bottom = rect.bottom;
          
          if (bottom <= 0 || top >= v) {
             card.style.transform = 'scale(0)';
          } else {
             const enter = Math.min(1, (v - top) / (v * 0.6));
             const exit = Math.min(1, bottom / (v * 0.4));
             const scale = Math.min(enter, exit);
             card.style.transform = `scale(${Math.max(0, scale)})`;
          }
        });
      }
      
      // Outro UI elements
      if (scrollY > v + maxScroll && maxScroll > 0) {
        const progress = Math.min(1, Math.max(0, (scrollY - v - maxScroll) / (v - 100)));
        
        const overlay = document.getElementById('outro-overlay');
        if (overlay) overlay.style.opacity = progress.toString();
        
        const buyBtn = document.getElementById('outro-buy');
        if (buyBtn) buyBtn.style.transform = `scale(${progress})`;
        
        const footer = document.getElementById('outro-footer');
        if (footer) footer.style.opacity = progress.toString();
        
        const info = document.getElementById('outro-info');
        if (info) {
          const isDesktop = window.innerWidth >= 1024;
          const offset = parseFloat(info.getAttribute(isDesktop ? 'data-outro-offset-desktop' : 'data-outro-offset-mobile') || '166');
          info.style.transform = `translateY(${-progress * offset}px)`;
        }
      } else {
        const overlay = document.getElementById('outro-overlay');
        if (overlay) overlay.style.opacity = '0';
        
        const buyBtn = document.getElementById('outro-buy');
        if (buyBtn) buyBtn.style.transform = `scale(0)`;
        
        const footer = document.getElementById('outro-footer');
        if (footer) footer.style.opacity = '0';
        
        const info = document.getElementById('outro-info');
        if (info) info.style.transform = `translateY(0px)`;
      }
      
      // Symbol randomizer (throttled to 80ms)
      if (time - lastTime > 80) {
        const symbolEl = document.getElementById('circle-symbol');
        if (symbolEl) {
          if (scrollY > 10) {
            const symbols = ['8', '$', '^^', '%', '/'];
            symbolEl.innerText = symbols[Math.floor(Math.random() * symbols.length)];
          } else {
            symbolEl.innerText = '8';
          }
        }
        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    
    animationFrameId = requestAnimationFrame(loop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxScroll]);

  return (
    <div 
      id="scroll-spacer" 
      ref={spacerRef}
      className="relative select-none bg-white max-lg:cursor-auto lg:cursor-none"
      style={{ height: maxScroll > 0 ? `${vh + maxScroll + 2 * vh}px` : '500vh' }}
    >
      <Cursor />
      <Hero />
      <Gallery ref={galleryRef} />
      <UIOverlays />
    </div>
  );
}

export default App;
