const navItems = ["Chat", "Cowork", "Claude"];
const utilityItems = ["New chat", "Projects", "Artifacts", "Customize"];
const recentItems = [
  "Greeting",
  "Creating notes from recorded session",
  "Weekly product recap"
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-toolbar">
          <button className="sidebar-icon-button" type="button" aria-label="Toggle sidebar">
            <span className="sidebar-icon-grid" />
          </button>
          <button className="sidebar-icon-button" type="button" aria-label="Search">
            <span className="sidebar-icon-search" />
          </button>
        </div>

        <nav className="sidebar-tabs" aria-label="Primary">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`sidebar-tab${index === 0 ? " is-active" : ""}`}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-section">
          {utilityItems.map((item) => (
            <button key={item} className="sidebar-row" type="button">
              <span className="sidebar-row-icon" />
              <span>{item}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Recents</p>
          <div className="sidebar-recents">
            {recentItems.map((item, index) => (
              <button
                key={item}
                className={`sidebar-recent${index === 0 ? " is-current" : ""}`}
                type="button"
              >
                <span className="sidebar-recent-dot" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-update" type="button">
          <div>
            <p className="sidebar-update-title">Relaunch to update</p>
            <p className="sidebar-update-copy">v1.9255.2</p>
          </div>
          <span className="sidebar-update-arrow">→</span>
        </button>

        <button className="sidebar-account" type="button">
          <span className="sidebar-account-badge">A</span>
          <span className="sidebar-account-name">Aman · Free</span>
          <span className="sidebar-account-caret">▾</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
