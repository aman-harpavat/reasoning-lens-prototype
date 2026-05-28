const demoOptions = [
  {
    id: "interview",
    title: "Interview Preparation",
    description:
      "Evaluate a polished interview answer before using it in a real interview."
  },
  {
    id: "research",
    title: "Research Synthesis",
    description:
      "Inspect a research summary for missing nuance, uncertainty, and evidence gaps."
  }
];

function DemoPicker({ onSelectFlow }) {
  return (
    <div className="demo-picker" role="dialog" aria-label="Guided demo picker">
      {demoOptions.map((option) => (
        <button
          key={option.id}
          className="demo-picker-option"
          type="button"
          onClick={() => onSelectFlow(option.id)}
        >
          <span className="demo-picker-title">{option.title}</span>
          <span className="demo-picker-description">{option.description}</span>
        </button>
      ))}
    </div>
  );
}

export default DemoPicker;
