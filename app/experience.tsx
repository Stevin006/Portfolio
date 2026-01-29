import LightRays from "@/components/LightRays";

export default function Experience() {
  return (
    <>
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#a8caff"
          raysSpeed={1.6}
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
      <section className="h-screen">Experience</section>
    </>

  );
} 