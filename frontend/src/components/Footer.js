import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  const whatsappNumber = '+91-9637279798';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Balaji%20Construction`;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Balaji Construction</h3>
            <p className="text-gray-300">{t('vision.description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-amber-400">{t('navigation.home')}</a></li>
              <li><a href="/projects" className="hover:text-amber-400">{t('navigation.projects')}</a></li>
              <li><a href="/about" className="hover:text-amber-400">{t('navigation.about')}</a></li>
              <li><a href="/contact" className="hover:text-amber-400">{t('navigation.contact')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{t('inquiry.residential')}</li>
              <li>{t('inquiry.commercial')}</li>
              <li>{t('inquiry.industrial')}</li>
              <li>{t('footer.consulting')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('contact.title')}</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <FaPhone /> <span>+91-9637279798</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope /> <span>more.anil1693@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt /> <span>Pune, India</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 p-3 rounded-full hover:bg-green-600">
                  <FaWhatsapp size={20} />
                </a>
                <a href="tel:919637279798" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700">
                  <FaPhone size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />
        <div className="text-center text-gray-400">
          <p>&copy; 2026 Balaji Construction. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
