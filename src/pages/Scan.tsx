import { useState } from "react";
import { FileDropzone } from "@/components/ui/FileDropzone";
import { ScanAnimation } from "@/components/ui/ScanAnimation";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { VulnerabilityCard } from "@/components/ui/VulnerabilityCard";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Shield, AlertTriangle, AlertCircle, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

type ScanState = "idle" | "scanning" | "complete";

interface Vulnerability {
  id: string;
  severity: "critical" | "medium" | "low";
  title: string;
  description: string;
  location: string;
  fix: string;
}

interface ScanResult {
  riskScore: number;
  summary: string;
  vulnerabilities: Vulnerability[];
}

export default function Scan() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { t, dir, language } = useTranslation();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const getFileLanguage = (filename: string): string => {
    if (filename.endsWith('.py')) return 'python';
    if (filename.endsWith('.js')) return 'javascript';
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
    if (filename.endsWith('.json')) return 'json';
    if (filename.endsWith('.csv')) return 'csv';
    return '';
  };

  const analyzeFile = async (file: File): Promise<ScanResult> => {
    const content = await file.text();
    const language = getFileLanguage(file.name);
    
    const { data, error } = await supabase.functions.invoke('analyze-code', {
      body: { 
        code: content, 
        filename: file.name,
        language 
      }
    });

    if (error) {
      console.error('Analysis error:', error);
      throw new Error(error.message || 'Analysis failed');
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  };

  const handleStartScan = async () => {
    if (selectedFiles.length === 0) {
      toast.error(language === "ar" ? "الرجاء اختيار ملفات للفحص" : "Please select files to scan");
      return;
    }
    
    setScanState("scanning");
  };

  const handleScanComplete = async () => {
    setIsAnalyzing(true);
    
    try {
      // Analyze all files and combine results
      const allVulnerabilities: Vulnerability[] = [];
      let totalRiskScore = 0;
      let summaries: string[] = [];

      for (const file of selectedFiles) {
        try {
          const result = await analyzeFile(file);
          
          // Add file name to vulnerability locations
          const vulnsWithFile = (result.vulnerabilities || []).map((v: any, index: number) => ({
            ...v,
            id: `${file.name}-${index}`,
            location: `${file.name}: ${v.location}`
          }));
          
          allVulnerabilities.push(...vulnsWithFile);
          totalRiskScore = Math.max(totalRiskScore, result.riskScore || 0);
          if (result.summary) summaries.push(`${file.name}: ${result.summary}`);
        } catch (fileError) {
          console.error(`Error analyzing ${file.name}:`, fileError);
          toast.error(`${language === "ar" ? "فشل تحليل" : "Failed to analyze"} ${file.name}`);
        }
      }

      setScanResult({
        riskScore: totalRiskScore,
        summary: summaries.join('\n'),
        vulnerabilities: allVulnerabilities
      });

      setScanState("complete");
      toast.success(language === "ar" ? "تم الفحص بنجاح!" : "Scan completed successfully!");
    } catch (error) {
      console.error('Scan error:', error);
      toast.error(language === "ar" ? "فشل الفحص. يرجى المحاولة مرة أخرى." : "Scan failed. Please try again.");
      setScanState("idle");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setScanState("idle");
    setSelectedFiles([]);
    setScanResult(null);
  };

  const handleExportReport = () => {
    if (!scanResult) return;

    const criticalCount = scanResult.vulnerabilities.filter(v => v.severity === 'critical').length;
    const mediumCount = scanResult.vulnerabilities.filter(v => v.severity === 'medium').length;
    const lowCount = scanResult.vulnerabilities.filter(v => v.severity === 'low').length;

    const report = `
CYBERLENS AI - SECURITY SCAN REPORT
=====================================
Generated: ${new Date().toLocaleString()}
Files Scanned: ${selectedFiles.map(f => f.name).join(", ")}

SUMMARY
-------
Risk Score: ${scanResult.riskScore}%
Total Vulnerabilities: ${scanResult.vulnerabilities.length}
- Critical: ${criticalCount}
- Medium: ${mediumCount}
- Low: ${lowCount}

${scanResult.summary ? `Analysis Summary:\n${scanResult.summary}\n` : ''}

VULNERABILITIES
---------------
${scanResult.vulnerabilities.map((v, i) => `
${i + 1}. [${v.severity.toUpperCase()}] ${v.title}
   Location: ${v.location}
   Description: ${v.description}
   Suggested Fix: ${v.fix}
`).join('\n') || 'No vulnerabilities detected.'}

=====================================
Report generated by CyberLens AI
    `;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `security-report-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success(language === "ar" ? "تم تحميل التقرير بنجاح!" : "Report downloaded successfully!");
  };

  const criticalCount = scanResult?.vulnerabilities.filter(v => v.severity === 'critical').length || 0;
  const mediumCount = scanResult?.vulnerabilities.filter(v => v.severity === 'medium').length || 0;
  const lowCount = scanResult?.vulnerabilities.filter(v => v.severity === 'low').length || 0;

  return (
    <div className={cn("space-y-8 animate-fade-in", dir === "rtl" && "text-right")} dir={dir}>
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          {t.scan.title} <span className="gradient-text">{t.scan.titleHighlight}</span>
        </h1>
        <p className="text-muted-foreground">
          {t.scan.subtitle}
        </p>
      </div>

      {/* Idle State - File Upload */}
      {scanState === "idle" && (
        <div className="max-w-2xl mx-auto space-y-6">
          <FileDropzone onFilesSelected={handleFilesSelected} />
          
          {selectedFiles.length > 0 && (
            <Button
              onClick={handleStartScan}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg glow-primary"
            >
              <Shield className={cn("h-5 w-5", dir === "rtl" ? "ml-2" : "mr-2")} />
              {t.scan.startScan}
            </Button>
          )}
        </div>
      )}

      {/* Scanning State */}
      {scanState === "scanning" && (
        <div className="max-w-xl mx-auto">
          <ScanAnimation isScanning={true} onComplete={handleScanComplete} />
          {isAnalyzing && (
            <div className="mt-6 flex items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{language === "ar" ? "جاري تحليل الكود بالذكاء الاصطناعي..." : "AI is analyzing your code..."}</span>
            </div>
          )}
        </div>
      )}

      {/* Complete State - Results */}
      {scanState === "complete" && scanResult && (
        <div className="space-y-8">
          {/* Action Buttons */}
          <div className={cn("flex flex-wrap gap-4", dir === "rtl" ? "justify-start" : "justify-end")}>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className={cn("h-4 w-4", dir === "rtl" ? "ml-2" : "mr-2")} />
              {t.scan.newScan}
            </Button>
            <Button onClick={handleExportReport} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className={cn("h-4 w-4", dir === "rtl" ? "ml-2" : "mr-2")} />
              {t.scan.exportReport}
            </Button>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Risk Gauge */}
            <div className="glass-panel p-6 flex flex-col items-center justify-center">
              <RiskGauge value={scanResult.riskScore} size="md" />
            </div>

            {/* Severity Breakdown */}
            <div className="lg:col-span-3 glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4">{t.scan.vulnerabilitySummary}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={cn("flex items-center gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20", dir === "rtl" && "flex-row-reverse")}>
                  <div className="p-3 rounded-lg bg-destructive/20">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
                    <p className="text-sm text-muted-foreground">{t.common.critical}</p>
                  </div>
                </div>
                
                <div className={cn("flex items-center gap-4 p-4 rounded-xl bg-warning/10 border border-warning/20", dir === "rtl" && "flex-row-reverse")}>
                  <div className="p-3 rounded-lg bg-warning/20">
                    <AlertCircle className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-warning">{mediumCount}</p>
                    <p className="text-sm text-muted-foreground">{t.common.medium}</p>
                  </div>
                </div>
                
                <div className={cn("flex items-center gap-4 p-4 rounded-xl bg-success/10 border border-success/20", dir === "rtl" && "flex-row-reverse")}>
                  <div className="p-3 rounded-lg bg-success/20">
                    <Info className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">{lowCount}</p>
                    <p className="text-sm text-muted-foreground">{t.common.low}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vulnerabilities List */}
          {scanResult.vulnerabilities.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">{t.scan.detectedVulnerabilities}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {scanResult.vulnerabilities.map((vuln, index) => (
                  <VulnerabilityCard
                    key={vuln.id}
                    vulnerability={{
                      id: vuln.id,
                      title: vuln.title,
                      severity: vuln.severity,
                      description: vuln.description,
                      location: vuln.location,
                      suggestion: vuln.fix,
                    }}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-success">
                {language === "ar" ? "الكود آمن!" : "Your Code is Secure!"}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {language === "ar" 
                  ? "لم يتم العثور على ثغرات أمنية في الملفات التي تم فحصها. استمر في العمل الرائع!"
                  : "No security vulnerabilities were found in the scanned files. Keep up the great work!"
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
