import { useEffect, useMemo, useState } from "react";

function RevisedOutput({ finalOutput, actions, selectedActions }) {
  const selectedLabels = selectedActions
    .map((actionId) => actions.find((action) => action.id === actionId)?.label)
    .filter(Boolean)
    .join(", ");

  const revealParagraphs = useMemo(
    () => [finalOutput.heading, ...finalOutput.paragraphs],
    [finalOutput]
  );
  const paragraphWords = useMemo(
    () => revealParagraphs.map((paragraph) => paragraph.split(" ")),
    [revealParagraphs]
  );
  const totalWords = useMemo(
    () => paragraphWords.reduce((sum, words) => sum + words.length, 0),
    [paragraphWords]
  );
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  useEffect(() => {
    setVisibleWordCount(0);

    const interval = window.setInterval(() => {
      setVisibleWordCount((current) => {
        if (current >= totalWords) {
          window.clearInterval(interval);
          return current;
        }

        return current + 2;
      });
    }, 40);

    return () => {
      window.clearInterval(interval);
    };
  }, [totalWords, finalOutput]);

  const visibleParagraphs = useMemo(() => {
    let remainingWords = visibleWordCount;

    return paragraphWords.map((words) => {
      if (remainingWords <= 0) {
        return "";
      }

      const sliceCount = Math.min(words.length, remainingWords);
      remainingWords -= sliceCount;
      return words.slice(0, sliceCount).join(" ");
    });
  }, [paragraphWords, visibleWordCount]);

  const hasFinishedReveal = visibleWordCount >= totalWords;

  return (
    <div className="revised-output">
      <div className="revised-output-selected">
        <span className="revised-output-selected-label">Selected improvements</span>
        <span className="revised-output-selected-value">{selectedLabels}</span>
      </div>

      <div className="message-row message-row-assistant message-row-followup">
        <div className="message-block">
          <div className="message-copy">
            <p className="final-output-heading">{visibleParagraphs[0]}</p>
            {visibleParagraphs.slice(1).map((paragraph, index) => (
              <p key={`${index}-${finalOutput.heading}`}>{paragraph}</p>
            ))}
          </div>

          {hasFinishedReveal && finalOutput.assumptionsSection ? (
            <div className="final-output-section">
              <h4 className="final-output-section-title">
                {finalOutput.assumptionsSection.title}
              </h4>
              <ul className="final-output-section-list">
                {finalOutput.assumptionsSection.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasFinishedReveal && finalOutput.cautionSection ? (
            <div className="final-output-section">
              <h4 className="final-output-section-title">
                {finalOutput.cautionSection.title}
              </h4>
              <ul className="final-output-section-list">
                {finalOutput.cautionSection.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasFinishedReveal ? (
            <p className="reflection-prompt">{finalOutput.reflectionPrompt}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RevisedOutput;
