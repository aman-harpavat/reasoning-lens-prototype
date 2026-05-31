# Reasoning Lens Prototype Specification

## 0. Purpose

This is the build spec for a high-fidelity Claude-native prototype of **Reasoning Lens**.

The prototype remains:

- hardcoded
- interactive
- frontend-only
- Vercel-compatible

Do not add live AI, backend, API calls, auth, database, or freeform generation.

## 1. Core Product Change

Reasoning Lens should no longer ask users to select broad improvement actions like:

- Make assumptions visible
- Add missing details
- Mark parts to be careful with

Instead, the inspection layer should work like this:

1. User opens Reasoning Lens.
2. Claude shows 3 inspection cards:
   - `What Claude assumed`
   - `What to be careful about`
   - `What’s missing`
3. The first two cards are purely informative.
4. The third card includes a CTA:
   - `Add more context`
5. Only clicking that CTA starts follow-up questions.
6. After those questions are answered, Claude generates a final improved answer.

Remove:

- action toggle cards
- continue button
- multi-select action logic
- What Changed block
- final reflection prompt

## 2. Required Flows

Support 2 guided flows:

1. `Interview Preparation`
2. `Research Synthesis`

Each must include:

- predefined prompt
- initial Claude answer
- 3 inspection cards
- hardcoded missing-context follow-up questions
- final improved answer only after context is added

## 3. Screen Behavior

## Claude Home

Keep the existing Claude-style home screen, composer flow, sidebar, and demo picker behavior.

## Claude Chat Simulation

Keep the existing send interaction, `Thinking...` delay, and progressive first-response rendering.

## Reasoning Lens Panel

When the user clicks `Review with Reasoning Lens`, open the side panel and show exactly 3 cards in this order:

1. `What Claude assumed`
2. `What to be careful about`
3. `What’s missing`

All 3 cards must remain open. They should not be collapsible.

The inspection layer should feel generated rather than dumped onto the screen, so the cards should reveal progressively after the panel opens.

Cards must contain only:

- title
- severity
- explanation
- bullets

Do not show question prompts at the end of the cards.

## Missing Context CTA

Only the `What’s missing` card contains:

Button:
`Add more context`

Microcopy:
`Claude can use a few extra details to rewrite this into a stronger answer.`

For the interview flow, use the flow-specific PM-transition version of that microcopy. For the research flow, use the audience/use-case version.

## Follow-Up Question Flow

After clicking `Add more context`:

- Claude asks one hardcoded question at a time in the same chat thread
- the response appears in the composer textbox only after the question finishes typing
- the user sends the response with the same orange arrow
- the sent response appears in the thread immediately
- then Claude shows `Thinking...`
- then the next question or final answer appears

## Final Improved Answer

After all missing-context questions are answered:

- show one polished final Claude response in the same thread
- do not show assumptions sections
- do not show caution sections
- do not show a What Changed block
- do not show a reflection prompt

## 4. Interview Preparation Content

### Inspection Cards

#### Card 1 — What Claude assumed

Severity:
`Medium attention`

Explanation:
`Claude assumed your analytics background naturally supports a PM transition, but that only works if the story shows product judgment.`

Bullets:

- Assumes your analytics work involved diagnosing user or customer behavior, not only reporting metrics.
- Assumes you can connect analysis to a product recommendation or decision.
- Assumes a data-heavy PM role is a credible target for your transition.

#### Card 2 — What to be careful about

Severity:
`Medium attention`

Explanation:
`The original answer sounds polished, but it can become risky if it overclaims ownership or stays too broad.`

Bullets:

- Do not say you owned the product change if you mainly identified and recommended it.
- Be specific about the user problem, not just the metric you analyzed.
- Avoid generic PM language like “intersection of users, business, and technology” unless it is backed by a concrete story.

#### Card 3 — What’s missing

Severity:
`High attention`

Explanation:
`The answer needs specific context before Claude can rewrite it into something meaningfully stronger.`

Bullets:

- A concrete analytics project.
- The user or customer problem behind the metric.
- The product recommendation you made.
- The type of PM role you are targeting.

CTA:
`Add more context`

Microcopy:
`Claude can use these details to rewrite the answer around a sharper PM transition story.`

### Follow-Up Questions

Question 1:
`What is one real analytics project that shows PM-like judgment, not just reporting?`

Hardcoded response:
`Use a project where I analyzed customer support enquiries about payments being stuck in “processing” for too long. The same generic status was shown even when payments were delayed or stuck between the sender and receiver bank, so customers did not know whether to wait, retry, or contact support. I broke down the payment journey, identified where the ambiguity was creating enquiry calls, and recommended clearer status messages plus proactive notifications for delayed or stuck payments.`

Question 2:
`What kind of PM role should this answer be shaped for?`

Hardcoded response:
`Shape it for a Data Product Manager role. I want the answer to show that my analytics background is directly relevant because Data PMs need to turn unclear data signals into product direction, measurement strategy, and better decision-making for teams.`

### Final Improved Answer

Heading:
`A stronger answer could be:`

Answer:

`I want to move into Product Management because the part of analytics I enjoy most is not just finding insights, but using those insights to shape better product decisions.`

`One project that made this clear involved customer support enquiries around payments being stuck in “processing” for too long. At first, the issue looked like a support-volume problem. But when I looked deeper, I saw that the same generic status was being shown even when payments were delayed or stuck between the sender and receiver bank. Customers did not know whether to wait, retry, or contact support, so the lack of clarity was creating unnecessary anxiety and enquiry calls.`

`I broke down the payment journey, identified where the ambiguity was happening, and recommended clearer status messages along with proactive notifications for delayed or stuck payments. That experience felt close to product work because the real problem was not just the metric. It was the user uncertainty behind the metric. The value came from translating an unclear data signal into a sharper user problem, a product recommendation, and a way to measure whether the experience improved.`

`That is why I am especially interested in Data Product Management. My analytics background aligns well with Data PM because the role requires turning ambiguous signals into product direction, defining the right success metrics, and helping teams make better decisions. I now want to move closer to where those decisions are framed and prioritized, rather than only analyzing the outcomes after the fact.`

`So for me, PM is not a generic career pivot. It is a focused move from measuring product and customer outcomes to helping shape the data-informed product decisions that create those outcomes.`

## 5. Research Synthesis Content

### Inspection Cards

#### Card 1 — What Claude assumed

Severity:
`Medium attention`

Explanation:
`Claude assumed a balanced overview is the most useful format for your presentation.`

Bullets:

- Assumes the audience wants neutrality rather than a strong recommendation.
- Assumes benefits and risks should be weighted equally.
- Assumes early-career professionals are the main user group.

#### Card 2 — What to be careful about

Severity:
`High attention`

Explanation:
`The answer makes broad claims about critical thinking that should not be treated as universally certain.`

Bullets:

- AI does not automatically improve or weaken thinking; the effect depends on how users evaluate outputs.
- The risk is not only hallucination, but also over-trusting fluent reasoning.
- The answer needs examples or evidence if it will be used in a formal workplace presentation.

#### Card 3 — What’s missing

Severity:
`High attention`

Explanation:
`The synthesis needs audience and usage context before Claude can make it more practical.`

Bullets:

- Who the presentation is for.
- How the audience currently uses AI.
- What behavior the synthesis should change.
- Whether the goal is to inform, persuade, or recommend action.

CTA:
`Add more context`

Microcopy:
`Claude can use these details to rewrite the synthesis for the actual audience and use case.`

### Follow-Up Questions

Question 1:
`Who is this synthesis meant for, and how are they using AI today?`

Hardcoded response:
`It is for a workplace team of early-career analysts, PMs, and engineers who already use AI to draft documents, summarize research, debug code, and prepare recommendations. They are productive with AI, but they do not have a consistent way to judge whether the output is actually good.`

Question 2:
`What should this synthesis help them do differently?`

Hardcoded response:
`It should help them stop treating polished AI responses as finished work. They should learn to check assumptions, missing context, evidence quality, and whether the answer fits the decision they are actually making.`

### Final Improved Answer

Heading:
`A stronger synthesis is:`

Answer:

`AI tools can improve critical thinking when they help users examine a problem from more angles. They can weaken critical thinking when users treat a polished response as if the thinking has already been done.`

`For a workplace team of early-career analysts, PMs, and engineers, this distinction matters because AI is already part of real work: drafting documents, summarizing research, debugging code, and preparing recommendations. The risk is not only that AI may be factually wrong. The deeper risk is that a fluent answer can make weak reasoning feel complete.`

`AI is most helpful when it keeps the user intellectually active. For example, it can help generate alternatives, challenge a first draft, summarize unfamiliar material, or compare possible explanations. In these cases, the user still has to judge whether the output is relevant, complete, and defensible.`

`AI is most harmful when it compresses the evaluation step. A user may read a structured, confident answer and skip the harder questions: What assumptions did this make? What context is missing? Is the evidence strong enough? Does this apply to my situation? What would make this wrong?`

`The effect also depends on the task. For low-risk drafting, AI may mainly improve speed. For research synthesis, coding, strategy, career decisions, or workplace recommendations, weak reasoning can propagate into real work if the user does not inspect the output carefully.`

`The practical takeaway is that AI should be used as a thinking partner, not as a substitute for judgment. The user’s job is not just to ask for an answer, but to evaluate whether the answer deserves to be used.`

## 6. Functional Requirements

Use local React state only.

Required state:

- `selectedFlow`
- `isDemoPickerOpen`
- `hasPromptLoaded`
- `hasGeneratedOutput`
- `isLensOpen`
- `isContextFlowActive`
- `currentContextQuestionIndex`
- `answeredContextQuestions`
- `showFinalOutput`
- `isGenerating`
- `isFollowupThinking`
- `pendingContextStep`

Behavior:

- Clicking `Add more context` sets `isContextFlowActive = true`
- Claude shows the first context question
- User sends the hardcoded response with the composer arrow
- Response is added to `answeredContextQuestions`
- Claude advances to the next question
- After all context questions are answered:
  - `isContextFlowActive = false`
  - `showFinalOutput = true`
  - final improved answer is rendered
- After the final improved answer appears:
  - the chat becomes read-only
  - the composer becomes the only restart path
  - clicking the composer resets the app back to the guided demo picker state

## 7. Acceptance Criteria

1. Reasoning Lens shows exactly 3 cards.
2. Card order is:
   - What Claude assumed
   - What to be careful about
   - What’s missing
3. All 3 cards are expanded by default.
4. Cards are always open and not collapsible.
5. First two cards do not show buttons.
6. Only What’s missing shows Add more context.
7. Clicking Add more context starts follow-up questions.
8. Interview flow asks the updated payment-processing/Data PM questions.
9. Research flow asks the updated workplace team/evaluation behavior questions.
10. What Changed block/card is removed.
11. Final reflection prompts are removed.
12. Final improved answer appears only after context questions are answered.
13. Final improved answer is polished and complete.
14. After the final improved answer appears, the chat becomes read-only and the composer resets the user back to the guided demo picker.
15. UI still matches Claude visual design.
16. `npm run build` passes.

## 8. Implementation Notes

- preserve the existing Claude-native visual design
- do not change the sidebar/composer architecture
- do not add backend or live AI
- only missing context should trigger follow-up questions
- the final improved answer should be shown only after context questions are answered
- after a completed demo, the composer should act as the restart entry point for another guided demo
