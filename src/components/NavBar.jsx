import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "HSL Gate Count Stats",
    icon: ShoppingBag,
    color: "#8B5CF6",
    href: "/",
  },
  {
    name: "MED Gate Count Stats",
    icon: Users,
    color: "#EC4899",
    href: "/medgatecount",
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
