import { createPortal } from '@react-three/fiber';
import { useMod1PingPong } from '@/src/hooks/useMod1PingPong';

interface FlowerEffectMod1Props {
  isRendering: boolean;
}

export function FlowerEffectMod1({ isRendering }: FlowerEffectMod1Props) {
  const { shaderScene, shaderMaterial, mainMaterial, handlePointerDown } = useMod1PingPong(isRendering);

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
