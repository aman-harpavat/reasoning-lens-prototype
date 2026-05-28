import { ArrowUp } from "lucide-react";
import DemoPicker from "./DemoPicker";

function Composer({
  activeFlow,
  hasPromptLoaded,
  isDemoPickerOpen,
  onComposerClick,
  onSelectFlow,
  onSendPrompt,
  helperText,
  showDemoPicker = true,
  showFlowChip = true,
  placeholderText = "Click to choose a guided demo"
}) {
  const promptText = hasPromptLoaded
    ? activeFlow?.prompt
    : placeholderText;

  return (
    <div className="composer-shell">
      <div className="composer-anchor">
        {showFlowChip && hasPromptLoaded && activeFlow ? (
          <div className="composer-flow-chip">{activeFlow.title}</div>
        ) : null}

        {showDemoPicker && isDemoPickerOpen ? (
          <DemoPicker onSelectFlow={onSelectFlow} />
        ) : null}

        <button
          className={`composer-surface composer-surface-button${
            hasPromptLoaded ? " has-prompt" : ""
          }`}
          type="button"
          onClick={hasPromptLoaded ? undefined : onComposerClick}
        >
          <p
            className={`composer-placeholder${
              hasPromptLoaded ? " has-prompt" : ""
            }${
              !promptText ? " is-empty" : ""
            }`}
          >
            {promptText}
          </p>

          <div className="composer-footer">
            <span className="composer-plus">+</span>
            <div className="composer-meta">
              <span className="composer-model">Claude</span>
              <span className="composer-meta-separator" />
              <button
                className={`composer-send${hasPromptLoaded ? "" : " is-disabled"}`}
                type="button"
                onClick={hasPromptLoaded ? onSendPrompt : undefined}
                disabled={!hasPromptLoaded}
                aria-label="Send prompt"
              >
                <ArrowUp size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </button>
      </div>

      {helperText ? <p className="composer-helper-text">{helperText}</p> : null}

      <p className="composer-disclaimer">
        Claude is AI and can make mistakes. Please double-check responses.
      </p>
    </div>
  );
}

export default Composer;
