
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  FileBox,
  PieChart,
  Settings,
  BookOpen,
  UserPlus,
  LogOut,
  Link2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    label: "Clients",
    icon: Users,
    to: "/clients",
  },
  {
    label: "Providers",
    icon: FolderOpen,
    to: "/providers",
  },
  {
    label: "Requests",
    icon: Link2,
    to: "/requests",
  },
  {
    label: "Documents",
    icon: FileBox,
    to: "/documents",
  },
  {
    label: "Reports",
    icon: PieChart,
    to: "/reports",
  },
  {
    label: "Documentation",
    icon: BookOpen,
    to: "/documentation",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
];

// Admin-only items
export const ADMIN_ITEMS = [
  {
    label: "Onboarding",
    icon: UserPlus,
    to: "/onboarding",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // In production, this would come from auth context
  const userRole = "admin"; // This would be dynamic
  
  const allItems = userRole === "admin" ? [...NAV_ITEMS, ...ADMIN_ITEMS] : NAV_ITEMS;

  return (
    <aside
      className={`h-[calc(100vh-4rem)] sticky top-16 z-20 bg-white shadow-soft border-r border-gray-100 transition-all 
        ${collapsed ? "w-16" : "w-56"} flex flex-col`}
    >
      <nav className="flex-1 flex flex-col gap-2 pt-6">
        {allItems.map((item) => {
          const active = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-4 px-4 py-2 rounded-md mx-2 my-1 text-sm font-medium transition-colors
                ${active ? "bg-primary text-white shadow-card" : "text-gray-700 hover:bg-primary/10"} 
                ${collapsed ? "justify-center" : ""}
              `}
              title={item.label}
            >
              <item.icon size={22} className="shrink-0" />
              <span className={`transition-opacity ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} duration-100`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center justify-end p-2 border-t border-gray-50">
        <button
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-secondary hover:text-primary text-gray-500"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="text-xs font-semibold">{collapsed ? "»" : "«"}</span>
          <span className={`text-xs ${collapsed ? "opacity-0" : "opacity-60"} transition-all`}>Collapse</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
