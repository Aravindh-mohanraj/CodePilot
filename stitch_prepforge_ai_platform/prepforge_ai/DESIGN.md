---
name: PrepForge AI
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is engineered for a premium AI SaaS environment, targeting developers, technical founders, and power users who demand high-performance tools. The aesthetic is a sophisticated fusion of **Minimalism** and **Glassmorphism**, drawing inspiration from industry leaders like Vercel and Linear.

The interface prioritizes deep focus through a **Dark-mode first** approach, utilizing high-contrast typography to ensure legibility. Visual interest is maintained through precision-engineered details: razor-thin borders, subtle backdrop blurs for layering, and vibrant accent gradients that signify AI-driven intelligence. The emotional response is one of clinical efficiency, technological advancement, and dependable luxury.

## Colors

This design system utilizes a structured monochromatic base with high-saturation functional accents.

- **Foundational Surfaces:** The background is an absolute deep zinc (`#09090B`). Surface elements and cards use a slightly elevated zinc (`#18181B`) to create hierarchical separation.
- **Accents & Gradients:** The primary Indigo and secondary Violet colors should be used for interactive elements and brand-heavy moments. For AI-specific features, use a linear gradient: `linear-gradient(135deg, #6366F1 0%, #7C3AED 50%, #2563EB 100%)`.
- **System States:** Success, Warning, and Danger colors follow standard utility patterns but are tuned for high luminosity against the dark background.
- **Borders:** Use `#27272A` for all structural dividers and component outlines to maintain a "low-noise" environment.

## Typography

The typography system is built on **Inter**, optimized for screen legibility and technical clarity. 

- **Weight Strategy:** Use `700` for display titles to create a strong visual anchor. Standard body text should remain at `400` to prevent visual fatigue.
- **Micro-copy:** Labels and secondary navigation items use `12px` uppercase with increased letter spacing for a structured, metadata-heavy feel common in developer tools.
- **Technical Content:** For code snippets or log outputs, use a monospaced font like Geist Mono (or fallback system mono) to maintain the developer-centric aesthetic.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. The main content area is capped at `1280px` for optimal readability, while sidebars and navigation headers remain fluid or anchored.

- **Grid:** A 12-column system is used for dashboard layouts. On mobile, this collapses to a single column with `16px` outer margins.
- **Rhythm:** All spacing (padding, margins, gaps) must be a multiple of the `4px` base unit.
- **Density:** Provide "Comfortable" (16px) and "Compact" (8px) density modes for data-heavy views like tables or file trees.

## Elevation & Depth

This design system uses **Tonal Layering** combined with **Glassmorphism** to establish hierarchy.

- **Level 0 (Base):** `#09090B` – The primary application canvas.
- **Level 1 (Cards/Sidebar):** `#18181B` with a `1px` solid border of `#27272A`. 
- **Level 2 (Modals/Popovers):** Surface color with a subtle `20px` backdrop blur (`saturate(180%) blur(20px)`) and a semi-transparent border.
- **Shadows:** Avoid heavy black shadows. Use a soft, ambient glow for elevated elements: `0 8px 32px 0 rgba(0, 0, 0, 0.8)`. 
- **AI Glow:** For active AI components, use a subtle outer glow utilizing the primary primary color at `10%` opacity.

## Shapes

The shape language is generous and modern, using significant corner rounding to soften the "hard" technical nature of the AI platform.

- **Primary Components:** Buttons, Inputs, and Cards use a `16px` (2xl) radius.
- **Small Components:** Checkboxes and small tags use a `4px` (sm) radius.
- **Container Elements:** Large dashboard sections and main modals use a `24px` (3xl) radius for a distinct, framed appearance.

## Components

Components are inspired by the functional utility of **Shadcn UI** and the iconography of **Lucide**.

- **Buttons:**
  - *Primary:* Solid Indigo background with white text. High-gloss hover effect.
  - *Secondary:* Ghost style with `#27272A` border and `#FAFAFA` text.
  - *Action:* For AI triggers, use the Blue/Purple gradient.
- **Inputs:** Dark zinc background with a subtle border. On focus, the border transitions to Primary Indigo with a `2px` outer ring at 20% opacity.
- **Cards:** Use `16px` padding as default. Include a subtle top-light highlight (a 1px gradient border that is brighter at the top) to simulate physical depth.
- **Chips/Badges:** Small, pill-shaped with `12px` uppercase text. Use low-saturation background tints of functional colors (e.g., Success is dark green background with light green text).
- **Navigation:** Sidebars must use backdrop-blur and a semi-transparent background to allow the main canvas colors to bleed through slightly.
- **Icons:** Use `20px` stroke-based icons (Lucide) with a `1.5px` weight for a clean, consistent line feel.