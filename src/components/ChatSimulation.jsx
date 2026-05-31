import { useEffect, useState } from "react";
import Composer from "./Composer";
import MessageThread from "./MessageThread";
import ReasoningLensPanel from "./ReasoningLensPanel";

function ChatSimulation({
  activeFlow,
  isGenerating,
  isLensOpen,
  isContextFlowActive,
  currentContextQuestionIndex,
  answeredContextQuestions,
  isFollowupThinking,
  showFinalOutput,
  finalOutput,
  onOpenLens,
  onCloseLens,
  onStartContextFlow,
  onSendContextResponse,
  onComposerClick,
  onSendPrompt
}) {
  const [isQuestionReadyForResponse, setIsQuestionReadyForResponse] = useState(false);
  const currentQuestion = activeFlow.contextQuestions[currentContextQuestionIndex];

  useEffect(() => {
    if (!isContextFlowActive || isFollowupThinking || !currentQuestion) {
      setIsQuestionReadyForResponse(false);
      return undefined;
    }

    const wordCount = currentQuestion.question.split(" ").length;
    const revealDuration = Math.ceil(wordCount / 2) * 40 + 80;

    setIsQuestionReadyForResponse(false);

    const timer = window.setTimeout(() => {
      setIsQuestionReadyForResponse(true);
    }, revealDuration);

    return () => window.clearTimeout(timer);
  }, [currentQuestion, isContextFlowActive, isFollowupThinking]);

  return (
    <section className="workspace-stage workspace-stage-chat">
      <div className={`chat-layout${isLensOpen ? " is-lens-open" : ""}`}>
        <MessageThread
          activeFlow={activeFlow}
          isGenerating={isGenerating}
          isLensOpen={isLensOpen}
          currentContextQuestionIndex={currentContextQuestionIndex}
          answeredContextQuestions={answeredContextQuestions}
          isContextFlowActive={isContextFlowActive}
          isFollowupThinking={isFollowupThinking}
          showFinalOutput={showFinalOutput}
          finalOutput={finalOutput}
          onOpenLens={onOpenLens}
        />

        {isLensOpen ? (
          <ReasoningLensPanel
            activeFlow={activeFlow}
            isContextFlowActive={isContextFlowActive}
            onCloseLens={onCloseLens}
            onStartContextFlow={onStartContextFlow}
          />
        ) : null}
      </div>

      <Composer
        activeFlow={activeFlow}
        hasPromptLoaded={Boolean(
          isContextFlowActive && currentQuestion && !isFollowupThinking && isQuestionReadyForResponse
        )}
        customPromptText={
          isContextFlowActive && currentQuestion && isQuestionReadyForResponse
            ? currentQuestion.hardcodedResponse
            : ""
        }
        isSendEnabled={Boolean(
          isContextFlowActive && currentQuestion && isQuestionReadyForResponse && !isFollowupThinking
        )}
        isDemoPickerOpen={false}
        onComposerClick={onComposerClick}
        onSelectFlow={() => {}}
        onSendPrompt={isContextFlowActive ? onSendContextResponse : onSendPrompt}
        helperText="Guided prototype — response is preloaded for demo reliability."
        placeholderText=""
        showFlowChip={false}
      />
    </section>
  );
}

export default ChatSimulation;
