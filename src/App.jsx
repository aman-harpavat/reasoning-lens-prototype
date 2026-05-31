import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ClaudeHome from "./components/ClaudeHome";
import ChatSimulation from "./components/ChatSimulation";
import { buildFinalOutput, deriveRequiredQuestions, flows } from "./data/flows";

function App() {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [isDemoPickerOpen, setIsDemoPickerOpen] = useState(false);
  const [hasPromptLoaded, setHasPromptLoaded] = useState(false);
  const [hasGeneratedOutput, setHasGeneratedOutput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLensOpen, setIsLensOpen] = useState(false);
  const [expandedLensCards, setExpandedLensCards] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [requiredQuestions, setRequiredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isQuestionFlowActive, setIsQuestionFlowActive] = useState(false);
  const [isFollowupThinking, setIsFollowupThinking] = useState(false);
  const [showFinalOutput, setShowFinalOutput] = useState(false);
  const [pendingFollowupStep, setPendingFollowupStep] = useState(null);

  const activeFlow = selectedFlow ? flows[selectedFlow] : null;
  const finalOutput =
    activeFlow && showFinalOutput
      ? buildFinalOutput(activeFlow, selectedActions, answeredQuestions)
      : null;

  useEffect(() => {
    if (!isGenerating) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setHasGeneratedOutput(true);
      setHasPromptLoaded(false);
      setIsGenerating(false);
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isGenerating]);

  useEffect(() => {
    if (!pendingFollowupStep) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (pendingFollowupStep.type === "show-final") {
        setCurrentQuestionIndex(0);
        setRequiredQuestions([]);
        setAnsweredQuestions([]);
        setIsQuestionFlowActive(false);
        setShowFinalOutput(true);
      }

      if (pendingFollowupStep.type === "start-question-flow") {
        setRequiredQuestions(pendingFollowupStep.questions);
        setAnsweredQuestions([]);
        setCurrentQuestionIndex(0);
        setIsQuestionFlowActive(true);
        setShowFinalOutput(false);
      }

      if (pendingFollowupStep.type === "advance-question-flow") {
        setAnsweredQuestions(pendingFollowupStep.answered);
        setCurrentQuestionIndex(pendingFollowupStep.nextIndex);
        setIsQuestionFlowActive(true);
        setShowFinalOutput(false);
      }

      if (pendingFollowupStep.type === "finish-question-flow") {
        setAnsweredQuestions(pendingFollowupStep.answered);
        setCurrentQuestionIndex(pendingFollowupStep.nextIndex);
        setIsQuestionFlowActive(false);
        setShowFinalOutput(true);
      }

      setIsFollowupThinking(false);
      setPendingFollowupStep(null);
    }, 1400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pendingFollowupStep]);

  const resetReviewState = () => {
    setIsLensOpen(false);
    setExpandedLensCards([]);
    setSelectedActions([]);
    setCurrentQuestionIndex(0);
    setRequiredQuestions([]);
    setAnsweredQuestions([]);
    setIsQuestionFlowActive(false);
    setIsFollowupThinking(false);
    setShowFinalOutput(false);
    setPendingFollowupStep(null);
  };

  const handleOpenDemoPicker = () => {
    if (!hasGeneratedOutput && !isGenerating) {
      setIsDemoPickerOpen(true);
    }
  };

  const handleSelectFlow = (flowId) => {
    setSelectedFlow(flowId);
    setHasPromptLoaded(true);
    setIsDemoPickerOpen(false);
    setHasGeneratedOutput(false);
    setIsGenerating(false);
    resetReviewState();
  };

  const handleSendPrompt = () => {
    if (!activeFlow) {
      return;
    }

    setIsGenerating(true);
    setIsDemoPickerOpen(false);
    resetReviewState();
  };

  const handleOpenLens = () => {
    setIsLensOpen(true);
    setExpandedLensCards((current) =>
      current.length ? current : ["assumptions"]
    );
  };

  const handleCloseLens = () => {
    setIsLensOpen(false);
  };

  const handleToggleLensCard = (cardId) => {
    setExpandedLensCards((current) =>
      current.includes(cardId)
        ? current.filter((id) => id !== cardId)
        : [...current, cardId]
    );
  };

  const handleToggleAction = (actionId) => {
    setSelectedActions((current) =>
      current.includes(actionId)
        ? current.filter((id) => id !== actionId)
        : [...current, actionId]
    );
    setCurrentQuestionIndex(0);
    setRequiredQuestions([]);
    setAnsweredQuestions([]);
    setIsQuestionFlowActive(false);
    setIsFollowupThinking(false);
    setShowFinalOutput(false);
    setPendingFollowupStep(null);
  };

  const handleContinueActions = () => {
    if (!activeFlow || selectedActions.length === 0) {
      return;
    }

    const derivedQuestions = deriveRequiredQuestions(activeFlow, selectedActions);

    setShowFinalOutput(false);
    setIsQuestionFlowActive(false);
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(0);
    setIsFollowupThinking(true);

    if (derivedQuestions.length === 0) {
      setPendingFollowupStep({ type: "show-final" });
      return;
    }

    setPendingFollowupStep({
      type: "start-question-flow",
      questions: derivedQuestions
    });
  };

  const handleSendQuestionResponse = () => {
    const currentQuestion = requiredQuestions[currentQuestionIndex];

    if (!currentQuestion) {
      return;
    }

    const nextAnswered = [...answeredQuestions, currentQuestion];
    const nextIndex = currentQuestionIndex + 1;

    setAnsweredQuestions(nextAnswered);
    setIsQuestionFlowActive(false);
    setIsFollowupThinking(true);

    if (nextIndex >= requiredQuestions.length) {
      setPendingFollowupStep({
        type: "finish-question-flow",
        answered: nextAnswered,
        nextIndex
      });
      return;
    }

    setPendingFollowupStep({
      type: "advance-question-flow",
      answered: nextAnswered,
      nextIndex
    });
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="workspace-shell">
        <div className="workspace-topbar">
          <button className="workspace-title" type="button">
            Claude
            <span className="workspace-caret">▾</span>
          </button>
        </div>

        {(hasGeneratedOutput || isGenerating) && activeFlow ? (
          <ChatSimulation
            activeFlow={activeFlow}
            isGenerating={isGenerating}
            isLensOpen={isLensOpen}
            expandedLensCards={expandedLensCards}
            selectedActions={selectedActions}
            currentQuestionIndex={currentQuestionIndex}
            requiredQuestions={requiredQuestions}
            answeredQuestions={answeredQuestions}
            isQuestionFlowActive={isQuestionFlowActive}
            isFollowupThinking={isFollowupThinking}
            showFinalOutput={showFinalOutput}
            finalOutput={finalOutput}
            onOpenLens={handleOpenLens}
            onCloseLens={handleCloseLens}
            onToggleLensCard={handleToggleLensCard}
            onToggleAction={handleToggleAction}
            onContinueActions={handleContinueActions}
            onSendQuestionResponse={handleSendQuestionResponse}
            onComposerClick={handleOpenDemoPicker}
            onSendPrompt={handleSendPrompt}
          />
        ) : (
          <ClaudeHome
            activeFlow={activeFlow}
            hasPromptLoaded={hasPromptLoaded}
            isDemoPickerOpen={isDemoPickerOpen}
            onComposerClick={handleOpenDemoPicker}
            onSelectFlow={handleSelectFlow}
            onSendPrompt={handleSendPrompt}
          />
        )}
      </main>
    </div>
  );
}

export default App;
