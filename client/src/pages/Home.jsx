import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Sparkles,
  Brain,
  Shield,
  Heart,
  Zap,
  ArrowRight
} from "lucide-react";

function Home() {
  return (
    <div className="aura-home">

      {/* Animated background */}
      <div className="space-background">
        <div className="stars stars-one"></div>
        <div className="stars stars-two"></div>
        <div className="stars stars-three"></div>

        <div className="ambient-glow glow-one"></div>
        <div className="ambient-glow glow-two"></div>
      </div>

      {/* HERO */}
      <section className="aura-hero">

        {/* LEFT CONTENT */}
        <div className="aura-hero-content">

          <div className="online-status">
            <span className="status-dot"></span>
            THE GUARDIAN IS ONLINE
          </div>

          <div className="hero-kicker">
            REAL SUPPORT <span>+</span> SMART GUIDANCE <span>+</span> A BRIGHTER YOU
          </div>

          <h1 className="aura-title">
            Meet
            <span>AURA</span>
          </h1>

          <h2 className="aura-subtitle">
            Your problem.
            <span>Her mission.</span>
          </h2>

          <p className="aura-description">
            AURA is more than a superhero — she's your personal guide,
            ready to listen, understand, and help you find clarity,
            confidence, and the next right step.
          </p>

          {/* BUTTONS */}
          <div className="hero-buttons">

            <Link to="/help" className="aura-primary-button">
              <MessageCircle size={19} />
              TALK TO AURA
              <ArrowRight size={18} />
            </Link>

            <Link to="/about" className="aura-secondary-button">
              <Sparkles size={18} />
              DISCOVER AURA
              <ArrowRight size={18} />
            </Link>

          </div>

          {/* FEATURES */}
          <div className="hero-features">

            <div className="hero-feature">
              <Brain />
              <div>
                <strong>Guardian</strong>
                <span>AI Powered</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="hero-feature">
              <Shield />
              <div>
                <strong>Always</strong>
                <span>Listening</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="hero-feature">
              <Heart />
              <div>
                <strong>Real Help</strong>
                <span>Real Support</span>
              </div>
            </div>

          </div>

        </div>


        {/* RIGHT HERO VISUAL */}
        <div className="aura-hero-visual">

          {/* Energy rings */}
          <div className="energy-ring ring-large"></div>
          <div className="energy-ring ring-medium"></div>
          <div className="energy-ring ring-small"></div>

          {/* Main glow */}
          <div className="hero-core-glow"></div>

          {/* Floating Insight card */}
          <div className="floating-card insight-card">
            <Brain size={20} />
            <div>
              <strong>INSIGHT</strong>
              <span>Problem detected</span>
            </div>
          </div>

          {/* Floating Guidance card */}
          <div className="floating-card guidance-card">
            <Zap size={20} />
            <div>
              <strong>GUIDANCE</strong>
              <span>Path identified</span>
            </div>
          </div>

          {/* Floating Empathy card */}
          <div className="floating-card empathy-card">
            <Heart size={20} />
            <div>
              <strong>EMPATHY</strong>
              <span>You're not alone</span>
            </div>
          </div>

          {/* AURA IMAGE */}
          <div className="aura-character">

            <div className="character-back-glow"></div>

            <img
              src="/aura-superhero.png"
              alt="AURA superhero"
            />

          </div>

          {/* Orbit dots */}
          <span className="orbit-dot dot-one"></span>
          <span className="orbit-dot dot-two"></span>
          <span className="orbit-dot dot-three"></span>
          <span className="orbit-dot dot-four"></span>

        </div>

      </section>


      {/* WHO IS AURA */}
      <section className="home-intro">

        <div className="intro-heading">
          <span>WHO IS AURA?</span>
          <div></div>
        </div>

        <div className="intro-grid">

          <div className="intro-text">
            <h2>
              Not a Warrior of Force,
              <br />
              But a <span>Sentinel of Potential</span>
            </h2>

            <p>
              AURA protects something infinitely more valuable:
              the human mind, confidence, dreams, and future.
            </p>
          </div>


          <div className="intro-cards">

            <div className="intro-card">
              <Brain />
              <h3>Clarity Over Chaos</h3>
              <p>
                Cuts through the noise to help you see the path forward.
              </p>
            </div>

            <div className="intro-card">
              <Heart />
              <h3>Empathy Without Pity</h3>
              <p>
                Understands your situation and helps you move forward.
              </p>
            </div>

            <div className="intro-card">
              <Shield />
              <h3>Co-Pilot, Not Commander</h3>
              <p>
                You make the decisions. AURA gives you confidence.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;