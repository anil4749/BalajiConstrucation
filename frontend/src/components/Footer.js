import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import config from '../config/appConfig';

export default function Footer() {
  const { t } = useTranslation();
  const whatsappLink = config.whatsapp.getLink();

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-amber-400 mb-3 sm:mb-4">{config.company.name}</h3>
            <p className="text-sm sm:text-base text-gray-300">{t('vision.description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li><a href="/" className="hover:text-amber-400">{t('navigation.home')}</a></li>
              <li><a href="/projects" className="hover:text-amber-400">{t('navigation.projects')}</a></li>
              <li><a href="/about" className="hover:text-amber-400">{t('navigation.about')}</a></li>
              <li><a href="/contact" className="hover:text-amber-400">{t('navigation.contact')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>{t('inquiry.residential')}</li>
              <li>{t('inquiry.commercial')}</li>
              <li>{t('inquiry.industrial')}</li>
              <li>{t('footer.consulting')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t('contact.title')}</h4>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
              <div className="flex items-center space-x-2">
                <FaPhone className="flex-shrink-0" /> <span>{config.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="flex-shrink-0" /> <span className="text-xs sm:text-base">{config.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="flex-shrink-0" /> <span>{config.contact.address}</span>
              </div>
              <div className="flex space-x-3 sm:space-x-4 mt-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2 sm:p-3 rounded-full hover:bg-green-600">
                  <FaWhatsapp size={16} className="sm:w-5 sm:h-5" />
                </a>
                <a href={`tel:${config.contact.phone.replace(/[-\s]/g, '')}`} className="bg-blue-600 p-2 sm:p-3 rounded-full hover:bg-blue-700">
                  <FaPhone size={16} className="sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-6 sm:my-8" />
        <div className="text-center text-xs sm:text-base text-gray-400">
          <p>&copy; 2026 {config.company.name}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
