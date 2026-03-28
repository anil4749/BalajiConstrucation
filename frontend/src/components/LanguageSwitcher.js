import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  return (
    <div className="language-switcher">
      <div className="flex items-center gap-2 ml-4">
        <IoLanguage className="text-lg" />
        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white font-medium"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
