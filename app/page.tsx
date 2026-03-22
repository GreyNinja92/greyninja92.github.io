import Hero from "@/components/Hero";
import About from "@/components/About";
import TechLogos from "@/components/TechLogos";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechLogos />
      <Experience />
      <Education />
      <Projects />
      <Publications />
      <Footer />
    </>
  );
}
