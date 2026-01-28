import Image from "next/image";
import Render3DScene from "@/components/3DScene";
import Hero from "./hero"
import About from "./about"
import Experience from "./experience";
import Projects from "./projects";
//
export default function Home() {
  return (
    <>
    <div className="fixed inset-0 -z-10">
        <Render3DScene/>
    </div>
    <Hero/>
    <About/>
    <Experience/>
    <Projects/>
    </>
  );
  //<Experience/>
   // <Projects/>
}
