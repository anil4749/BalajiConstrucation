import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'mr', label: 'MR' }
  ];

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 font-medium text-gray-700 cursor-pointer transition hover:border-gray-400 sm:px-3 sm:py-1.5 sm:text-sm sm:rounded-md sm:border-2 sm:border-amber-600 sm:bg-white sm:font-semibold sm:text-amber-700 sm:hover:border-amber-700 sm:hover:bg-amber-50 focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
