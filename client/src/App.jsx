import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Mission from "./pages/Mission";

function App() {

  return (
    <Router>

      <Navbar />

      <main>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/help" element={<Help />} />

          <Route path="/mission" element={<Mission />} />

          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404</h1>
                <p>This transmission could not be found.</p>
              </div>
            }
          />

        </Routes>

      </main>

      <footer className="site-footer">

        <div>
          <strong>AURA</strong>
          <span> Guardian of Human Potential</span>
        </div>

        <p>
          Every problem has a path forward.
        </p>

      </footer>

    </Router>
  );
}

export default App;