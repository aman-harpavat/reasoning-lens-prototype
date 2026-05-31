import { useEffect, useState } from "react";
import Composer from "./Composer";
import MessageThread from "./MessageThread";
import ReasoningLensPanel from "./ReasoningLensPanel";

function ChatSimulation({
  activeFlow,
  isGenerating,
  isLensOpen,
  expandedLensCards,
  selectedActions,
  currentQuestionIndex,
  requiredQuestions,
  answeredQuestions,
  isQuestionFlowActive,
  isFollowupThinking,
  showFinalOutput,
  finalOutput,
  onOpenLens,
  onCloseLens,
  onToggleLensCard,
  onToggleAction,
  onContinueActions,
  onSendQuestionResponse,
  onComposerClick,
  onSendPrompt
}) {
  const [isQuestionReadyForResponse, setIsQuestionReadyForResponse] = useState(false);

  useEffect(() => {
    if (
      !isQuestionFlowActive ||
      isFollowupThinking ||
      !requiredQuestions[currentQuestionIndex]
    ) {
      setIsQuestionReadyForResponse(false);
      return undefined;
    }

    const wordCount =
      requiredQuestions[currentQuestionIndex].question.split(" ").length;
    const revealDuration = Math.ceil(wordCount / 2) * 40 + 80;

    setIsQuestionReadyForResponse(false);

    const timer = window.setTimeout(() => {
      setIsQuestionReadyForResponse(true);
    }, revealDuration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    currentQuestionIndex,
    isFollowupThinking,
    isQuestionFlowActive,
    requiredQuestions
  ]);

  return (
    <section className="workspace-stage workspace-stage-chat">
      <div className={`chat-layout${isLensOpen ? " is-lens-open" : ""}`}>
        <MessageThread
          activeFlow={activeFlow}
          isGenerating={isGenerating}
          isLensOpen={isLensOpen}
          currentQuestionIndex={currentQuestionIndex}
          requiredQuestions={requiredQuestions}
          answeredQuestions={answeredQuestions}
          isQuestionFlowActive={isQuestionFlowActive}
          isFollowupThinking={isFollowupThinking}
          showFinalOutput={showFinalOutput}
          finalOutput={finalOutput}
          onOpenLens={onOpenLens}
          selectedActions={selectedActions}
        />

        {isLensOpen ? (
          <ReasoningLensPanel
            activeFlow={activeFlow}
            expandedLensCards={expandedLensCards}
            selectedActions={selectedActions}
            onCloseLens={onCloseLens}
            onToggleLensCard={onToggleLensCard}
            onToggleAction={onToggleAction}
            onContinueActions={onContinueActions}
          />
        ) : null}
      </div>

      <Composer
        activeFlow={activeFlow}
        hasPromptLoaded={Boolean(
          isQuestionFlowActive &&
            requiredQuestions[currentQuestionIndex] &&
            !isFollowupThinking &&
            isQuestionReadyForResponse
        )}
        customPromptText={
          isQuestionFlowActive &&
          requiredQuestions[currentQuestionIndex] &&
          isQuestionReadyForResponse
            ? requiredQuestions[currentQuestionIndex].hardcodedResponse
            : ""
        }
        isSendEnabled={
          Boolean(
            isQuestionFlowActive &&
              requiredQuestions[currentQuestionIndex] &&
              isQuestionReadyForResponse
          ) && !isFollowupThinking
        }
        isDemoPickerOpen={false}
        onComposerClick={onComposerClick}
        onSelectFlow={() => {}}
        onSendPrompt={isQuestionFlowActive ? onSendQuestionResponse : onSendPrompt}
        helperText="Guided prototype — response is preloaded for demo reliability."
        placeholderText=""
        showFlowChip={false}
      />
    </section>
  );
}

export default ChatSimulation;
