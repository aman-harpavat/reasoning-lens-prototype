import { useEffect, useMemo, useState } from "react";
import PostResponseActions from "./PostResponseActions";
import RevisedOutput from "./RevisedOutput";

function ProgressiveQuestion({ text }) {
  const words = useMemo(() => text.split(" "), [text]);
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  useEffect(() => {
    setVisibleWordCount(0);

    const interval = window.setInterval(() => {
      setVisibleWordCount((current) => {
        if (current >= words.length) {
          window.clearInterval(interval);
          return current;
        }
        return current + 2;
      });
    }, 40);

    return () => window.clearInterval(interval);
  }, [words]);

  return <p>{words.slice(0, visibleWordCount).join(" ")}</p>;
}

function MessageThread({
  activeFlow,
  isGenerating,
  isLensOpen,
  currentContextQuestionIndex,
  answeredContextQuestions,
  isContextFlowActive,
  isFollowupThinking,
  showFinalOutput,
  finalOutput,
  onOpenLens
}) {
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

    return () => window.clearInterval(interval);
  }, [isGenerating, totalWords, activeFlow]);

  const visibleParagraphs = useMemo(() => {
    let remainingWords = visibleWordCount;
    return paragraphWords.map((words) => {
      if (remainingWords <= 0) return "";
      const sliceCount = Math.min(words.length, remainingWords);
      remainingWords -= sliceCount;
      return words.slice(0, sliceCount).join(" ");
    });
  }, [paragraphWords, visibleWordCount]);

  const currentQuestion = activeFlow.contextQuestions[currentContextQuestionIndex];

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
                  <PostResponseActions isLensOpen={isLensOpen} onOpenLens={onOpenLens} />
                ) : null}

                {answeredContextQuestions.map((question) => (
                  <div key={question.id} className="question-flow-step question-flow-step-complete">
                    <div className="message-row message-row-assistant">
                      <div className="message-block">
                        <div className="message-copy message-copy-question">
                          <p>{question.question}</p>
                        </div>
                      </div>
                    </div>

                    <div className="message-row message-row-user">
                      <div className="message-bubble message-bubble-user">
                        {question.hardcodedResponse}
                      </div>
                    </div>
                  </div>
                ))}

                {isContextFlowActive && currentQuestion ? (
                  <div className="question-flow-step">
                    <div className="message-row message-row-assistant">
                      <div className="message-block">
                        <div className="message-copy message-copy-question">
                          <ProgressiveQuestion text={currentQuestion.question} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {isFollowupThinking ? (
                  <div className="question-flow-step">
                    <div className="message-row message-row-assistant">
                      <div className="message-block">
                        <div className="message-thinking" aria-live="polite">
                          <span className="message-thinking-text">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {showFinalOutput && finalOutput ? (
                  <RevisedOutput finalOutput={finalOutput} />
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
