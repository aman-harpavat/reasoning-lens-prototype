import Sidebar from "./components/Sidebar";
import ClaudeHome from "./components/ClaudeHome";
import ChatSimulation from "./components/ChatSimulation";
import { flows } from "./data/flows";
import { useEffect, useState } from "react";

function App() {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [isDemoPickerOpen, setIsDemoPickerOpen] = useState(false);
  const [hasPromptLoaded, setHasPromptLoaded] = useState(false);
  const [hasGeneratedOutput, setHasGeneratedOutput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLensOpen, setIsLensOpen] = useState(false);
  const [expandedLensCards, setExpandedLensCards] = useState([]);

  const activeFlow = selectedFlow ? flows[selectedFlow] : null;

  useEffect(() => {
    if (!isGenerating) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setHasGeneratedOutput(true);
      setHasPromptLoaded(false);
      setIsGenerating(false);
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isGenerating]);

  const handleOpenDemoPicker = () => {
    if (!hasGeneratedOutput && !isGenerating) {
      setIsDemoPickerOpen(true);
    }
  };

  const handleSelectFlow = (flowId) => {
    setSelectedFlow(flowId);
    setHasPromptLoaded(true);
    setIsDemoPickerOpen(false);
    setHasGeneratedOutput(false);
    setIsGenerating(false);
    setIsLensOpen(false);
    setExpandedLensCards([]);
  };

  const handleSendPrompt = () => {
    if (!activeFlow) {
      return;
    }

    setIsGenerating(true);
    setIsDemoPickerOpen(false);
    setIsLensOpen(false);
  };

  const handleOpenLens = () => {
    setIsLensOpen(true);
    setExpandedLensCards((current) =>
      current.length ? current : ["assumptions"]
    );
  };

  const handleCloseLens = () => {
    setIsLensOpen(false);
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="workspace-shell">
        <div className="workspace-topbar">
          <button className="workspace-title" type="button">
            Claude
            <span className="workspace-caret">▾</span>
          </button>
        </div>

        {(hasGeneratedOutput || isGenerating) && activeFlow ? (
          <ChatSimulation
            activeFlow={activeFlow}
            isGenerating={isGenerating}
            isLensOpen={isLensOpen}
            expandedLensCards={expandedLensCards}
            onOpenLens={handleOpenLens}
            onCloseLens={handleCloseLens}
            onComposerClick={handleOpenDemoPicker}
            onSendPrompt={handleSendPrompt}
          />
        ) : (
          <ClaudeHome
            activeFlow={activeFlow}
            hasPromptLoaded={hasPromptLoaded}
            isDemoPickerOpen={isDemoPickerOpen}
            onComposerClick={handleOpenDemoPicker}
            onSelectFlow={handleSelectFlow}
            onSendPrompt={handleSendPrompt}
          />
        )}
      </main>
    </div>
  );
}

export default App;
