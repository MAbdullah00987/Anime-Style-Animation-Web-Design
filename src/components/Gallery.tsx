import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useMemo } from 'react';

const IMAGES = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85"
];

export interface GalleryRef {
  panelRef: React.RefObject<HTMLDivElement | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  getScrollHeight: () => number;
}

export const Gallery = forwardRef<GalleryRef>((_, ref) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(2);
      else if (w < 1024) setCols(3);
      else setCols(4);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const layout = useMemo(() => {
    let imagesPlaced = 0;
    const newLayout: (number | -1)[][] = [];
    let r = 0;
    
    while (imagesPlaced < IMAGES.length) {
      const row = Array(cols).fill(-1);
      const a = (r * 2 + (r % 2)) % cols;
      
      if (imagesPlaced < IMAGES.length) {
        row[a] = imagesPlaced++;
      }
      
      if (r % 3 === 0 && imagesPlaced < IMAGES.length) {
        let b = (a + 2) % cols;
        if (b === a) b = (a + 1) % cols;
        row[b] = imagesPlaced++;
      }
      
      newLayout.push(row);
      r++;
    }
    
    return newLayout;
  }, [cols]);

  useImperativeHandle(ref, () => ({
    panelRef,
    wrapperRef,
    cardsRef,
    getScrollHeight: () => wrapperRef.current?.getBoundingClientRect().height || 0
  }));

  return (
    <div 
      ref={panelRef}
      className="fixed inset-0 bg-black z-10"
      style={{ transform: 'translateY(100vh)' }}
    >
      <div 
        ref={wrapperRef}
        className="w-full pt-[min(400px,40vh)] pb-[40vh]"
      >
        <div 
          className="grid gap-4 px-4 w-full max-w-[1920px] mx-auto"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {layout.map((row, rowIndex) => (
            row.map((imageIndex, colIndex) => {
              if (imageIndex === -1) {
                return <div key={`empty-${rowIndex}-${colIndex}`} className="aspect-[2/3]" />;
              }
              
              // transform-origin: cards in left half of grid get right bottom, right half get left bottom
              const isLeftHalf = colIndex < cols / 2;
              const origin = isLeftHalf ? 'right bottom' : 'left bottom';
              
              return (
                <div 
                  key={`img-${imageIndex}`} 
                  ref={el => { cardsRef.current[imageIndex] = el; }}
                  className="bp-card aspect-[2/3] overflow-hidden bg-zinc-900"
                  style={{ transformOrigin: origin, transform: 'scale(0)' }}
                >
                  <img 
                    src={IMAGES[imageIndex]} 
                    alt={`Product ${imageIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
});
