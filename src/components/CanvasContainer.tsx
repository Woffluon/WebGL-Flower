import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import { FlowerEffectMod1 } from './FlowerEffectMod1';
import { FlowerEffectMod2 } from './FlowerEffectMod2';

interface CanvasContainerProps {
  mode: 1 | 2;
  isRendering: boolean;
}

export function CanvasContainer({ mode, isRendering }: CanvasContainerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // Fades out after 8 seconds
    return () => clearTimeout(timer);
  }, []);

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
        {mode === 1 ? (
          <FlowerEffectMod1 isRendering={isRendering} />
        ) : (
          <FlowerEffectMod2 isRendering={isRendering} />
        )}
      </Canvas>

      <div className={`absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none text-black text-center text-xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="mt-16 bg-white/60 px-6 py-3 rounded-lg shadow-xl backdrop-blur-sm">
          Click To Add Flowers
        </h1>
      </div>
    </main>
  );
}
