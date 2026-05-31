import LensModuleCard from "./LensModuleCard";

function ReasoningLensPanel({
  activeFlow,
  expandedLensCards,
  isContextFlowActive,
  onCloseLens,
  onToggleLensCard,
  onStartContextFlow
}) {
  const getSeverityTone = (severity) => {
    if (severity.startsWith("High")) return "is-high";
    if (severity.startsWith("Medium")) return "is-medium";
    return "is-low";
  };

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
          const isExpanded = expandedLensCards.includes(card.id);

          return (
            <LensModuleCard
              key={card.id}
              card={card}
              expanded={isExpanded}
              severityTone={getSeverityTone(card.severity)}
              showContextCta={card.id === "missing"}
              isContextFlowActive={isContextFlowActive}
              onStartContextFlow={onStartContextFlow}
              onToggle={() => onToggleLensCard(card.id)}
            />
          );
        })}
      </div>
    </aside>
  );
}

export default ReasoningLensPanel;
