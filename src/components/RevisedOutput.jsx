import { useEffect, useMemo, useState } from "react";

function RevisedOutput({ finalOutput }) {
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

    return () => window.clearInterval(interval);
  }, [totalWords, finalOutput]);

  const visibleParagraphs = useMemo(() => {
    let remainingWords = visibleWordCount;
    return paragraphWords.map((words) => {
      if (remainingWords <= 0) return "";
      const sliceCount = Math.min(words.length, remainingWords);
      remainingWords -= sliceCount;
      return words.slice(0, sliceCount).join(" ");
    });
  }, [paragraphWords, visibleWordCount]);

  return (
    <div className="revised-output">
      <div className="message-row message-row-assistant message-row-followup">
        <div className="message-block">
          <div className="message-copy">
            <p className="final-output-heading">{visibleParagraphs[0]}</p>
            {visibleParagraphs.slice(1).map((paragraph, index) => (
              <p key={`${index}-${finalOutput.heading}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevisedOutput;
