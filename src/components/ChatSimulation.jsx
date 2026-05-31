import { useEffect, useState } from "react";
import Composer from "./Composer";
import MessageThread from "./MessageThread";
import ReasoningLensPanel from "./ReasoningLensPanel";

function ChatSimulation({
  activeFlow,
  isGenerating,
  isLensOpen,
  isDemoComplete,
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
  onResetToDemoPicker,
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
    <section
      className={`workspace-stage workspace-stage-chat${isDemoComplete ? " is-demo-complete" : ""}`}
    >
      <div className={`chat-layout${isLensOpen ? " is-lens-open" : ""}`}>
        <MessageThread
          activeFlow={activeFlow}
          isGenerating={isGenerating}
          isLensOpen={isLensOpen}
          isDemoComplete={isDemoComplete}
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
        hasPromptLoaded={
          isDemoComplete
            ? false
            : Boolean(
                isContextFlowActive &&
                  currentQuestion &&
                  !isFollowupThinking &&
                  isQuestionReadyForResponse
              )
        }
        customPromptText={
          isDemoComplete
            ? "Click to see another demo"
            : isContextFlowActive && currentQuestion && isQuestionReadyForResponse
            ? currentQuestion.hardcodedResponse
            : ""
        }
        isSendEnabled={
          isDemoComplete
            ? false
            : Boolean(
                isContextFlowActive &&
                  currentQuestion &&
                  isQuestionReadyForResponse &&
                  !isFollowupThinking
              )
        }
        isDemoPickerOpen={false}
        onComposerClick={isDemoComplete ? onResetToDemoPicker : onComposerClick}
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
