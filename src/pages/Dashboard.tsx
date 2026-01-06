import { Shield, AlertTriangle, AlertCircle, Info, TrendingDown, FileSearch, Clock } from "lucide-react";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { StatsCard } from "@/components/ui/StatsCard";
import { VulnerabilityCard } from "@/components/ui/VulnerabilityCard";
import { mockVulnerabilities, mockScanHistory } from "@/data/mockVulnerabilities";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const criticalCount = mockVulnerabilities.filter(v => v.severity === "critical").length;
  const mediumCount = mockVulnerabilities.filter(v => v.severity === "medium").length;
  const lowCount = mockVulnerabilities.filter(v => v.severity === "low").length;
  
  const overallRiskScore = Math.round(
    (criticalCount * 30 + mediumCount * 15 + lowCount * 5) / mockVulnerabilities.length * 10
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Security <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Monitor your system's security status and vulnerabilities
          </p>
        </div>
        <Button 
          onClick={() => navigate("/scan")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          <FileSearch className="h-4 w-4 mr-2" />
          New Scan
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Scans"
          value={mockScanHistory.length}
          subtitle="Last 30 days"
          icon={FileSearch}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Critical Issues"
          value={criticalCount}
          subtitle="Needs immediate action"
          icon={AlertTriangle}
          variant="destructive"
        />
        <StatsCard
          title="Medium Issues"
          value={mediumCount}
          subtitle="Review recommended"
          icon={AlertCircle}
          variant="warning"
        />
        <StatsCard
          title="Low Issues"
          value={lowCount}
          subtitle="Minor concerns"
          icon={Info}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-6 text-center">Overall Risk Score</h2>
          <RiskGauge value={overallRiskScore} size="lg" />
          <div className="mt-6 flex items-center gap-2 text-sm">
            <TrendingDown className="h-4 w-4 text-success" />
            <span className="text-muted-foreground">
              <span className="text-success font-medium">8% lower</span> than last week
            </span>
          </div>
        </div>

        {/* Recent Vulnerabilities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Vulnerabilities</h2>
            <button className="text-sm text-primary hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {mockVulnerabilities.slice(0, 4).map((vuln, index) => (
              <VulnerabilityCard key={vuln.id} vulnerability={vuln} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Scans</h2>
          <button 
            onClick={() => navigate("/history")}
            className="text-sm text-primary hover:underline"
          >
            View history
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">File</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Risk Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Issues</th>
              </tr>
            </thead>
            <tbody>
              {mockScanHistory.slice(0, 5).map((scan, index) => (
                <tr 
                  key={scan.id} 
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{scan.filename}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {scan.date}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      scan.riskScore >= 70 ? "bg-destructive/10 text-destructive" :
                      scan.riskScore >= 40 ? "bg-warning/10 text-warning" :
                      "bg-success/10 text-success"
                    }`}>
                      {scan.riskScore}%
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {scan.vulnerabilities.critical > 0 && (
                        <span className="px-2 py-0.5 rounded bg-destructive/10 text-destructive text-xs">
                          {scan.vulnerabilities.critical} Critical
                        </span>
                      )}
                      {scan.vulnerabilities.medium > 0 && (
                        <span className="px-2 py-0.5 rounded bg-warning/10 text-warning text-xs">
                          {scan.vulnerabilities.medium} Medium
                        </span>
                      )}
                      {scan.vulnerabilities.low > 0 && (
                        <span className="px-2 py-0.5 rounded bg-success/10 text-success text-xs">
                          {scan.vulnerabilities.low} Low
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
