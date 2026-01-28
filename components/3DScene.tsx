"use client";
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Boat } from "./Boat";
import { CameraControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    position: [-20, 20, 0],
    rotation: [degToRad(-60), degToRad(-90), degToRad(0)],
    scrollStart: 2000
  },
  {
    position: [-16.315, 14.129, -20.198],
    rotation: [degToRad(-144.59), degToRad(-45.55), degToRad(-153.09)],
    scrollStart: 3000
  }
]

function CameraAnimation() {
  const cameraControlsRef = React.useRef<any>(null)
  
  React.useEffect(() => {
    if (!cameraControlsRef.current) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Initialize camera to first keyframe
    const firstKeyframe = cameraKeyframes[0]
    cameraControlsRef.current?.setPosition(firstKeyframe.position[0], firstKeyframe.position[1], firstKeyframe.position[2], false)

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
            
            cameraControlsRef.current?.setPosition(x, y, z, false)
          }
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <CameraControls ref={cameraControlsRef} />
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