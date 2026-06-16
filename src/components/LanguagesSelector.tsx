"use client";
import { useTranslation } from "@/src/context/i18nContext";
import { Language } from "@/src/locales/translation";

const languages: { value: Language; label: string }[] = [
  { value: "es", label: "ESPAÑOL" },
  { value: "en", label: "ENGLISH" },
  { value: "pt", label: "PORTUGUESE" },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <span style={{ fontSize: "14px", color: "#c4a98a" }}>🌐</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        style={{
          background: "#fff8f4",
          border: "1px solid #f0d9cc",
          borderRadius: "10px",
          padding: "6px 12px",
          fontSize: "13px",
          color: "#6b4f3a",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
