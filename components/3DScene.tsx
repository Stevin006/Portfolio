"use client";
import React from 'react'
import { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Boat } from "./Boat";
import { CameraControls, Sky } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Background from 'three/src/renderers/common/Background.js';
import { Sphere, Euler } from 'three';

gsap.registerPlugin(ScrollTrigger)

interface CameraKeyframe {
  position: [number, number, number]
  rotation: [number, number, number]
  scrollStart: number
}

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const cameraKeyframes: CameraKeyframe[] = [
  {
    position: [0,0,0],
    rotation: [degToRad(-144.59), degToRad(-45.55), degToRad(-153.09)],
    scrollStart: 0
  },
  {
    position: [-16.315, 14.129, -20.198],
    rotation: [degToRad(-144.59), degToRad(-45.55), degToRad(-153.09)],
    scrollStart: 0
  },
  {
    position: [2.730, 2.433, 11.600],
    rotation: [degToRad(-2.66), degToRad(4.35), degToRad(0.2)],
    scrollStart: 1000
  },
  {
    position: [2.427, -6.013, 8.206],
    rotation: [degToRad(-16), degToRad(-4.33), degToRad(2.1)],
    scrollStart: 2000
  },
  {
    position: [-16.315, 14.129, -20.198],
    rotation: [degToRad(-144.59), degToRad(-45.55), degToRad(-153.09)],
    scrollStart: 3000
  }
]

function CameraAnimation() {
  const { camera } = useThree()
  
  React.useEffect(() => {
    if (!camera) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Initialize camera to first keyframe
    const firstKeyframe = cameraKeyframes[0]
    camera.position.set(firstKeyframe.position[0], firstKeyframe.position[1], firstKeyframe.position[2])
    camera.rotation.order = 'YXZ'
    camera.rotation.set(firstKeyframe.rotation[0], firstKeyframe.rotation[1], firstKeyframe.rotation[2])

    const sections = document.querySelectorAll('section')

    sections.forEach((section, index) => {
      if (index >= cameraKeyframes.length - 1) return;

      const currentKeyframe = cameraKeyframes[index]
      const nextKeyframe = cameraKeyframes[index + 1] || cameraKeyframes[index]

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            
            const x = gsap.utils.interpolate(currentKeyframe.position[0], nextKeyframe.position[0])(progress)
            const y = gsap.utils.interpolate(currentKeyframe.position[1], nextKeyframe.position[1])(progress)
            const z = gsap.utils.interpolate(currentKeyframe.position[2], nextKeyframe.position[2])(progress)
            
            const rotX = gsap.utils.interpolate(currentKeyframe.rotation[0], nextKeyframe.rotation[0])(progress)
            const rotY = gsap.utils.interpolate(currentKeyframe.rotation[1], nextKeyframe.rotation[1])(progress)
            const rotZ = gsap.utils.interpolate(currentKeyframe.rotation[2], nextKeyframe.rotation[2])(progress)
            
            camera.position.set(x, y, z)
            camera.rotation.set(rotX, rotY, rotZ)
          }
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [camera]);

  return null
}

function InteractiveMesh() {
  const meshRef = useRef<any>(null);
  console.log("Rendering InteractiveMesh");

  const handleHover = () => {
    console.log("START");
    if (!meshRef.current) return;
    console.log("HOVERED");
    
    gsap.to(meshRef.current.material.color, {
      r: 1, // Target Red
      g: 0, // Target Green
      b: 0, // Target Blue
      duration: 1,
      ease: 'power2.inOut',
    })
  }

  return (
    <mesh ref={meshRef} onPointerOver={handleHover}>
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}

export default function Render3DScene() {
  return (
    <Canvas 
      className="h-screen w-full" 
      shadows
      camera={{
        position: [-16.315, 14.129, -20.198],
        rotation: [
          degToRad(-144.59),
          degToRad(-45.55),
          degToRad(-153.09),
        ],
        fov: 50,
        near: 0.01,
        far: 1000,
      }}
    >
      <InteractiveMesh />
      
      <CameraAnimation />
      <Boat />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 10, 7]}
        color="white" 
        intensity={1}
      />
    </Canvas>
  );
}