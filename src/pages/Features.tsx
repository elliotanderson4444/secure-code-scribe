import { 
  Brain, 
  Zap, 
  Lightbulb, 
  Code2, 
  FileText, 
  GitBranch,
  Shield,
  Clock,
  Lock,
  Eye
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export default function Features() {
  const { t, dir, language } = useTranslation();

  const features = [
    { icon: Brain, title: t.features.feature1Title, desc: t.features.feature1Desc, color: "text-primary" },
    { icon: Zap, title: t.features.feature2Title, desc: t.features.feature2Desc, color: "text-warning" },
    { icon: Lightbulb, title: t.features.feature3Title, desc: t.features.feature3Desc, color: "text-success" },
    { icon: Code2, title: t.features.feature4Title, desc: t.features.feature4Desc, color: "text-primary" },
    { icon: FileText, title: t.features.feature5Title, desc: t.features.feature5Desc, color: "text-warning" },
    { icon: GitBranch, title: t.features.feature6Title, desc: t.features.feature6Desc, color: "text-success" },
  ];

  const benefits = [
    { icon: Shield, title: t.benefits.benefit1Title, desc: t.benefits.benefit1Desc, value: "90%" },
    { icon: Clock, title: t.benefits.benefit2Title, desc: t.benefits.benefit2Desc, value: "80%" },
    { icon: Lock, title: t.benefits.benefit3Title, desc: t.benefits.benefit3Desc, value: "100%" },
    { icon: Eye, title: t.benefits.benefit4Title, desc: t.benefits.benefit4Desc, value: "24/7" },
  ];

  return (
    <div className="space-y-16 animate-fade-in" dir={dir}>
      {/* Features Section */}
      <section>
        <div className={cn("text-center mb-12", dir === "rtl" && "font-arabic")}>
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">
            {t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-panel-hover p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4")}>
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <div className={cn("text-center mb-12", dir === "rtl" && "font-arabic")}>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4">
            {t.benefits.title} <span className="gradient-text">{t.benefits.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-panel p-8 flex items-start gap-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold gradient-text">{benefit.value}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-panel p-8 lg:p-12 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
          <Shield className="h-16 w-16 text-primary relative" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          {language === "ar" ? "ابدأ حماية الكود الخاص بك اليوم" : language === "fr" ? "Commencez à protéger votre code" : "Start Protecting Your Code Today"}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          {language === "ar" 
            ? "انضم إلى آلاف المطورين الذين يثقون في CyberLens AI لتأمين تطبيقاتهم"
            : "Join thousands of developers who trust CyberLens AI to secure their applications"
          }
        </p>
        <a
          href="/scan"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-primary"
        >
          <Zap className="h-5 w-5" />
          {language === "ar" ? "ابدأ الفحص المجاني" : language === "fr" ? "Démarrer l'analyse gratuite" : "Start Free Scan"}
        </a>
      </section>
    </div>
  );
}
