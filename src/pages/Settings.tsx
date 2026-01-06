import { useState } from "react";
import { Shield, Bell, Moon, Sun, Lock, Zap, Save, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { t, language, setLanguage, dir } = useTranslation();
  
  const [settings, setSettings] = useState({
    notifications: true,
    autoScan: false,
    darkMode: true,
    twoFactor: false,
    apiKey: "",
  });

  const handleSave = () => {
    toast.success(dir === "rtl" ? "تم حفظ الإعدادات بنجاح!" : "Settings saved successfully!");
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  return (
    <div className={cn("space-y-8 animate-fade-in max-w-3xl", dir === "rtl" && "text-right")} dir={dir}>
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          <span className="gradient-text">{t.settings.title}</span>
        </h1>
        <p className="text-muted-foreground">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Language Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className={cn("flex items-center gap-3 pb-4 border-b border-border", dir === "rtl" && "flex-row-reverse")}>
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t.settings.language}</h2>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4">{t.settings.selectLanguage}</p>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
                  language === lang.code
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className={cn("flex items-center gap-3 pb-4 border-b border-border", dir === "rtl" && "flex-row-reverse")}>
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t.settings.profile}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t.settings.fullName}</Label>
            <Input id="name" placeholder="John Doe" className="bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.settings.email}</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="bg-muted/30" />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className={cn("flex items-center gap-3 pb-4 border-b border-border", dir === "rtl" && "flex-row-reverse")}>
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t.settings.notifications}</h2>
        </div>

        <div className="space-y-4">
          <div className={cn("flex items-center justify-between", dir === "rtl" && "flex-row-reverse")}>
            <div className={dir === "rtl" ? "text-right" : ""}>
              <p className="font-medium">{t.settings.emailNotifications}</p>
              <p className="text-sm text-muted-foreground">{t.settings.emailNotificationsDesc}</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>

          <div className={cn("flex items-center justify-between", dir === "rtl" && "flex-row-reverse")}>
            <div className={dir === "rtl" ? "text-right" : ""}>
              <p className="font-medium">{t.settings.autoScan}</p>
              <p className="text-sm text-muted-foreground">{t.settings.autoScanDesc}</p>
            </div>
            <Switch
              checked={settings.autoScan}
              onCheckedChange={(checked) => setSettings({ ...settings, autoScan: checked })}
            />
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className={cn("flex items-center gap-3 pb-4 border-b border-border", dir === "rtl" && "flex-row-reverse")}>
          <Moon className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t.settings.appearance}</h2>
        </div>

        <div className={cn("flex items-center justify-between", dir === "rtl" && "flex-row-reverse")}>
          <div className={cn("flex items-center gap-3", dir === "rtl" && "flex-row-reverse")}>
            {settings.darkMode ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
            <div className={dir === "rtl" ? "text-right" : ""}>
              <p className="font-medium">{t.settings.darkMode}</p>
              <p className="text-sm text-muted-foreground">{t.settings.darkModeDesc}</p>
            </div>
          </div>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
          />
        </div>
      </div>

      {/* Security Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className={cn("flex items-center gap-3 pb-4 border-b border-border", dir === "rtl" && "flex-row-reverse")}>
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t.settings.security}</h2>
        </div>

        <div className="space-y-4">
          <div className={cn("flex items-center justify-between", dir === "rtl" && "flex-row-reverse")}>
            <div className={dir === "rtl" ? "text-right" : ""}>
              <p className="font-medium">{t.settings.twoFactor}</p>
              <p className="text-sm text-muted-foreground">{t.settings.twoFactorDesc}</p>
            </div>
            <Switch
              checked={settings.twoFactor}
              onCheckedChange={(checked) => setSettings({ ...settings, twoFactor: checked })}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10">
              {t.settings.changePassword}
            </Button>
          </div>
        </div>
      </div>

      {/* API Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className={cn("flex items-center gap-3 pb-4 border-b border-border", dir === "rtl" && "flex-row-reverse")}>
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t.settings.apiIntegration}</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">{t.settings.apiKey}</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder={t.settings.apiKeyPlaceholder}
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              className="bg-muted/30 font-mono"
            />
            <p className="text-xs text-muted-foreground">
              {t.settings.apiKeyDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className={cn("flex", dir === "rtl" ? "justify-start" : "justify-end")}>
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
          <Save className={cn("h-4 w-4", dir === "rtl" ? "ml-2" : "mr-2")} />
          {t.settings.saveChanges}
        </Button>
      </div>
    </div>
  );
}
