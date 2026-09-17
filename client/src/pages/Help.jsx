import React from "react";
import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import AuraChatbot from "../components/AuraChatbot";
function Help() {
  return (
    <div className="page help-page">

      <section className="inner-page-hero">

        <span className="page-label">
          AURA GUARDIAN UPLINK
        </span>

        <h1>
          Tell AURA.
          <br />
          <span>She'll Listen.</span>
        </h1>

        <p>
          Whatever challenge you're facing, start by telling AURA
          what's happening.
        </p>

      </section>

      <section className="help-interface">

        <div className="help-intro">

          <div className="help-icon">
            <MessageCircle size={30} />
          </div>

          <h2>Guardian Uplink</h2>

          <p>
            AURA will ask a few questions before you describe
            your problem.
          </p>

          <div className="help-features">

            <div>
              <ShieldCheck size={18} />
              Guided conversation
            </div>

            <div>
              <Sparkles size={18} />
              AI-powered assistance
            </div>

          </div>

        </div>

        <AuraChatbot />

      </section>

    </div>
  );
}

export default Help;