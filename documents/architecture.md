# Reasoning Lens Prototype Architecture

## 1. Product Summary

### What The Prototype Is

Reasoning Lens is a hardcoded React/Vite prototype that simulates a native Claude inspection flow for high-stakes AI outputs. The user selects a guided demo, sends a predefined prompt, reviews Claude’s initial answer, opens a right-side Reasoning Lens panel, selects one or more improvement actions, optionally answers hardcoded follow-up questions, and then sees a polished final answer in the same thread.

### What The Prototype Is Not

This prototype is not a live AI system. It does not include:

- backend services
- API calls
- authentication
- database storage
- freeform prompt generation
- manual prompt stitching
- generic trust scores

Everything remains static, deterministic, and demo-safe.

## 2. User Flow

### Claude Home Screen

The user lands on a Claude-style workspace with a fixed sidebar, centered greeting, and controlled composer.

### Composer-Based Guided Demo Selection

The user clicks the composer, chooses either `Interview Preparation` or `Research Synthesis`, and the corresponding hardcoded prompt is inserted.

### Predefined Prompt Insertion

The selected flow appears in a subtle chip near the composer. The prompt itself is non-editable and static.

### Upward-Arrow Send Interaction

The user clicks the Claude-style upward-arrow button. A short `Thinking...` state appears, then Claude’s initial hardcoded response is revealed progressively in the thread.

### Initial Claude Response

Claude’s first answer is intentionally polished but imperfect. The user sees only the answer, not the hidden reasoning weaknesses.

### Post-Response Action Row

Below the answer, the user sees `Copy`, `Retry`, and `Review with Reasoning Lens`. Only `Review with Reasoning Lens` is functional.

### Reasoning Lens Right-Side Panel

The panel opens beside the thread on desktop and stacks below on smaller screens. The original answer remains visible.

### Three Inspection Areas

The panel contains exactly three expandable inspection cards:

- `What Claude assumed`
- `What’s missing`
- `What to be careful about`

`What Claude assumed` is expanded by default when the panel first opens. Each card contains:

- title
- severity
- explanation
- bullets

Cards no longer include question prompts.

### Multi-Select Improvement Actions

Below the inspection cards, the user can multi-select one or more action cards:

- `Make assumptions visible`
- `Add missing details`
- `Mark parts to be careful with`

Selections are toggle-based. The user can select one, multiple, or all three. `Continue` stays disabled until at least one action is selected.

### Conditional Follow-Up Question Flow

If the selected actions include only `makeAssumptionsVisible` and/or `markCarefulParts`, Claude skips questions and goes directly to the final output.

If the selection includes `addMissingDetails`, the thread enters a question flow. Claude asks only the missing-detail questions for the active flow, one at a time. The user clicks the hardcoded response option to continue.

### Final Revised Output

After required questions are answered, Claude shows one complete polished follow-up answer in the same thread. The final output includes:

- a revised answer heading
- the full revised response
- an optional assumptions section
- an optional caution section
- a `What changed` card based only on selected actions
- a final reflection prompt

## 3. Component Architecture

### `App.jsx`

Top-level state owner. Manages flow selection, generation timing, Reasoning Lens visibility, multi-select action state, follow-up question state, and final output state.

### `Sidebar.jsx`

Static Claude-style visual shell. Provides context only.

### `ClaudeHome.jsx`

Renders the greeting and home-state composer flow before any response is generated.

### `ChatSimulation.jsx`

Coordinates the thread, composer, and right-side inspection panel after the user sends a prompt.

### `Composer.jsx`

Controlled composer for guided-demo selection and send interaction. No freeform text input.

### `DemoPicker.jsx`

Renders the two guided demo options and notifies `App.jsx` when one is selected.

### `MessageThread.jsx`

Renders:

- user prompt
- initial Claude response
- post-response action row
- follow-up question messages
- hardcoded user responses
- final revised output

This keeps the entire flow inside one chat thread.

### `PostResponseActions.jsx`

Renders the native-feeling action row under the initial Claude answer.

### `ReasoningLensPanel.jsx`

Renders the panel header, the three inspection cards, and the multi-select action area. Receives selection state and callbacks from `App.jsx`.

### `LensModuleCard.jsx`

Reusable expandable inspection card for the three Lens areas.

### `ActionPanel.jsx`

Renders the three toggle-style improvement actions plus the `Continue` button. Reflects whether extra input is needed for each action.

### `RevisedOutput.jsx`

Renders the final revised Claude output, optional assumptions/caution sections, dynamic `What changed` card, and reflection prompt.

## 4. State Model

The prototype uses local React state only.

### `selectedFlow`

Type: `null | "interview" | "research"`

Tracks the active guided demo flow.

### `isDemoPickerOpen`

Type: `boolean`

Controls the guided demo picker.

### `hasPromptLoaded`

Type: `boolean`

Tracks whether the selected prompt is loaded into the composer.

### `hasGeneratedOutput`

Type: `boolean`

Controls whether the initial Claude answer should be rendered.

### `isLensOpen`

Type: `boolean`

Controls the right-side Reasoning Lens panel.

### `expandedLensCards`

Type: `string[]`

Stores which of the three inspection cards are expanded. Defaults to `["assumptions"]` when the panel first opens.

### `selectedActions`

Type: `string[]`

Stores the currently selected improvement actions. Replaces the older single-action model.

### `currentQuestionIndex`

Type: `number`

Tracks the active question in the follow-up flow.

### `requiredQuestions`

Type: `Array<Question>`

Derived from the selected actions that require input. In this prototype, only `addMissingDetails` contributes questions.

### `answeredQuestions`

Type: `Array<Question>`

Stores the hardcoded follow-up questions that the user has already accepted responses for.

### `isQuestionFlowActive`

Type: `boolean`

Controls whether the thread is currently showing follow-up questions.

### `showFinalOutput`

Type: `boolean`

Controls whether the deterministic polished final output appears in the thread.

### Transient UI State

- `isGenerating`: short-lived visual state used to show `Thinking...` before the initial answer appears.

## 5. Data Model

All flow content lives in `src/data/flows.js`.

```js
export const flows = {
  interview: {
    id,
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
        bullets
      }
    ],
    actions: [
      {
        id,
        label,
        mapsToLensCard,
        mapsToLensCardLabel,
        requiresInput,
        inputStateLabel,
        followUpQuestions: [
          {
            id,
            question,
            hardcodedResponse
          }
        ]
      }
    ],
    finalOutputBuilder
  }
};

export const deriveRequiredQuestions = (flow, selectedActions) => ...
export const buildFinalOutput = (flow, selectedActions, answeredQuestions) => ...
```

### Flow Content

Each flow defines:

- exactly 3 inspection cards
- exactly 3 aligned improvement actions
- flow-specific follow-up questions for `addMissingDetails`
- a deterministic final-output builder

### Final Output Builder

The builder does not brute-force all 7 action combinations. Instead it uses:

- base paragraphs per flow
- a conditional paragraph variant for `addMissingDetails`
- an optional assumptions section for `makeAssumptionsVisible`
- an optional caution section for `markCarefulParts`
- a dynamic `What changed` list filtered by `selectedActions`

## 6. Styling Architecture

The app continues to use plain CSS, the existing Claude-style dark theme, and the shared global type/spacing tokens. The new Stage 7 flow adds:

- toggle-style action cards
- a disabled/enabled `Continue` button
- in-thread follow-up question cards
- polished final output sections

No Tailwind, API-driven UI, or extra design systems are introduced.

## 7. Implementation Stages

### Stage 1: Project Setup And File Structure

Scaffold Vite/React structure and placeholder files.

### Stage 2: Claude-Style Sidebar And Base Layout

Build the static app shell and base theme.

### Stage 3: Claude Home Screen And Composer Demo Picker

Implement guided demo selection and prompt loading.

### Stage 4: Hardcoded Chat Flow Rendering

Implement send behavior, `Thinking...`, and initial Claude outputs.

### Stage 5: Post-Response Action Row And Reasoning Lens Panel

Add the review CTA and right-side panel shell.

### Stage 6: Expandable Lens Modules

Make inspection cards expandable and collapsible.

### Stage 7: Simplified Three-Area Improvement Flow

Refactor the Lens to 3 inspection areas, add multi-select actions, introduce conditional follow-up questions, and render deterministic polished final output in the thread.

### Stage 8: Visual Polish And Vercel Build Check

Final polish, responsive checks, and build verification.

## 8. Testing Checklist

- Only 3 Reasoning Lens areas are shown
- Lens area titles are simple and easy to understand
- Lens cards do not show questions
- User can select one action
- User can select multiple actions
- User can deselect actions
- `Continue` is disabled until at least one action is selected
- Selecting only `makeAssumptionsVisible` directly shows final output
- Selecting only `markCarefulParts` directly shows final output
- Selecting `addMissingDetails` asks only missing-detail questions
- Selecting `makeAssumptionsVisible` and `markCarefulParts` directly shows final output with both improvements
- Selecting `addMissingDetails` with either or both other actions asks only missing-detail questions and includes all selected improvements in final output
- All 7 non-empty action combinations work through the same data-driven logic
- Final output is one polished answer, not disconnected snippets
- The `What changed` card only includes selected improvements
- Both interview and research flows work
- The app still matches the Claude-native visual direction
- `npm run build` succeeds

## 9. Architecture Change Log

- Reduced Reasoning Lens from six areas to three clearer areas and updated improvement actions to support multi-select, conditional follow-up questions, and deterministic polished final output generation.
