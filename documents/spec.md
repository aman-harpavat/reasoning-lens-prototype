# Reasoning Lens Prototype Specification

## 0. Purpose Of This Document

This document defines the build spec for a high-fidelity web prototype of **Reasoning Lens**, a proposed native Claude feature.

The prototype remains a **controlled, hardcoded, interactive product simulation**. It must not use a real Claude API, backend, database, authentication, or freeform generation. The purpose is to demonstrate the product experience clearly and reliably for a graduation project submission.

## 1. Problem Statement

AI outputs can look polished and confident even when they rely on weak reasoning, hidden assumptions, missing context, or unsupported claims. Early-career knowledge workers often judge these outputs through fluency and confidence rather than actual reasoning quality.

Reasoning Lens should help users inspect AI outputs before relying on them, without replacing human judgment.

## 2. Solution

### Product Name

**Reasoning Lens**

### Product Type

A simulated native Claude feature shown through a static web prototype.

### Core Concept

Reasoning Lens opens after Claude generates an answer. It helps users inspect:

- what Claude assumed
- what is missing
- what to be careful about

The product should reduce cognitive overload by using **3 clear inspection areas**, not 6.

### Design Principle

Claude should help users think better, not act as the final authority.

## 3. Prototype Scope

### Required Flows

The prototype must support 2 complete guided flows:

1. `Interview Preparation`
2. `Research Synthesis`

Each flow must include:

- predefined prompt
- initial Claude output
- 3 Reasoning Lens inspection cards
- 3 aligned improvement actions
- optional follow-up questions only when missing details are selected
- deterministic final polished output

### Out Of Scope

Do not build:

- real Claude API integration
- login/signup
- backend
- database
- file upload
- payment
- generic chatbot
- generic trust score
- live internet research
- freeform prompt input

## 4. Information Architecture

### Left Sidebar

The app should feel like native Claude, not a custom dashboard. The sidebar remains visual/contextual only. It must not become the main place for flow selection.

### Main Workspace

The main workspace contains:

- centered Claude-style greeting
- Claude-style composer
- guided demo picker
- initial hardcoded Claude response
- `Review with Reasoning Lens` CTA
- right-side inspection panel
- follow-up question flow when required
- final revised Claude response in the same thread

### Demo Selection

The user selects the guided demo from the main composer flow, not from the sidebar.

## 5. Screen Specifications

## Screen 1 — Claude Home / Guided Demo Entry

The user lands on the Claude-like home screen, opens the guided demo picker from the composer, and chooses either `Interview Preparation` or `Research Synthesis`. The selected prompt is inserted into the composer. The user does not type a custom prompt.

## Screen 2 — Claude Chat Simulation

The selected prompt appears in the composer with the selected flow chip. The user clicks the Claude-style upward-arrow send button. Claude shows a short `Thinking...` state and then progressively renders the initial hardcoded response.

## Screen 3 — Generated Output

The thread shows:

- the user prompt
- Claude’s initial answer
- a post-response action row with:
  - `Copy`
  - `Retry`
  - `Review with Reasoning Lens`

Only `Review with Reasoning Lens` needs to be functional.

## Screen 5 — Reasoning Lens Panel

The Reasoning Lens panel opens beside the conversation on desktop and may stack below it on smaller screens.

Panel title:
`Reasoning Lens`

Panel subtitle:
`This does not decide for you. It helps you inspect the output before relying on it.`

Do not include:

- trust scores
- correctness badges
- safe-to-use labels

### Required Inspection Areas

Show exactly these 3 inspection cards:

1. `What Claude assumed`
2. `What’s missing`
3. `What to be careful about`

These replace the older 6-area structure.

### Interaction

- Cards are expandable/collapsible
- `What Claude assumed` is expanded by default
- Multiple cards may be expanded at once
- Cards contain only:
  - title
  - severity
  - explanation
  - bullets

Cards must **not** include vague end-of-card questions.

## Screen 5A — Interview Preparation Lens Content

### Card 1 — What Claude assumed

Severity:
`Medium attention`

Explanation:
`Claude made a few assumptions while turning your analytics background into a PM interview answer.`

Bullets:

- Assumes your analytics work involved user or customer-facing problems.
- Assumes you have worked with stakeholders beyond analysis delivery.
- Assumes you want PM for ownership and impact, not only career growth.

### Card 2 — What’s missing

Severity:
`High attention`

Explanation:
`The answer sounds polished, but it lacks the details that would make it specific to you.`

Bullets:

- No concrete project example.
- No target PM role or company context.
- No clear reason for why you want to switch now.
- Limited proof that you can think like a PM.

### Card 3 — What to be careful about

Severity:
`Medium attention`

Explanation:
`The answer may sound credible, but some parts could feel generic or hard to defend.`

Bullets:

- The phrase “intersection of users, business, and technology” is common and may sound rehearsed.
- Claims about stakeholder management should only be used if you can defend them.
- The answer needs tailoring depending on the company and PM role.

## Screen 5B — Research Synthesis Lens Content

### Card 1 — What Claude assumed

Severity:
`Medium attention`

Explanation:
`Claude assumed a balanced overview is the most useful format for your presentation.`

Bullets:

- Assumes the audience wants neutrality rather than a strong recommendation.
- Assumes benefits and risks should be weighted equally.
- Assumes early-career professionals are the main user group.

### Card 2 — What’s missing

Severity:
`High attention`

Explanation:
`The synthesis lacks source boundaries, audience context, and concrete examples.`

Bullets:

- No sources or evidence strength are mentioned.
- No distinction between writing, research, coding, and decision-making tasks.
- No workplace examples.
- No clarity on whether the goal is to inform, persuade, or recommend action.

### Card 3 — What to be careful about

Severity:
`High attention`

Explanation:
`The answer makes broad claims about critical thinking that should not be treated as universally certain.`

Bullets:

- Effects may differ for beginners and domain experts.
- Long-term effects on judgment are uncertain.
- The answer should not imply that AI always improves or always weakens thinking.
- The usefulness depends heavily on how actively the user evaluates the output.

## Screen 6 — Improvement Action Selection

Below the 3 inspection cards, show 3 multi-select improvement actions.

Use exactly this mapping:

```js
[
  {
    id: "assumptions",
    title: "What Claude assumed",
    actionId: "makeAssumptionsVisible",
    actionLabel: "Make assumptions visible",
    requiresInput: false
  },
  {
    id: "missing",
    title: "What’s missing",
    actionId: "addMissingDetails",
    actionLabel: "Add missing details",
    requiresInput: true
  },
  {
    id: "careful",
    title: "What to be careful about",
    actionId: "markCarefulParts",
    actionLabel: "Mark parts to be careful with",
    requiresInput: false
  }
]
```

### UI Behavior

- Actions are toggle cards or checkbox-style cards
- User can select one action
- User can select multiple actions
- User can select all three
- User can deselect selected actions
- `Continue` stays disabled until at least one action is selected

Each action card shows:

- label
- mapped Lens area
- whether extra input is needed

## Screen 7 — Conditional Follow-Up Questions And Final Output

### Case 1 — Only No-Input Actions Selected

If the selected actions are only:

- `makeAssumptionsVisible`
- `markCarefulParts`

then:

- do not ask follow-up questions
- show the final revised output immediately

### Case 2 — `addMissingDetails` Selected

If selected actions include `addMissingDetails`, then:

- ask only the hardcoded missing-detail questions for the active flow
- ask them one at a time in the same thread
- show the hardcoded response as a selectable user-style option
- after all required questions are answered, show the final revised output

### Interview Preparation Follow-Up Questions

Question 1:
`To make this answer feel specific to you, which real experience should Claude anchor it around?`

Hardcoded response:
`Use my analytics project where I found friction in a customer workflow, turned the analysis into product recommendations, and worked with stakeholders to improve the experience.`

Question 2:
`What kind of PM role should this answer be shaped for?`

Hardcoded response:
`Shape it for an Associate Product Manager or early-career PM role where analytical thinking, user empathy, and stakeholder management are important.`

### Research Synthesis Follow-Up Questions

Question 1:
`Who is this synthesis meant for?`

Hardcoded response:
`It is for a workplace team of early-career professionals who already use AI tools for writing, research, coding, and decision-making.`

Question 2:
`What should this synthesis help them understand or decide?`

Hardcoded response:
`It should help them understand when AI helps them think better, when it makes them over-rely on polished outputs, and how to evaluate AI responses before using them in real work.`

## 6. Functional Requirements

Use local React state only.

### Required State

- `selectedFlow`
- `isDemoPickerOpen`
- `hasPromptLoaded`
- `hasGeneratedOutput`
- `isLensOpen`
- `expandedLensCards`
- `selectedActions`
- `currentQuestionIndex`
- `requiredQuestions`
- `answeredQuestions`
- `isQuestionFlowActive`
- `showFinalOutput`

### Action Metadata Requirements

Each action must include:

```js
{
  id: "addMissingDetails",
  label: "Add missing details",
  mapsToLensCard: "missing",
  requiresInput: true,
  followUpQuestions: []
}
```

### Dynamic Question Derivation

Use a data-driven approach:

```js
requiredQuestions = selectedActions
  .map(actionId => actionMetadata[actionId])
  .filter(action => action.requiresInput)
  .flatMap(action => action.followUpQuestions)
```

This must support all 7 non-empty combinations of 3 actions without writing manual conditionals for every permutation.

### Final Output Builder

The final output must be built deterministically from:

1. base final answer per flow
2. conditional paragraph variant for `addMissingDetails`
3. optional assumptions section for `makeAssumptionsVisible`
4. optional caution section for `markCarefulParts`
5. dynamic `What changed` card based only on selected actions

The user must always see a complete polished answer, not disconnected snippets.

## 7. Technical Stack

Use:

- React
- Vite
- JavaScript
- plain CSS
- Lucide React for icons

The app must remain compatible with Vercel static deployment.

## 8. Design Language Specification

Preserve the existing Claude-native dark theme, sidebar, composer behavior, spacing rhythm, and Vercel compatibility. The new inspection and improvement flow must fit inside the established interface rather than introducing a new visual language.

## 9. Copy Rules

Use simple, understandable language. Avoid jargon-heavy inspection titles such as:

- Reasoning Gaps
- Human Judgment Needed
- Alternative Perspectives
- Confidence Calibration
- Epistemic uncertainty

The 3 inspection areas should be understandable to a normal user.

## 10. Acceptance Criteria

The prototype is complete when:

1. Only 3 Reasoning Lens areas are shown.
2. Lens area titles are simple and easy to understand.
3. Lens cards do not show questions.
4. User can select one action.
5. User can select multiple actions.
6. User can deselect actions.
7. `Continue` is disabled until at least one action is selected.
8. Selecting only `makeAssumptionsVisible` directly shows final output.
9. Selecting only `markCarefulParts` directly shows final output.
10. Selecting `addMissingDetails` asks only missing-detail questions.
11. Selecting `makeAssumptionsVisible + markCarefulParts` directly shows final output with both improvements.
12. Selecting `addMissingDetails + makeAssumptionsVisible` asks only missing-detail questions and includes both improvements in final output.
13. Selecting `addMissingDetails + markCarefulParts` asks only missing-detail questions and includes both improvements in final output.
14. Selecting all three actions asks only missing-detail questions and includes all three improvements in final output.
15. Final output is a complete polished answer, not disconnected text blocks.
16. The final `What changed` card only includes selected improvements.
17. Both Interview Preparation and Research Synthesis flows work.
18. The app still matches the Claude visual direction.
19. `npm run build` passes.

## 11. Recommended File Structure

```txt
reasoning_lens_prototype/
  package.json
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
      Composer.jsx
      DemoPicker.jsx
      MessageThread.jsx
      PostResponseActions.jsx
      ReasoningLensPanel.jsx
      LensModuleCard.jsx
      ActionPanel.jsx
      RevisedOutput.jsx
    styles/
      globals.css
      layout.css
```

## 12. Implementation Notes For AI Coding Assistant

- keep all content hardcoded
- do not add backend, APIs, auth, or database
- preserve Claude-native visuals
- preserve composer-based flow selection
- do not reintroduce a generic final output
- final output must always reflect the selected improvements
- use a deterministic builder rather than hardcoding all 7 final permutations
