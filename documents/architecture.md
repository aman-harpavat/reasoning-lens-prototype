# Reasoning Lens Prototype Architecture

## 1. Product Summary

Reasoning Lens is a hardcoded Claude-style prototype for inspecting high-stakes AI outputs. The user selects a guided flow, sends a predefined prompt, opens Reasoning Lens, reads three inspection cards, optionally adds missing context through hardcoded follow-up questions, and then sees a stronger final answer in the same thread.

This is not a live AI product. There is no backend, API, auth, database, or freeform generation.

## 2. User Flow

### Claude Home Screen

The user lands on a Claude-like workspace with a fixed sidebar, centered greeting, and controlled composer.

### Guided Demo Selection

The user chooses `Interview Preparation` or `Research Synthesis` from the composer flow. The predefined prompt is inserted into the composer.

### Initial Claude Response

The user sends the prompt with the upward-arrow button. Claude shows `Thinking...` and then progressively renders the initial hardcoded answer.

### Reasoning Lens Inspection

The user opens `Review with Reasoning Lens`. The right-side panel shows exactly three inspection cards, in this order:

1. `What Claude assumed`
2. `What to be careful about`
3. `What’s missing`

All three are expanded by default. Cards remain collapsible. Cards contain only:

- title
- severity
- explanation
- bullets

Only `What’s missing` includes a CTA:

- `Add more context`

with supporting microcopy.

### Context Question Flow

Clicking `Add more context` starts the only follow-up flow in the prototype. Claude asks hardcoded missing-context questions one at a time in the same thread. The matching hardcoded response appears in the composer and is sent with the same orange arrow.

After each sent response:

- the user reply appears in the thread immediately
- Claude shows `Thinking...`
- the next question or final answer appears

### Final Improved Answer

After all context questions are answered, Claude generates one complete improved answer in the same thread. No `What Changed` block and no final reflection prompt are shown.

## 3. Component Architecture

### `App.jsx`

Owns the full prototype state, including flow selection, generation timing, Reasoning Lens visibility, context-question progression, and final output visibility.

### `Sidebar.jsx`

Static Claude-style sidebar shell.

### `ClaudeHome.jsx`

Home-state greeting and guided-demo entry.

### `ChatSimulation.jsx`

Coordinates the thread, panel, composer reuse, and question-response timing in the chat state.

### `Composer.jsx`

Controlled composer used for both initial prompt sending and hardcoded context-response sending.

### `DemoPicker.jsx`

Renders the two guided demo options.

### `MessageThread.jsx`

Renders:

- user prompt
- initial Claude response
- post-response action row
- follow-up context questions
- user context responses
- final improved Claude answer

### `PostResponseActions.jsx`

Renders the review CTA below the initial Claude output.

### `ReasoningLensPanel.jsx`

Renders the panel header and the three inspection cards. No multi-select action UI remains.

### `LensModuleCard.jsx`

Reusable inspection card. Supports the `Add more context` CTA on the `What’s missing` card only.

### `RevisedOutput.jsx`

Renders the final improved Claude answer with progressive reveal.

## 4. State Model

The prototype uses local React state only.

### `selectedFlow`

Type: `null | "interview" | "research"`

### `isDemoPickerOpen`

Type: `boolean`

### `hasPromptLoaded`

Type: `boolean`

### `hasGeneratedOutput`

Type: `boolean`

### `isLensOpen`

Type: `boolean`

### `expandedLensCards`

Type: `string[]`

Default:

```js
["assumptions", "careful", "missing"]
```

### `isContextFlowActive`

Type: `boolean`

Starts when the user clicks `Add more context`.

### `currentContextQuestionIndex`

Type: `number`

Tracks which missing-context question Claude is currently asking.

### `answeredContextQuestions`

Type: `Array<Question>`

Stores the hardcoded context questions that have already been answered.

### `showFinalOutput`

Type: `boolean`

Becomes `true` only after all context questions are answered.

### Transient UI State

- `isGenerating`
- `isFollowupThinking`

These drive Claude-style `Thinking...` delays.

## 5. Data Model

All content lives in `src/data/flows.js`.

Each flow contains:

- `title`
- `prompt`
- `initialOutput`
- `hiddenWeaknesses`
- `lensCards`
- `contextQuestions`
- `finalOutputBuilder`

Example shape:

```js
{
  lensCards: [
    {
      id,
      title,
      severity,
      explanation,
      bullets,
      ctaLabel?,
      ctaMicrocopy?
    }
  ],
  contextQuestions: [
    {
      id,
      question,
      hardcodedResponse
    }
  ],
  finalOutputBuilder
}
```

The final output builder returns one complete improved answer. It no longer adds assumptions sections, caution sections, `What Changed`, or reflection prompts.

## 6. Styling Architecture

The prototype continues to use:

- plain CSS
- existing Claude-style dark theme
- existing global color tokens
- shared global type and spacing tokens

The new flow preserves the established visual design and only changes interaction structure and hardcoded content.

## 7. Implementation Stages

### Stage 1

Project scaffolding.

### Stage 2

Claude-style shell and layout.

### Stage 3

Guided demo picker and prompt loading.

### Stage 4

Initial hardcoded chat flow and progressive first response.

### Stage 5

Review CTA and right-side Lens panel shell.

### Stage 6

Expandable inspection cards.

### Stage 7

Inspection-first Reasoning Lens flow:

- no selectable improvement actions
- only missing context triggers follow-up questions
- final improved answer appears after context questions are answered

### Stage 8

Final polish and build verification.

## 8. Testing Checklist

- Reasoning Lens shows exactly 3 cards
- Card order is:
  - `What Claude assumed`
  - `What to be careful about`
  - `What’s missing`
- All 3 cards are expanded by default
- First two cards do not show buttons
- Only `What’s missing` shows `Add more context`
- Clicking `Add more context` starts follow-up questions
- Interview flow asks the updated payments/Data PM questions
- Research flow asks the updated workplace team/evaluation questions
- No `What Changed` block is shown
- No final reflection prompt is shown
- Final improved answer appears only after context questions are answered
- Final improved answer is polished and complete
- UI still matches Claude visual direction
- `npm run build` passes

## 9. Architecture Change Log

- Simplified Reasoning Lens from selectable improvement actions to an inspection-first flow: assumptions and cautions are shown directly, only missing context triggers follow-up questions, and the final rewritten answer no longer includes a What Changed block or final reflection prompt.
