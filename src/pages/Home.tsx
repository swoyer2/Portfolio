const Home: React.FC = () => {
  return (
    <header style={{ minHeight: "calc(100vh - 56px)", backgroundColor: "transparent" }}>
      <div className="w-50 container text-light pt-5">
        <h1 className="fw-bold text-light">Logan Swoyer</h1>

        <p className="fs-5 mb-4">
          Python · C · React
        </p>

        <p className="lead mx-auto mb-4">
          I develop software for the random ideas I come up with.
        </p>

       <p className="lead mx-auto mb-4">
         Previously worked at{" "}
         <a
           href="https://math-gpt.org"
           target="_blank"
           rel="noopener noreferrer"
           className="btn btn-secondary btn-sm rounded-pill d-inline-flex align-items-center mx-2"
         >
           <i className="bi bi-calculator-fill me-2"></i> {} 
             Math-GPT
         </a>
         <a
           href="https://www.basf.com"
           target="_blank"
           rel="noopener noreferrer"
           className="btn btn-secondary btn-sm rounded-pill d-inline-flex align-items-center mx-2"
         >
           <i className="bi bi-flask-fill me-2"></i> {} 
             BASF 
          </a>
         <a
           href="https://creativecraftsmen31.com"
           target="_blank"
           rel="noopener noreferrer"
           className="btn btn-secondary btn-sm rounded-pill d-inline-flex align-items-center mx-2"
         >
           <i className="bi bi-hammer building me-2"></i> {} 
             Creative Craftsmen 
          </a>
       </p> 

        <p className="lead mx-auto mb-4">
          I spend a lot of my time making game solvers for board games such as
          Mancala, Filler, Yahtzee, and whatever game I hyperfixate on. These projects
          can be found on the{" "}
          <a
            href="/projects"
            className="text-primary text-decoration-none"
          >
            projects page
          </a>.
        </p>

        <p className="lead mx-auto mb-4">
          I also like to make videos on these solvers I make using a Python library called{" "}
          <a
            href="https://www.manim.community"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-decoration-none"
          >
            Manim
          </a>. This is the same library that{" "}
          <a
            href="https://www.youtube.com/@3blue1brown"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-decoration-none"
          >
            3Blue1Brown
          </a>{" "}
          uses for his videos. I also made a plugin for this library called{" "}
          <a
            href="https://github.com/swoyer2/manim_chess"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-decoration-none"
          >
            Manim Chess
          </a>, with it you can animate chess boards/games easily.
        </p>

        <p className="lead mx-auto mb-4">
          Lastly I also like to learn new computer science topics. In 2024 I decided that I wanted to
          learn a more "low-level" language than my trusty Python, so I bought a C textbook, read
          through it all and now use C frequently in my game solvers for faster performance. This year
          (2026) I am reading{" "}
        
          <a
            href="https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0137909101/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-decoration-none"
          >
            Code: The Hidden Language of Computer Hardware and Software
          </a>{" "}
          in hopes that I can better understand the hardware and low level software of a computer.
        </p>

        <p className="lead mx-auto">
          Here are my links:
        </p>

        <div className="mt-4 d-flex gap-3">
          <a
            href="https://github.com/swoyer2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light fs-3"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light fs-3"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>

          <a
            href="mailto:youremail@example.com"
            className="text-light fs-3"
            aria-label="Email"
          >
            <i className="bi bi-envelope-fill"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Home;
