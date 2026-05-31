function LensModuleCard({ card, expanded, severityTone, onToggle }) {
  return (
    <div className={`lens-module-card${expanded ? " is-expanded" : ""}`}>
      <button className="lens-module-card-button" type="button" onClick={onToggle}>
        <div className="lens-module-card-top">
          <span className="lens-module-card-title">{card.title}</span>
          <span className={`lens-module-card-severity ${severityTone}`}>
            {card.severity}
          </span>
        </div>

        <p className="lens-module-card-copy">{card.explanation}</p>
      </button>

      {expanded ? (
        <div className="lens-module-card-body">
          <ul className="lens-module-card-bullets">
            {card.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default LensModuleCard;
