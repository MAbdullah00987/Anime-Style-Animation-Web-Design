# 3D Anime Style Animation Web Design

This is a visually stunning, anime-styled animated web application built with modern web technologies. It features smooth scroll-driven animations, a custom cursor, and dynamic gallery reveals. 

## 🚀 Technologies Used

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4** (for rapid and flexible styling)
- **GSAP (GreenSock Animation Platform)** & **ScrollTrigger** (for complex, scroll-based animations)
- **Framer Motion** (for supplementary animations)

## ✨ Key Features

- **Custom Cursor**: A unique interactive cursor that follows mouse movements (`src/components/Cursor`).
- **Scroll-Driven Gallery**: An immersive gallery (`src/components/Gallery`) where cards scale and translate based on the user's scroll position, driven by GSAP.
- **Dynamic UI Overlays**: Interactive elements (`src/components/UIOverlays`) that react to scroll depth, including randomized symbols and outro reveals.
- **Responsive Design**: Carefully calculated viewport height (vh) metrics to ensure the scroll effects work smoothly across different screen sizes.

## 🛠️ How It Was Created

1. **Project Initialization**: The project was bootstrapped using Vite's React + TypeScript template.
2. **Styling Setup**: Tailwind CSS was integrated to handle all utility-first styling and layout structures quickly.
3. **Animation Engine**: GSAP was added as the core animation engine. `ScrollTrigger` was specifically registered to tie animations (like the gallery cards scaling in and out) directly to the window's scroll position.
4. **Component Architecture**:
   - `App.tsx`: Manages the global scroll state, custom scroll loop via `requestAnimationFrame`, and phase-based layout translations.
   - `Hero`: The introductory section.
   - `Gallery`: The core scrollable container that handles the visual cards.
   - `UIOverlays`: Additional visual flair and call-to-actions that appear at the end of the scroll.
5. **Performance Optimization**: The scroll animations use `requestAnimationFrame` and CSS transforms (`translateY`, `scale`) rather than relying on heavy DOM layout thrashing, ensuring a 60fps experience.

## 📦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run the Development Server**
   ```bash
   npm run dev
   ```
3. **Build for Production**
   ```bash
   npm run build
   ```
