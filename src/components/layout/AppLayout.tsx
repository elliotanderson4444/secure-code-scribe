import { ReactNode, useState, useCallback } from "react";
import { AppSidebar } from "./AppSidebar";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dir } = useTranslation();

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Mobile Header with Language Switcher */}
      <header
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-50 h-14",
          "bg-background/95 backdrop-blur-xl border-b border-border",
          "flex items-center justify-between px-4"
        )}
      >
        <div className={cn("flex items-center gap-3", dir === "rtl" && "flex-row-reverse")}>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">SG</span>
            </div>
            <span className="font-semibold gradient-text">SafeGuard AI</span>
          </div>
        </div>

        {/* Language Switcher in Mobile Header */}
        <LanguageSwitcher />
      </header>

      {/* Desktop Header with Language Switcher */}
      <header
        className={cn(
          "hidden lg:flex fixed top-0 z-40 h-14",
          "bg-background/95 backdrop-blur-xl border-b border-border",
          "items-center justify-end px-6",
          dir === "rtl" ? "left-0 right-64" : "right-0 left-64"
        )}
      >
        <LanguageSwitcher />
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          {/* Sidebar */}
          <div
            className={cn(
              "lg:hidden fixed top-0 z-50 h-full w-64",
              dir === "rtl" ? "right-0" : "left-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <AppSidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 pt-14",
          dir === "rtl" ? "lg:mr-64" : "lg:ml-64"
        )}
      >
        <div className="p-4 lg:p-8 lg:pt-20">
          {children}
        </div>
      </main>
    </div>
  );
}
