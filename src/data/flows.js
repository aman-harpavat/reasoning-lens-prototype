const buildWhatChanged = (mappings, selectedActions) =>
  selectedActions.map((actionId) => mappings[actionId]).filter(Boolean);

const buildInterviewFinalOutput = ({ selectedActions }) => {
  const includeAssumptions = selectedActions.includes("makeAssumptionsVisible");
  const includeMissingDetails = selectedActions.includes("addMissingDetails");
  const includeCarefulParts = selectedActions.includes("markCarefulParts");

  return {
    heading: "A stronger answer could be:",
    paragraphs: [
      "I want to move into Product Management because I have realized that the part of my analytics work I enjoy most is not just finding insights, but turning those insights into better product and business decisions.",
      includeMissingDetails
        ? "In one analytics project, I found friction in a customer workflow, turned the analysis into product recommendations, and worked with stakeholders to improve the experience. That made the PM path feel more concrete to me because I saw how much I enjoyed connecting user problems, business impact, and execution."
        : "In my analytics work, I have often had to understand user behavior, diagnose problems through data, and translate insights into recommendations. That made the PM path feel more concrete to me because I enjoy connecting user problems, business impact, and execution.",
      "Product Management feels like the right next step because it lets me build on my analytical foundation while taking more ownership of problem discovery, prioritization, stakeholder alignment, and solution shaping.",
      "So for me, PM is not a random pivot. It is a move from analyzing outcomes to helping shape the product decisions that create those outcomes."
    ],
    assumptionsSection: includeAssumptions
      ? {
          title: "Assumptions this answer is relying on:",
          bullets: [
            "Your analytics work involved user, customer, or business problems.",
            "You can explain your contribution to the project clearly in follow-up questions.",
            "The target PM role values analytical thinking as a strength."
          ]
        }
      : null,
    cautionSection: includeCarefulParts
      ? {
          title: "Before using this, be careful with:",
          bullets: [
            "Do not claim stakeholder influence unless you can explain what you actually did.",
            "Replace any generic wording with your real project details wherever possible.",
            "Tailor the answer depending on whether the role is growth, platform, consumer, or B2B PM."
          ]
        }
      : null,
    whatChanged: buildWhatChanged(
      {
        makeAssumptionsVisible:
          "Made the assumptions behind the interview answer visible.",
        addMissingDetails:
          "Anchored the answer around a concrete analytics project and early-career PM role context.",
        markCarefulParts:
          "Highlighted parts that need tailoring or should not be overstated."
      },
      selectedActions
    ),
    reflectionPrompt:
      "Before using this answer, refine the project example so it reflects your actual experience and can be defended in follow-up interview questions."
  };
};

const buildResearchFinalOutput = ({ selectedActions }) => {
  const includeAssumptions = selectedActions.includes("makeAssumptionsVisible");
  const includeMissingDetails = selectedActions.includes("addMissingDetails");
  const includeCarefulParts = selectedActions.includes("markCarefulParts");

  return {
    heading: "A stronger synthesis is:",
    paragraphs: [
      "AI tools can improve critical thinking when they are used to expand a user’s thinking, but they can weaken critical thinking when they replace the user’s evaluation process.",
      includeMissingDetails
        ? "For a workplace team of early-career professionals using AI for writing, research, coding, and decision-making, the practical question is not whether AI is good or bad. The question is when it helps people think better and when it makes them over-rely on polished outputs."
        : "For early-career professionals, the practical question is not whether AI is good or bad. The question is when it helps people think better and when it makes them over-rely on polished outputs.",
      "AI helps most when users use it to generate alternative explanations, compare arguments, summarize unfamiliar material, or pressure-test their own reasoning. In those cases, AI acts as a thinking partner.",
      "The risk appears when users treat polished AI outputs as finished answers. Because AI responses often sound complete and confident, users may skip important evaluation steps: checking assumptions, looking for missing context, comparing viewpoints, or asking whether the answer applies to their situation.",
      "The impact also depends on task type and user expertise. AI may be relatively low-risk for drafting, but higher-risk for research, strategy, coding, career decisions, or workplace recommendations where weak reasoning can propagate into downstream work.",
      "The practical takeaway: AI is most valuable when users actively evaluate its outputs. It should be used to improve judgment, not bypass it."
    ],
    assumptionsSection: includeAssumptions
      ? {
          title: "Assumptions this synthesis is relying on:",
          bullets: [
            "The audience already has some familiarity with AI tools.",
            "The core issue is judgment quality, not only productivity.",
            "The synthesis is meant to guide practical workplace use rather than make a universal claim about AI."
          ]
        }
      : null,
    cautionSection: includeCarefulParts
      ? {
          title: "Before using this, be careful with:",
          bullets: [
            "Do not present these claims as universal without supporting evidence.",
            "Clarify whether the presentation is meant to inform, persuade, or recommend action.",
            "Add examples or citations if the synthesis will influence a real workplace decision."
          ]
        }
      : null,
    whatChanged: buildWhatChanged(
      {
        makeAssumptionsVisible:
          "Made the assumptions behind the synthesis visible.",
        addMissingDetails:
          "Adapted the synthesis to a workplace audience of early-career AI users.",
        markCarefulParts:
          "Marked claims that should not be treated as universally certain."
      },
      selectedActions
    ),
    reflectionPrompt:
      "Before using this synthesis, add supporting evidence, examples, or citations based on the audience and decision context."
  };
};

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
          "Claude made a few assumptions while turning your analytics background into a PM interview answer.",
        bullets: [
          "Assumes your analytics work involved user or customer-facing problems.",
          "Assumes you have worked with stakeholders beyond analysis delivery.",
          "Assumes you want PM for ownership and impact, not only career growth."
        ]
      },
      {
        id: "missing",
        title: "What’s missing",
        severity: "High attention",
        explanation:
          "The answer sounds polished, but it lacks the details that would make it specific to you.",
        bullets: [
          "No concrete project example.",
          "No target PM role or company context.",
          "No clear reason for why you want to switch now.",
          "Limited proof that you can think like a PM."
        ]
      },
      {
        id: "careful",
        title: "What to be careful about",
        severity: "Medium attention",
        explanation:
          "The answer may sound credible, but some parts could feel generic or hard to defend.",
        bullets: [
          "The phrase “intersection of users, business, and technology” is common and may sound rehearsed.",
          "Claims about stakeholder management should only be used if you can defend them.",
          "The answer needs tailoring depending on the company and PM role."
        ]
      }
    ],
    actions: [
      {
        id: "makeAssumptionsVisible",
        label: "Make assumptions visible",
        mapsToLensCard: "assumptions",
        mapsToLensCardLabel: "What Claude assumed",
        requiresInput: false,
        inputStateLabel: "No extra input needed",
        followUpQuestions: []
      },
      {
        id: "addMissingDetails",
        label: "Add missing details",
        mapsToLensCard: "missing",
        mapsToLensCardLabel: "What’s missing",
        requiresInput: true,
        inputStateLabel: "Needs your input",
        followUpQuestions: [
          {
            id: "anchor-experience",
            question:
              "To make this answer feel specific to you, which real experience should Claude anchor it around?",
            hardcodedResponse:
              "Use my analytics project where I found friction in a customer workflow, turned the analysis into product recommendations, and worked with stakeholders to improve the experience."
          },
          {
            id: "target-role",
            question:
              "What kind of PM role should this answer be shaped for?",
            hardcodedResponse:
              "Shape it for an Associate Product Manager or early-career PM role where analytical thinking, user empathy, and stakeholder management are important."
          }
        ]
      },
      {
        id: "markCarefulParts",
        label: "Mark parts to be careful with",
        mapsToLensCard: "careful",
        mapsToLensCardLabel: "What to be careful about",
        requiresInput: false,
        inputStateLabel: "No extra input needed",
        followUpQuestions: []
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
        id: "missing",
        title: "What’s missing",
        severity: "High attention",
        explanation:
          "The synthesis lacks source boundaries, audience context, and concrete examples.",
        bullets: [
          "No sources or evidence strength are mentioned.",
          "No distinction between writing, research, coding, and decision-making tasks.",
          "No workplace examples.",
          "No clarity on whether the goal is to inform, persuade, or recommend action."
        ]
      },
      {
        id: "careful",
        title: "What to be careful about",
        severity: "High attention",
        explanation:
          "The answer makes broad claims about critical thinking that should not be treated as universally certain.",
        bullets: [
          "Effects may differ for beginners and domain experts.",
          "Long-term effects on judgment are uncertain.",
          "The answer should not imply that AI always improves or always weakens thinking.",
          "The usefulness depends heavily on how actively the user evaluates the output."
        ]
      }
    ],
    actions: [
      {
        id: "makeAssumptionsVisible",
        label: "Make assumptions visible",
        mapsToLensCard: "assumptions",
        mapsToLensCardLabel: "What Claude assumed",
        requiresInput: false,
        inputStateLabel: "No extra input needed",
        followUpQuestions: []
      },
      {
        id: "addMissingDetails",
        label: "Add missing details",
        mapsToLensCard: "missing",
        mapsToLensCardLabel: "What’s missing",
        requiresInput: true,
        inputStateLabel: "Needs your input",
        followUpQuestions: [
          {
            id: "audience",
            question: "Who is this synthesis meant for?",
            hardcodedResponse:
              "It is for a workplace team of early-career professionals who already use AI tools for writing, research, coding, and decision-making."
          },
          {
            id: "decision-context",
            question:
              "What should this synthesis help them understand or decide?",
            hardcodedResponse:
              "It should help them understand when AI helps them think better, when it makes them over-rely on polished outputs, and how to evaluate AI responses before using them in real work."
          }
        ]
      },
      {
        id: "markCarefulParts",
        label: "Mark parts to be careful with",
        mapsToLensCard: "careful",
        mapsToLensCardLabel: "What to be careful about",
        requiresInput: false,
        inputStateLabel: "No extra input needed",
        followUpQuestions: []
      }
    ],
    finalOutputBuilder: buildResearchFinalOutput
  }
};

export const deriveRequiredQuestions = (flow, selectedActions) =>
  selectedActions
    .map((actionId) => flow.actions.find((action) => action.id === actionId))
    .filter((action) => action && action.requiresInput)
    .flatMap((action) => action.followUpQuestions);

export const buildFinalOutput = (flow, selectedActions, answeredQuestions) =>
  flow.finalOutputBuilder({ selectedActions, answeredQuestions });
