import { useEffect, useState } from "react";
import LensModuleCard from "./LensModuleCard";

function ReasoningLensPanel({
  activeFlow,
  isContextFlowActive,
  onCloseLens,
  onStartContextFlow
}) {
  const [visibleCardCount, setVisibleCardCount] = useState(0);

  useEffect(() => {
    setVisibleCardCount(0);

    const firstTimer = window.setTimeout(() => {
      setVisibleCardCount(1);
    }, 500);

    const secondTimer = window.setTimeout(() => {
      setVisibleCardCount(2);
    }, 900);

    const thirdTimer = window.setTimeout(() => {
      setVisibleCardCount(3);
    }, 1300);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
      window.clearTimeout(thirdTimer);
    };
  }, [activeFlow]);

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

      {visibleCardCount === 0 ? (
        <div className="lens-panel-thinking" aria-live="polite">
          <span className="message-thinking-text">Thinking...</span>
        </div>
      ) : null}

      <div className="lens-panel-modules">
        {activeFlow.lensCards.slice(0, visibleCardCount).map((card, index) => (
          <LensModuleCard
            key={card.id}
            card={card}
            severityTone={getSeverityTone(card.severity)}
            showContextCta={card.id === "missing"}
            isContextFlowActive={isContextFlowActive}
            onStartContextFlow={onStartContextFlow}
            revealDelay={index * 180}
          />
        ))}
      </div>
    </aside>
  );
}

export default ReasoningLensPanel;
