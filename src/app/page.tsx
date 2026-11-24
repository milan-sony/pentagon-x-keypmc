import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Advantages } from "@/components/sections/advantages";
import { Approach } from "@/components/sections/approach";
import { Band } from "@/components/sections/band";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { VideoCta } from "@/components/sections/video-cta";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-brown-950 px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Band />
        <Services />
        <Stats />
        <Approach />
        <Projects />
        <Advantages />
        <VideoCta />
        <Contact />
      </main>
      <Footer />
      <ScrollProgress />
    </>
  );
}
