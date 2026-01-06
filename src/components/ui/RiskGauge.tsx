import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  value: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function RiskGauge({ value, size = "md", animated = true }: RiskGaugeProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (value - start) * easeOut);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, animated]);

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-36 h-36",
    lg: "w-48 h-48",
  };

  const strokeWidth = size === "sm" ? 6 : size === "md" ? 8 : 10;
  const radius = size === "sm" ? 40 : size === "md" ? 60 : 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayValue / 100) * circumference;

  const getColor = (val: number) => {
    if (val <= 30) return { stroke: "hsl(var(--success))", glow: "glow-success", text: "text-success" };
    if (val <= 60) return { stroke: "hsl(var(--warning))", glow: "glow-warning", text: "text-warning" };
    return { stroke: "hsl(var(--destructive))", glow: "glow-destructive", text: "text-destructive" };
  };

  const colors = getColor(displayValue);

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
      {/* Glow effect */}
      <div className={cn("absolute inset-0 rounded-full blur-2xl opacity-30", colors.glow)} />
      
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-30"
        />
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300 drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.stroke})`,
          }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold", colors.text, {
          "text-2xl": size === "sm",
          "text-4xl": size === "md",
          "text-5xl": size === "lg",
        })}>
          {displayValue}
        </span>
        <span className="text-muted-foreground text-xs uppercase tracking-wider">Risk Score</span>
      </div>
    </div>
  );
}
