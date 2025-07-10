import { BarChart2, Menu, User, ClipboardList } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "HSL Gate Count Stats",
    icon: BarChart2,
    color: "#8B5CF6",
    href: "/",
  },
  {
    name: "HSL Question Sheet Stats",
    icon: ClipboardList,
    color: "#8B5CF6",
    href: "/hslquestionsheet",
  },
  {
    name: "MED Gate Count Stats",
    icon: BarChart2,
    color: "#EC4899",
    href: "/medgatecount",
  },
  {
    name: "MED Question Sheet Stats",
    icon: ClipboardList,
    color: "#EC4899",
    href: "/medquestionsheet",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger menu button always visible on mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="menu-button mobile-only"
        aria-label="Open sidebar menu"
        style={{ position: "fixed", left: 16, top: 16, zIndex: 1100 }}
      >
        <Menu size={24} />
      </button>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`sidebar${isSidebarOpen ? " open" : " collapsed"}`}
        style={{ display: isSidebarOpen ? undefined : undefined }}
      >
        <div className="sidebar-inner">
          {/* Hide menu button inside sidebar on mobile */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="menu-button desktop-only"
            aria-label="Close sidebar menu"
          >
            <Menu size={24} />
          </button>
          <nav className="nav">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                to={item.href}
                key={item.name}
                className="nav-item"
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon
                  size={20}
                  style={{ color: item.color }}
                  className="nav-icon"
                />
                <span className="nav-text">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
