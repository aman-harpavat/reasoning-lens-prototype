# Reasoning Lens Prototype Specification

## 0. Purpose Of This Document

This document is the build specification for a high-fidelity web prototype of **Reasoning Lens**, a proposed native Claude feature.

The prototype must be built as a **controlled, hardcoded, interactive product simulation**. It should not use a real Claude API, authentication, backend database, or live AI generation. The goal is to demonstrate the product experience clearly and reliably for a graduation project submission.

The prototype should prioritize product clarity, interaction quality, and visual fidelity over technical completeness.

---

# 1. Problem Statement

AI-generated outputs often look polished, structured, and complete even when they contain weak reasoning, missing context, hidden assumptions, or subtle inaccuracies.

Early-career knowledge workers increasingly use AI tools for career-critical workflows such as interview preparation, research synthesis, resume writing, business analysis, and coding. In these workflows, users often struggle to judge whether an AI output is actually reliable, complete, and useful for their situation.

The core problem:

> Early-career knowledge workers rely on AI for high-stakes work but evaluate outputs primarily through confidence and polish rather than actual reasoning quality.

This creates two failure modes:

1. **Over-trust**: users accept weak outputs because they sound convincing.
2. **Over-skepticism**: users distrust useful outputs because they cannot evaluate them confidently.

The product must help users evaluate AI-generated outputs while preserving human judgment.

---

# 2. Solution

## Product Name

**Reasoning Lens**

## Product Type

A simulated **native Claude feature** shown through a web prototype.

## Core Concept

Reasoning Lens is a post-response evaluation layer inside Claude that helps users inspect AI outputs before relying on them.

Instead of giving a generic trust score, Reasoning Lens surfaces:

- assumptions made by the AI
- missing context
- uncertainty
- reasoning gaps
- alternative perspectives
- areas where human judgment is required

## Design Principle

Claude should not act as the final authority. The product should help users think better, not outsource judgment.

## Prototype Framing

The prototype should simulate how this would work inside Claude:

1. User selects a high-stakes workflow.
2. User sees a Claude-like chat screen with a realistic prompt.
3. Claude generates a polished but imperfect answer.
4. User activates **Review with Reasoning Lens**.
5. A reasoning/evaluation layer opens.
6. User selects improvement actions.
7. Claude produces a revised answer with a short explanation of what changed.

---

# 3. Prototype Scope

## Number Of Main Screens

Build **7 main screens/states**.

These can be implemented as separate React components or as state-based views inside a single-page app.

## Required Flows

The prototype must support **2 complete flows**:

1. **Interview Preparation**
2. **Research Synthesis**

Each flow should have:
- predefined prompt
- initial Claude output
- Reasoning Lens evaluation cards
- improvement action buttons
- revised output

## Out Of Scope

Do not build:
- real Claude API integration
- login/signup
- backend
- database
- file upload
- payment
- generic chatbot
- generic trust score
- citation-only verifier
- live internet research
- user-generated freeform prompts

---

# 4. Information Architecture

## App-Level Navigation

The app should feel like a native Claude chat workspace, not a custom demo dashboard.

### Left Sidebar

Include a left sidebar that closely mimics the attached Claude screenshot.

The sidebar should be primarily visual/contextual. It should not be the main place where the user selects the demo flow.

Sidebar structure:

- top area with Claude-style brand label/logo
- primary tabs/items:
  - Chat
  - Cowork
  - Claude
- a recent chats area with muted placeholder chat items
- optional bottom account/status area

The sidebar items can be mostly static. They exist to create the feeling of being inside Claude.

Do **not** place the main demo options in the sidebar.

Do not use sidebar items such as:

- Reasoning Lens Demo
- Interview Prep
- Research Synthesis
- About Prototype

as primary navigation items, because that makes the experience feel like a separate demo app instead of a native Claude feature.

### Main Workspace

The main workspace should contain:

- centered Claude-style greeting on the landing screen
- Claude-style prompt/composer bar
- demo use-case selection triggered from the composer
- generated Claude response
- Reasoning Lens CTA
- evaluation panel
- revised response state

### Demo Flow Selection

The user should select the demo flow inside the main chat experience.

The guided demo options should appear as subtle Claude-style suggestion chips/cards, not as large marketing cards.

Expected behavior:

1. User lands on the Claude-like home screen.
2. A prompt/composer bar appears at the bottom/center.
3. The composer should not allow unrestricted free typing.
4. When the user clicks the composer or a `Try a guided demo` control, show two selectable demo options:
   - Interview Preparation
   - Research Synthesis
5. When the user selects one option, insert the corresponding predefined prompt into the composer.
6. User then clicks the Claude-style upward arrow send button.
7. Claude displays the hardcoded response for that flow.
8. Reasoning Lens appears as a native post-response action.


---

# 5. Screen Specifications

---

## Screen 1 — Claude Home / Guided Demo Entry

### Purpose

Make the prototype feel like the user has opened Claude, not a standalone Reasoning Lens landing page.

### Layout

- Claude-like dark background
- left sidebar matching the attached screenshot
- centered Claude-style greeting
- prompt/composer bar near the bottom/center
- no large external-looking product cards on the initial screen

### Header Text

Use a Claude-style greeting:

`What can I help you think through today?`

### Supporting Microcopy

Show subtle context below the greeting or near the composer:

`Try Reasoning Lens on a high-stakes AI output.`

### Composer Placeholder

`Click to choose a guided demo`

### Guided Demo Options

When the user clicks the composer or `Try a guided demo`, show a compact selection popover or inline option row above the composer.

Options:

#### Option 1

Title:
`Interview Preparation`

Description:
`Evaluate a polished interview answer before using it in a real interview.`

#### Option 2

Title:
`Research Synthesis`

Description:
`Inspect a research summary for missing nuance, uncertainty, and evidence gaps.`

### Interaction

Clicking a demo option inserts that flow’s predefined prompt into the composer and moves the user into the Claude chat simulation state.

The user should not be asked to type a custom prompt.


---

## Screen 2 — Claude Chat Simulation

### Purpose

Show a normal Claude-like chat experience before Reasoning Lens appears.

### Layout

- left sidebar visible
- main chat area
- predefined prompt shown inside the composer
- selected workflow should be shown subtly as a small chip above or near the composer
- avoid making the workflow chip look like a separate app navigation element

### Common Elements

Workflow chip:
- `Interview Preparation` or `Research Synthesis`

Model label:
`Claude`

Helper text:
`Guided prototype — response is preloaded for demo reliability.`

### Interview Prep Prompt

Display this user prompt:

`Help me answer the interview question: "Why do you want to move into Product Management?" I am an early-career professional with analytics experience and want a strong answer for PM interviews.`

Send control:
Use a Claude-style rounded square button with an upward arrow icon, matching the attached screenshot. Do not use a text button here.

### Research Synthesis Prompt

Display this user prompt:

`Summarize the key arguments around whether AI tools improve or weaken critical thinking for early-career professionals. Make it concise and useful for a workplace presentation.`

Send control:
Use a Claude-style rounded square button with an upward arrow icon, matching the attached screenshot. Do not use a text button here.

### Interaction

Clicking the upward arrow send button moves to Screen 3.


---

## Screen 3 — Generated Output

### Purpose

Show a polished but imperfect Claude answer. This is the moment where users may over-trust fluency.

### Layout

- user prompt shown in chat bubble
- Claude response shown below
- response should look polished and credible
- Reasoning Lens CTA appears below the response

### Required Post-Response Action Row

Below the Claude response, show a native-feeling action row.

Actions:

- `Copy`
- `Retry`
- `Review with Reasoning Lens`

Only `Review with Reasoning Lens` needs to be functional. `Copy` and `Retry` can be static/non-functional.

`Review with Reasoning Lens` should be the most visually prominent action in the row, but it should still feel like a native Claude post-response action rather than a large external CTA.

Secondary text:
`Inspect assumptions, uncertainty, missing context, and reasoning gaps before using this output.`

---

## Screen 3A — Interview Prep Initial Output

### Claude Output Text

`A strong answer could be:`

`I want to move into Product Management because I enjoy working at the intersection of users, business, and technology. In my analytics role, I have often worked on understanding user problems, identifying patterns in data, and translating insights into product or business recommendations. Over time, I realized that I do not just want to analyze problems after they occur — I want to help shape the solutions from the beginning.`

`Product Management appeals to me because it combines structured problem-solving, customer empathy, stakeholder management, and execution. My analytics background gives me a strong foundation in data-driven decision-making, while my experience working with cross-functional teams has helped me understand how product decisions are made in real business contexts.`

`I believe PM is a natural next step because it allows me to use my analytical strengths while developing broader ownership over strategy, user experience, and business outcomes.`

### Intentional Weaknesses In This Output

The output should look good but have hidden weaknesses:

- too generic
- limited personal differentiation
- no concrete examples
- assumes analytics naturally leads to PM
- does not address why now
- does not mention target company or product area
- could sound rehearsed

These weaknesses should not be shown until Reasoning Lens is opened.

---

## Screen 3B — Research Synthesis Initial Output

### Claude Output Text

`AI tools can both improve and weaken critical thinking among early-career professionals, depending on how they are used.`

`On the positive side, AI can help users explore unfamiliar topics quickly, generate alternative perspectives, summarize complex material, and improve the quality of early drafts. This can accelerate learning and help professionals work through ambiguity faster.`

`However, AI can also weaken critical thinking when users accept outputs passively. Because AI responses often sound confident and complete, users may skip deeper evaluation, fail to question assumptions, or rely on the tool before forming their own view. This is especially risky for early-career professionals who are still developing domain judgment.`

`The key takeaway is that AI is most useful when treated as a thinking partner rather than a replacement for thinking. Users should use AI to generate ideas, pressure-test reasoning, and identify blind spots, while still applying their own judgment before taking action.`

### Intentional Weaknesses In This Output

The output should look good but have hidden weaknesses:

- balanced but generic
- no evidence or source quality discussion
- lacks nuance by task type
- does not distinguish beginners from advanced users
- no concrete workplace examples
- no acknowledgment of conflicting research
- conclusion may feel obvious

These weaknesses should not be shown until Reasoning Lens is opened.

---

## Screen 4 — Reasoning Lens Trigger

### Purpose

Show Reasoning Lens as an optional evaluation layer, not a forced judgment system.

### CTA Design

Show `Review with Reasoning Lens` as part of the post-response action row.

Nearby actions:
- `Copy`
- `Retry`
- `Review with Reasoning Lens`

`Review with Reasoning Lens` should use a subtle Claude-style accent treatment. It should not look like a separate third-party widget.

### Microcopy

`Use this when the output will influence a real decision, document, interview, or work product.`

### Interaction

Clicking `Review with Reasoning Lens` opens Screen 5.

On desktop, the Reasoning Lens panel should open on the right side of the Claude response as an inspection layer. The original Claude response should remain visible on the left.

On smaller screens, the panel may stack below the Claude response.

---

## Screen 5 — Reasoning Lens Panel

### Purpose

Make output quality more legible without giving a simplistic trust score.

### Layout

Use a right-side panel or wide expandable panel.

Panel title:
`Reasoning Lens`

Panel subtitle:
`This does not decide for you. It helps you inspect the output before relying on it.`

### Do Not Include

Do not include:
- numerical trust score
- green/red correctness badge
- “safe to use” label
- “verified” label

### Required Evaluation Modules

Display 6 expandable/collapsible module chips/cards:

1. Assumptions
2. Missing Context
3. Uncertainty
4. Reasoning Gaps
5. Alternative Perspectives
6. Human Judgment Needed

Interaction behavior:

- Each module should appear as a compact expandable chip/card.
- The first module, `Assumptions`, should be expanded by default when Reasoning Lens opens.
- Clicking any collapsed module should expand it.
- Clicking an expanded module should collapse it.
- Multiple modules may be expanded at once, but the default state should keep only the first module expanded.
- The expanded content should appear directly below the module header, not in a separate page.
- Keep the interaction lightweight and native-feeling, similar to an inspection panel rather than a dashboard.

Each expanded module should have:
- title
- short explanation
- 2–4 bullet points
- severity label: `Low attention`, `Medium attention`, or `High attention`
- user-facing prompt/question

Severity labels must not look like final verdicts. They should indicate attention level only.

---

## Screen 5A — Interview Prep Reasoning Lens Content

### Card 1: Assumptions

Severity:
`Medium attention`

Explanation:
`Claude assumed your analytics experience naturally translates into PM readiness.`

Bullets:
- Assumes you have worked directly with users or product teams.
- Assumes your motivation is product ownership, not just career growth.
- Assumes interviewers will value analytics as a PM foundation.

Question:
`Can you add one real example where you influenced a product or user-facing decision?`

### Card 2: Missing Context

Severity:
`High attention`

Explanation:
`The answer lacks details that would make it specific to you.`

Bullets:
- No concrete project example.
- No target company or product context.
- No mention of what kind of PM role you want.
- No explanation of why you want to switch now.

Question:
`What specific PM role, company, or product area are you targeting?`

### Card 3: Uncertainty

Severity:
`Medium attention`

Explanation:
`The answer may work for some PM interviews but may sound generic in competitive interviews.`

Bullets:
- Strong structure, but low uniqueness.
- Safe wording, but limited personal signal.
- Could sound similar to many AI-generated PM answers.

Question:
`Do you want this answer to sound safer, sharper, or more personal?`

### Card 4: Reasoning Gaps

Severity:
`High attention`

Explanation:
`The answer explains why PM is attractive, but not why you are credible for PM.`

Bullets:
- It does not show product judgment.
- It does not show decision-making under ambiguity.
- It does not connect analytics work to ownership.

Question:
`Which experience best proves you can think like a PM?`

### Card 5: Alternative Perspectives

Severity:
`Medium attention`

Explanation:
`A stronger answer could be framed around user impact, business ownership, or product discovery.`

Bullets:
- User-impact framing: focus on solving customer problems.
- Business framing: focus on outcomes and prioritization.
- Personal-growth framing: focus on moving from insights to ownership.

Question:
`Which angle feels most authentic to you?`

### Card 6: Human Judgment Needed

Severity:
`High attention`

Explanation:
`Claude cannot know which story is most credible unless you choose the real experience behind the answer.`

Bullets:
- You should decide which project to anchor the answer around.
- You should ensure the answer sounds like your real voice.
- You should remove claims you cannot defend in follow-up questions.

Question:
`Would you be comfortable defending every line of this answer in an interview?`

---

## Screen 5B — Research Synthesis Reasoning Lens Content

### Card 1: Assumptions

Severity:
`Medium attention`

Explanation:
`Claude assumed a balanced answer is more useful than a strongly argued point of view.`

Bullets:
- Assumes the audience wants neutrality.
- Assumes both benefits and risks are equally important.
- Assumes early-career professionals are the main concern.

Question:
`Is your presentation meant to inform, persuade, or recommend action?`

### Card 2: Missing Context

Severity:
`High attention`

Explanation:
`The synthesis lacks evidence boundaries and source context.`

Bullets:
- No sources or research basis are mentioned.
- No distinction between task types.
- No industry or workplace context.
- No examples of measurable impact.

Question:
`What audience will use this synthesis, and what decision will it support?`

### Card 3: Uncertainty

Severity:
`High attention`

Explanation:
`The answer makes broad claims about critical thinking without showing where evidence is strong or weak.`

Bullets:
- Impact may differ for writing, coding, research, and decision-making.
- Effects may vary by user expertise.
- Long-term behavior change is uncertain.

Question:
`Should the synthesis highlight evidence strength by claim?`

### Card 4: Reasoning Gaps

Severity:
`Medium attention`

Explanation:
`The answer states that AI can help or harm thinking, but does not explain the mechanism deeply.`

Bullets:
- It does not explain how passive acceptance develops.
- It does not explain when AI improves reasoning.
- It does not separate productivity gains from judgment quality.

Question:
`Should the revised version explain the mechanism behind the tradeoff?`

### Card 5: Alternative Perspectives

Severity:
`Medium attention`

Explanation:
`There are at least three ways to frame the synthesis.`

Bullets:
- Optimistic: AI as a reasoning accelerator.
- Cautionary: AI as a dependency risk.
- Conditional: AI helps when users actively evaluate outputs.

Question:
`Which framing is most useful for your presentation?`

### Card 6: Human Judgment Needed

Severity:
`High attention`

Explanation:
`Claude cannot decide what level of nuance your audience needs.`

Bullets:
- You should decide whether to include limitations.
- You should decide whether the output needs evidence.
- You should decide how much uncertainty your audience can tolerate.

Question:
`Will this output be used for learning, decision-making, or persuasion?`

---

## Screen 6 — Gap-Aligned Improvement Actions

### Purpose

Convert each Reasoning Lens evaluation area into a clear, user-controlled next step.

The actions should directly align with the six evaluation modules so users understand how the output can be improved without Claude becoming the final authority.

### Layout

Show improvement actions below the Reasoning Lens cards.

Each action should be visually connected to one evaluation module:

1. Assumptions
2. Missing Context
3. Uncertainty
4. Reasoning Gaps
5. Alternative Perspectives
6. Human Judgment Needed

### Required Text

Section title:
`Turn this review into a better answer`

Section subtitle:
`Choose what Claude should improve. Each option maps to a specific gap surfaced above.`

### Required Buttons / Actions

#### Action 1 — Assumptions

Button label:
`Make assumptions explicit`

What it does:
Claude revises the answer to clearly state the assumptions behind the response.

Use when:
The user wants to understand what Claude assumed without enough evidence.

#### Action 2 — Missing Context

Button label:
`Add missing context prompts`

What it does:
Claude identifies the specific information the user should add before relying on the answer.

Use when:
The answer may change materially if more personal, domain, company, or audience context is provided.

#### Action 3 — Uncertainty

Button label:
`Mark uncertain parts`

What it does:
Claude highlights which parts of the answer are stronger, weaker, or dependent on unknown information.

Use when:
The user needs to know which claims or recommendations should not be treated as fully certain.

#### Action 4 — Reasoning Gaps

Button label:
`Strengthen the reasoning`

What it does:
Claude revises the answer to improve logic, causal links, specificity, and defensibility.

Use when:
The answer sounds good but does not sufficiently explain why the recommendation or argument is valid.

#### Action 5 — Alternative Perspectives

Button label:
`Compare alternate angles`

What it does:
Claude shows 2–3 alternative ways to frame or approach the answer.

Use when:
The user wants to avoid accepting the first polished version too quickly.

#### Action 6 — Human Judgment Needed

Button label:
`Show what I must decide`

What it does:
Claude lists the parts of the answer that require the user's own judgment, personal experience, or final decision.

Use when:
The output should not be used directly without user review.

### Interaction

- Each action should be selectable.
- The selected action should be visually highlighted.
- For prototype simplicity, any selected action may lead to the same revised output state.
- However, the UI should show which action was selected before displaying the revised output.
- The revised output should feel like it incorporated the overall Reasoning Lens review, not just a generic rewrite.


---

## Screen 7 — Revised Output + Calibration Reflection

### Purpose

Show that Reasoning Lens improved the output and helped the user understand what changed.

### Layout

- revised Claude response
- small “What changed” card
- final reflection prompt

The revised output should appear as a follow-up Claude response in the same chat thread, not as a separate page or modal.

---

## Screen 7A — Interview Prep Revised Output

### Revised Claude Output

`A sharper answer could be:`

`I want to move into Product Management because I have realized that the part of my analytics work I enjoy most is not just finding insights, but turning those insights into better product and business decisions.`

`In my current role, I have worked on problems where understanding user behavior, operational constraints, and business impact mattered together. For example, while analyzing product or customer workflows, I was not only looking at metrics but also trying to understand what users were struggling with, where the experience was breaking down, and what changes could create measurable impact.`

`That made me interested in PM because the role sits closer to problem discovery, prioritization, and execution. My analytics background gives me a strong base in structured thinking and evidence-based decisions, but I now want to build deeper ownership over defining the problem, aligning stakeholders, and shaping the solution.`

`So for me, PM is not a random pivot. It is a natural next step from analyzing outcomes to helping build the product decisions that create those outcomes.`

### What Changed Card

Title:
`What changed`

Bullets:
- Added stronger reasoning for the career transition.
- Reduced generic PM language.
- Connected analytics experience to product judgment.
- Made the answer easier to defend in follow-up questions.

### Final Reflection Prompt

`Before using this answer, replace the generic project reference with one real example from your experience.`

---

## Screen 7B — Research Synthesis Revised Output

### Revised Claude Output

`A more useful synthesis is:`

`AI tools can improve critical thinking when they are used to expand a user’s thinking, but they can weaken critical thinking when they replace the user’s evaluation process.`

`The benefit is strongest when users use AI to generate alternative explanations, compare arguments, summarize unfamiliar material, or pressure-test their own reasoning. In these cases, AI acts as a thinking partner and can help early-career professionals move faster through ambiguity.`

`The risk appears when users treat polished AI outputs as finished answers. Because AI responses often sound complete and confident, users may skip important evaluation steps: checking assumptions, looking for missing context, comparing viewpoints, or asking whether the answer applies to their situation.`

`The impact also depends on the task. For low-risk drafting, AI may mainly improve speed. For research, strategy, or career decisions, the quality of human evaluation matters much more because weak reasoning can flow into downstream work.`

`The practical takeaway: AI is most valuable when users actively interrogate its outputs. It should be used to improve judgment, not bypass it.`

### What Changed Card

Title:
`What changed`

Bullets:
- Clarified the mechanism behind the tradeoff.
- Added task-level nuance.
- Reduced generic balanced framing.
- Highlighted where human evaluation matters most.

### Final Reflection Prompt

`Before using this synthesis, add evidence or examples based on the audience and decision context.`

---

# 6. Functional Requirements

## State Management

Use local React state only.

Required states:

- selectedFlow: `null | interview | research`
- isDemoPickerOpen: `true | false`
- hasPromptLoaded: `true | false`
- hasGeneratedOutput: `true | false`
- isLensOpen: `true | false`
- expandedLensCards: array of module ids, default `["assumptions"]`
- selectedAction: `null | explicitAssumptions | missingContextPrompts | markUncertainty | strengthenReasoning | compareAngles | humanDecisionPoints`
- showRevisedOutput: `true | false`

## User Interactions

### Claude Home / Guided Demo Entry

- User lands on the Claude-like home screen.
- Clicking the composer or `Try a guided demo` opens the guided demo picker.
- User selects either `Interview Preparation` or `Research Synthesis`.
- Selecting a demo sets selectedFlow.
- The corresponding predefined prompt is inserted into the composer.
- User should not be able to enter unrestricted freeform prompts.

### Chat Simulation

- The selected predefined prompt appears inside the Claude-style composer.
- User clicks the Claude-style upward arrow send button.
- The upward arrow send button displays the initial hardcoded Claude output for the selected flow.

### Generated Output

- User prompt appears as a chat message.
- Claude’s initial hardcoded response appears below it.
- A native-feeling post-response action row appears below the Claude response:
  - `Copy`
  - `Retry`
  - `Review with Reasoning Lens`
- Only `Review with Reasoning Lens` needs to be functional.

### Reasoning Lens

- Clicking `Review with Reasoning Lens` opens the Reasoning Lens panel.
- On desktop, the panel opens on the right side of the Claude response.
- On smaller screens, the panel may stack below the response.
- The original Claude response should remain visible while the panel is open.
- The six Reasoning Lens modules appear as expandable/collapsible module cards.
- `Assumptions` should be expanded by default.
- Clicking a collapsed module expands it.
- Clicking an expanded module collapses it.
- Multiple modules may be expanded at once.

### Gap-Aligned Improvement Actions

- The six improvement actions should appear below the Reasoning Lens modules.
- Each action should map to one specific Reasoning Lens module:
  - `Make assumptions explicit`
  - `Add missing context prompts`
  - `Mark uncertain parts`
  - `Strengthen the reasoning`
  - `Compare alternate angles`
  - `Show what I must decide`
- Clicking an action sets selectedAction.
- The selected action should be visually highlighted.
- For prototype simplicity, any selected action may lead to the same revised output state.
- The UI should still show which action was selected before displaying the revised output.

### Revised Output

- After an action is selected, show the revised Claude output.
- The revised output should appear as a follow-up Claude response in the same chat thread.
- Show the `What changed` card below or beside the revised output.
- Show the final reflection prompt after the `What changed` card.

## Data Structure

Store content in a local data object:

```js
const flows = {
  interview: {
    title,
    prompt,
    initialOutput,
    hiddenWeaknesses,
    lensCards: [
      {
        id,
        title,
        severity,
        explanation,
        bullets,
        question
      }
    ],
    actions: [
      {
        id,
        label,
        mapsToLensCard,
        whatItDoes,
        useWhen
      }
    ],
    revisedOutput,
    whatChanged,
    reflectionPrompt
  },
  research: {
    title,
    prompt,
    initialOutput,
    hiddenWeaknesses,
    lensCards: [
      {
        id,
        title,
        severity,
        explanation,
        bullets,
        question
      }
    ],
    actions: [
      {
        id,
        label,
        mapsToLensCard,
        whatItDoes,
        useWhen
      }
    ],
    revisedOutput,
    whatChanged,
    reflectionPrompt
  }
}
```


---

# 7. Technical Stack

## Required Stack

Use:

- React
- Vite
- JavaScript
- CSS modules or plain CSS
- Lucide React for icons, especially `ArrowUp`
- No backend
- No database

## Hosting Compatibility

The app must be compatible with Vercel static deployment.

## Recommended Setup

```bash
npm create vite@latest reasoning_lens_prototype -- --template react
cd reasoning_lens_prototype
npm install
npm install lucide-react
npm run dev
```

## Build Command

```bash
npm run build
```

## Vercel Settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

# 8. Design Language Specification

The prototype must visually follow the attached Claude screenshot as closely as possible.

The screenshot should be placed at `design/claude-ui-reference.png` in the project folder and treated as the primary visual reference. The written design specifications below exist to remove ambiguity, but the builder should also directly inspect the screenshot for layout, spacing, sidebar structure, composer shape, color tone, and overall visual feel.

## Overall Visual Direction

- dark Claude-style interface
- quiet, premium, minimal
- large empty space
- soft contrast
- rounded cards
- subtle borders
- warm accent color
- no bright saturated colors
- no harsh white backgrounds
- no blue SaaS dashboard look

## Layout Reference

The interface should be inspired by the attached Claude screen:

- dark full-page background
- fixed left sidebar
- main centered workspace
- dark input/composer card
- warm orange Claude-like accent
- muted gray text
- rounded buttons
- understated UI

## Color Tokens

Use these CSS variables:

```css
:root {
  --bg-main: #1b1b1a;
  --bg-sidebar: #252523;
  --bg-card: #2d2d2b;
  --bg-card-hover: #343432;
  --bg-input: #30302e;
  --border-subtle: #454542;
  --border-strong: #565650;

  --text-primary: #d6d1c7;
  --text-secondary: #aaa59c;
  --text-muted: #7f7b73;

  --accent: #d97757;
  --accent-hover: #e18668;
  --accent-soft: rgba(217, 119, 87, 0.14);

  --button-bg: #3a3a37;
  --button-bg-hover: #464641;
  --sidebar-active: #3b3b38;
}
```

## Screenshot-Derived Color Guidance

The attached screenshot appears to use approximately:

- main background: near `#1b1b1a`
- sidebar background: near `#252523`
- input/card background: near `#30302e`
- muted text: near `#aaa59c`
- primary text: near `#d6d1c7`
- Claude accent orange: near `#d97757`
- subtle borders: near `#454542`

These values should be used consistently across the app.

## Typography

Use system fonts with a Claude-like feel:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

For the large landing greeting/title, use a serif-like fallback to approximate Claude’s visual tone:

```css
font-family: Georgia, "Times New Roman", serif;
```

## Font Sizes

Minimum readable font size: `14px`.

Recommended:

- Sidebar text: `14px`
- Body text: `15px` or `16px`
- Card text: `15px`
- Small labels: `12px` only if non-critical
- Main title: `40px` to `52px`
- Section title: `20px` to `28px`

## Spacing

Use generous spacing.

Recommended:

- page padding: `24px`
- sidebar width: `300px`
- main content max width: `900px`
- card padding: `20px` to `28px`
- gap between cards: `16px` to `24px`
- border radius: `14px` to `22px`

## Sidebar

Sidebar requirements:

- fixed left sidebar
- width around `300px`
- background `var(--bg-sidebar)`
- border-right `1px solid var(--border-subtle)`
- rounded internal nav pills
- active item background `var(--sidebar-active)`
- muted inactive items
- bottom account/status area optional

Sidebar content:

- top small label/logo: `Claude`
- primary item: `Chat`
- primary item: `Cowork`
- primary item: `Claude`
- recent chat placeholder section with 3–5 muted items
- optional bottom account/status area

Do not use the sidebar as the main demo selector. Interview Preparation and Research Synthesis should be selected from the main chat composer flow, not from sidebar navigation.

## Main Workspace

Main area:

- margin-left equal to sidebar width
- background `var(--bg-main)`
- min-height `100vh`
- center content horizontally
- use plenty of empty space

## Cards

Card style:

```css
background: var(--bg-card);
border: 1px solid var(--border-subtle);
border-radius: 18px;
box-shadow: none;
```

Hover:

```css
background: var(--bg-card-hover);
border-color: var(--border-strong);
```

## Buttons

Primary button:

```css
background: var(--accent);
color: #1b1b1a;
border-radius: 12px;
font-weight: 600;
```

Secondary button:

```css
background: var(--button-bg);
color: var(--text-primary);
border: 1px solid var(--border-subtle);
border-radius: 12px;
```

Button hover:

```css
filter: brightness(1.06);
```

Composer send button:

- The send control should be an orange rounded square with an upward arrow icon, as shown in the attached Claude screenshot.
- Do not use a text label such as `Generate Claude Response` in the UI.
- Use an icon from `lucide-react`, preferably `ArrowUp`.
- Background should use `var(--accent)`.
- Icon color should be dark, preferably `#1b1b1a`.
- Button size should be approximately `36px x 36px`.
- Border radius should be approximately `10px` to `12px`.

## Reasoning Lens Panel

The Reasoning Lens panel should feel native, not like a separate dashboard.

When Reasoning Lens is open on desktop, use a two-column layout: conversation on the left, Reasoning Lens panel on the right.

Panel style:

- background `var(--bg-card)`
- border `1px solid var(--border-subtle)`
- border-radius `20px`
- cards inside panel should be slightly darker or same tone
- accent strip or icon can use `var(--accent)`

## Severity Labels

Use text labels, not aggressive colors.

Allowed labels:

- `Low attention`
- `Medium attention`
- `High attention`

Do not use:
- red danger badges
- green verified badges
- numerical scores
- correctness percentages

Severity label style:

```css
background: var(--accent-soft);
color: var(--text-primary);
border: 1px solid rgba(217, 119, 87, 0.28);
border-radius: 999px;
font-size: 12px;
```

## Accessibility And Readability

- Text must remain readable against dark background.
- Do not rely only on color to communicate state.
- Active states should use color + border + label.
- Minimum body font size should be `14px`.
- Avoid low-contrast gray for important content.

---

# 9. Copy Rules

## Tone

The copy should sound like Claude:

- calm
- precise
- thoughtful
- non-alarmist
- not salesy
- not gamified

## Avoid

Do not use phrases like:

- `AI Trust Score`
- `Verified Answer`
- `Correctness: 92%`
- `Safe to use`
- `Hallucination detected`
- `This answer is wrong`

## Prefer

Use phrases like:

- `Needs attention`
- `This may depend on missing context`
- `Claude assumed...`
- `You may want to decide...`
- `This part is stronger`
- `This part needs human judgment`

---

# 10. Acceptance Criteria

The prototype is complete when:

1. User can choose between Interview Prep and Research Synthesis from the Claude-style composer flow.
2. User can send a predefined prompt using the Claude-style upward arrow send button.
3. User can see the initial hardcoded Claude response for the selected flow.
4. User can see a native-feeling post-response action row with:
   - `Copy`
   - `Retry`
   - `Review with Reasoning Lens`
5. User can open Reasoning Lens from the post-response action row.
6. On desktop, Reasoning Lens opens as a right-side inspection panel while the original Claude response remains visible on the left.
7. User can view 6 expandable/collapsible evaluation modules.
8. The `Assumptions` module is expanded by default when Reasoning Lens opens.
9. User can select one of the six gap-aligned improvement actions.
10. User can see the revised output as a follow-up Claude response in the same chat thread.
11. User can see a `What changed` card and final reflection prompt.
12. The interface visually resembles the attached Claude screenshot.
13. The Claude reference screenshot is placed at `design/claude-ui-reference.png`.
14. The prototype is deployed to Vercel.
15. No backend/API/auth is required.
16. No generic trust score is shown anywhere.


---

# 11. Recommended File Structure

```txt
reasoning_lens_prototype/
  package.json
  index.html
  documents/
    spec.md
    architecture.md
  design/
    claude-ui-reference.png
  src/
    main.jsx
    App.jsx
    data/
      flows.js
    components/
      Sidebar.jsx
      ClaudeHome.jsx
      ChatSimulation.jsx
      ReasoningLensPanel.jsx
      ActionPanel.jsx
      RevisedOutput.jsx
    styles/
      globals.css
      layout.css
```


---

# 12. Implementation Notes For AI Coding Assistant

When building this prototype:

- prioritize pixel-level resemblance to the attached Claude screenshot
- place the Claude reference screenshot at `design/claude-ui-reference.png`
- use the exact color variables specified above
- keep all data hardcoded
- avoid adding extra features unless explicitly requested
- do not create sidebar-based demo navigation
- use composer-based demo selection only
- do not connect to external APIs
- do not add authentication
- do not use Tailwind unless asked
- keep the app deployable on Vercel
- ensure mobile responsiveness is acceptable, but desktop is primary
- preserve the product intent: assist human judgment, do not replace it
