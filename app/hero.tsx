import Image from "next/image";
import RotatingText from "@/components/RotatingText";

export default function Hero() {
  return (
    <>
    
    <section className="min-h-screen w-full pt-40 px-8 md:px-16 lg:px-10 dark:bg-gradient-to-t from-blue-800 to-cyan-800 text-white snap-start">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 max-w-7xl mx-auto">
        
        <div className="flex-3 space-y-4 md:mt-10">
          <h1 className="text-5xl md:text-8xl font-calsans tracking-tight">
            Hi, I'm Stevin
          </h1>
          <RotatingText texts={["Computer Science Student", "Game Developer", "UX Designer", "Researcher","Tutor"]} staggerDuration={0.01} rotationInterval={3000}  mainClassName="inline-flex text-3xl" />
        </div>
      </div>

    </section>
    </>

  );
} 