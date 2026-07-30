import ScrollProvider from "@/components/ScrollProvider"
import LoadingScreen from "@/components/LoadingScreen"
import CustomCursor from "@/components/CustomCursor"
import StickyNav from "@/components/layout/StickyNav"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
import Education from "@/components/sections/Education"
import Volunteer from "@/components/sections/Volunteer"
import Certifications from "@/components/sections/Certifications"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <ScrollProvider>
      <LoadingScreen />
      <CustomCursor />
      <StickyNav />
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Volunteer />
        <Certifications />
        <Contact />
      </main>
    </ScrollProvider>
  )
}
