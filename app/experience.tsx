"use client";
import LightRays from "@/components/LightRays";
import { Bubbles } from "lucide-react";
import ScrollFloat from '@/components/ScrollFloat';



const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};


export default function Experience() {
  return (
    <>
      <section className="h-[250vh] snap-start relative">
        
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#6adaff"
          raysSpeed={.1}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.1}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1.5}
          saturation={2}
        />
        </div>
              
        <h1 className="text-5xl flex items-center justify-center md:text-8xl font-calsans text-white z-10 relative pt-20">Experience</h1>
      <div className = "flex items-center justify-center min-h-screen bg-gray-10 relative z-10"> 

              
      </div>
      
        </section>
    </>

  );
} 