import { Shield, Clock, Trash2, Eye, Download, Search } from "lucide-react";
import { mockScanHistory } from "@/data/mockVulnerabilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { toast } from "sonner";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  const filteredScans = mockScanHistory.filter(scan =>
    scan.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (scanId: string) => {
    toast.success("Scan deleted successfully");
  };

  const handleExport = (scanId: string) => {
    toast.success("Report exported successfully");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Scan <span className="gradient-text">History</span>
          </h1>
          <p className="text-muted-foreground">
            View and manage your previous security scans
          </p>
        </div>
        
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-border"
          />
        </div>
      </div>

      {/* Scans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredScans.map((scan, index) => (
          <div
            key={scan.id}
            className="glass-panel-hover p-5 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Risk Gauge */}
              <RiskGauge value={scan.riskScore} size="sm" animated={false} />
              
              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold truncate">{scan.filename}</h3>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4" />
                  <span>{scan.date}</span>
                </div>

                {/* Issue Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
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

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedScan(scan.id)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(scan.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(scan.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredScans.length === 0 && (
        <div className="glass-panel p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No scans found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try adjusting your search query" : "Start a new scan to see results here"}
          </p>
        </div>
      )}
    </div>
  );
}
