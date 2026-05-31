function ActionPanel({
  actions,
  selectedActions,
  onToggleAction,
  onContinueActions
}) {
  const hasSelection = selectedActions.length > 0;

  return (
    <section className="action-panel">
      <div className="action-panel-header">
        <h3 className="action-panel-title">Turn this review into a better answer</h3>
        <p className="action-panel-copy">
          Select one or more improvements. Claude will only ask for more detail
          if the selected improvement needs your input.
        </p>
      </div>

      <div className="action-panel-grid">
        {actions.map((action) => {
          const isSelected = selectedActions.includes(action.id);

          return (
            <button
              key={action.id}
              className={`action-card${isSelected ? " is-selected" : ""}`}
              type="button"
              onClick={() => onToggleAction(action.id)}
            >
              <div className="action-card-checkbox" aria-hidden="true">
                {isSelected ? "✓" : ""}
              </div>

              <div className="action-card-content">
                <span className="action-card-label">{action.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="action-panel-continue"
        type="button"
        disabled={!hasSelection}
        onClick={onContinueActions}
      >
        Continue
      </button>
    </section>
  );
}

export default ActionPanel;
