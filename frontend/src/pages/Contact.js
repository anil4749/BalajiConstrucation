import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InquiryForm from '../components/InquiryForm';

export default function Contact() {
  const { t } = useTranslation();
  const location = useLocation();
  const projectData = location.state;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('contact.title')}</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            {t('contact.form')}
          </p>
        </div>
      </section>

      <InquiryForm projectData={projectData} />

      <Footer />
    </div>
  );
}
