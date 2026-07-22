# PrepForge AI - Next.js 15 Migration Plan

This document details the blueprint for converting the exported Google Stitch HTML UI files into a production-ready **Next.js 15 (App Router)** application with TypeScript, TailwindCSS, ShadCN UI, Framer Motion, and Lucide Icons.

---

## 1. Analysis of Stitch Export

We analyzed the Stitch export, which contains 10 distinct UI templates. The application represents a high-end **AI-powered Technical Interview Preparation & Intelligence Platform** targeting software engineers grinding competitive programming, system design, and behavioral questions.

### A. Core Pages & Routes

Based on the export files, we map the templates to the following **Next.js 15 App Router** paths:

| Export Directory / Screen | Target Route | Description |
| :--- | :--- | :--- |
| `landing_page_dark_theme_prepforge_ai/code.html` | `/` | **Home / Landing Page:** Dark-mode-first premium layout with feature showcases, pricing, and demo CTA. |
| `authentication_prepforge_ai/code.html` | `/auth` | **Auth Page:** Responsive Login and Signup card with toggle states, target company selection, and experience-level selects. |
| `dashboard_prepforge_ai/code.html` | `/dashboard` | **Dashboard:** Welcome dashboard with stats summary grids, category breakdown charts, recommendation engine, and interactive activity timeline. |
| `explore_questions_prepforge_ai/code.html`<br/>`explore_challenges_export_feature_prepforge_ai/code.html` | `/explore` | **Explore Page:** Searchable/filterable index of questions with dynamic category pills, company filters, difficulty filters, and **Multi-select JSON Export** feature. |
| `categories_prepforge_ai/code.html` | `/categories` | **Study Categories:** concepts-by-concept bento-style cards showing individual topic progress (DP, System Design, Graph Theory, Networking, Databases, Behavioral). |
| `companies_prepforge_ai/code.html` | `/companies` | **Companies Page:** FAANG and Tier-1 firm cards showing frequency, trends, and a detail filter overlay modal. |
| `question_solver_prepforge_ai/code.html` | `/questions/[id]` | **Question Solver IDE:** Highly functional code workspace with description, diagram, fake Monaco code editor with line-numbers, multi-tab console, and an **AI slide-out drawer**. |
| `ai_assistant_prepforge_ai/code.html` | `/ai-coach` | **AI Coach / Chat:** Immersive conversational interface with suggested template pills, save functionalities, and weekly goal progress graphs. |
| `profile_prepforge_ai/code.html` | `/profile` | **User Profile:** Alex Rivera's public profile containing rank (Expert IV), XP level, interactive contribution heatmap, badges, and recent submission history table. |

### B. Shared Layouts

We will implement three root-level layouts to maintain context and modularize navigation:

1. **Root Layout (`app/layout.tsx`)**:
   - Theme provider (forced Dark Mode).
   - Global typography (Inter for display/body, Geist Mono for code).
   - Global CSS, utility wrappers, and Lucide Icons integration.
2. **Marketing Layout (`app/(marketing)/layout.tsx`)**:
   - Includes the sticky, glassy `TopNavBar` and marketing `Footer`.
   - Used for `/` (Landing Page).
3. **App Dashboard Layout (`app/(app)/layout.tsx`)**:
   - Sidebar navigation (`SideNavBar`) + top responsive header (`GlobalSearchHeader`).
   - Smooth slide animation on route transitions using Framer Motion.
   - Shared sidebar status triggers and search handlers.
   - Used for `/dashboard`, `/explore`, `/categories`, `/companies`, `/profile`, and `/ai-coach`.
4. **IDE Shell Layout (`app/(app)/questions/[id]/layout.tsx`)**:
   - Minimizes chrome spacing to maximize editor window size.
   - Includes a custom minimal navbar, sidebar trigger, and inline active status indicators.

### C. Reusable Components

The UI will be decomposed into clean, type-safe React components inside `@/components/ui/` (using ShadCN UI primitives where appropriate) and custom components under `@/components/`:

#### Standard Components
* **Cards & Layouts**:
  * `GlassCard`: Standard dark glassmorphic panels with top-border highlights, soft shadows, and optional hover scaling animations.
  * `CategoryCard`: Progress-filled concept selectors with custom topic icon sets.
  * `CompanyCard`: Premium brand-focused panels featuring custom difficulty level dials, trend bars, and active badges.
* **Navigation & Shelters**:
  * `SideNavBar`: Fluid or anchored responsive aside layout supporting route states, collapsible toggles, and pro action buttons.
  * `TopNavBar`: Glassy marketing navigator with interactive CTA buttons.
  * `GlobalSearchHeader`: Command-K shortcut-enabled search with user notification trigger.
* **Form & Interaction Elements**:
  * `Button`: Custom styled premium buttons supporting variant tints, gradient accents, and micro-interactions.
  * `Input` & `SearchInput`: Dynamic fields transitioning border values to glowing primary indices upon focus.
  * `ProgressBar`: Gradient fills displaying XP or category progress.
  * `CustomCheckbox`: Selectors for challenge bulk exporting.

#### Specialized Interactive Components
* **IDE Modules**:
  * `MonacoEditor`: Standard code workspace with syntax highlighting, custom line-numbering gutters, and real-time cursor/auto-save notifications.
  * `CollapsibleConsole`: Tabs containing diagnostic runtime results, test outputs, and submission details.
  * `AIDrawer`: Slide-out panel for localized problem hints.
* **AI & Chat**:
  * `ChatWindow`: Conversation scroller supporting prompt presets, voice toggles, and animated text outputs.
* **Datagrid & Visualization**:
  * `ActivityHeatmap`: Git-style grid tracking annual interview preparation consistency (XP).
  * `CategoryRadar`: Custom-designed bar/donut charts indicating algorithm category frequencies.

### D. Assets

* **Fonts**: Loaded via `next/font/google` for Inter and Geist Mono.
* **Icons**: Standardized on `lucide-react` for responsive web assets, matching the design style of Lucide.
* **AIGenerated Vector Assets**: Mock visual indicators (e.g. 3D brain illustration, rain water diagram, node networking) served from standard SVG paths or served directly from the export directory.

---

## 2. Branding & Theme Setup

The brand colors, typography, and corner radius system defined in `DESIGN.md` will be directly mapped to **Tailwind CSS variables** and integrated into `tailwind.config.ts`.

### Theme Variables Mapping
* **Foundational Colors (Zinc Absolute Dark)**:
  * `--background`: `#09090B`
  * `--surface-base`: `#13131b`
  * `--surface-container`: `#1f1f27`
  * `--border`: `#27272A`
* **Accents**:
  * `--primary` (Indigo tint): `#c0c1ff`
  * `--secondary` (Violet dim): `#d2bbff`
  * `--tertiary` (Warm Amber): `#ffb783`
* **Gradients**:
  * AI Glow / Gradient Accent: `linear-gradient(135deg, #6366F1 0%, #7C3AED 50%, #2563EB 100%)`
* **Border Radii**:
  * `sm`: `4px` (Small components like checkboxes/tags)
  * `DEFAULT`: `8px` (Standard buttons, inline items)
  * `xl`: `12px` (Cards and dashboard inputs)
  * `2xl`: `16px` (Main widgets, dialog bases)
  * `3xl`: `24px` (Large shell modules, dashboard frames)

---

## 3. Migration Roadmap (Step-by-Step)

The migration will follow a logical progression, building up the foundations before implementing the complex routes.

```
┌────────────────────────────────────────────────────────┐
│ 1. Foundations & Theme (Tailwind, Configs, Design System)│
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. Core Layouts (Marketing, Sidebar App, IDE Shell)    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. Static Pages (Landing, About/Privacy placeholders)  │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 4. Navigation & Auth Screens (Toggle states, Inputs)   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 5. Info Hubs (Categories bento, Companies modal index) │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 6. Interactive Dashboards (Widgets, Charts, Timeline)   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 7. Core Workspaces (IDE Solver, Console, AI Coach)     │
└────────────────────────────────────────────────────────┘
```

### Phase 1: Environment & Foundations Setup
1. Scaffold Next.js 15 template with Tailwind CSS, TypeScript, and ESLint within the `frontend` directory.
2. Setup Tailwind CSS theme configurations (`tailwind.config.ts`) using CSS variables mapped from the Google Stitch design guidelines.
3. Configure Global CSS (`app/globals.css`) with standard animation Keyframes (like floating elements and the pulse glow).
4. Integrate ShadCN UI baseline structure (button, input, select, dialog, sheet, progress, checkbox).
5. Setup Framer Motion global transitions and animations.

### Phase 2: Shared Layouts & Navigation Shells
6. Create the **Marketing Layout** with standard responsive navigation bars and footers.
7. Implement the **App Shell Layout** featuring a collapsible, responsive `SideNavBar` with active states and a top global header with Cmd+K functionality.
8. Build responsive mobile side navigation.

### Phase 3: Auth & Account Creation (/auth)
9. Recreate the premium `/auth` layout featuring split-screen graphics and geometric patterns.
10. Build the interactive form supporting toggle transitions between Log In and Sign Up.
11. Setup responsive select input forms.

### Phase 4: Core Pages (Landing, Categories, Companies)
12. Build the Premium Landing Page (`/`) incorporating floating cards, grid indicators, and mock hero diagrams.
13. Develop Study Categories (`/categories`) bento layout demonstrating dynamic progress updates.
14. Develop Companies Page (`/companies`) with FAANG grids and interactive filter modals.

### Phase 5: Search & Challenge Index (/explore)
15. Build `/explore` page matching the grid design.
16. Implement the **Multi-select Export Panel** enabling users to select questions and download them instantly as standard JSON files.

### Phase 6: User Profile & Heatmap (/profile)
17. Design Profile Page (`/profile`) outlining XP structures and badges.
18. Integrate the **Contribution Heatmap** showing monthly progress.

### Phase 7: Contextual Coach & Immersive AI Workspaces
19. Implement dedicated AI Coach (/ai-coach) chat interfaces with quick-prompt action buttons.
20. Construct the **Question Solver IDE** (`/questions/[id]`) with a split panel.
21. Add the sliding contextual AI Drawer on the IDE page.
22. Integrate interactive Console outputs and auto-saving simulation scripts.

---

## 4. Key Verification Metrics

Before completion, the following checks will be performed to ensure production readiness:

* **No Build Warnings**: Fully typed codebase without TypeScript `any` suppressions or build warnings.
* **Component Modularity**: Shared UI elements are organized inside `@/components/ui/` with clear Tailwind utility overrides.
* **Full Responsive Design**: Seamless layout transitions from mobile viewports (minimum 360px) to ultra-wide desktop monitors.
* **Flawless Client-Side Interaction**: Perfect execution of search querying, company modals, multi-select exporting, IDE drawer slides, and collapsible console toggling.
* **Aesthetic Accuracy**: Dark-mode-first styling, glassmorphism filters, neon border rings, and premium layouts.
