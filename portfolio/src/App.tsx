import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";

const App = () => {
  return(
    <>
      <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: -2 }} />
      <Canvas
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;

