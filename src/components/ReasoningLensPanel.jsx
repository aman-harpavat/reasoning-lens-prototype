function ReasoningLensPanel({ activeFlow, expandedLensCards, onCloseLens }) {
  return (
    <aside className="lens-panel">
      <div className="lens-panel-header">
        <div>
          <p className="lens-panel-eyebrow">Inspection layer</p>
          <h2 className="lens-panel-title">Reasoning Lens</h2>
        </div>

        <button className="lens-panel-close" type="button" onClick={onCloseLens}>
          Close
        </button>
      </div>

      <p className="lens-panel-subtitle">
        This does not decide for you. It helps you inspect the output before
        relying on it.
      </p>

      <div className="lens-panel-modules">
        {activeFlow.lensCards.map((card) => {
          const isDefaultOpen = expandedLensCards.includes(card.id);

          return (
            <div
              key={card.id}
              className={`lens-module-preview${
                isDefaultOpen ? " is-default-open" : ""
              }`}
            >
              <div className="lens-module-preview-top">
                <span className="lens-module-preview-title">{card.title}</span>
                <span className="lens-module-preview-severity">
                  {card.severity}
                </span>
              </div>
              <p className="lens-module-preview-copy">{card.explanation}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default ReasoningLensPanel;
