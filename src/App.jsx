import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ClaudeHome from "./components/ClaudeHome";
import ChatSimulation from "./components/ChatSimulation";
import { buildFinalOutput, flows } from "./data/flows";

function App() {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [isDemoPickerOpen, setIsDemoPickerOpen] = useState(false);
  const [hasPromptLoaded, setHasPromptLoaded] = useState(false);
  const [hasGeneratedOutput, setHasGeneratedOutput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLensOpen, setIsLensOpen] = useState(false);
  const [isContextFlowActive, setIsContextFlowActive] = useState(false);
  const [currentContextQuestionIndex, setCurrentContextQuestionIndex] = useState(0);
  const [answeredContextQuestions, setAnsweredContextQuestions] = useState([]);
  const [isFollowupThinking, setIsFollowupThinking] = useState(false);
  const [showFinalOutput, setShowFinalOutput] = useState(false);
  const [pendingContextStep, setPendingContextStep] = useState(null);

  const activeFlow = selectedFlow ? flows[selectedFlow] : null;
  const finalOutput =
    activeFlow && showFinalOutput
      ? buildFinalOutput(activeFlow, answeredContextQuestions)
      : null;
  const isDemoComplete = Boolean(showFinalOutput && activeFlow);

  useEffect(() => {
    if (!isGenerating) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setHasGeneratedOutput(true);
      setHasPromptLoaded(false);
      setIsGenerating(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [isGenerating]);

  useEffect(() => {
    if (!pendingContextStep) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (pendingContextStep.type === "start-context-flow") {
        setAnsweredContextQuestions([]);
        setCurrentContextQuestionIndex(0);
        setIsContextFlowActive(true);
        setShowFinalOutput(false);
      }

      if (pendingContextStep.type === "advance-context-flow") {
        setAnsweredContextQuestions(pendingContextStep.answered);
        setCurrentContextQuestionIndex(pendingContextStep.nextIndex);
        setIsContextFlowActive(true);
        setShowFinalOutput(false);
      }

      if (pendingContextStep.type === "finish-context-flow") {
        setAnsweredContextQuestions(pendingContextStep.answered);
        setCurrentContextQuestionIndex(pendingContextStep.nextIndex);
        setIsContextFlowActive(false);
        setShowFinalOutput(true);
      }

      setIsFollowupThinking(false);
      setPendingContextStep(null);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [pendingContextStep]);

  const resetReviewState = () => {
    setIsLensOpen(false);
    setIsContextFlowActive(false);
    setCurrentContextQuestionIndex(0);
    setAnsweredContextQuestions([]);
    setIsFollowupThinking(false);
    setShowFinalOutput(false);
    setPendingContextStep(null);
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
  };

  const handleCloseLens = () => {
    setIsLensOpen(false);
  };

  const handleResetToDemoPicker = () => {
    setSelectedFlow(null);
    setHasPromptLoaded(false);
    setHasGeneratedOutput(false);
    setIsGenerating(false);
    setIsDemoPickerOpen(true);
    resetReviewState();
  };

  const handleStartContextFlow = () => {
    if (!activeFlow) {
      return;
    }

    setShowFinalOutput(false);
    setAnsweredContextQuestions([]);
    setCurrentContextQuestionIndex(0);
    setIsContextFlowActive(false);
    setIsFollowupThinking(true);
    setPendingContextStep({ type: "start-context-flow" });
  };

  const handleSendContextResponse = () => {
    if (!activeFlow) {
      return;
    }

    const currentQuestion = activeFlow.contextQuestions[currentContextQuestionIndex];

    if (!currentQuestion) {
      return;
    }

    const nextAnswered = [...answeredContextQuestions, currentQuestion];
    const nextIndex = currentContextQuestionIndex + 1;

    setAnsweredContextQuestions(nextAnswered);
    setIsContextFlowActive(false);
    setIsFollowupThinking(true);

    if (nextIndex >= activeFlow.contextQuestions.length) {
      setPendingContextStep({
        type: "finish-context-flow",
        answered: nextAnswered,
        nextIndex
      });
      return;
    }

    setPendingContextStep({
      type: "advance-context-flow",
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
            isDemoComplete={isDemoComplete}
            isContextFlowActive={isContextFlowActive}
            currentContextQuestionIndex={currentContextQuestionIndex}
            answeredContextQuestions={answeredContextQuestions}
            isFollowupThinking={isFollowupThinking}
            showFinalOutput={showFinalOutput}
            finalOutput={finalOutput}
            onOpenLens={handleOpenLens}
            onCloseLens={handleCloseLens}
            onStartContextFlow={handleStartContextFlow}
            onSendContextResponse={handleSendContextResponse}
            onResetToDemoPicker={handleResetToDemoPicker}
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
