import { Canvas } from '@react-three/fiber';
import { useState, useEffect, MouseEvent, TouchEvent } from 'react';
import { FlowerEffect } from './FlowerEffect';

export function CanvasContainer() {
  const [isRendering, setIsRendering] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // Fades out after 8 seconds
    return () => clearTimeout(timer);
  }, []);

  const toggleRender = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setIsRendering((prev) => !prev);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden touch-none">
      <Canvas
        flat
        linear
        orthographic
        dpr={[1, 2]}
        camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0, far: 1, position: [0, 0, 1] }}
        gl={{ antialias: false, preserveDrawingBuffer: false, alpha: true }}
        aria-label="Interactive WebGL Flower Animation"
      >
        <FlowerEffect isRendering={isRendering} />
      </Canvas>

      <div className={`absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none text-black text-center text-xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="mt-16 bg-white/60 px-6 py-3 rounded-lg shadow-xl backdrop-blur-sm">
          Click To Add Flowers
        </h1>
      </div>

      <button
        className="absolute left-4 bottom-4 z-[var(--z-ui,10)] font-sans text-base drop-shadow-md select-none cursor-pointer underline bg-white/20 hover:bg-white/40 active:bg-white/60 transition-colors rounded-md p-4 min-w-[44px] min-h-[44px] border-none appearance-none focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
        onClick={toggleRender}
        type="button"
        aria-label={isRendering ? 'Freeze animation' : 'Unfreeze animation'}
      >
        {isRendering ? 'freeze' : 'unfreeze'}
      </button>
    </main>
  );
}
