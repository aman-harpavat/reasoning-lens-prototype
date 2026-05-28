import { useEffect, useMemo, useState } from "react";
import PostResponseActions from "./PostResponseActions";

function MessageThread({ activeFlow, isGenerating, isLensOpen, onOpenLens }) {
  const paragraphWords = useMemo(
    () => activeFlow.initialOutput.map((paragraph) => paragraph.split(" ")),
    [activeFlow]
  );
  const totalWords = useMemo(
    () => paragraphWords.reduce((sum, words) => sum + words.length, 0),
    [paragraphWords]
  );
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      setVisibleWordCount(0);
      return undefined;
    }

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
  }, [isGenerating, totalWords, activeFlow]);

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

  return (
    <div className="message-thread">
      <div className="message-thread-inner">
        <div className="message-row message-row-user">
          <div className="message-bubble message-bubble-user">{activeFlow.prompt}</div>
        </div>

        <div className="message-row message-row-assistant">
          <div className="message-block">
            {isGenerating ? (
              <div className="message-thinking" aria-live="polite">
                <span className="message-thinking-text">Thinking...</span>
              </div>
            ) : (
              <>
                <div className="message-copy">
                  {visibleParagraphs.map((paragraph, index) => (
                    <p key={`${index}-${activeFlow.title}`}>{paragraph}</p>
                  ))}
                </div>

                {visibleWordCount >= totalWords ? (
                  <PostResponseActions
                    isLensOpen={isLensOpen}
                    onOpenLens={onOpenLens}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageThread;
