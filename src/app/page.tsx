import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import ProjectsSection from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import VolunteerCertificates from "@/components/sections/VolunteerCertificates";
import TerminalContact from "@/components/sections/TerminalContact";
import ExecutionVector from "@/components/ExecutionVector";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ExecutionVector />
      <main className="relative z-10 flex w-full flex-col bg-bg">
        <HeroSection />
        <About />
        <Experience />
        <ProjectsSection />
        <Skills />
        <Education />
        <VolunteerCertificates />
        <TerminalContact />
      </main>
    </>
  );
}
