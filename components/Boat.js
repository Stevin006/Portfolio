import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Boat(props) {
  const { nodes, materials } = useGLTF('/models/low_poly_boat.glb')
  const degToRad = (deg) => (deg * Math.PI) / 180;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.Material}
        rotation={[degToRad(-90), 0, 0]}
        
      />
    </group>
  )
}

useGLTF.preload('/models/low_poly_boat.glb')
