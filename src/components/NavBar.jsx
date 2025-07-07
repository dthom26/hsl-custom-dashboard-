import { BarChart2, Menu, User } from "lucide-react";
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
    name: "HSL Question Sheet Data",
    icon: User,
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
    name: "MED Question Sheet Data",
    icon: BarChart2,
    color: "#EC4899",
    href: "/medquestionsheet",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`sidebar ${!isSidebarOpen ? "collapsed" : ""}`}>
      <div className="sidebar-inner">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="menu-button"
        >
          <Menu size={24} />
        </button>

        <nav className="nav">
          {SIDEBAR_ITEMS.map((item) => (
            <Link to={item.href} key={item.name} className="nav-item">
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
  );
};

export default Sidebar;
