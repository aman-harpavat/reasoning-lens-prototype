export const flows = {
  interview: {
    title: "Interview Preparation",
    prompt:
      'Help me answer the interview question: "Why do you want to move into Product Management?" I am an early-career professional with analytics experience and want a strong answer for PM interviews.',
    initialOutput: [
      "A strong answer could be:",
      "I want to move into Product Management because I enjoy working at the intersection of users, business, and technology. In my analytics role, I have often worked on understanding user problems, identifying patterns in data, and translating insights into product or business recommendations. Over time, I realized that I do not just want to analyze problems after they occur — I want to help shape the solutions from the beginning.",
      "Product Management appeals to me because it combines structured problem-solving, customer empathy, stakeholder management, and execution. My analytics background gives me a strong foundation in data-driven decision-making, while my experience working with cross-functional teams has helped me understand how product decisions are made in real business contexts.",
      "I believe PM is a natural next step because it allows me to use my analytical strengths while developing broader ownership over strategy, user experience, and business outcomes."
    ],
    hiddenWeaknesses: [
      "too generic",
      "limited personal differentiation",
      "no concrete examples",
      "assumes analytics naturally leads to PM",
      "does not address why now",
      "does not mention target company or product area",
      "could sound rehearsed"
    ],
    lensCards: [
      {
        id: "assumptions",
        title: "Assumptions",
        severity: "Medium attention",
        explanation:
          "Claude assumed your analytics experience naturally translates into PM readiness.",
        bullets: [
          "Assumes you have worked directly with users or product teams.",
          "Assumes your motivation is product ownership, not just career growth.",
          "Assumes interviewers will value analytics as a PM foundation."
        ],
        question:
          "Can you add one real example where you influenced a product or user-facing decision?"
      },
      {
        id: "missing-context",
        title: "Missing Context",
        severity: "High attention",
        explanation:
          "The answer lacks details that would make it specific to you.",
        bullets: [
          "No concrete project example.",
          "No target company or product context.",
          "No mention of what kind of PM role you want.",
          "No explanation of why you want to switch now."
        ],
        question:
          "What specific PM role, company, or product area are you targeting?"
      },
      {
        id: "uncertainty",
        title: "Uncertainty",
        severity: "Medium attention",
        explanation:
          "The answer may work for some PM interviews but may sound generic in competitive interviews.",
        bullets: [
          "Strong structure, but low uniqueness.",
          "Safe wording, but limited personal signal.",
          "Could sound similar to many AI-generated PM answers."
        ],
        question:
          "Do you want this answer to sound safer, sharper, or more personal?"
      },
      {
        id: "reasoning-gaps",
        title: "Reasoning Gaps",
        severity: "High attention",
        explanation:
          "The answer explains why PM is attractive, but not why you are credible for PM.",
        bullets: [
          "It does not show product judgment.",
          "It does not show decision-making under ambiguity.",
          "It does not connect analytics work to ownership."
        ],
        question: "Which experience best proves you can think like a PM?"
      },
      {
        id: "alternative-perspectives",
        title: "Alternative Perspectives",
        severity: "Medium attention",
        explanation:
          "A stronger answer could be framed around user impact, business ownership, or product discovery.",
        bullets: [
          "User-impact framing: focus on solving customer problems.",
          "Business framing: focus on outcomes and prioritization.",
          "Personal-growth framing: focus on moving from insights to ownership."
        ],
        question: "Which angle feels most authentic to you?"
      },
      {
        id: "human-judgment-needed",
        title: "Human Judgment Needed",
        severity: "High attention",
        explanation:
          "Claude cannot know which story is most credible unless you choose the real experience behind the answer.",
        bullets: [
          "You should decide which project to anchor the answer around.",
          "You should ensure the answer sounds like your real voice.",
          "You should remove claims you cannot defend in follow-up questions."
        ],
        question:
          "Would you be comfortable defending every line of this answer in an interview?"
      }
    ],
    actions: [],
    revisedOutput: [],
    whatChanged: [],
    reflectionPrompt: ""
  },
  research: {
    title: "Research Synthesis",
    prompt:
      "Summarize the key arguments around whether AI tools improve or weaken critical thinking for early-career professionals. Make it concise and useful for a workplace presentation.",
    initialOutput: [
      "AI tools can both improve and weaken critical thinking among early-career professionals, depending on how they are used.",
      "On the positive side, AI can help users explore unfamiliar topics quickly, generate alternative perspectives, summarize complex material, and improve the quality of early drafts. This can accelerate learning and help professionals work through ambiguity faster.",
      "However, AI can also weaken critical thinking when users accept outputs passively. Because AI responses often sound confident and complete, users may skip deeper evaluation, fail to question assumptions, or rely on the tool before forming their own view. This is especially risky for early-career professionals who are still developing domain judgment.",
      "The key takeaway is that AI is most useful when treated as a thinking partner rather than a replacement for thinking. Users should use AI to generate ideas, pressure-test reasoning, and identify blind spots, while still applying their own judgment before taking action."
    ],
    hiddenWeaknesses: [
      "balanced but generic",
      "no evidence or source quality discussion",
      "lacks nuance by task type",
      "does not distinguish beginners from advanced users",
      "no concrete workplace examples",
      "no acknowledgment of conflicting research",
      "conclusion may feel obvious"
    ],
    lensCards: [
      {
        id: "assumptions",
        title: "Assumptions",
        severity: "Medium attention",
        explanation:
          "Claude assumed a balanced answer is more useful than a strongly argued point of view.",
        bullets: [
          "Assumes the audience wants neutrality.",
          "Assumes both benefits and risks are equally important.",
          "Assumes early-career professionals are the main concern."
        ],
        question:
          "Is your presentation meant to inform, persuade, or recommend action?"
      },
      {
        id: "missing-context",
        title: "Missing Context",
        severity: "High attention",
        explanation:
          "The synthesis lacks evidence boundaries and source context.",
        bullets: [
          "No sources or research basis are mentioned.",
          "No distinction between task types.",
          "No industry or workplace context.",
          "No examples of measurable impact."
        ],
        question:
          "What audience will use this synthesis, and what decision will it support?"
      },
      {
        id: "uncertainty",
        title: "Uncertainty",
        severity: "High attention",
        explanation:
          "The answer makes broad claims about critical thinking without showing where evidence is strong or weak.",
        bullets: [
          "Impact may differ for writing, coding, research, and decision-making.",
          "Effects may vary by user expertise.",
          "Long-term behavior change is uncertain."
        ],
        question:
          "Should the synthesis highlight evidence strength by claim?"
      },
      {
        id: "reasoning-gaps",
        title: "Reasoning Gaps",
        severity: "Medium attention",
        explanation:
          "The answer states that AI can help or harm thinking, but does not explain the mechanism deeply.",
        bullets: [
          "It does not explain how passive acceptance develops.",
          "It does not explain when AI improves reasoning.",
          "It does not separate productivity gains from judgment quality."
        ],
        question:
          "Should the revised version explain the mechanism behind the tradeoff?"
      },
      {
        id: "alternative-perspectives",
        title: "Alternative Perspectives",
        severity: "Medium attention",
        explanation:
          "There are at least three ways to frame the synthesis.",
        bullets: [
          "Optimistic: AI as a reasoning accelerator.",
          "Cautionary: AI as a dependency risk.",
          "Conditional: AI helps when users actively evaluate outputs."
        ],
        question:
          "Which framing is most useful for your presentation?"
      },
      {
        id: "human-judgment-needed",
        title: "Human Judgment Needed",
        severity: "High attention",
        explanation:
          "Claude cannot decide what level of nuance your audience needs.",
        bullets: [
          "You should decide whether to include limitations.",
          "You should decide whether the output needs evidence.",
          "You should decide how much uncertainty your audience can tolerate."
        ],
        question:
          "Will this output be used for learning, decision-making, or persuasion?"
      }
    ],
    actions: [],
    revisedOutput: [],
    whatChanged: [],
    reflectionPrompt: ""
  }
};
