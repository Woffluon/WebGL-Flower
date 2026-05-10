import { useFBO } from '@react-three/drei';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { 
  Scene, 
  ShaderMaterial, 
  MeshBasicMaterial, 
  Vector2, 
  Mesh, 
  PlaneGeometry, 
  Material
} from 'three';
import fragmentShader from '@/src/shaders/mod2.frag';
import vertexShader from '@/src/shaders/mod2.vert';

export function useMod2PingPong(isRendering: boolean) {
  const { gl, size, camera, scene, viewport } = useThree();
  
  // Requirement: Exact pixel dimensions for FBO
  const dpr = viewport.dpr;
  const targetA = useFBO(size.width * dpr, size.height * dpr);
  const targetB = useFBO(size.width * dpr, size.height * dpr);
  
  const targets = useRef<any[]>([]);
  useEffect(() => {
    targets.current = [targetA, targetB];
  }, [targetA, targetB]);

  const shaderScene = useMemo(() => new Scene(), []);

  const pointerRef = useRef({
    x: 0.5,
    y: 0.5,
    clicked: true,
    vanishCanvas: false
  });

  const uniforms = useRef({
    u_ratio: { value: size.width / size.height },
    u_cursor: { value: new Vector2(pointerRef.current.x, pointerRef.current.y) },
    u_stop_time: { value: 0 },
    u_stop_randomizer: { value: new Vector2(Math.random(), Math.random()) },
    u_texture: { value: null as any },
    u_clean: { value: 1.0 },
  });

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: uniforms.current,
        vertexShader,
        fragmentShader,
        transparent: true,
      }),
    []
  );

  const mainMaterial = useMemo(() => new MeshBasicMaterial({ transparent: true }), []);
  
  // Handle Clean Screen event
  useEffect(() => {
    const handleClean = () => {
      pointerRef.current.vanishCanvas = true;
      setTimeout(() => {
        pointerRef.current.vanishCanvas = false;
      }, 50);
    };

    window.addEventListener('clean-screen', handleClean);
    return () => window.removeEventListener('clean-screen', handleClean);
  }, []);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    pointerRef.current.x = event.uv!.x;
    pointerRef.current.y = event.uv!.y;
    pointerRef.current.clicked = true;
  };

  useFrame((state, delta) => {
    if (isRendering && targets.current.length === 2) {
      uniforms.current.u_ratio.value = state.size.width / state.size.height;
      uniforms.current.u_clean.value = pointerRef.current.vanishCanvas ? 0 : 1;
      uniforms.current.u_texture.value = targets.current[0].texture;

      if (pointerRef.current.clicked) {
        uniforms.current.u_cursor.value.set(pointerRef.current.x, pointerRef.current.y);
        uniforms.current.u_stop_randomizer.value.set(Math.random(), Math.random());
        uniforms.current.u_stop_time.value = 0;
        pointerRef.current.clicked = false;
      }
      
      uniforms.current.u_stop_time.value += delta;

      gl.setRenderTarget(targets.current[1]);
      gl.render(shaderScene, camera);
      
      mainMaterial.map = targets.current[1].texture;

      gl.setRenderTarget(null);
      gl.render(scene, camera);

      const temp = targets.current[0];
      targets.current[0] = targets.current[1];
      targets.current[1] = temp;
    }
  }, 1);

  useEffect(() => {
    return () => {
      shaderMaterial.dispose();
      mainMaterial.dispose();
      shaderScene.children.forEach((child) => {
        if (child instanceof Mesh) {
          child.geometry.dispose();
          if (child.material instanceof Material) {
            child.material.dispose();
          }
        }
      });
    };
  }, [shaderMaterial, mainMaterial, shaderScene]);

  return {
    shaderScene,
    shaderMaterial,
    mainMaterial,
    handlePointerDown,
  };
}
