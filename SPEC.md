# Portfolio Website Redesign Specification

## 1. Design Direction

Redesign the portfolio to feel like a **high-end Apple product presentation combined with a serious engineering research portfolio**.

The goal is **not** to imitate Apple's visual design directly.

Instead, adopt Apple's strengths in:

* visual hierarchy
* large typography
* generous whitespace
* scroll-driven storytelling
* cinematic transitions
* focused presentation
* minimal visual noise

Then combine them with:

* real engineering data
* technical specifications
* system diagrams
* measurements
* implementation details
* architecture explanations
* research notes

The resulting impression should be:

> **A product showcase for systems and engineering projects.**

The site should feel like the visitor is exploring a physical computing system rather than browsing a conventional developer portfolio.

---

# 2. Core Concept

The existing tagline:

> **From transistors to compilers.**

should remain the conceptual foundation of the site.

Every project should feel like a different layer of the computing stack.

For example:

```text
TRNG
Hardware / Entropy

Systolic Array
Computer Architecture

Hobby OS
Operating Systems

MUXIC
Language / Compiler / Audio

KDAA
Security / Algorithms
```

The portfolio should communicate that these are not merely unrelated projects.

They represent a continuous interest in computing systems from low-level hardware to high-level software.

---

# 3. Overall Visual Language

Use a restrained, premium visual language.

### Primary characteristics

* Large typography
* Very large whitespace
* Minimal borders
* Minimal shadows
* Neutral backgrounds
* High contrast
* Smooth motion
* Cinematic 3D visuals
* Precise technical typography
* Minimal decorative elements

Avoid:

* excessive gradients
* excessive glassmorphism
* excessive rounded cards
* generic developer portfolio aesthetics
* excessive neon colors
* random binary-code decorations
* meaningless technical-looking text
* excessive UI elements

The site should feel **precise rather than flashy**.

---

# 4. Homepage Structure

The homepage should become a sequence of large visual scenes.

Instead of presenting projects as conventional cards, treat every project as an independent **visual chapter**.

Conceptually:

```text
HERO
  ↓
TRNG
  ↓
SYSTOLIC ARRAY
  ↓
KDAA
  ↓
HOBBY OS
  ↓
COTTON
  ↓
PERCENTAGE
  ↓
MUSIC PLAYER
  ↓
MUXIC
  ↓
KSCA
  ↓
FOOTER
```

Each project should occupy approximately one viewport or more depending on the amount of storytelling required.

---

# 5. Hero Section

The hero should be extremely simple.

Use:

```text
FROM TRANSISTORS
TO COMPILERS.
```

as the dominant statement.

Below it, use a short supporting statement describing the portfolio as a collection of systems, experiments, and engineering projects.

Do not overload the hero with buttons, badges, or technology lists.

The 3D visual should remain the primary visual element.

---

# 6. Project Presentation

Every project should follow a consistent storytelling structure.

### Stage 1 — Introduction

Large title:

```text
SYSTOLIC ARRAY
```

Short description:

```text
Distributed computation
on four 8-bit microcontrollers.
```

Large 3D visualization underneath or beside it.

---

### Stage 2 — System

Introduce the architecture visually.

For example:

```text
             ┌───────┐
             │  PE   │
             └───┬───┘
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
     DATA      DATA      DATA
```

The actual Three.js visualization should animate the system rather than simply display a static model.

---

### Stage 3 — Technical Specifications

Add a compact technical specification block.

Example:

```text
PROCESSOR       ATmega328P × 4
CLOCK           16 MHz
ARRAY           2 × 2
DATA            8-bit
INTERCONNECT    GPIO
LANGUAGE        C
ARCHITECTURE    Systolic
```

Use monospace typography for this section.

Keep the block visually small and precise.

---

### Stage 4 — Measurements

Important measurements should become major visual elements.

For example:

```text
295–326×
SLOWER

25%
LESS DATA MOVEMENT

49.5%
SKEW WAIT

1.0%
ACTUAL MAC COMPUTATION
```

The numbers should be large.

The explanations should remain small.

This is similar to how product pages emphasize specifications, but the numbers must represent **real measurements from the project**.

Never invent decorative statistics.

---

# 7. Technical Data Should Be Visual

Technical information should not simply be placed into paragraphs.

Whenever possible, transform it into visual storytelling.

For example:

Instead of:

> The system spends significant time waiting for synchronization.

Use:

```text
EXECUTION TIME

COMPUTATION      1.0%
COMMUNICATION   XX.X%
SKEW WAIT       49.5%
OTHER           XX.X%
```

Use charts, diagrams, animated timing sequences, or large numerical typography where appropriate.

The goal is:

> **Make the engineering data visually understandable.**

---

# 8. Scroll-Driven Storytelling

The existing scroll-driven Three.js architecture should be preserved and expanded.

Scrolling should function as a timeline.

For example, the Systolic Array section could behave like:

```text
0%
SYSTOLIC ARRAY
Introduction

20%
Four MCUs appear

40%
Data begins moving

60%
Processing elements perform MAC operations

75%
System pauses

85%
Synchronization overhead appears

95%
Performance measurements appear

100%
Final conclusion
```

The visitor should understand the architecture simply by scrolling.

Do not rely exclusively on paragraphs to explain what is happening.

---

# 9. Engineering Instead of Decoration

Do not add fake technical decoration such as:

```text
01010101
0x3F
10101010
SYSTEM ONLINE
CPU CORE 01
```

unless it represents actual information.

Instead, use real project data:

```text
CLOCK
16 MHz

WORD SIZE
8 bit

ARRAY
2 × 2

TRANSFER
GPIO

PROTOCOL
Bit-banging
```

The principle is:

> **Real technical information should create the technical aesthetic.**

Not decorative hacker imagery.

---

# 10. System Decomposition

A major visual motif should be **decomposition**.

Projects should visually explain:

```text
SYSTEM
  ↓
SUBSYSTEM
  ↓
COMPONENT
  ↓
OPERATION
  ↓
RESULT
```

For example:

### TRNG

```text
Noise
  ↓
Sampling
  ↓
Entropy
  ↓
Conditioning
  ↓
Random Output
```

### Systolic Array

```text
Matrix
  ↓
Processing Elements
  ↓
Data Movement
  ↓
Synchronization
  ↓
MAC
  ↓
Result
```

### Hobby OS

```text
Boot
  ↓
Kernel
  ↓
Memory
  ↓
Scheduler
  ↓
Process
```

### MUXIC

```text
Source
  ↓
Parser
  ↓
AST
  ↓
Compiler
  ↓
WebAudio
```

This decomposition should become a recurring visual language across the entire site.

---

# 11. Typography

Use two primary typographic modes.

### Display typography

Use the existing clean sans-serif style for:

* titles
* descriptions
* headings
* explanatory text

Typography should be large, confident, and spacious.

### Technical typography

Use a monospace font for:

* specifications
* measurements
* register names
* code-related information
* architecture parameters
* timing information
* experimental results

Do not make the entire site monospace.

Target approximately:

```text
90% sans-serif
10% monospace
```

The technical typography should feel like instrumentation rather than decoration.

---

# 12. Color System

Keep the overall palette restrained.

Base:

```text
Background → white / off-white
Primary text → near-black
Secondary text → gray
```

Each project may optionally have one accent color.

For example:

```text
TRNG       → amber
SYSTOLIC   → blue
OS         → green
MUXIC      → violet
```

Accent colors should be used sparingly for:

* active states
* important measurements
* data flow
* selected components
* visualization highlights

Do not turn each project into a completely different visual theme.

The entire website should still feel like one system.

---

# 13. Project Cards

Avoid traditional project cards.

Do not use:

```text
┌─────────────┐
│ image       │
│ Project     │
│ description │
│ GitHub      │
└─────────────┘
```

Instead, make each project a full visual scene.

Conceptually:

```text
SYSTOLIC ARRAY

Distributed computation
on four 8-bit MCUs.


             [3D SYSTEM]


2 × 2 ARRAY
ATmega328P × 4
16 MHz
```

The project itself should feel like a chapter of the website.

---

# 14. Technical Documentation Layer

The detailed project pages should remain documentation-oriented.

Do not replace technical documentation with marketing-style presentation.

The hierarchy should be:

```text
Homepage
    ↓
Visual explanation
    ↓
Project page
    ↓
Technical documentation
    ↓
Source / implementation
```

The homepage answers:

> What is this?

The project page answers:

> How does it work?

The research/results section answers:

> What did the experiment show?

The source code answers:

> How was it implemented?

---

# 15. Blog / Engineering Notes

Add a blog, but do not position it as a generic personal blog.

Use it as an **Engineering Notes / Research Notes** section.

Possible content:

```text
NOTES

Why did my Systolic Array become 300× slower?

Building a TRNG from raw hardware noise

Implementing a tiny operating system

Designing a language from scratch

What I learned from bit-banging communication
```

The blog should document:

* development processes
* experiments
* failed approaches
* measurements
* implementation decisions
* debugging
* architectural decisions
* research observations

The blog should feel like an engineer's laboratory notebook.

---

# 16. Relationship Between Projects, Research, and Notes

Create a clear conceptual relationship:

```text
NOTES
  ↓
Experiments / Development Process
  ↓
PROJECT
  ↓
Finished Implementation
  ↓
RESEARCH
  ↓
Formal Results / Analysis
```

For example:

```text
NOTE
"Why is the Systolic Array 300× slower?"

        ↓

PROJECT
"Systolic Array"

        ↓

RESEARCH
"Communication overhead in
distributed MCU architectures"
```

This makes the site feel like an active engineering laboratory rather than a static portfolio.

---

# 17. Navigation

Keep navigation minimal.

Possible structure:

```text
REGX64

WORK
RESEARCH
NOTES
ABOUT
```

Avoid large navigation menus.

The content itself should provide most of the navigation.

---

# 18. Motion

Motion should feel physical and purposeful.

Use animation for:

* data movement
* system state changes
* component assembly
* decomposition
* timing
* synchronization
* transitions between abstraction levels

Avoid animation purely for visual spectacle.

Maintain:

* smooth scrolling behavior
* subtle easing
* consistent timing
* reduced-motion support
* WebGL fallback

The current `prefers-reduced-motion` and WebGL fallback behavior should be preserved.

---

# 19. Three.js Architecture

Do not replace the current Three.js visualization system unnecessarily.

The existing model abstraction should remain conceptually:

```js
{
  group,
  camZ,
  update(t, p)
}
```

Continue using independent visual models for each project.

However, consider separating the implementation into modules:

```text
js/
├── main.js
├── renderer.js
├── utils.js
└── models/
    ├── stack.js
    ├── trng.js
    ├── systolic.js
    ├── kdaa.js
    ├── os.js
    ├── cotton.js
    ├── percentage.js
    ├── player.js
    ├── muxic.js
    └── ksca.js
```

Do not rewrite the visualization architecture simply for the sake of introducing a framework.

Refactor only where it improves maintainability.

---

# 20. Responsive Design

The visual storytelling must remain effective on mobile.

Desktop:

```text
TEXT          3D
5fr           7fr
```

Mobile:

```text
TITLE

DESCRIPTION

3D VISUAL

SPECIFICATIONS

RESULTS
```

Do not simply shrink the desktop layout.

The mobile version should have its own intentional hierarchy.

3D scenes should remain readable and should not become tiny decorative objects.

---

# 21. Accessibility

Preserve and improve the existing accessibility system.

Maintain:

* semantic HTML
* skip navigation
* keyboard focus states
* `aria-label` descriptions for 3D scenes
* reduced-motion support
* WebGL fallback
* readable contrast
* meaningful heading hierarchy

Important information shown only through animation must also have an accessible textual representation.

---

# 22. Framework / Technology Direction

If the blog becomes a major part of the site, the project may be migrated to Next.js.

However, the visual system should **not** become a generic Next.js template.

The desired architecture is:

```text
Next.js
│
├── Homepage
│     └── Three.js visual system
│
├── Projects
│     └── Technical documentation
│
├── Research
│     └── Results / analysis
│
└── Notes
      └── Markdown / MDX engineering posts
```

Possible content structure:

```text
content/
├── blog/
└── projects/
```

The current Three.js visual identity should remain intact after migration.

---

# 23. Content Model

Project metadata should eventually become structured.

For example:

```js
{
  id: "systolic",
  title: "Systolic Array",
  model: "systolic",
  category: "architecture",
  status: "research",
  year: 2026,
  detail: "/systolic/"
}
```

This will allow the homepage, project pages, research pages, and blog posts to reference the same project data.

---

# 24. Desired Emotional Effect

The visitor should experience the site in this order:

### First impression

> "This looks extremely polished."

### After scrolling

> "This is interactive."

### After reading the technical sections

> "This person actually built these systems."

### After seeing the measurements

> "These are real experiments, not just visual mockups."

### After opening the documentation

> "There is substantial engineering depth behind the presentation."

That progression is the primary design goal.

---

# 25. Final Design Principle

The website should follow this principle:

> **Apple-like presentation, engineer-like substance.**

Or more specifically:

```text
Minimal presentation
        +
Cinematic visualization
        +
Real measurements
        +
Technical specifications
        +
System decomposition
        +
Research documentation
        +
Engineering notes
```

Do not make the website look like an Apple clone.

Make it feel like **Apple's product-presentation philosophy was applied to computer systems, hardware experiments, operating systems, compilers, and engineering research.**

The visitor should not merely see a portfolio.

They should feel like they are **exploring the systems that were built.**
