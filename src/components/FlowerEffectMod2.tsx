import { createPortal } from '@react-three/fiber';
import { useMod2PingPong } from '@/src/hooks/useMod2PingPong';

interface FlowerEffectMod2Props {
  isRendering: boolean;
}

export function FlowerEffectMod2({ isRendering }: FlowerEffectMod2Props) {
  const { shaderScene, shaderMaterial, mainMaterial, handlePointerDown } = useMod2PingPong(isRendering);

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
