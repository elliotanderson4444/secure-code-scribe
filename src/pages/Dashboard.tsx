import { Shield, Zap, Brain, Lock, Rocket, FileSearch, Sparkles, CheckCircle2 } from "lucide-react";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, dir, language } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: language === "ar" ? "تحليل ذكي بالـ AI" : language === "fr" ? "Analyse IA Intelligente" : "AI-Powered Analysis",
      desc: language === "ar" ? "كشف الثغرات بدقة 99.9%" : language === "fr" ? "Détection des vulnérabilités à 99.9%" : "99.9% vulnerability detection accuracy",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Zap,
      title: language === "ar" ? "فحص فوري" : language === "fr" ? "Analyse Instantanée" : "Instant Scanning",
      desc: language === "ar" ? "نتائج في أقل من 30 ثانية" : language === "fr" ? "Résultats en moins de 30 secondes" : "Results in under 30 seconds",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: Lock,
      title: language === "ar" ? "أمان على مستوى البنوك" : language === "fr" ? "Sécurité Bancaire" : "Bank-Level Security",
      desc: language === "ar" ? "تشفير AES-256 متقدم" : language === "fr" ? "Chiffrement AES-256 avancé" : "Advanced AES-256 encryption",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Rocket,
      title: language === "ar" ? "أداء فائق" : language === "fr" ? "Performance Maximale" : "Maximum Performance",
      desc: language === "ar" ? "معالجة آلاف الملفات بسرعة" : language === "fr" ? "Traitement rapide de milliers de fichiers" : "Process thousands of files quickly",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const benefits = [
    language === "ar" ? "كشف تلقائي للثغرات الأمنية" : language === "fr" ? "Détection automatique des vulnérabilités" : "Automatic vulnerability detection",
    language === "ar" ? "اقتراحات إصلاح ذكية بالـ AI" : language === "fr" ? "Suggestions de correctifs IA intelligentes" : "Smart AI-powered fix suggestions",
    language === "ar" ? "دعم Python, JavaScript, TypeScript" : language === "fr" ? "Support Python, JavaScript, TypeScript" : "Python, JavaScript, TypeScript support",
    language === "ar" ? "تقارير تفصيلية قابلة للتصدير" : language === "fr" ? "Rapports détaillés exportables" : "Detailed exportable reports",
  ];

  return (
    <div className={cn("space-y-8 animate-fade-in", dir === "rtl" && "text-right")} dir={dir}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {language === "ar" ? "مرحباً بك في" : language === "fr" ? "Bienvenue sur" : "Welcome to"}{" "}
            <span className="gradient-text">CyberLens AI</span>
          </h1>
          <p className="text-muted-foreground">
            {language === "ar" 
              ? "منصة الأمان الذكية لحماية الكود الخاص بك"
              : language === "fr"
              ? "La plateforme de sécurité intelligente pour protéger votre code"
              : "The intelligent security platform to protect your code"
            }
          </p>
        </div>
        <Button 
          onClick={() => navigate("/scan")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          <FileSearch className={cn("h-4 w-4", dir === "rtl" ? "ml-2" : "mr-2")} />
          {language === "ar" ? "ابدأ الفحص الآن" : language === "fr" ? "Démarrer l'analyse" : "Start Scan Now"}
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-panel-hover p-5 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.bgColor)}>
              <feature.icon className={cn("h-6 w-6", feature.color)} />
            </div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CTA Section */}
        <div className="lg:col-span-2 glass-panel p-8 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center overflow-hidden">
              <img src="/assets/logo.png" alt="CyberLens AI Logo" className="w-full h-full object-contain p-2" />
            </div>
          </div>
          <h3 className="text-xl lg:text-2xl font-bold mb-3">
            {language === "ar" ? "اكتشف قوة الذكاء الاصطناعي في الأمان" : language === "fr" ? "Découvrez la puissance de l'IA en sécurité" : "Discover the Power of AI Security"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg">
            {language === "ar"
              ? "قم بتحليل الكود الخاص بك واكتشف الثغرات الأمنية قبل أن تصبح مشاكل حقيقية"
              : language === "fr"
              ? "Analysez votre code et découvrez les vulnérabilités avant qu'elles ne deviennent de vrais problèmes"
              : "Analyze your code and discover vulnerabilities before they become real problems"
            }
          </p>
          
          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mb-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  dir === "rtl" && "flex-row-reverse text-right"
                )}
              >
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => navigate("/scan")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
          >
            <Scan className={cn("h-5 w-5", dir === "rtl" ? "ml-2" : "mr-2")} />
            {language === "ar" ? "ابدأ الفحص المجاني" : language === "fr" ? "Démarrer l'analyse gratuite" : "Start Free Scan"}
          </Button>
        </div>

        {/* Security Score Preview */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-6 text-center">
            {language === "ar" ? "مستوى الأمان" : language === "fr" ? "Niveau de Sécurité" : "Security Level"}
          </h2>
          <RiskGauge value={0} size="lg" />
          <p className="mt-6 text-sm text-muted-foreground text-center">
            {language === "ar" 
              ? "ابدأ أول فحص لمعرفة مستوى أمان الكود"
              : language === "fr"
              ? "Lancez votre première analyse pour connaître le niveau de sécurité"
              : "Start your first scan to know your code security level"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
