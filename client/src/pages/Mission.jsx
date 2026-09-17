import React from "react";
import { ArrowRight, Brain, Heart, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

function Mission() {

  const steps = [
    {
      number: "01",
      title: "Tell AURA",
      text: "Share what you're experiencing through a guided conversation.",
      icon: Heart
    },
    {
      number: "02",
      title: "AURA Understands",
      text: "Your problem is organized and analyzed to understand what you need.",
      icon: Brain
    },
    {
      number: "03",
      title: "Find a Path",
      text: "AURA provides useful guidance and possible next steps.",
      icon: Target
    },
    {
      number: "04",
      title: "Take Action",
      text: "Turn clarity into your next move.",
      icon: Zap
    }
  ];

  return (
    <div className="page">

      <section className="inner-page-hero">

        <span className="page-label">
          AURA PROTOCOL
        </span>

        <h1>
          The <span>Mission</span>
        </h1>

        <p>
          Clarity. Hope. Action.
        </p>

      </section>

      <section className="mission-intro">

        <h2>
          Every problem has
          <span> a path forward.</span>
        </h2>

        <p>
          AURA's mission is simple: help people transform
          uncertainty into understanding and understanding
          into meaningful action.
        </p>

      </section>

      <section className="process-section">

        <div className="section-header">

          <span>01</span>

          <div>
            <span className="section-label">
              THE PROCESS
            </span>

            <h2>HOW AURA HELPS</h2>
          </div>

        </div>

        <div className="process-grid">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div className="process-card" key={step.number}>

                <span>{step.number}</span>

                <Icon size={30} />

                <h3>{step.title}</h3>

                <p>{step.text}</p>

              </div>
            );

          })}

        </div>

      </section>

      <section className="mission-cta">

        <h2>
          Ready to speak with AURA?
        </h2>

        <p>
          Your story is the beginning of the mission.
        </p>

        <Link to="/help" className="btn-primary">

          Talk to AURA
          <ArrowRight size={18} />

        </Link>

      </section>

    </div>
  );
}

export default Mission;