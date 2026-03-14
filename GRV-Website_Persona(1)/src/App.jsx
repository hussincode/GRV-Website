import "./index.css";
import { Scanline, Navbar, Hero, About, Courses, Timeline, HighBoard, Join, Footer } from "./components";

export default function App() {
  return (
    <>
      <Scanline />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <HighBoard />
        <Timeline />
        <Join />
      </main>
      <Footer />
    </>
  );
}
