import { Shield, Clock, Trash2, Eye, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, dir } = useTranslation();

  // Empty state - no mock data
  const scans: any[] = [];

  return (
    <div className={cn("space-y-8 animate-fade-in", dir === "rtl" && "text-right")} dir={dir}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {t.history.title} <span className="gradient-text">{t.history.titleHighlight}</span>
          </h1>
          <p className="text-muted-foreground">
            {t.history.subtitle}
          </p>
        </div>
        
        <div className="relative w-full lg:w-72">
          <Search className={cn(
            "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
            dir === "rtl" ? "right-3" : "left-3"
          )} />
          <Input
            placeholder={t.history.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("bg-muted/30 border-border", dir === "rtl" ? "pr-10" : "pl-10")}
          />
        </div>
      </div>

      {/* Empty State */}
      <div className="glass-panel p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{t.history.noScansFound}</h3>
        <p className="text-muted-foreground">
          {t.history.startNewScan}
        </p>
      </div>
    </div>
  );
}
