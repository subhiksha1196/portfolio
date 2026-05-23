import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Research from "@/components/Research";
import Education from "@/components/Education";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ background: "var(--bg)" }}>
          <Hero />
        </div>

        <div id="work-wrapper" className="section-wrapper" style={{ background: "var(--bg-alt)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-20 w-full">
            <Work />
          </div>
        </div>

        <div id="skills-wrapper" className="section-wrapper" style={{ background: "var(--bg)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-20 w-full">
            <Skills />
          </div>
        </div>

        <div id="research-wrapper" className="section-wrapper" style={{ background: "var(--bg-alt)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-20 w-full">
            <Research />
          </div>
        </div>

        <div id="education-wrapper" className="section-wrapper" style={{ background: "var(--bg)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-20 w-full">
            <Education />
          </div>
        </div>

        <div id="about-wrapper" className="section-wrapper" style={{ background: "var(--bg-alt)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-20 w-full">
            <About />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
