import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const InkBackground = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
      shaderRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
  });

  return (
    <>
      <mesh scale={[2, 2, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          ref={shaderRef}
          uniforms={{
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uColor: { value: new THREE.Color('#4f46e5') }
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec2 uMouse;
            uniform vec3 uColor;
            varying vec2 vUv;

            float noise(vec2 p) {
              return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }

            void main() {
              vec2 distToMouse = vUv - (uMouse * 0.5 + 0.5);
              float dist = length(distToMouse);
              
              float inkSpread = sin(dist * 10.0 - uTime) * 0.5 + 0.5;
              inkSpread *= smoothstep(1.0, 0.0, dist * 2.0);
              
              vec3 color = mix(uColor, vec3(1.0), inkSpread * 0.3);
              float alpha = smoothstep(0.2, 0.1, dist) + inkSpread * 0.3;
              
              gl_FragColor = vec4(color, alpha * 0.5);
            }
          `}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.5} />
      </EffectComposer>
    </>
  );
};

export default InkBackground;