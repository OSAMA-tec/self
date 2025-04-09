import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

function Background() {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => {
    const initialSphere = random.inSphere(new Float32Array(15000), { radius: 2 });
    const filteredSphere = new Float32Array(
      Array.from(initialSphere).filter(value => !isNaN(value))
    );
    return filteredSphere.length > 0 ? filteredSphere : new Float32Array(15000).fill(0);
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      ref.current.rotation.z -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#4f46e5"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default Background;