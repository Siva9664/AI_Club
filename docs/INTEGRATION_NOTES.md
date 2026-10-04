# Integration Notes

## Static Pages Analysis (from `achievements-and-chat` branch)

### 1. achievement.html

**Sections & Features:**
- **Navigation Header** - Brand logo (SVG), nav links (Home, Projects, Achievements, Visitors, Chatbot), theme toggle, login button, mobile hamburger/drawer
- **Hero Section** - 3D tilt effect on mouse move, animated counter stats (3 cards: Hackathons Won, Research Grants, Certifications), cyber stardust cursor trail
- **Featured Carousel** - Auto-advancing carousel (5s interval) with keyboard/touch navigation, 3 featured achievements with badges
- **Timeline Section** - Chronological list of all achievements with category badges, year filter, search with debounce, filter pills (All, Hackathons, Competitions, Collaborations, Certificates)
- **Upcoming Competitions** - First 10 shown with "+ N more" toggle up to 20
- **Ambassadors** - Grid of 3 ambassador cards with social links
- **Achievement Modal** - Detail view with image, description, tags, share button
- **Footer** - Brand, navigation links, social icons

**Animations:**
- Background mesh canvas (connected particles)
- Cyber stardust cursor trail with click burst particles
- 3D tilt on hero visual and cards
- Counter animations (countUp on scroll via IntersectionObserver)
- Carousel autoplay with pause on hover
- Ripple effect on clickable elements
- Scroll-triggered fade-in reveals

**Data (embedded in JS):**
- 15 achievements with fields: id, title, category (hackathon/competition/collaboration/certificate), date, year, description, image, recipient, organization, tags[], featured, proofUrl
- 3 featured achievements for carousel
- 4 upcoming competitions
- 3 ambassadors with name, role, bio, image, social links
- Categories: Hackathon, Competition, Collaboration, Certificate

**Assets:**
- External images from Unsplash (placeholder URLs)
- Google Fonts: Outfit, Plus Jakarta Sans, JetBrains Mono
- No local assets referenced

**External Hosts:**
- fonts.googleapis.com, fonts.gstatic.com
- images.unsplash.com (all images)

**Fetch Calls:**
- None (all data embedded in JS)

**Hardcoded College Text:**
- "AI Lab" branding throughout
- "Sri Shakthi Institute of Engineering and Technology" in meta tags
- "Department of Artificial Intelligence & Data Science" in footer

**Inline Secrets:** None found

---

### 2. chat.html

**Sections & Features:**
- **Navigation Header** - Same as achievement.html
- **Sidebar** - Conversation history with search, new chat, clear all, clear conversation
- **Chat Header** - AI Lab Assistant branding, connection status (Online/Thinking), avatar
- **Message Area** - User/assistant bubbles with markdown rendering, copy/regenerate/like/dislike buttons, timestamps
- **Input Area** - Auto-expanding textarea (max 500 chars), char counter, send button, stop generation button
- **Suggestions** - 4 prompt chips (Hackathons, Achievements, Projects, Research Papers)
- **Mobile Sidebar** - Slide-out drawer with backdrop

**Animations:**
- Background mesh canvas (same as achievements)
- Cyber stardust cursor trail (same)
- Streaming character-by-character response simulation
- Typing indicator (3 animated dots)
- Ripple effects
- Ripple on action buttons
- Message enter animations

**Data:**
- Embedded knowledge base with 12 categories: hackathons, achievements, projects, certifications, collaborators, club-info, events, facilities, team, contacts, research, default
- Conversation history stored in localStorage
- No backend API calls in mock mode

**External Hosts:**
- fonts.googleapis.com, fonts.gstatic.com
- images.unsplash.com (logo fallback)

**Fetch Calls:**
- `fetch('/api/chat')` - commented as production endpoint
- In mock mode: generates response from embedded knowledge base

**Hardcoded College Text:**
- "Sri Shakthi Institute of Engineering and Technology"
- "AI Lab" branding
- "Department of Artificial Intelligence & Data Science"

**Inline Secrets:** None found

---

### 3. login.html

**Sections & Features:**
- **Navigation Header** - Brand, back button (to home.html), theme toggle
- **Hero Area** - Animated orbital ring element (mouse parallax), rotating brand taglines
- **Auth Card** - Toggle between Login/Register views with smooth transitions
- **Login Form** - Email, password (toggle visibility), remember me, forgot password, submit with loading state, Google OAuth button (demo only)
- **Register Form** - Name, email, password (with strength meter), confirm password, terms checkbox, submit with loading state, Google OAuth button
- **Success States** - Animated checkmark, redirect to home.html
- **Modals** - Forgot password, Google OAuth demo notices
- **Toast Notifications** - Auto-dismissing

**Animations:**
- Neural particle network canvas background (connected nodes)
- Cursor glow follower
- Orbital ring mouse parallax
- Card view transition (slide + fade)
- Password strength bar animation
- Button ripple effect
- Loading spinner on submit
- Toast slide-in/out

**Data:**
- Remembered email in localStorage
- Demo credentials (not hardcoded, but mentioned in comments): admin@club.test / admin123, member@club.test / member123
- No backend integration - demo only

**External Hosts:**
- fonts.googleapis.com, fonts.gstatic.com
- images.unsplash.com (logo fallback)

**Fetch Calls:**
- None (demo only, redirects to home.html on success)

**Hardcoded College Text:**
- "Sri Shakthi Institute of Engineering & Technology"
- "AI Club & AI Lab Member Portal"
- "AI Lab" branding
- "Department of Artificial Intelligence & Data Science"

**Inline Secrets:** None found (demo credentials only in comments)

---

### Notes on Older Versions (home.html, index.html, projects.html, visitors.html)

These files in the static branch are older versions that predate the current React implementation. Key differences:

- **home.html/index.html** - Single-page layout with hero, stats, activities, featured projects, upcoming events, recent events, facilities, contact. Uses same design system as achievement.html/chat.html/login.html.
- **projects.html** - Project grid with filter tabs, search, quick-view modal, innovation banner, contact section. Data from embedded `PROJECTS_DATA` array (same as in AI_Club_Projects_Webpage zip).
- **visitors.html** - Similar to VISITORS folder but older version. Has hero, stats, filter sidebar, gallery, testimonials, CTA.

**Important:** The current React implementation (HomeScreen, ProjectsScreen, ProjectDetailScreen) is more advanced and should be preserved. Only missing features from these static pages should be ported.

---

### Design System Consistency

All three new pages (achievement.html, chat.html, login.html) share:
- CSS custom properties prefixed with `--achieve-` or `--ai-log-`
- Dark/light theme via `[data-theme]` attribute
- Google Fonts: Outfit (display), Plus Jakarta Sans (body), JetBrains Mono (mono)
- Cyber neon color palette (cyan, purple, indigo, emerald)
- Glassmorphism cards with backdrop-filter
- Scoped class prefixes (`.achieve-`, `.ai-chat-`, `.ai-login-`)
- Respects `prefers-reduced-motion`
- Disables cursor effects on touch devices

---

### Integration Strategy

1. **Reuse existing React design system** (`src/styles/index.css`) - do not import the static pages' CSS directly
2. **Port components as React+TypeScript** following the feature-slice structure
3. **Move embedded data to mock-data JSON files** and create service layers
4. **Preserve animations** using Framer Motion where possible, or CSS animations scoped to page components
5. **Replace Unsplash images** with local assets in `public/images/`
6. **Navbar** - Update to include Achievements, Visitors, Chatbot links (already planned in Phase 3)
7. **Theme** - Sync with existing ThemeProvider (uses `ai-club-theme` localStorage key)
8. **Auth** - Create AuthProvider with mock credentials matching backend seed data