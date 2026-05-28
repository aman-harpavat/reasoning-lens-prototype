import Composer from "./Composer";
import MessageThread from "./MessageThread";
import ReasoningLensPanel from "./ReasoningLensPanel";

function ChatSimulation({
  activeFlow,
  isGenerating,
  isLensOpen,
  expandedLensCards,
  onOpenLens,
  onCloseLens,
  onComposerClick,
  onSendPrompt
}) {
  return (
    <section className="workspace-stage workspace-stage-chat">
      <div className={`chat-layout${isLensOpen ? " is-lens-open" : ""}`}>
        <MessageThread
          activeFlow={activeFlow}
          isGenerating={isGenerating}
          isLensOpen={isLensOpen}
          onOpenLens={onOpenLens}
        />

        {isLensOpen ? (
          <ReasoningLensPanel
            activeFlow={activeFlow}
            expandedLensCards={expandedLensCards}
            onCloseLens={onCloseLens}
          />
        ) : null}
      </div>

      <Composer
        activeFlow={activeFlow}
        hasPromptLoaded={false}
        isDemoPickerOpen={false}
        onComposerClick={onComposerClick}
        onSelectFlow={() => {}}
        onSendPrompt={onSendPrompt}
        helperText="Guided prototype — response is preloaded for demo reliability."
        placeholderText=""
        showFlowChip={false}
      />
    </section>
  );
}

export default ChatSimulation;
