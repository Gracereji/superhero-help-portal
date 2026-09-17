import React, { useState, useEffect, useRef } from 'react';

import {
  Send,
  Sparkles,
  Shield,
  RefreshCw,
  CheckCircle2,
  User,
  Clock,
  Heart,
  Calendar,
  Hash,
  X,
  MessageCircle,
  Minus,
  HeartPulse,
  GraduationCap,
  LockKeyhole,
  Stars
} from 'lucide-react';

import { getAuraAdvice, submitIntake } from '../services/api.js';

// =========================================
// CONVERSATION STAGES
// =========================================

const STAGES = {
  NAME: 'name',
  AGE: 'age',
  LOCATION: 'location',
  EMAIL: 'email',
  GRIEVANCE: 'grievance',
  FOLLOWUP_OUTCOME: 'followup_outcome',
  FOLLOWUP_ATTEMPTS: 'followup_attempts',
  CONFIRM: 'confirm',
  COMPLETE: 'complete'
};

// =========================================
// QUICK HELP OPTIONS
// =========================================

const QUICK_HELP_OPTIONS = [
  {
    id: 'health',
    label: 'Health',
    icon: HeartPulse,
    message:
      "I'd like help with a health-related problem."
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    message:
      "I'd like help with an education-related problem."
  },
  {
    id: 'safety',
    label: 'Safety',
    icon: LockKeyhole,
    message:
      "I'd like help with a safety-related problem."
  },
  {
    id: 'other',
    label: 'Other',
    icon: Stars,
    message:
      "I have another type of problem or request."
  }
];

export default function AuraChatbot({ onStateChange }) {

  // =========================================
  // CHAT WINDOW
  // =========================================

  const [isOpen, setIsOpen] = useState(true);

  // =========================================
  // VISITOR DATA
  // =========================================

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    grievance: ''
  });

  // =========================================
  // CURRENT STAGE
  // =========================================

  const [currentStage, setCurrentStage] = useState(
    STAGES.NAME
  );

  // =========================================
  // MESSAGES
  // =========================================

  const [messages, setMessages] = useState([]);

  // =========================================
  // INPUT
  // =========================================

  const [inputValue, setInputValue] = useState('');

  // =========================================
  // QUICK HELP
  // =========================================

  const [selectedCategory, setSelectedCategory] =
    useState('');

  // =========================================
  // CONVERSATION FOLLOW-UP ANSWERS
  // =========================================

  const [conversationAnswers, setConversationAnswers] =
    useState({
      desiredOutcome: '',
      previousAttempts: ''
    });

  // =========================================
  // TYPING STATE
  // =========================================

  const [isTyping, setIsTyping] = useState(false);

  // =========================================
  // TRANSMISSION
  // =========================================

  const [transmissionReceipt, setTransmissionReceipt] =
    useState(null);

  const [submissionTime, setSubmissionTime] =
    useState(null);

  // =========================================
  // REFS
  // =========================================

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // =========================================
  // TIME
  // =========================================

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFullSubmissionDateTime = () => {
    const now = new Date();

    const dateStr = now.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );

    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${dateStr} at ${timeStr}`;
  };

  // =========================================
  // AUTO SCROLL
  // =========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isTyping]);

  // =========================================
  // SEND STATE TO PARENT
  // =========================================

  useEffect(() => {
    if (onStateChange) {
      onStateChange(formData);
    }
  }, [formData, onStateChange]);

  // =========================================
  // INITIAL CHAT
  // =========================================

  useEffect(() => {
    initChat();
  }, []);

  const initChat = () => {
    setFormData({
      name: '',
      age: '',
      location: '',
      email: '',
      grievance: ''
    });

    setCurrentStage(STAGES.NAME);
    setTransmissionReceipt(null);
    setSubmissionTime(null);
    setSelectedCategory('');
    setConversationAnswers({
      desiredOutcome: '',
      previousAttempts: ''
    });
    setInputValue('');
    setMessages([]);
    setIsTyping(true);
    setIsOpen(true);

    setTimeout(() => {
      setMessages([
        {
          id: Date.now(),
          sender: 'aura',
          text:
            "Hey! I'm AURA. ✦ I believe every problem has a path forward. What's your name?",
          timestamp: getTimestamp()
        }
      ]);

      setIsTyping(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }, 600);
  };

  // =========================================
  // VALIDATION
  // =========================================

  const validateName = (rawInput) => {
    const trimmed = rawInput.trim();

    if (!trimmed) {
      return {
        isValid: false,
        message:
          "I'd love to know who I'm speaking with! What shall I call you?"
      };
    }

    return {
      isValid: true,
      value: trimmed
    };
  };

  const validateAge = (rawInput) => {
    const trimmed = rawInput.trim();

    const match = trimmed.match(
      /^(\d+)(\s*(years?(\s*old)?)?)?$/i
    );

    if (!match) {
      return {
        isValid: false,
        message:
          "How many years have you been on this planet? Please enter a number between 5 and 120."
      };
    }

    const num = parseInt(match[1], 10);

    if (isNaN(num) || num < 5 || num > 120) {
      return {
        isValid: false,
        message:
          "Please enter a realistic age between 5 and 120."
      };
    }

    return {
      isValid: true,
      value: num
    };
  };

  const validateLocation = (rawInput) => {
    const trimmed = rawInput.trim();

    if (!trimmed) {
      return {
        isValid: false,
        message:
          "Even heroes need coordinates! What city or place are you from?"
      };
    }

    return {
      isValid: true,
      value: trimmed
    };
  };

  const validateEmail = (rawInput) => {
    const trimmed = rawInput.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !trimmed ||
      !emailRegex.test(trimmed)
    ) {
      return {
        isValid: false,
        message:
          "That email seems to have been scrambled in the transmission. Could you check it and try again?"
      };
    }

    return {
      isValid: true,
      value: trimmed.toLowerCase()
    };
  };

  const validateGrievance = (rawInput) => {
    const trimmed = rawInput.trim();

    if (!trimmed) {
      return {
        isValid: false,
        message:
          "Take your time. Tell me what you're facing. I'm listening."
      };
    }

    return {
      isValid: true,
      value: trimmed
    };
  };

  // =========================================
  // QUICK HELP CLICK
  // =========================================

  const handleQuickHelp = (option) => {

    if (
      isTyping ||
      currentStage !== STAGES.GRIEVANCE
    ) {
      return;
    }

    setSelectedCategory(option.id);

    const userMessage = {
      id: Date.now(),
      sender: 'visitor',
      text: option.label,
      timestamp: getTimestamp()
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setInputValue(option.message);
      setIsTyping(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }, 500);
  };

  // =========================================
  // SEND MESSAGE
  // =========================================

  const handleSendMessage = (e) => {

    if (e) {
      e.preventDefault();
    }

    const userText = inputValue.trim();

    if (
      !userText ||
      isTyping ||
      currentStage === STAGES.COMPLETE
    ) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: 'visitor',
      text: userText,
      timestamp: getTimestamp()
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      processNextStep(userText);
    }, 700);
  };

  // =========================================
  // PROCESS CONVERSATION
  // =========================================

  const processNextStep = async (userText) => {

    let nextStage = currentStage;
    let auraReply = '';

    let updatedFormData = {
      ...formData
    };

    let updatedAnswers = {
      ...conversationAnswers
    };

    switch (currentStage) {

      // =====================================
      // NAME
      // =====================================

      case STAGES.NAME: {

        const check =
          validateName(userText);

        if (!check.isValid) {

          auraReply = check.message;

        } else {

          updatedFormData.name =
            check.value;

          setFormData(updatedFormData);

          nextStage = STAGES.AGE;

          auraReply =
            `Nice to meet you, ${check.value}! ✦ How old are you?`;
        }

        break;
      }

      // =====================================
      // AGE
      // =====================================

      case STAGES.AGE: {

        const check =
          validateAge(userText);

        if (!check.isValid) {

          auraReply = check.message;

        } else {

          updatedFormData.age =
            check.value;

          setFormData(updatedFormData);

          nextStage =
            STAGES.LOCATION;

          auraReply =
            `Thanks, ${updatedFormData.name}. Where are you from?`;
        }

        break;
      }

      // =====================================
      // LOCATION
      // =====================================

      case STAGES.LOCATION: {

        const check =
          validateLocation(userText);

        if (!check.isValid) {

          auraReply = check.message;

        } else {

          updatedFormData.location =
            check.value;

          setFormData(updatedFormData);

          nextStage =
            STAGES.EMAIL;

          auraReply =
            "Got it. What's the best email address to reach you?";
        }

        break;
      }

      // =====================================
      // EMAIL
      // =====================================

      case STAGES.EMAIL: {

        const check =
          validateEmail(userText);

        if (!check.isValid) {

          auraReply = check.message;

        } else {

          updatedFormData.email =
            check.value;

          setFormData(updatedFormData);

          nextStage =
            STAGES.GRIEVANCE;

          auraReply =
            `Thanks, ${updatedFormData.name}. I've got you. So... tell me. How can I help?`;
        }

        break;
      }

      // =====================================
      // GRIEVANCE
      // =====================================

      case STAGES.GRIEVANCE: {

        const check =
          validateGrievance(userText);

        if (!check.isValid) {

          auraReply = check.message;

        } else {

          updatedFormData.grievance =
            check.value;

          setFormData(updatedFormData);

          nextStage =
            STAGES.FOLLOWUP_OUTCOME;

          auraReply =
            `I hear you, ${updatedFormData.name}. ✦ What would be the most helpful outcome for you right now?`;
        }

        break;
      }

      // =====================================
      // FOLLOW-UP: DESIRED OUTCOME
      // =====================================

      case STAGES.FOLLOWUP_OUTCOME: {

        const trimmed = userText.trim();

        if (!trimmed) {

          auraReply =
            "Take your time. What would you most like help with right now?";

        } else {

          updatedAnswers.desiredOutcome =
            trimmed;

          setConversationAnswers(updatedAnswers);

          nextStage =
            STAGES.FOLLOWUP_ATTEMPTS;

          auraReply =
            "That helps me understand what you need. ✦ What have you already tried, if anything, to deal with this situation?";
        }

        break;
      }

      // =====================================
      // FOLLOW-UP: PREVIOUS ATTEMPTS
      // =====================================

      case STAGES.FOLLOWUP_ATTEMPTS: {

        const trimmed = userText.trim();

        if (!trimmed) {

          auraReply =
            "That's okay if you haven't tried anything yet. What have you tried so far?";

          break;
        }

        updatedAnswers.previousAttempts =
          trimmed;

        setConversationAnswers(updatedAnswers);

        // ---------------------------------
        // ASK AURA FOR PRACTICAL ADVICE
        // ---------------------------------

        const adviceRequest = `
Original request:
${updatedFormData.grievance}

Most helpful outcome:
${updatedAnswers.desiredOutcome}

What they have already tried:
${updatedAnswers.previousAttempts}
        `.trim();

        try {

          const advice =
            await getAuraAdvice({
              name: updatedFormData.name,
              age: updatedFormData.age,
              location: updatedFormData.location,
              grievance: adviceRequest
            });

          const adviceText =
            advice?.auraResponse ||
            `I understand, ${updatedFormData.name}. Let's take this one step at a time. Try breaking the situation into one small, manageable next step.`;

          nextStage =
            STAGES.CONFIRM;

          auraReply =
            `${adviceText}\n\n✦ Would you like me to secure this as a help request and send it through the Guardian Matrix?`;

        } catch (err) {

          console.warn(
            'AURA advice request failed:',
            err
          );

          nextStage =
            STAGES.CONFIRM;

          auraReply =
            `Thank you for explaining that, ${updatedFormData.name}. ✦ A good first step is to focus on one part of the problem that you can act on today. If you need professional or trusted-person support, reaching out can also help.\n\nWould you like me to secure this as a help request and send it through the Guardian Matrix?`;
        }

        break;
      }

      // =====================================
      // CONFIRMATION
      // =====================================

      case STAGES.CONFIRM: {

        const normalized =
          userText
            .trim()
            .toLowerCase()
            .replace(/[.!?,]/g, '');

        const positiveAnswers = [
          'yes',
          'yeah',
          'yep',
          'yup',
          'sure',
          'okay',
          'ok',
          'please',
          'do it',
          'go ahead',
          'yes please'
        ];

        const negativeAnswers = [
          'no',
          'nope',
          'not now',
          'cancel'
        ];

        if (positiveAnswers.includes(normalized)) {

          const finalGrievance = `
Original request:
${updatedFormData.grievance}

Most helpful outcome:
${updatedAnswers.desiredOutcome}

What they have already tried:
${updatedAnswers.previousAttempts}
          `.trim();

          updatedFormData.grievance =
            finalGrievance;

          setFormData(updatedFormData);

          const submissionDateTime =
            getFullSubmissionDateTime();

          setSubmissionTime(
            submissionDateTime
          );

          nextStage =
            STAGES.COMPLETE;

          try {

            const receipt =
              await submitIntake(
                updatedFormData
              );

            setTransmissionReceipt(
              receipt
            );

            auraReply =
              `Thank you for trusting AURA with your request, ${updatedFormData.name}. ✦ Your help request has been securely recorded. Please keep your Transmission ID below for reference.`;

          } catch (err) {

            console.warn(
              'AURA submission failed:',
              err
            );

            auraReply =
              `Thank you for sharing your request, ${updatedFormData.name}. ✦ I was unable to complete the transmission right now. Please try again.`;
          }

        } else if (negativeAnswers.includes(normalized)) {

          nextStage =
            STAGES.GRIEVANCE;

          auraReply =
            "No problem. ✦ You can change or add to your request. What would you like AURA to know?";

        } else {

          nextStage =
            STAGES.CONFIRM;

          auraReply =
            "Just to confirm: would you like me to secure and send this help request? You can say yes or no.";
        }

        break;
      }

      // =====================================
      // COMPLETE
      // =====================================

      case STAGES.COMPLETE: {

        auraReply =
          "This transmission is already complete. Start a new conversation whenever you're ready.";

        break;
      }

      default: {

        auraReply =
          "I'm right here with you. Start a new conversation whenever you're ready.";

        break;
      }
    }

    // =========================================
    // ADD AURA RESPONSE
    // =========================================

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'aura',
        text: auraReply,
        timestamp: getTimestamp(),
        isCompletion:
          nextStage === STAGES.COMPLETE
      }
    ]);

    setCurrentStage(nextStage);
    setIsTyping(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  // =========================================
  // ENTER KEY
  // =========================================

  const handleKeyDown = (e) => {

    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {

      e.preventDefault();

      if (
        e.nativeEvent.isComposing ||
        e.keyCode === 229
      ) {
        return;
      }

      handleSendMessage();
    }
  };

  // =========================================
  // PLACEHOLDER
  // =========================================

  const getInputPlaceholder = () => {

    if (isTyping) {
      return "AURA is thinking...";
    }

    switch (currentStage) {

      case STAGES.NAME:
        return "Type your name...";

      case STAGES.AGE:
        return "Enter your age...";

      case STAGES.LOCATION:
        return "Where are you from?";

      case STAGES.EMAIL:
        return "Your email address...";

      case STAGES.GRIEVANCE:
        return "Tell AURA what's going on...";

      case STAGES.FOLLOWUP_OUTCOME:
        return "What outcome would help you most?";

      case STAGES.FOLLOWUP_ATTEMPTS:
        return "What have you tried so far?";

      case STAGES.CONFIRM:
        return "Yes or no?";

      case STAGES.COMPLETE:
        return "Transmission complete.";

      default:
        return "Type a message...";
    }
  };

  // =========================================
  // TRANSMISSION ID
  // =========================================

  const referenceId =
    transmissionReceipt?.trackingId ||
    `AURA-${Date.now()
      .toString(36)
      .toUpperCase()}`;

  // =========================================
  // FLOATING CHAT BUTTON
  // =========================================

  if (!isOpen) {

    return (
      <button
        className="aura-floating-chat-button"
        onClick={() => {
          setIsOpen(true);

          setTimeout(() => {
            inputRef.current?.focus();
          }, 200);
        }}
        type="button"
        aria-label="Open AURA chatbot"
      >

        <span className="aura-floating-icon">
          <MessageCircle size={22} />
        </span>

        <span>
          TALK TO AURA
        </span>

        <span className="aura-floating-pulse"></span>

      </button>
    );
  }

  // =========================================
  // FLOATING CHAT WINDOW
  // =========================================

  return (

    <div className="aura-floating-chat">

      {/* =====================================
          CHAT HEADER
      ====================================== */}

      <div className="aura-floating-header">

        <div className="aura-floating-header-left">

          <div className="aura-mini-avatar">

            <img
              src="/aura-superhero.png"
              alt="AURA"
            />

            <span className="aura-online-dot"></span>

          </div>

          <div>

            <div className="aura-floating-title">

              AURA

              <span className="aura-live-badge">
                <span></span>
                ONLINE
              </span>

            </div>

            <div className="aura-floating-subtitle">
              Guardian Uplink
            </div>

          </div>

        </div>

        <div className="aura-floating-actions">

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            title="Minimize AURA"
            aria-label="Minimize AURA"
            className="aura-window-button"
          >
            <Minus size={17} />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            title="Close AURA"
            aria-label="Close AURA"
            className="aura-window-button"
          >
            <X size={17} />
          </button>

        </div>

      </div>

      {/* =====================================
          CHAT STATUS
      ====================================== */}

      <div className="aura-floating-status">

        <Sparkles size={13} />

        <span>
          Guardian of Human Potential
        </span>

        <span className="aura-status-line"></span>

        <span>
          SECURE
        </span>

      </div>

      {/* =====================================
          MESSAGES
      ====================================== */}

      <div
        className="aura-floating-messages"
        role="log"
        aria-live="polite"
      >

        {messages.map((msg) => (

          <div
            key={msg.id}
            className={`aura-message-row ${
              msg.sender === 'aura'
                ? 'aura-message'
                : 'visitor-message'
            }`}
          >

            {msg.sender === 'aura' && (

              <div className="aura-message-avatar">
                <Shield size={14} />
              </div>

            )}

            <div className="aura-message-content">

              <div
                className={`aura-message-bubble ${
                  msg.sender === 'aura'
                    ? 'aura-bubble'
                    : 'visitor-bubble'
                }`}
              >

                <p>
                  {msg.text}
                </p>

              </div>

              <div className="aura-message-time">

                <Clock size={9} />

                {msg.timestamp}

              </div>

              {/* =================================
                  COMPLETION CARD
              ================================== */}

              {msg.isCompletion && (

                <div className="aura-completion-card">

                  <div className="aura-completion-title">

                    <CheckCircle2 size={17} />

                    <span>
                      Transmission Secured
                    </span>

                  </div>

                  <div className="aura-transmission-id">

                    <Hash size={12} />

                    {referenceId}

                  </div>

                  <div className="aura-completion-time">

                    <Calendar size={11} />

                    Submitted:
                    {' '}
                    {submissionTime}

                  </div>

                  <div className="aura-completion-grid">

                    <div>

                      <span>
                        Name
                      </span>

                      <strong>
                        {formData.name}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Age
                      </span>

                      <strong>
                        {formData.age}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Location
                      </span>

                      <strong>
                        {formData.location}
                      </strong>

                    </div>

                    <div>

                      <span>
                        Email
                      </span>

                      <strong>
                        {formData.email}
                      </strong>

                    </div>

                    <div className="full-width">

                      <span>
                        Your Request
                      </span>

                      <strong>
                        {formData.grievance}
                      </strong>

                    </div>

                  </div>

                  <div className="aura-completion-footer">

                    <Heart size={13} />

                    <span>
                      AURA has received your transmission.
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={initChat}
                    className="aura-new-conversation"
                  >

                    <RefreshCw size={13} />

                    Start New Conversation

                  </button>

                </div>

              )}

            </div>

            {msg.sender === 'visitor' && (

              <div className="visitor-message-avatar">
                <User size={14} />
              </div>

            )}

          </div>

        ))}

        {/* =====================================
            QUICK HELP OPTIONS
        ====================================== */}

        {currentStage === STAGES.GRIEVANCE &&
          !isTyping &&
          !selectedCategory && (

            <div className="aura-quick-help">

              <div className="aura-quick-help-title">
                <Sparkles size={13} />
                Quick Help
              </div>

              <p>
                Choose a starting point or type your own request.
              </p>

              <div className="aura-quick-help-grid">

                {QUICK_HELP_OPTIONS.map((option) => {

                  const Icon = option.icon;

                  return (

                    <button
                      key={option.id}
                      type="button"
                      className="aura-quick-help-button"
                      onClick={() =>
                        handleQuickHelp(option)
                      }
                    >

                      <Icon size={17} />

                      <span>
                        {option.label}
                      </span>

                    </button>

                  );
                })}

              </div>

            </div>
          )}

        {/* =====================================
            TYPING
        ====================================== */}

        {isTyping && (

          <div className="aura-message-row aura-message">

            <div className="aura-message-avatar">
              <Shield size={14} />
            </div>

            <div className="aura-message-content">

              <div className="aura-message-bubble aura-bubble aura-typing">

                <div className="aura-dots">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

                <span>
                  AURA is thinking...
                </span>

              </div>

            </div>

          </div>

        )}

        <div ref={messagesEndRef}></div>

      </div>

      {/* =====================================
          INPUT
      ====================================== */}

      <form
        onSubmit={handleSendMessage}
        className="aura-floating-input-area"
      >

        <div className="aura-floating-input-wrapper">

          <input
            ref={inputRef}
            id="aura-chat-input"
            type="text"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={
              isTyping ||
              currentStage === STAGES.COMPLETE
            }
            placeholder={getInputPlaceholder()}
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={
              !inputValue.trim() ||
              isTyping ||
              currentStage === STAGES.COMPLETE
            }
            aria-label="Send message"
          >

            <Send size={17} />

          </button>

        </div>

        <div className="aura-input-footer">

          <span>
            Press Enter to send
          </span>

          <span>
            {currentStage === STAGES.COMPLETE
              ? 'COMPLETE'
              : currentStage.toUpperCase()
            }
          </span>

        </div>

      </form>

    </div>
  );
}