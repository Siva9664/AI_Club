# AI CLUB - Official Projects Portal 🚀

> High-tech, dark-themed, interactive web platform showcasing student-developed Artificial Intelligence, Computer Vision, Robotics, and NLP systems.

---

## 📌 Architecture & Structure

This repository contains the standalone, high-performance frontend for the **Projects** wing of the College AI Club website, engineered in pure modern HTML5, CSS3 (Custom Properties & Glassmorphism), and Vanilla ES6+ JavaScript.

```
AI CLUB WEBSITE/
├── index.html                  # Flagship Projects Hub (Hero, Filters, Search, Grid, Modals, Contact)
├── project-detail.html         # Two-Column Technical Deep-Dive & Team Roster Portal
├── home.html                   # AI Club Home Portal
├── achievements.html           # Milestones, Grants & Publications
├── visitors.html               # Lab Tours & Guestbook
├── assets/
│   ├── css/
│   │   ├── style.css           # Cybernetic dark design system, glassmorphism, responsive styles
│   │   └── project-detail.css  # Two-column layout, sticky team sidebar, simulator UI
│   ├── js/
│   │   ├── projects-data.js    # Comprehensive AI models database & schema
│   │   ├── main.js             # Hero video/canvas engine, card renderer, filters, search, toasts
│   │   └── project-detail.js   # Dynamic query router, live AI sandbox, member spotlight modal
│   └── images/
│       ├── projects/           # 4K AI model renders (Drone vision, Biomed, DeepFake, Robotics, etc.)
│       └── team/               # AI Club group photo & student contributor portrait headshots
```

---

## 🌟 Key Features

### 1. Flagship Projects Showcase (`index.html`)
- **Slow-Mo Running AI Theme Background**: Video loop paired with a 60 FPS interactive Neural Synapse Canvas simulation with cursor physics. Toggleable via `Video Loop` / `Neural Mesh` buttons.
- **Interactive Project Cards (Matching Sketch Photo 1)**:
  - **Upper Section**: High-resolution project visual, domain tag, active status pill, and hover quick-peek modal button.
  - **Lower Section**: Catchy title, executive summary, core architectural backbone, benchmark metrics, and team member mini-avatars.
  - **Interactive Button Behavior**: Clicking any card smoothly navigates to `project-detail.html?id=<project_id>`.
- **Real-Time Search & Category Filters**: Instant filtering across Computer Vision, Healthcare AI, Cybersecurity, Robotics & RL, and NLP & LLMs.
- **Interactive Quick-View Modal**: Instant preview popup allowing users to inspect metrics and team members without leaving the page.
- **Unique Contact Channels & Project Pitching**:
  - Sample Gmail (`aiclub.college.official@gmail.com`) with instant 1-click clipboard copy.
  - Sample LinkedIn (`linkedin.com/company/nexus-ai-club`).
  - Sample Instagram (`@nexus_aiclub_official`).
  - Interactive "Pitch a Project" form with animated validation and dispatch receipt.

### 2. Two-Column Detailed Deep-Dive (`project-detail.html`)
- **Matching User Sketch Photo 2**:
  - **Left Column**: Title, Domain, Version, Action Buttons (GitHub repo, Live Demo, Whitepaper, Share), Performance Metrics Strip (Accuracy, Latency, Throughput, Payload, Range, Parameters), Main Idea, Core Part Callout, Uses & Applications, Platform & Languages Table, Step-by-Step Architecture Pipeline, Code Snippet, and **Interactive Live AI Model Sandbox Simulator**.
  - **Right Column**:
    - **Team Group Photo** prominently displayed at the top.
    - **Scrolling Individual Member Roster**: Individual photo, full name, role, specific contribution part, skill badges, and social links (GitHub & LinkedIn).
    - **Member Profile Spotlight Modal**: Clicking on any member reveals an interactive popup with their research background.

---

## ⚡ How to Run Locally

No build tools or heavy node dependencies required! Simply:

1. **Directly in Browser**:
   Double click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or Safari.

2. **Using a Local Development Server (Recommended)**:
   ```bash
   # Using Python 3:
   python -m http.server 8000

   # Or using npx serve:
   npx serve .
   ```
   Open `http://localhost:8000` in your web browser.

---

## 👥 Contributors & College AI Club Cohort
- **Sarah Chen** - Lead Computer Vision & Deep Learning Engineer
- **Liam Vance** - Model Quantization & Forensic AI Architect
- **Amara Okafor** - Robotics Control & Embedded ROS2 Lead
- **Maya Patel** - Full Stack AI Systems & Cloud Architect
- **AI Club Student Innovation Cell** - Academic Year 2024–2026
