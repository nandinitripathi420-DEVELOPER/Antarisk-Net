import HeroContent from "./HeroContent.jsx";
import HeroStats from "./HeroStats.jsx";
import EarthAnimation from "./EarthAnimation.jsx";
import FloatingParticles from "./FloatingParticles.jsx";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 md:px-10"
    >
      <FloatingParticles />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <HeroContent />
          <HeroStats />
        </div>

        <div className="order-first md:order-last">
          <EarthAnimation />
        </div>
      </div>
    </section>
  );
}