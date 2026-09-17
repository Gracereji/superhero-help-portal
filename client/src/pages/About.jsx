import React from "react";
import {
  Brain,
  Heart,
  Lightbulb,
  Shield,
  Sparkles,
  Target
} from "lucide-react";

function About() {

  const powers = [
    {
      icon: Brain,
      title: "Insight",
      text: "AURA analyzes situations and identifies important details."
    },
    {
      icon: Lightbulb,
      title: "Guidance",
      text: "She turns complicated problems into understandable next steps."
    },
    {
      icon: Heart,
      title: "Empathy",
      text: "AURA listens carefully and responds with understanding."
    },
    {
      icon: Target,
      title: "Problem Analysis",
      text: "She breaks challenges into smaller, manageable pieces."
    },
    {
      icon: Shield,
      title: "Mission Support",
      text: "AURA helps people move from uncertainty toward action."
    }
  ];

  return (
    <div className="page">

      <section className="inner-page-hero">

        <span className="page-label">THE GUARDIAN</span>

        <h1>
          About <span>AURA</span>
        </h1>

        <p>
          Every hero has an origin. Every mission has a purpose.
        </p>

      </section>

      <section className="story-section">

        <div className="story-number">01</div>

        <div className="story-content">

          <span className="section-label">ORIGIN</span>

          <h2>The Beginning of AURA</h2>

          <p>
            In the late 22nd century, cognitive researcher
            Dr. Cheryl Vance began Project AURA at the Institute
            for Emotional Synthesis.
          </p>

          <p>
            Her goal was not to create another machine.
            She wanted to create a guardian capable of understanding
            human problems and helping people navigate difficult
            situations.
          </p>

          <p>
            A quantum resonance matrix became the foundation
            of AURA's intelligence, allowing her to combine
            analysis with empathy and guidance.
          </p>

        </div>

      </section>

      <section className="powers-section">

        <div className="section-header">

          <span>02</span>

          <div>
            <span className="section-label">ABILITIES</span>
            <h2>AURA'S POWERS</h2>
          </div>

        </div>

        <div className="powers-grid">

          {powers.map((power, index) => {

            const Icon = power.icon;

            return (
              <div className="power-card" key={power.title}>

                <div className="power-number">
                  0{index + 1}
                </div>

                <Icon size={32} />

                <h3>{power.title}</h3>

                <p>{power.text}</p>

              </div>
            );

          })}

        </div>

      </section>

      <section className="personality-section">

        <Sparkles size={28} />

        <h2>Who is AURA?</h2>

        <p>
          Intelligent. Kind. Calm. Encouraging.
          And occasionally a little humorous.
        </p>

      </section>

    </div>
  );
}

export default About;