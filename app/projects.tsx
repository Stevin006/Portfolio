'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  return (
    <>
      <section className="h-screen snap-start relative">
        <div className="horizontal-scroll-container h-screen w-screen flex overflow-x-hidden snap-x snap-mandatory">
          <div id="animation" className="h-screen w-screen flex-shrink-0 bg-[#efefef] snap-start">
            <h1 className="text-5xl flex items-center justify-center md:text-8xl font-calsans text-black z-10 relative pt-20">Animation</h1>
          </div>
          <div id="p1" className="h-screen w-screen flex-shrink-0 bg-[#efefef] ">
            <h1 className="text-5xl flex items-center justify-center md:text-8xl font-calsans text-black z-10 relative pt-20">Project 1</h1>
          </div>
          <div id="p2" className="h-screen w-screen flex-shrink-0 bg-[#efefef] ">
            <h1 className="text-5xl flex items-center justify-center md:text-8xl font-calsans text-black z-10 relative pt-20">Project 2</h1>
          </div>
        </div>
      </section>
    </>
  );
}