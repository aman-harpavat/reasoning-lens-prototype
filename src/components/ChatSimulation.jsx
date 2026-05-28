import Composer from "./Composer";
import MessageThread from "./MessageThread";

function ChatSimulation({
  activeFlow,
  isGenerating,
  onComposerClick,
  onSendPrompt
}) {
  return (
    <section className="workspace-stage workspace-stage-chat">
      <div className="chat-layout">
        <MessageThread activeFlow={activeFlow} isGenerating={isGenerating} />
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
