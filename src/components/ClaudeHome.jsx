import Composer from "./Composer";

function ClaudeHome({
  activeFlow,
  hasPromptLoaded,
  isDemoPickerOpen,
  onComposerClick,
  onSelectFlow,
  onSendPrompt
}) {
  return (
    <section className="workspace-stage workspace-stage-home">
      <div className="workspace-placeholder workspace-placeholder-home">
        <h1 className="workspace-heading">What can I help you think through today?</h1>
        <p className="workspace-copy">
          Try Reasoning Lens on a high-stakes AI output.
        </p>
      </div>

      <Composer
        activeFlow={activeFlow}
        hasPromptLoaded={hasPromptLoaded}
        isDemoPickerOpen={isDemoPickerOpen}
        onComposerClick={onComposerClick}
        onSelectFlow={onSelectFlow}
        onSendPrompt={onSendPrompt}
      />
    </section>
  );
}

export default ClaudeHome;
