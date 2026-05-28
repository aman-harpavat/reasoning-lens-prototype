# Reasoning Lens Prototype Architecture

## 1. Product Summary

### What The Prototype Is

Reasoning Lens is a hardcoded, single-page React/Vite prototype that simulates a native Claude feature for inspecting polished AI outputs before relying on them. The experience is centered on a Claude-like chat workspace where the user chooses one of two guided demo flows, sends a predefined prompt, reviews a prewritten Claude response, opens a right-side Reasoning Lens inspection panel, selects a gap-aligned improvement action, and sees a revised follow-up response in the same thread.

The prototype is intended to communicate product intent, interaction flow, and visual fidelity. It should feel like a believable Claude workspace rather than a separate demo dashboard. All content, responses, evaluation modules, actions, and revised outputs are static and locally defined.

### What The Prototype Is Not

This prototype is not a real AI product implementation. It must not include:

- backend services
- API calls
- Claude integration
- authentication
- database storage
- live generation
- freeform prompt entry
- file upload
- scoring systems, trust meters, or verification badges
- extra demo flows beyond interview and research

It is also not a generic chatbot. The interface only supports guided, predefined flows that demonstrate the Reasoning Lens concept reliably.

## 2. User Flow

### Claude Home Screen

The user lands on a Claude-style dark workspace with a fixed left sidebar, a large centered greeting, subtle supporting microcopy, and a composer positioned near the lower center of the main area. The screen should visually resemble the provided Claude reference screenshot as closely as practical while using the product-specific greeting: `What can I help you think through today?`

### Composer-Based Guided Demo Selection

The composer acts as the entry point for demo selection. The placeholder should read `Click to choose a guided demo`. Clicking the composer, or an adjacent `Try a guided demo` affordance, opens a compact demo picker near the composer. The picker offers exactly two options:

- Interview Preparation
- Research Synthesis

This selection must happen in the main chat workspace, not in the sidebar.

### Predefined Prompt Insertion

Selecting a demo option closes the picker, sets the chosen flow, and inserts that flow’s predefined prompt into the composer. A subtle workflow chip near the composer indicates the selected flow. The composer remains controlled and static; the user cannot type arbitrary prompt text.

### Upward-Arrow Send Interaction

Once a predefined prompt is loaded, the user clicks a Claude-style rounded-square send button with an upward arrow icon. This is the only functional composer submission control. Clicking it transitions the main area from the home state into the chat simulation state and reveals the hardcoded initial output for the selected flow.

### Initial Claude Response

The chat thread shows the user prompt first, followed by the corresponding prewritten Claude response. The response should read as polished and credible, while the intentional weaknesses remain hidden from the interface at this stage.

### Post-Response Action Row

Below the Claude response, a native-feeling action row appears with:

- Copy
- Retry
- Review with Reasoning Lens

Only `Review with Reasoning Lens` is interactive. Supporting microcopy below or near the row explains that the user can inspect assumptions, uncertainty, missing context, and reasoning gaps before using the output.

### Reasoning Lens Right-Side Panel

Clicking `Review with Reasoning Lens` opens the Reasoning Lens panel. On desktop, the layout shifts into a two-column inspection view with the conversation on the left and the panel on the right. On smaller screens, the panel stacks below the thread. The original Claude response remains visible while the panel is open.

### Expandable/Collapsible Evaluation Modules

Inside the panel, the user sees six compact module cards:

- Assumptions
- Missing Context
- Uncertainty
- Reasoning Gaps
- Alternative Perspectives
- Human Judgment Needed

`Assumptions` is expanded by default. Users can expand or collapse any module. Multiple modules may remain open at the same time. Expanded content includes an explanation, 2 to 4 bullets, a severity label, and a user-facing question.

### Gap-Aligned Improvement Actions

Below the evaluation modules, an action section titled `Turn this review into a better answer` presents six improvement actions, each mapped to one module. Selecting an action highlights it and records the user’s chosen improvement path. For prototype simplicity, any action may reveal the same revised output state, but the selected action should remain visible so the UI still communicates intent and traceability.

### Revised Output As Same-Thread Follow-Up

After an action is selected, Claude displays a revised response as a follow-up assistant message in the same thread. The revised state also includes a `What changed` card and a final reflection prompt. This closing step reinforces that Reasoning Lens helps calibrate judgment and improve outputs, rather than scoring them.

## 3. Component Architecture

### `App.jsx`

Top-level composition root. Owns all shared prototype state, selects the active flow data, coordinates screen progression, and renders the global two-pane layout with the sidebar and main workspace.

### `Sidebar.jsx`

Static Claude-style sidebar shell. Renders the brand label, top navigation pills, muted recent chat placeholders, and optional bottom account/status area. It provides atmosphere only and does not control demo selection.

### `ClaudeHome.jsx`

Landing-state view for the main workspace before a response is generated. Renders the centered greeting, supporting microcopy, and composer area. Responsible for presenting the home-state version of the guided demo entry experience.

### `ChatSimulation.jsx`

Primary chat workspace controller once a flow is selected. Coordinates the prompt display, message thread, composer state, post-response actions, Reasoning Lens panel placement, and revised-output insertion without introducing backend behavior.

### `Composer.jsx`

Controlled composer UI used on both the home state and chat simulation state. Displays the placeholder or predefined prompt, the selected flow chip, the `Try a guided demo` trigger, and the Claude-style upward-arrow send button. Does not allow unrestricted text entry.

### `DemoPicker.jsx`

Compact popover or inline option row anchored to the composer. Lists exactly two guided demo choices with a title and description. On selection, passes the chosen flow back up so `App.jsx` can load the corresponding prompt and close the picker.

### `MessageThread.jsx`

Renders the chat conversation area in order: user prompt, initial Claude response, and optionally the revised Claude response. Keeps the prototype feeling like a single Claude thread rather than multiple screens or modals.

### `PostResponseActions.jsx`

Displays the native-feeling action row below the initial Claude response. Includes static `Copy` and `Retry` controls plus the functional `Review with Reasoning Lens` control and its supporting explanatory text.

### `ReasoningLensPanel.jsx`

Container for the right-side inspection experience. Renders the panel header, subtitle, list of lens modules, and the gap-aligned action section. Handles desktop side-panel presentation versus stacked mobile fallback through layout classes and CSS.

### `LensModuleCard.jsx`

Reusable expandable card for each Reasoning Lens module. Displays the title, severity label, explanation, bullets, and question. Accepts `expanded` and `onToggle` props so the parent can manage multi-expand behavior.

### `ActionPanel.jsx`

Renders the six improvement actions beneath the lens cards. Shows label, mapping context, `whatItDoes`, and `useWhen` copy. Handles selected-action highlighting and triggers the revised output state.

### `RevisedOutput.jsx`

Renders the follow-up Claude message plus the `What changed` summary and reflection prompt. This component is inserted into the same thread after an action is selected, preserving the feeling of a continuous conversation.

## 4. State Model

The prototype should use local React state only. The exact state variables are:

### `selectedFlow`

Type: `null | "interview" | "research"`

Tracks which guided demo flow the user selected. Determines which content object is read from `src/data/flows.js`.

### `isDemoPickerOpen`

Type: `boolean`

Controls visibility of the guided demo picker anchored to the composer.

### `hasPromptLoaded`

Type: `boolean`

Indicates whether a predefined prompt has been inserted into the composer after flow selection.

### `hasGeneratedOutput`

Type: `boolean`

Indicates whether the user has clicked the upward-arrow send button and the initial Claude response should be shown.

### `isLensOpen`

Type: `boolean`

Controls whether the Reasoning Lens panel is visible.

### `expandedLensCards`

Type: `string[]`

Stores the ids of currently expanded lens cards. Default should be `["assumptions"]` when the lens first opens. Supports multiple expanded cards simultaneously.

### `selectedAction`

Type: `null | "explicitAssumptions" | "missingContextPrompts" | "markUncertainty" | "strengthenReasoning" | "compareAngles" | "humanDecisionPoints"`

Tracks which improvement action is selected so the chosen action can be highlighted before and during the revised output state.

### `showRevisedOutput`

Type: `boolean`

Controls whether the revised Claude follow-up response, `What changed` card, and reflection prompt are rendered in the thread.

### Transient UI State

Implementation may also use a short-lived `isGenerating` UI flag to simulate Claude thinking for a couple of seconds before the hardcoded initial output appears. This is a presentation-only state and does not change the core static data model.

### State Progression Notes

- Initial state: `selectedFlow = null`, `isDemoPickerOpen = false`, `hasPromptLoaded = false`, `hasGeneratedOutput = false`, `isLensOpen = false`, `expandedLensCards = []`, `selectedAction = null`, `showRevisedOutput = false`
- After demo selection: `selectedFlow` is set, `hasPromptLoaded = true`, `isDemoPickerOpen = false`
- After send: `hasGeneratedOutput = true`
- After opening lens: `isLensOpen = true`, `expandedLensCards = ["assumptions"]` if not yet initialized
- After action selection: `selectedAction` is set and `showRevisedOutput = true`

## 5. Data Model

All content should live in `src/data/flows.js` as a single exported hardcoded object. The structure should support exactly two flows: interview and research.

```js
export const flows = {
  interview: {
    title: "Interview Preparation",
    prompt: "...",
    initialOutput: ["...", "..."],
    hiddenWeaknesses: ["...", "..."],
    lensCards: [
      {
        id: "assumptions",
        title: "Assumptions",
        severity: "Medium attention",
        explanation: "...",
        bullets: ["...", "..."],
        question: "..."
      }
    ],
    actions: [
      {
        id: "explicitAssumptions",
        label: "Make assumptions explicit",
        mapsToLensCard: "assumptions",
        whatItDoes: "...",
        useWhen: "..."
      }
    ],
    revisedOutput: ["...", "..."],
    whatChanged: ["...", "..."],
    reflectionPrompt: "..."
  },
  research: {
    title: "Research Synthesis",
    prompt: "...",
    initialOutput: ["...", "..."],
    hiddenWeaknesses: ["...", "..."],
    lensCards: [
      {
        id: "assumptions",
        title: "Assumptions",
        severity: "Medium attention",
        explanation: "...",
        bullets: ["...", "..."],
        question: "..."
      }
    ],
    actions: [
      {
        id: "explicitAssumptions",
        label: "Make assumptions explicit",
        mapsToLensCard: "assumptions",
        whatItDoes: "...",
        useWhen: "..."
      }
    ],
    revisedOutput: ["...", "..."],
    whatChanged: ["...", "..."],
    reflectionPrompt: "..."
  }
};
```

### Interview Flow

The interview flow contains the predefined PM interview prompt, the polished-but-generic initial answer, hidden weaknesses related to specificity and credibility, six interview-specific lens cards, six improvement actions, the revised interview answer, the interview-specific `What changed` bullets, and the final reflection prompt about replacing the generic project reference with a real example.

### Research Flow

The research flow contains the predefined research synthesis prompt, the balanced-but-generic initial answer, hidden weaknesses related to evidence and nuance, six research-specific lens cards, six improvement actions, the revised synthesis answer, the research-specific `What changed` bullets, and the final reflection prompt about adding evidence or examples for the target audience and decision context.

### Field Intent

- `prompt`: the predefined user prompt inserted into the composer
- `initialOutput`: the hardcoded Claude response shown after send
- `hiddenWeaknesses`: non-rendered reference content that explains why the initial output is imperfect
- `lensCards`: the six evaluation modules shown in the Reasoning Lens panel
- `actions`: the six gap-aligned improvement choices shown below the lens cards
- `revisedOutput`: the follow-up Claude response shown after action selection
- `whatChanged`: concise bullets explaining how the revised answer improved
- `reflectionPrompt`: final calibration prompt shown after the revised answer

## 6. Styling Architecture

The prototype should use plain CSS only. No Tailwind should be introduced. Styling should be organized around a small set of global CSS variables and layout/component class files that keep the visual system consistent with the Claude reference.

### CSS Approach

- plain CSS files imported into the React app
- global tokens defined once in `:root`
- layout-oriented classes for sidebar, workspace, thread, panel, and composer
- component-specific classes kept lightweight and predictable

### Global CSS Variables

The exact color tokens from `spec.md` should be used:

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

In addition to color tokens, the prototype should use a small shared typography and spacing scale rather than many one-off values. Keep the interface mostly within 3 to 4 font sizes and 3 to 4 spacing steps so the Claude-like UI feels quieter and more consistent.

### Claude-Style Dark Theme

The interface should stay quiet, minimal, and warm. The main background uses `--bg-main`, the sidebar uses `--bg-sidebar`, cards and the lens panel use `--bg-card`, and the composer uses `--bg-input`. Borders should be subtle and rounded, with no harsh drop shadows or bright dashboard colors. The accent is reserved for the send button and subtle emphasis states such as the lens CTA treatment and severity chips.

### Typography

System sans-serif should be used for the main interface. The large greeting may use a serif-like treatment to approximate Claude’s visual tone. Text sizing should follow the spec’s readable desktop-first scale, with body text at 15px to 16px and the hero greeting in the 40px to 52px range.

### Layout Strategy

The app is desktop-first:

- fixed left sidebar around 300px wide
- main workspace offset to account for sidebar width
- centered conversation column with generous whitespace
- Reasoning Lens as a desktop right-side panel within a two-column content area when open

### Responsive Fallback For Smaller Screens

On narrower widths, the sidebar can compress or remain fixed depending on available space, but the priority is maintaining a readable thread and composer. The Reasoning Lens panel should stack below the conversation rather than forcing an unusably narrow side-by-side layout. The composer and action controls should remain tappable, but desktop visual fidelity remains the primary target.

## 7. Implementation Stages

### Stage 1: Project Setup And File Structure

Confirm the Vite React structure, create the planned `src/components`, `src/data`, and `src/styles` folders, and add `documents/architecture.md`. No app behavior beyond scaffolding should be introduced here.

### Stage 2: Claude-Style Sidebar And Base Layout

Build the static app shell with `App.jsx`, `Sidebar.jsx`, and the main workspace container. Match the reference screenshot’s proportions, spacing, dark palette, and quiet overall composition before layering in flow logic.

### Stage 3: Claude Home Screen And Composer Demo Picker

Implement `ClaudeHome.jsx`, `Composer.jsx`, and `DemoPicker.jsx` with the centered greeting, supporting microcopy, composer placeholder, guided demo selection popover, predefined prompt loading, and the upward-arrow send affordance. Keep the composer controlled and non-freeform.

### Stage 4: Hardcoded Chat Flow Rendering

Add `ChatSimulation.jsx` and `MessageThread.jsx` to render the selected prompt and hardcoded initial Claude response for both flows. Ensure the thread reads like a real Claude conversation rather than a stepper or slideshow.

### Stage 5: Post-Response Action Row And Reasoning Lens Panel

Implement `PostResponseActions.jsx` and `ReasoningLensPanel.jsx`. Add the action row under the initial response and wire the `Review with Reasoning Lens` action to open the right-side inspection panel while preserving visibility of the original response.

### Stage 6: Expandable Lens Modules

Implement `LensModuleCard.jsx` and the `expandedLensCards` interaction model. Ensure `Assumptions` is expanded by default, multiple cards can stay open, and the modules feel lightweight and native instead of dashboard-heavy.

### Stage 7: Gap-Aligned Action Panel And Revised Output

Implement `ActionPanel.jsx` and `RevisedOutput.jsx`. Render the six mapped improvement actions, selected-action highlighting, and the revised Claude follow-up response with `What changed` and the reflection prompt.

### Stage 8: Visual Polish And Vercel Build Check

Refine spacing, typography, borders, hover states, and desktop resemblance to the Claude screenshot. Verify the static build with `npm run build` and make any final CSS adjustments needed for a clean Vercel deployment.

## 8. Testing Checklist

Manual verification should cover:

- Interview flow loads the correct prompt, initial output, lens content, actions, and revised output
- Research flow loads the correct prompt, initial output, lens content, actions, and revised output
- Composer-based selection is the only way to choose a demo flow
- Upward-arrow send button is the control that reveals the initial hardcoded output
- Reasoning Lens opens and closes correctly from the post-response action row
- `Assumptions` is expanded by default when Reasoning Lens first opens
- Lens modules can each be expanded and collapsed, with multiple allowed open
- Gap-aligned actions visually map to the six module categories and selection highlighting works
- Revised output appears as a same-thread follow-up Claude message
- No freeform prompt input is available anywhere in the composer
- No sidebar demo navigation exists for Interview Preparation or Research Synthesis
- Vercel build succeeds via `npm run build`

## 9. Architecture Change Log
