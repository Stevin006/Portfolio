import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorNear: new THREE.Color(0x00fccd),
    uColorFar: new THREE.Color(0x004d80),
    uTextureSize: 50.0,
  },
  // Vertex shader
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    
    uniform float uTime;
    uniform vec3 uColorNear;
    uniform vec3 uColorFar;
    uniform float uTextureSize;

    // Simple hash function
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    // Simple noise
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float n = mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
      return n;
    }

    void main() {
      vec3 finalColor = uColorNear;
      
      float textureSize = 100.0 - uTextureSize;
      
      // Generate noise for foam
      float noiseBase = noise(vUv * (textureSize * 2.8) + sin(uTime * 0.3));
      noiseBase = noiseBase * 0.5 + 0.5;
      
      // Calculate foam effect
      vec3 foam = vec3(smoothstep(0.08, 0.001, vec3(noiseBase)));
      foam = step(0.5, foam);
      
      // Generate noise for waves
      float noiseWaves = noise(vUv * textureSize + sin(uTime * -0.1));
      noiseWaves = noiseWaves * 0.5 + 0.5;
      
      // Apply wave thresholding
      float threshold = 0.6 + 0.01 * sin(uTime * 2.0);
      vec3 waveEffect = vec3(noiseWaves);
      waveEffect = 1.0 - (smoothstep(threshold + 0.03, threshold + 0.032, waveEffect) +
                          smoothstep(threshold, threshold - 0.01, waveEffect));
      waveEffect = step(0.5, waveEffect);
      
      // Combine effects
      vec3 combinedEffect = min(waveEffect + foam, 1.0);
      
      // Distance gradient vignette
      float vignette = length(vUv - 0.5) * 1.5;
      vec3 baseEffect = vec3(smoothstep(0.1, 0.3, vignette));
      vec3 baseColor = mix(finalColor, uColorFar, baseEffect);
      
      combinedEffect = min(waveEffect + foam, 1.0);
      combinedEffect = mix(combinedEffect, vec3(0.0), baseEffect);
      
      vec3 foamEffect = mix(foam, vec3(0.0), baseEffect);
      
      // Final color
      finalColor = (1.0 - combinedEffect) * baseColor + combinedEffect;
      
      // Alpha
      float alpha = mix(0.2, 1.0, foamEffect.r);
      alpha = mix(alpha, 1.0, vignette + 0.5);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

export function Water() {
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.9, 0]}>
      <planeGeometry args={[256, 256]} />
      <waterMaterial ref={materialRef} />
    </mesh>
  );
}