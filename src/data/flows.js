const buildInterviewFinalOutput = () => ({
  heading: "A stronger answer could be:",
  paragraphs: [
    "I want to move into Product Management because the part of analytics I enjoy most is not just finding insights, but using those insights to shape better product decisions.",
    "One project that made this clear involved customer support enquiries around payments being stuck in “processing” for too long. At first, the issue looked like a support-volume problem. But when I looked deeper, I saw that the same generic status was being shown even when payments were delayed or stuck between the sender and receiver bank. Customers did not know whether to wait, retry, or contact support, so the lack of clarity was creating unnecessary anxiety and enquiry calls.",
    "I broke down the payment journey, identified where the ambiguity was happening, and recommended clearer status messages along with proactive notifications for delayed or stuck payments. That experience felt close to product work because the real problem was not just the metric. It was the user uncertainty behind the metric. The value came from translating an unclear data signal into a sharper user problem, a product recommendation, and a way to measure whether the experience improved.",
    "That is why I am especially interested in Data Product Management. My analytics background aligns well with Data PM because the role requires turning ambiguous signals into product direction, defining the right success metrics, and helping teams make better decisions. I now want to move closer to where those decisions are framed and prioritized, rather than only analyzing the outcomes after the fact.",
    "So for me, PM is not a generic career pivot. It is a focused move from measuring product and customer outcomes to helping shape the data-informed product decisions that create those outcomes."
  ]
});

const buildResearchFinalOutput = () => ({
  heading: "A stronger synthesis is:",
  paragraphs: [
    "AI tools can improve critical thinking when they help users examine a problem from more angles. They can weaken critical thinking when users treat a polished response as if the thinking has already been done.",
    "For a workplace team of early-career analysts, PMs, and engineers, this distinction matters because AI is already part of real work: drafting documents, summarizing research, debugging code, and preparing recommendations. The risk is not only that AI may be factually wrong. The deeper risk is that a fluent answer can make weak reasoning feel complete.",
    "AI is most helpful when it keeps the user intellectually active. For example, it can help generate alternatives, challenge a first draft, summarize unfamiliar material, or compare possible explanations. In these cases, the user still has to judge whether the output is relevant, complete, and defensible.",
    "AI is most harmful when it compresses the evaluation step. A user may read a structured, confident answer and skip the harder questions: What assumptions did this make? What context is missing? Is the evidence strong enough? Does this apply to my situation? What would make this wrong?",
    "The effect also depends on the task. For low-risk drafting, AI may mainly improve speed. For research synthesis, coding, strategy, career decisions, or workplace recommendations, weak reasoning can propagate into real work if the user does not inspect the output carefully.",
    "The practical takeaway is that AI should be used as a thinking partner, not as a substitute for judgment. The user’s job is not just to ask for an answer, but to evaluate whether the answer deserves to be used."
  ]
});

export const flows = {
  interview: {
    id: "interview",
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
        title: "What Claude assumed",
        severity: "Medium attention",
        explanation:
          "Claude assumed your analytics background naturally supports a PM transition, but that only works if the story shows product judgment.",
        bullets: [
          "Assumes your analytics work involved diagnosing user or customer behavior, not only reporting metrics.",
          "Assumes you can connect analysis to a product recommendation or decision.",
          "Assumes a data-heavy PM role is a credible target for your transition."
        ]
      },
      {
        id: "careful",
        title: "What to be careful about",
        severity: "Medium attention",
        explanation:
          "The original answer sounds polished, but it can become risky if it overclaims ownership or stays too broad.",
        bullets: [
          "Do not say you owned the product change if you mainly identified and recommended it.",
          "Be specific about the user problem, not just the metric you analyzed.",
          "Avoid generic PM language like “intersection of users, business, and technology” unless it is backed by a concrete story."
        ]
      },
      {
        id: "missing",
        title: "What’s missing",
        severity: "High attention",
        explanation:
          "The answer needs specific context before Claude can rewrite it into something meaningfully stronger.",
        bullets: [
          "A concrete analytics project.",
          "The user or customer problem behind the metric.",
          "The product recommendation you made.",
          "The type of PM role you are targeting."
        ],
        ctaLabel: "Add more context",
        ctaMicrocopy:
          "Claude can use these details to rewrite the answer around a sharper PM transition story."
      }
    ],
    contextQuestions: [
      {
        id: "project-story",
        question:
          "What is one real analytics project that shows PM-like judgment, not just reporting?",
        hardcodedResponse:
          "Use a project where I analyzed customer support enquiries about payments being stuck in “processing” for too long. The same generic status was shown even when payments were delayed or stuck between the sender and receiver bank, so customers did not know whether to wait, retry, or contact support. I broke down the payment journey, identified where the ambiguity was creating enquiry calls, and recommended clearer status messages plus proactive notifications for delayed or stuck payments."
      },
      {
        id: "role-shaping",
        question:
          "What kind of PM role should this answer be shaped for?",
        hardcodedResponse:
          "Shape it for a Data Product Manager role. I want the answer to show that my analytics background is directly relevant because Data PMs need to turn unclear data signals into product direction, measurement strategy, and better decision-making for teams."
      }
    ],
    finalOutputBuilder: buildInterviewFinalOutput
  },
  research: {
    id: "research",
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
        title: "What Claude assumed",
        severity: "Medium attention",
        explanation:
          "Claude assumed a balanced overview is the most useful format for your presentation.",
        bullets: [
          "Assumes the audience wants neutrality rather than a strong recommendation.",
          "Assumes benefits and risks should be weighted equally.",
          "Assumes early-career professionals are the main user group."
        ]
      },
      {
        id: "careful",
        title: "What to be careful about",
        severity: "High attention",
        explanation:
          "The answer makes broad claims about critical thinking that should not be treated as universally certain.",
        bullets: [
          "AI does not automatically improve or weaken thinking; the effect depends on how users evaluate outputs.",
          "The risk is not only hallucination, but also over-trusting fluent reasoning.",
          "The answer needs examples or evidence if it will be used in a formal workplace presentation."
        ]
      },
      {
        id: "missing",
        title: "What’s missing",
        severity: "High attention",
        explanation:
          "The synthesis needs audience and usage context before Claude can make it more practical.",
        bullets: [
          "Who the presentation is for.",
          "How the audience currently uses AI.",
          "What behavior the synthesis should change.",
          "Whether the goal is to inform, persuade, or recommend action."
        ],
        ctaLabel: "Add more context",
        ctaMicrocopy:
          "Claude can use these details to rewrite the synthesis for the actual audience and use case."
      }
    ],
    contextQuestions: [
      {
        id: "audience-usage",
        question:
          "Who is this synthesis meant for, and how are they using AI today?",
        hardcodedResponse:
          "It is for a workplace team of early-career analysts, PMs, and engineers who already use AI to draft documents, summarize research, debug code, and prepare recommendations. They are productive with AI, but they do not have a consistent way to judge whether the output is actually good."
      },
      {
        id: "behavior-change",
        question:
          "What should this synthesis help them do differently?",
        hardcodedResponse:
          "It should help them stop treating polished AI responses as finished work. They should learn to check assumptions, missing context, evidence quality, and whether the answer fits the decision they are actually making."
      }
    ],
    finalOutputBuilder: buildResearchFinalOutput
  }
};

export const buildFinalOutput = (flow, answeredContextQuestions) =>
  flow.finalOutputBuilder({ answeredContextQuestions });
