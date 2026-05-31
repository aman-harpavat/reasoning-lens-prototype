import { useEffect, useMemo, useState } from "react";

function ProgressiveText({ text, as: Tag = "p", className, delay = 0 }) {
  const words = useMemo(() => text.split(" "), [text]);
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  useEffect(() => {
    setVisibleWordCount(0);
    let interval;

    const startTimer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setVisibleWordCount((current) => {
          if (current >= words.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 2;
        });
      }, 40);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [words, delay]);

  return <Tag className={className}>{words.slice(0, visibleWordCount).join(" ")}</Tag>;
}

function LensModuleCard({
  card,
  severityTone,
  showContextCta,
  isContextFlowActive,
  onStartContextFlow,
  revealDelay
}) {
  return (
    <div className="lens-module-card is-expanded">
      <div className="lens-module-card-top">
        <span className="lens-module-card-title">{card.title}</span>
        <span className={`lens-module-card-severity ${severityTone}`}>
          {card.severity}
        </span>
      </div>

      <ProgressiveText
        text={card.explanation}
        className="lens-module-card-copy"
        delay={revealDelay}
      />

      <div className="lens-module-card-body">
        <ul className="lens-module-card-bullets">
          {card.bullets.map((bullet, index) => (
            <li key={bullet}>
              <ProgressiveText
                text={bullet}
                as="span"
                delay={revealDelay + 220 + index * 160}
              />
            </li>
          ))}
        </ul>

        {showContextCta ? (
          <div className="lens-module-card-cta-block">
            <button
              className="lens-module-card-cta"
              type="button"
              onClick={onStartContextFlow}
              disabled={isContextFlowActive}
            >
              {card.ctaLabel}
            </button>
            <p className="lens-module-card-cta-copy">{card.ctaMicrocopy}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LensModuleCard;
