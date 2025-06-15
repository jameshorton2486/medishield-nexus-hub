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
  Link2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
    badge: null
  },
  {
    label: "Clients",
    icon: Users,
    to: "/clients",
    badge: "142"
  },
  {
    label: "Providers",
    icon: FolderOpen,
    to: "/providers",
    badge: null
  },
  {
    label: "Requests",
    icon: Link2,
    to: "/requests",
    badge: "23"
  },
  {
    label: "Documents",
    icon: FileBox,
    to: "/documents",
    badge: null
  },
  {
    label: "Reports",
    icon: PieChart,
    to: "/reports",
    badge: null
  },
  {
    label: "Documentation",
    icon: BookOpen,
    to: "/documentation",
    badge: null
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
    badge: null
  },
];

// Admin-only items
export const ADMIN_ITEMS = [
  {
    label: "Onboarding",
    icon: UserPlus,
    to: "/onboarding",
    badge: null
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const allItems = user?.role === "admin" ? [...NAV_ITEMS, ...ADMIN_ITEMS] : NAV_ITEMS;

  return (
    <aside
      className={`h-[calc(100vh-4rem)] sticky top-16 z-20 bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"} flex flex-col`}
    >
      {/* Navigation Header */}
      <div className="p-4 border-b border-gray-100">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <div>
              <h3 className="font-semibold text-gray-900">Navigation</h3>
              <p className="text-xs text-gray-500">Medical Records System</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
        {allItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${active 
                  ? "bg-primary text-white shadow-md" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                } 
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? item.label : undefined}
            >
              <div className="relative">
                <item.icon size={20} className="shrink-0" />
                {item.badge && !collapsed && (
                  <Badge 
                    className={`absolute -top-2 -right-2 h-4 w-4 text-xs p-0 flex items-center justify-center
                      ${active ? "bg-white text-primary" : "bg-primary text-white"}
                    `}
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`transition-all duration-200 ${
                collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}>
                {item.label}
              </span>
              {item.badge && !collapsed && (
                <Badge 
                  variant="secondary" 
                  className={`ml-auto text-xs ${
                    active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        {!collapsed && (
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Acme Health Firm</p>
            <Badge variant="outline" className="text-xs">
              Professional Plan
            </Badge>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
