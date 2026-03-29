import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappNumber = '919637279798';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Balaji%20Construction`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-700">Balaji Construction</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-amber-700 font-semibold transition">{t('navigation.home')}</Link>
          <Link to="/projects" className="text-gray-700 hover:text-amber-700 font-semibold transition">{t('navigation.projects')}</Link>
          <Link to="/about" className="text-gray-700 hover:text-amber-700 font-semibold transition">{t('navigation.about')}</Link>
          <Link to="/contact" className="text-gray-700 hover:text-amber-700 font-semibold transition">{t('navigation.contact')}</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
          >
            <FaWhatsapp /> <span>{t('common.chat')}</span>
          </a>
          <Link 
            to="/contact"
            className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition"
          >
            {t('contact.getInTouch')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-amber-700 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              to="/projects" 
              className="block text-gray-700 hover:text-amber-700 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.projects')}
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 hover:text-amber-700 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.about')}
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-700 hover:text-amber-700 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navigation.contact')}
            </Link>
            <hr />
            <LanguageSwitcher />
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-500 font-semibold"
            >
              <FaWhatsapp /> <span>Chat on WhatsApp</span>
            </a>
            <Link 
              to="/contact"
              className="block bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('contact.getInTouch')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
