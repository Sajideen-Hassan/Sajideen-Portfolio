import ScrollProvider from "@/components/ScrollProvider";
import StickyNav from "@/components/layout/StickyNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Competencies from "@/components/sections/Competencies";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import OptionalSections from "@/components/sections/OptionalSections";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <ScrollProvider>
      <StickyNav />
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <About />
        <Journey />
        <Competencies />
        <Projects />
        <Education />
        <OptionalSections />
        <Contact />
      </main>
    </ScrollProvider>
  );
}
