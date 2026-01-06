import { Shield, Bug, AlertTriangle, FileSearch, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScanAnimationProps {
  isScanning: boolean;
  onComplete?: () => void;
}

const scanSteps = [
  { icon: FileSearch, label: "Analyzing file structure...", color: "text-primary" },
  { icon: Bug, label: "Detecting security vulnerabilities...", color: "text-destructive" },
  { icon: AlertTriangle, label: "Checking logic errors...", color: "text-warning" },
  { icon: Shield, label: "Scanning data anomalies...", color: "text-primary" },
  { icon: CheckCircle, label: "Generating AI recommendations...", color: "text-success" },
];

export function ScanAnimation({ isScanning, onComplete }: ScanAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isScanning) {
      setCurrentStep(0);
      setProgress(0);
      setCompleted(false);
      return;
    }

    const stepDuration = 1500;
    const progressInterval = 30;
    const progressIncrement = 100 / (scanSteps.length * (stepDuration / progressInterval));

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + progressIncrement;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= scanSteps.length - 1) {
          clearInterval(stepTimer);
          setTimeout(() => {
            setCompleted(true);
            onComplete?.();
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [isScanning, onComplete]);

  if (!isScanning && !completed) return null;

  return (
    <div className="glass-panel p-8 animate-scale-in">
      {/* Scanning visualization */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow" />
        
        {/* Middle ring */}
        <div className="absolute inset-4 rounded-full border-2 border-primary/30 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "6s" }} />
        
        {/* Inner ring */}
        <div className="absolute inset-8 rounded-full border-2 border-primary/40 animate-spin-slow" style={{ animationDuration: "4s" }} />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full pulse-ring" />
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent scan-line" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Scanning progress</span>
          <span className="font-mono text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scan steps */}
      <div className="space-y-3">
        {scanSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          
          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                isActive && "bg-primary/10 border border-primary/20",
                isPast && "opacity-50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                isActive ? "bg-primary/20" : "bg-muted"
              )}>
                <Icon className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? step.color : "text-muted-foreground",
                  isPast && "text-success"
                )} />
              </div>
              <span className={cn(
                "text-sm transition-colors",
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
              {isActive && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              )}
              {isPast && (
                <CheckCircle className="ml-auto h-4 w-4 text-success" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
