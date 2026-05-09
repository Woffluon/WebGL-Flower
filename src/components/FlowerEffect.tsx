import { createPortal } from '@react-three/fiber';
import { useFlowerPingPong } from '@/src/hooks/useFlowerPingPong';

interface FlowerEffectProps {
  isRendering: boolean;
}

export function FlowerEffect({ isRendering }: FlowerEffectProps) {
  const { shaderScene, shaderMaterial, mainMaterial, handlePointerDown } = useFlowerPingPong(isRendering);

  return (
    <>
      <mesh onPointerDown={handlePointerDown} material={mainMaterial}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      {createPortal(
        <mesh material={shaderMaterial}>
          <planeGeometry args={[2, 2]} />
        </mesh>,
        shaderScene
      )}
    </>
  );
}
