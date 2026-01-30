"use client";
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { getProject } from '@theatre/core'
import { editable as e, SheetProvider } from '@theatre/r3f'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { PerspectiveCamera } from '@theatre/r3f'
import { Boat } from "./Boat";


const demoSheet = getProject('Demo Project').sheet('Demo Sheet')

studio.initialize()
studio.extend(extension)


const degToRad = (deg: number) => (deg * Math.PI) / 180;

export default function Render3DScene() {
  return (
    <Canvas
      className="h-screen w-full"
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

      <SheetProvider sheet={demoSheet}>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
          <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color={"rgb(0, 140, 255)"} />

        </mesh>

        <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />

        <Boat />
        <ambientLight />
        <e.pointLight theatreKey="light" position={[10, 10, 10]} />

      </SheetProvider>
    </Canvas>

  );
}