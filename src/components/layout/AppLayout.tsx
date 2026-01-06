import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dir } = useTranslation();

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile Header */}
      <div className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-4"
      )}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className={cn("flex items-center gap-2", dir === "rtl" ? "mr-3" : "ml-3")}>
          <div className="h-6 w-6 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">SG</span>
          </div>
          <span className="font-semibold gradient-text">SafeGuard AI</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={cn("w-64 h-full", dir === "rtl" ? "mr-auto" : "ml-0")}
            onClick={(e) => e.stopPropagation()}
          >
            <AppSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 pt-14 lg:pt-0",
          dir === "rtl" ? "lg:mr-64" : "lg:ml-64"
        )}
      >
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
