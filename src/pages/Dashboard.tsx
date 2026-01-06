import { Shield, AlertTriangle, AlertCircle, Info, TrendingDown, FileSearch, Clock } from "lucide-react";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { StatsCard } from "@/components/ui/StatsCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, dir, language } = useTranslation();
  
  // Empty state - no mock data
  const criticalCount = 0;
  const mediumCount = 0;
  const lowCount = 0;
  const overallRiskScore = 0;
  const totalScans = 0;

  return (
    <div className={cn("space-y-8 animate-fade-in", dir === "rtl" && "text-right")} dir={dir}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {t.dashboard.title} <span className="gradient-text">{t.dashboard.titleHighlight}</span>
          </h1>
          <p className="text-muted-foreground">
            {t.dashboard.subtitle}
          </p>
        </div>
        <Button 
          onClick={() => navigate("/scan")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          <FileSearch className={cn("h-4 w-4", dir === "rtl" ? "ml-2" : "mr-2")} />
          {t.dashboard.newScan}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t.dashboard.totalScans}
          value={totalScans}
          subtitle={t.dashboard.last30Days}
          icon={FileSearch}
          variant="primary"
        />
        <StatsCard
          title={t.dashboard.criticalIssues}
          value={criticalCount}
          subtitle={t.dashboard.needsAction}
          icon={AlertTriangle}
          variant="destructive"
        />
        <StatsCard
          title={t.dashboard.mediumIssues}
          value={mediumCount}
          subtitle={t.dashboard.reviewRecommended}
          icon={AlertCircle}
          variant="warning"
        />
        <StatsCard
          title={t.dashboard.lowIssues}
          value={lowCount}
          subtitle={t.dashboard.minorConcerns}
          icon={Info}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-6 text-center">{t.dashboard.overallRiskScore}</h2>
          <RiskGauge value={overallRiskScore} size="lg" />
          <div className="mt-6 flex items-center gap-2 text-sm">
            <TrendingDown className="h-4 w-4 text-success" />
            <span className="text-muted-foreground">
              <span className="text-success font-medium">0%</span> {t.dashboard.lowerThanLastWeek}
            </span>
          </div>
        </div>

        {/* Empty State - No Vulnerabilities */}
        <div className="lg:col-span-2 glass-panel p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {language === "ar" ? "لا توجد ثغرات مكتشفة" : "No Vulnerabilities Detected"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {language === "ar"
              ? "ابدأ فحصًا جديدًا لتحليل ملفاتك والكشف عن المشكلات الأمنية المحتملة"
              : "Start a new scan to analyze your files and detect potential security issues"
            }
          </p>
          <Button 
            onClick={() => navigate("/scan")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <FileSearch className={cn("h-4 w-4", dir === "rtl" ? "ml-2" : "mr-2")} />
            {t.dashboard.newScan}
          </Button>
        </div>
      </div>

      {/* Recent Scans - Empty State */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{t.dashboard.recentScans}</h2>
          <button 
            onClick={() => navigate("/history")}
            className="text-sm text-primary hover:underline"
          >
            {t.dashboard.viewHistory}
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "لا توجد فحوصات حتى الآن. ابدأ فحصك الأول!"
              : "No scans yet. Start your first scan!"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
