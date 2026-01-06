import { useState } from "react";
import { Shield, Bell, Moon, Sun, Lock, Zap, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoScan: false,
    darkMode: true,
    twoFactor: false,
    apiKey: "",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-muted-foreground">
          Configure your SafeGuard AI preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" className="bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="bg-muted/30" />
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts for critical vulnerabilities</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-Scan on Upload</p>
              <p className="text-sm text-muted-foreground">Automatically scan files when uploaded</p>
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
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Moon className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Appearance</h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {settings.darkMode ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
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
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch
              checked={settings.twoFactor}
              onCheckedChange={(checked) => setSettings({ ...settings, twoFactor: checked })}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10">
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* API Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">API Integration</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              className="bg-muted/30 font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is used for external integrations and CI/CD pipelines
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
