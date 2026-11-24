import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { About } from "@/components/sections/about";
import { Advantages } from "@/components/sections/advantages";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { TrustStrip } from "@/components/sections/trust-strip";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-brown-950 px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <TopBar />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Advantages />
        <Approach />
        <Stats />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
