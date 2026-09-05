import { motion } from 'motion/react';

export function UIOverlays() {
  const ease = [0.25, 0.1, 0.25, 1] as const;

  return (
    <>
      {/* 1B. Logo (Top Left) */}
      <motion.div
        className="fixed z-20 mix-blend-exclusion pointer-events-none max-sm:w-[124px] max-sm:top-4 max-sm:left-4 sm:max-lg:w-[266px] sm:max-lg:top-4 sm:max-lg:left-4 lg:w-[355px] lg:top-8 lg:left-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0 }}
      >
        <svg viewBox="0 0 355 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Mock logo path since exact paths weren't provided */}
          <path d="M10 50 Q 30 10, 60 50 T 110 50 M 130 50 Q 150 10, 180 50 T 230 50 M 250 50 Q 270 10, 300 50 T 350 50" stroke="white" strokeWidth="8" strokeLinecap="round" />
          <text x="320" y="30" fill="white" fontSize="24" fontFamily="sans-serif">®</text>
        </svg>
      </motion.div>


      {/* 1D. Header Navigation */}
      <motion.div
        className="fixed z-20 mix-blend-exclusion pointer-events-none flex justify-between items-center
          max-sm:top-4 max-sm:right-4 max-sm:w-auto
          lg:top-8 lg:right-8 lg:w-[330px] lg:h-[30px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
      >
        <span className="max-sm:hidden font-['Inter_Tight'] font-medium text-[15px] uppercase text-white">ABOUT</span>
        <div className="flex items-center max-sm:gap-[20px] lg:gap-[50px]">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-sm:w-[24px] max-sm:h-[24px] lg:w-[30px] lg:h-[30px]">
            <path d="M0 14H40M0 26H40" stroke="white" strokeWidth="2.5" />
          </svg>
          <span className="font-['Inter_Tight'] font-medium max-sm:text-[13px] lg:text-[15px] text-white">[ CART ]</span>
        </div>
      </motion.div>

      {/* 1E. Product Info */}
      <motion.div
        id="outro-info"
        data-outro-offset-desktop="166"
        data-outro-offset-mobile="132"
        className="fixed z-20 mix-blend-exclusion pointer-events-none flex flex-col items-center
          max-sm:left-0 max-sm:right-0 max-sm:bottom-[48px]
          lg:right-8 lg:bottom-[80px] lg:w-[330px] lg:left-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.45 }}
      >
        <div className="flex flex-col items-start w-full max-sm:w-[252px] max-sm:mb-[12px] lg:mb-[32px]">
          <div className="relative max-sm:w-[20px] max-sm:h-[20px] lg:w-[30px] lg:h-[30px]">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
              <circle cx="20" cy="20" r="18.75" stroke="white" className="max-sm:stroke-[2] lg:stroke-[2.5]" />
            </svg>
            <span id="circle-symbol" className="absolute inset-0 flex items-center justify-center font-['Inter_Tight'] font-medium max-sm:text-[10px] lg:text-[15px] tracking-[-0.04em] uppercase text-white">8</span>
          </div>
          <div className="font-['Inter_Tight'] font-medium max-sm:text-[20px] lg:text-[30px] leading-none text-center tracking-[-0.04em] uppercase text-white mt-2 w-full">
            ARCHIVE COLLECTION<br />"PROMPT"
          </div>
        </div>
        <div className="font-['Inter_Tight'] font-medium max-sm:text-[60px] lg:text-[80px] leading-none text-center tracking-[-0.04em] text-white">
          $97,33
        </div>
      </motion.div>

      {/* 1F. "View" Button (Bottom Right, Initially Hidden) */}
      <div
        id="outro-buy"
        className="fixed z-20 mix-blend-exclusion pointer-events-none flex items-center justify-center bg-white rounded-[1335px] origin-bottom-right
          max-sm:left-4 max-sm:right-4 max-sm:bottom-[60px] max-sm:height-[100px]
          lg:left-auto lg:right-8 lg:bottom-8 lg:w-[330px] lg:h-[174px]"
        style={{ transform: 'scale(0)' }}
      >
        <span className="font-['Inter_Tight'] font-medium max-sm:text-[72px] lg:text-[110px] tracking-[-0.04em] text-white mix-blend-exclusion">view</span>
      </div>

      {/* 1I. White Overlay */}
      <div
        id="outro-overlay"
        className="fixed inset-0 pointer-events-none z-12 bg-white"
        style={{ opacity: 0 }}
      />

      {/* 1J. Footer */}
      <div
        id="outro-footer"
        className="fixed pointer-events-none mix-blend-exclusion flex
          max-sm:left-4 max-sm:right-4 max-sm:bottom-[24px] max-sm:justify-between
          lg:left-4 lg:bottom-8 lg:gap-[80px] lg:right-auto"
        style={{ opacity: 0 }}
      >
        <span className="font-['Inter_Tight'] font-medium max-sm:text-[11px] lg:text-[13px] tracking-[-0.02em] uppercase text-white">PRMPT ® 2026</span>
        <span className="font-['Inter_Tight'] font-medium max-sm:text-[11px] lg:text-[13px] tracking-[-0.02em] uppercase text-white">PRIVACY POLICY</span>
      </div>
    </>
  );
}
