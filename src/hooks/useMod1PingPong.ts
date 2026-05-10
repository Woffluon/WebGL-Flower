import { useFBO } from '@react-three/drei';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { 
  Color, 
  Scene, 
  ShaderMaterial, 
  MeshBasicMaterial, 
  Vector2, 
  Vector3, 
  Mesh, 
  PlaneGeometry, 
  Material,
  Timer
} from 'three';
import fragmentShader from '@/src/shaders/mod1.frag';
import vertexShader from '@/src/shaders/mod1.vert';

// Configuration constants for easier tuning (P2)
const CONFIG = {
  SPEED: 1.3,
  GROW_DURATION: 0.6,
  BLOOM_DURATION: 0.3,
  INITIAL_POINTER: { x: 0.65, y: 0.3 },
  BG_COLOR: 0xffffff,
};

export function useMod1PingPong(isRendering: boolean) {
  const { gl, size, camera, scene } = useThree();
  
  const targetA = useFBO();
  const targetB = useFBO();
  
  const targets = useRef<any[]>([]);
  useEffect(() => {
    if (targets.current.length === 0) {
      targets.current = [targetA, targetB];
    }
  }, [targetA, targetB]);

  const shaderScene = useMemo(() => new Scene(), []);

  const pointerRef = useRef({
    x: CONFIG.INITIAL_POINTER.x,
    y: CONFIG.INITIAL_POINTER.y,
    clicked: true,
    isStart: true,
    vanishCanvas: false,
  });

  const backgroundColor = useMemo(() => new Color(CONFIG.BG_COLOR), []);

  const uniforms = useRef({
    u_ratio: { value: size.height > 0 ? size.width / size.height : 1 },
    u_point: { value: new Vector2(pointerRef.current.x, pointerRef.current.y) },
    u_time: { value: 0 },
    u_stop_time: { value: 0 },
    u_stop_randomizer: { value: new Vector3(0, 0, 0) },
    u_texture: { value: null as any },
    u_background_color: { value: backgroundColor },
    u_scale: { value: size.width < 768 ? 0.6 : 1.0 }, // Smaller scale for mobile
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
    [backgroundColor]
  );

  const mainMaterial = useMemo(() => new MeshBasicMaterial({ transparent: true }), []);
  
  // Optimize u_ratio update: only on resize (P3)
  useEffect(() => {
    if (size.height > 0) {
      uniforms.current.u_ratio.value = size.width / size.height;
      uniforms.current.u_scale.value = size.width < 768 ? 0.6 : 1.0;
    }
  }, [size.width, size.height]);

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

  useEffect(() => {
    const bgMaterial = new MeshBasicMaterial({ color: backgroundColor });
    const bgPlane = new Mesh(new PlaneGeometry(2, 2), bgMaterial);
    
    const initialScene = new Scene();
    initialScene.add(bgPlane);
    
    gl.setRenderTarget(targetA);
    gl.render(initialScene, camera);
    gl.setRenderTarget(null);

    return () => {
      bgMaterial.dispose();
      bgPlane.geometry.dispose();
      // initialScene is local, no need to dispose scene itself but its children are disposed
    };
  }, [gl, targetA, backgroundColor, camera]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      pointerRef.current.x = 0.75;
      pointerRef.current.y = 0.5;
      pointerRef.current.clicked = true;
    }, 400);
    const t2 = setTimeout(() => {
      pointerRef.current.x = 0.4;
      pointerRef.current.y = 0.5;
      pointerRef.current.clicked = true;
    }, 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    pointerRef.current.x = event.uv!.x;
    pointerRef.current.y = event.uv!.y;
    pointerRef.current.clicked = true;
  };

  const timer = useMemo(() => new Timer(), []);

  useFrame((state, delta) => {
    if (isRendering && targets.current.length === 2) {
      timer.update(); // Uses performance.now() internally in recent Three.js
      uniforms.current.u_clean.value = pointerRef.current.vanishCanvas ? 0 : 1;
      uniforms.current.u_texture.value = targets.current[0].texture;
      uniforms.current.u_time.value = timer.getElapsed() + 0.9;

      if (pointerRef.current.clicked) {
        uniforms.current.u_point.value.set(pointerRef.current.x, pointerRef.current.y);
        
        if (pointerRef.current.isStart) {
          uniforms.current.u_stop_randomizer.value.set(0.5, 1, 1);
          pointerRef.current.isStart = false;
        } else {
          uniforms.current.u_stop_randomizer.value.set(Math.random(), Math.random(), Math.random());
        }
        
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
