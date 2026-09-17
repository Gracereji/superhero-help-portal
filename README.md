# 🌟 AURA — Superhero Help Portal

> **TechAscent Machine Test — Step 2: The Official AURA Superhero Website**  
> A full-stack web application featuring **AURA: The Guardian of Human Potential**. Built with **React** (Frontend) and **Node.js / Express** (Backend).

---

## 🦸 Superhero Concept: AURA

- **Name:** AURA  
- **Title:** The Guardian of Human Potential  
- **Personality:** Intelligent, kind, calm, encouraging, and slightly humorous  
- **Mission:** Helping ordinary people find a clear path forward when facing difficult life challenges  
- **Visual Style:** Futuristic, cinematic glowing blue/purple interface with a modern superhero aesthetic  

---

## 🌐 The 7 Core Website Sections

1. **HERO SECTION**:
   - Glowing AURA superhero emblem with orbital energy rings.
   - Superhero title: *"The Guardian of Human Potential"*.
   - Core Tagline: *"Every problem has a path forward."*
   - Interactive buttons: **"TALK TO AURA"** (Primary CTA) & **"DISCOVER AURA"** (Scrolls to About).

2. **ABOUT AURA**:
   - Clarifies AURA's identity: not a destructive fighter leveling buildings, but a champion for everyday human struggles (burnout, loneliness, anxiety, and difficult choices).

3. **ORIGIN STORY (Original Lore)**:
   - Original fictional lore detailing Dr. Cheryl Vance's cognitive resilience research during the late 22nd century and her ascension into the transcendent, luminous guardian AURA.

4. **POWERS & ABILITIES**:
   - 5 interactive cards: **Insight**, **Guidance**, **Empathy**, **Problem Analysis**, and **Mission Support**.

5. **PERSONALITY MATRIX (Interactive Showcase)**:
   - Interactive tab selector allowing visitors to explore AURA's 5 core traits (*Intelligent, Kind, Calm, Encouraging, Slightly Humorous*) with direct in-character quotes and perspectives.

6. **SACRED MISSION**:
   - The three core pillars of AURA's directive:
     1. *Clarity over Confusion*
     2. *Hope over Despair*
     3. *Action over Paralysis*

7. **FINAL CALL TO ACTION**:
   - High-impact cinematic banner: *"Ready to tell AURA what's standing in your way?"* with a primary **"TALK TO AURA"** button.

---

## 📁 Project Architecture & Directory Structure

```text
superhero-help-portal/
├── client/                          # 💻 React Frontend (Vite)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   └── Navbar.jsx           # Top navigation bar with section links, CTA, & discreet beacon
│   │   ├── services/                # API communication helpers
│   │   │   └── api.js               # Centralized functions to talk to Express backend (/api/health)
│   │   ├── App.jsx                  # Main application component featuring the complete 7-section website
│   │   ├── index.css                # Futuristic glowing blue/purple theme & custom animations
│   │   └── main.jsx                 # Entry point that mounts React to the DOM
│   ├── index.html                   # HTML template loaded by the browser
│   ├── package.json                 # Frontend dependencies & scripts
│   └── vite.config.js               # Vite build configuration & API proxy setup
│
├── server/                          # ⚙️ Node.js / Express Backend
│   ├── src/
│   │   ├── controllers/             # Business logic handlers
│   │   │   └── healthController.js  # Controller returning system & hero status
│   │   ├── routes/                  # API endpoints
│   │   │   └── healthRoutes.js      # Express router for /api/health
│   │   └── server.js                # Express app entry point, middleware, & server listener
│   ├── .env                         # Local environment variables (PORT, CORS)
│   ├── .env.example                 # Example template for environment configuration
│   └── package.json                 # Backend dependencies & scripts
│
├── .gitignore                       # Tells Git which files to ignore (node_modules, .env)
├── package.json                     # Root orchestrator to install and run both apps together
└── README.md                        # Beginner-friendly project guide (this document)
```

---

## 📄 File-by-File Breakdown & Responsibilities

### 1. Frontend (`client/`)
| File | Responsibility |
| :--- | :--- |
| `client/src/App.jsx` | **Primary Page Component**: Implements all 7 sections (Hero, About, Origin Story, Powers, Personality Matrix, Mission, and Final CTA). Includes the interactive trait switcher and the "Talk to AURA" preview modal. Retains silent background communication with `/api/health`. |
| `client/src/components/Navbar.jsx` | **Header Component**: Features the glowing AURA brand logo, section anchors (`#about`, `#origin`, `#powers`, `#personality`, `#mission`), a "TALK TO AURA" button, and a discreet backend status beacon. |
| `client/src/index.css` | **Styling Architecture**: Custom CSS containing dark atmospheric backgrounds, radiant radial glow effects, glassmorphic cards, smooth hover transitions, and mobile-responsive styles. |
| `client/src/services/api.js` | **API Service Layer**: Contains `checkServerHealth()` to verify the Express backend. |

### 2. Backend (`server/`)
| File | Responsibility |
| :--- | :--- |
| `server/src/server.js` | Express app server entry point running on port 5000. Configures CORS, JSON parsing, logging, and mounts `/api/health`. |
| `server/src/controllers/healthController.js` | Returns system status (`online`) and foundational superhero metadata for AURA. |
| `server/src/routes/healthRoutes.js` | Express router providing the `/api/health` endpoint. |

---

## 🚀 How to View & Run the Website Locally

### Option 1: Single-Command Launch (Easiest)
From the project root folder (`superhero-help-portal`):

```bash
npm run dev
```
*This runs both the Express backend (port 5000) and the Vite React frontend (port 5173) together.*

### Option 2: Two-Terminal Method (Recommended for Beginners)

#### Terminal 1 — Start the Backend Server:
```bash
cd server
npm run dev
```
👉 *Output:* `⚡ AURA Backend Server is running on port 5000`

#### Terminal 2 — Start the React Frontend:
```bash
cd client
npm run dev
```
👉 *Output:* `Local: http://localhost:5173/`

#### Open Your Browser:
Visit **[http://localhost:5173](http://localhost:5173)** in your browser!

---

## 🗺️ TechAscent Project Roadmap
- [x] **Step 1:** Initial Project Structure & Scaffolding *(Completed)*
- [x] **Step 2:** AURA Superhero Website Transformation *(Completed)*
- [ ] **Step 3:** AURA Interactive Guidance & Communication *(Pending Approval)*
- [ ] **Step 4:** Crisis Response & Automated Transmissions *(Pending Approval)*
