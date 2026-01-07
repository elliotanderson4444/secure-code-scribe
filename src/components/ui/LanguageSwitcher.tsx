import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";
import { cn } from "@/lib/utils";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "EN", flag: "🇺🇸" },
  { code: "fr", name: "FR", flag: "🇫🇷" },
  { code: "ar", name: "عربي", flag: "🇸🇦" },
];

export function LanguageSwitcher() {
  const { language, setLanguage, dir } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
          "bg-muted/50 hover:bg-muted border border-border hover:border-primary/30",
          "text-sm font-medium text-foreground"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 z-50 min-w-[140px] py-1.5",
            "bg-popover border border-border rounded-lg shadow-xl",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            dir === "rtl" ? "left-0" : "right-0"
          )}
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                "hover:bg-muted/80",
                language === lang.code
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-foreground"
              )}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && (
                <span className={cn("text-primary", dir === "rtl" ? "mr-auto" : "ml-auto")}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
