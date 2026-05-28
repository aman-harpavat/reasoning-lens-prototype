function PostResponseActions({ isLensOpen, onOpenLens }) {
  return (
    <div className="post-actions">
      <div className="post-actions-row">
        <button className="post-action-button" type="button">
          Copy
        </button>
        <button className="post-action-button" type="button">
          Retry
        </button>
        <button
          className={`post-action-button post-action-button-lens${
            isLensOpen ? " is-active" : ""
          }`}
          type="button"
          onClick={onOpenLens}
        >
          Review with Reasoning Lens
        </button>
      </div>

      <p className="post-actions-note">
        <span className="post-actions-note-label">Note:</span> Use this before
        relying on the output for a real decision, interview, or work product.
      </p>
    </div>
  );
}

export default PostResponseActions;
