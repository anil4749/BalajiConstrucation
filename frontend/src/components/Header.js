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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center flex-shrink-0">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">Balaji Construction</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-amber-700 font-semibold transition text-sm md:text-base">{t('navigation.home')}</Link>
          <Link to="/projects" className="text-gray-700 hover:text-amber-700 font-semibold transition text-sm md:text-base">{t('navigation.projects')}</Link>
          <Link to="/about" className="text-gray-700 hover:text-amber-700 font-semibold transition text-sm md:text-base">{t('navigation.about')}</Link>
          <Link to="/contact" className="text-gray-700 hover:text-amber-700 font-semibold transition text-sm md:text-base">{t('navigation.contact')}</Link>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden sm:flex items-center space-x-3">
          <LanguageSwitcher />
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center space-x-2 text-sm sm:text-base font-semibold hover:from-green-600 hover:to-green-700"
          >
            <FaWhatsapp className="text-base" /> <span className="hidden sm:inline">Chat</span>
          </a>
          <Link 
            to="/contact"
            className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:shadow-lg transition font-semibold text-sm sm:text-base hover:from-amber-800 hover:to-orange-700"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Right Section - Close to Hamburger */}
        <div className="flex sm:hidden items-center gap-0.5">
          <LanguageSwitcher />
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 text-lg hover:text-green-700 transition font-bold"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <Link 
            to="/contact"
            className="text-amber-700 text-lg hover:text-amber-800 transition font-bold"
            title="Contact"
          >
            ✉️
          </Link>

          {/* Mobile Menu Button - Right Next to Icons */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden text-gray-700 text-2xl hover:text-amber-700 transition"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Menu Items Only */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-gradient-to-b from-amber-50 to-white border-t-3 border-amber-700">
          <div className="px-4 py-4 space-y-1">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-amber-700 hover:bg-amber-100 px-3 py-2 rounded-lg font-semibold transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 {t('navigation.home')}
            </Link>
            <Link 
              to="/projects" 
              className="block text-gray-700 hover:text-amber-700 hover:bg-amber-100 px-3 py-2 rounded-lg font-semibold transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏢 {t('navigation.projects')}
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 hover:text-amber-700 hover:bg-amber-100 px-3 py-2 rounded-lg font-semibold transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              ℹ️ {t('navigation.about')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
