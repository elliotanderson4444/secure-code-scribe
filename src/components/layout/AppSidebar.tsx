import { Shield, LayoutDashboard, Scan, History, Settings, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t, dir } = useTranslation();

  const navItems = [
    { title: t.nav.dashboard, url: "/", icon: LayoutDashboard },
    { title: t.nav.scan, url: "/scan", icon: Scan },
    { title: "Features", url: "/features", icon: Sparkles },
    { title: t.nav.history, url: "/history", icon: History },
    { title: t.nav.settings, url: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "fixed top-0 z-40 h-screen bg-sidebar border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
        dir === "rtl" ? "right-0 border-l" : "left-0 border-r"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Shield className="h-8 w-8 text-primary relative" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold gradient-text">SafeGuard</h1>
            <p className="text-[10px] text-muted-foreground -mt-1">AI Security</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              )}
            >
              {isActive && (
                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full",
                  dir === "rtl" ? "right-0 rounded-l-full rounded-r-none" : "left-0 rounded-r-full rounded-l-none"
                )} />
              )}
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <span className="font-medium text-sm animate-fade-in">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            dir === "rtl" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              {dir === "rtl" ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              <span className="text-sm">{t.nav.collapse}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
