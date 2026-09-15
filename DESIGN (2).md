---
name: Technical Engineering Precision
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c6cb'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9195'
  outline-variant: '#44474b'
  surface-tint: '#c0c7d0'
  primary: '#c0c7d0'
  on-primary: '#2a3138'
  primary-container: '#979ea6'
  on-primary-container: '#2e353c'
  inverse-primary: '#585f66'
  secondary: '#e0c0ad'
  on-secondary: '#402c1f'
  secondary-container: '#594234'
  on-secondary-container: '#ceaf9d'
  tertiary: '#e0c0ad'
  on-tertiary: '#402c1f'
  tertiary-container: '#b59786'
  on-tertiary-container: '#453023'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce3ec'
  primary-fixed-dim: '#c0c7d0'
  on-primary-fixed: '#151c22'
  on-primary-fixed-variant: '#40484e'
  secondary-fixed: '#fedcc8'
  secondary-fixed-dim: '#e0c0ad'
  on-secondary-fixed: '#29180c'
  on-secondary-fixed-variant: '#594234'
  tertiary-fixed: '#fedcc8'
  tertiary-fixed-dim: '#e0c0ad'
  on-tertiary-fixed: '#29180c'
  on-tertiary-fixed-variant: '#594234'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies a disciplined, research-grade engineering aesthetic tailored for an Artificial Intelligence and Machine Learning specialist portfolio. The ethos is restrained, high-density, and calculated, trading ornamental flash for structural clarity and immediate readability. It signals competence, academic rigor, and production-level engineering capability.

Drawing primarily from modern technical minimalism, the UI avoids decorative gradients, soft skeuomorphism, and superfluous frosted glass effects. The interface establishes authority through clean dark surfaces, precision-milled hairline borders, dense typographic contrast, and deliberate bursts of warm earthy tones (`#979ea6` and `#3F2B1E`) that guide focus toward research papers, model architectures, and interactive demos.

## Colors
The palette operates on a strict functional hierarchy built on a clean dark foundation (`#efefef`-derived).

- **Primary Canvas & Surfaces**: Base background sits at deep, immersive dark foundations, stepping up to card and section surfaces.
- **Accents**: `#979ea6` acts as the primary actionable anchor—reserved for active states, link targets, and progress anchors. `#3F2B1E` serves as the secondary interactive highlight for hover states, focus rings, and badge outlines, complemented by `#3f2b1e` as a tertiary warmth indicator.
- **Neutrals & Text Hierarchy**: High-contrast, optical legibility driving zero eye strain:
  - Primary text: Headers, titles, and critical metrics
  - Secondary text: Body, project descriptions, and abstract summaries
  - Tertiary / Metadata text: Dates, tags, captions, and secondary parameters
  - Subdued borders: Precision hairline borders

Color is never applied decoratively. Every application denotes interactivity, execution status, or verified benchmark performance.

## Typography
Typography is anchored by `Inter` across headlines, body copy, and UI controls. Inter provides an unembellished, highly neutral base that maintains sharp legibility even under high-density technical reading conditions.

- **Headlines**: Tight letter-spacing with strong weights (600–700) to project confidence and structural gravity.
- **Body & Abstract Text**: Standard tracking with an intentional 1.5–1.6 line height ratio ensures prolonged focus when reading technical abstracts, methodology write-ups, and deployment logs.
- **Code, Metadata, & Metrics**: Code blocks, model parameters, commit hashes, and benchmark scores should be styled with clean numerical tabular figures (`font-feature-settings: 'tnum' 1, 'cv05' 1`) to preserve alignment across dense comparison tables.

## Layout & Spacing
The layout adheres to a structured, 12-column grid system built on an 8pt base unit. 

- **Desktop (>=1024px)**: 12 columns, max content constraint of 1200px, 48px outer margins, and 24px gutters. Spans follow technical patterns: 8 cols for primary research/project narrative, 4 cols for architectural breakdowns, model specifications, or meta sidebars.
- **Tablet (768px - 1023px)**: 8 columns, 32px margins, 20px gutters. Dual-pane comparisons collapse into single stacked modules.
- **Mobile (<768px)**: 4 columns, 20px margins, 16px gutters. Structural lines remain intact; spacing collapses along the Y-axis to favor quick scanning.

Rhythm is maintained through strict mathematical proportions: micro-spacing (4px, 8px) for badge internals and component controls; macro-spacing (24px, 40px, 64px) for distinct section boundaries and research entry demarcations.

## Elevation & Depth
In alignment with the disciplined, dark technical aesthetic, the design system rejects skeuomorphic drop shadows and ambient glowing blurs. Depth is achieved strictly through **tonal layering** and **low-contrast precision outlines**:

- **Level 0 (Canvas Base)**: Darkest surface. Unbounded workspace and root container.
- **Level 1 (Card & Module Layer)**: Resting panels bound by a 1px solid border. No box shadows.
- **Level 2 (Active & Hover Surfaces)**: Elevated elements or active modules shift with edge highlights.
- **Level 3 (Overlays & Dialogs)**: Crisp borders backed by a non-blurred dark dimming scrim. Shadows are limited to a tight, crisp occlusion.

## Shapes
Geometry is utilitarian and architectural. Adhering to `roundedness: 1` (0.25rem / 4px base radius):

- **Default UI Elements** (Buttons, inputs, inline badges): 4px border-radius (`0.25rem`). Gives an engineered, technical perimeter without sharp razor edges.
- **Containers & Cards** (`rounded-lg`): 8px (`0.5rem`). Keeps large structural blocks grounded.
- **Modals & Flyouts** (`rounded-xl`): 12px (`0.75rem`).
- **Pill Shapes / Fully Rounded**: Strictly reserved for status indicators (e.g., live inference endpoints, green online indicator pips). Buttons and tags must never use rounded-pill styling.

## Components

### Buttons
- **Primary**: Solid background `#979ea6`, font weight 500. 4px radius.
- **Secondary / Outline**: Transparent background, 1px border, text elements aligned to secondary hierarchy.
- **Ghost**: Transparent background with subdued text.

### Tags & Technology Badges
- Compact inline containers with 4px radius. 
- Default: Surface background, 1px solid border, `label-sm` sizing with monospaced letter forms for tech stacks (e.g., `PyTorch`, `CUDA`, `Transformer`).
- Active / Featured: Background tint utilizing `#979ea6`.

### Project & Publication Cards
- Background and border styled according to tonal depth tokens.
- Padding: 24px (`space-lg`).
- Transitions: Border color transitions on hover over 150ms. No card translation; hierarchy shifts via outline brightness alone.

### Data Lists & Metric Tables
- Flush horizontal rows divided by 1px precision borders.
- Key labels set in secondary text, metric values set with tabular numerals.

### Code & Terminal Blocks
- Surface configured for deep contrast. 
- Border: 1px solid.
- Top bar contains monospaced filename/architecture designation and clean copy CTA.

### Input Fields & Search
- Surface matched to container specifications with 1px solid borders. Focused states highlighted with `#979ea6`.