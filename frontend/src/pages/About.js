import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VisionSection from '../components/VisionSection';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-lg text-gray-300">
            {t('vision.description')}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.whoWeAre')}</h2>
            <p className="text-lg text-gray-600 mb-4">
              {t('about.whoWeAreDesc')}
            </p>
            <p className="text-lg text-gray-600">
              {t('about.whoWeAreDesc2')}
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.ourApproach')}</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start space-x-4">
                <span className="text-amber-600 font-bold">✓</span>
                <span><strong>{t('about.landSelection')}:</strong> {t('about.landSelectionDesc')}</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-amber-600 font-bold">✓</span>
                <span><strong>{t('about.qualityConstruction')}:</strong> {t('about.qualityConstructionDesc')}</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-amber-600 font-bold">✓</span>
                <span><strong>{t('about.modernDesign')}:</strong> {t('about.modernDesignDesc')}</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-amber-600 font-bold">✓</span>
                <span><strong>{t('about.timelyDelivery')}:</strong> {t('about.timelyDeliveryDesc')}</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-amber-600 font-bold">✓</span>
                <span><strong>{t('about.customerSupport')}:</strong> {t('about.customerSupportDesc')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <VisionSection />

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('about.whyChoose')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-3">✓ {t('about.provenTrack')}</h3>
              <p className="text-gray-600">{t('about.provenTrackDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-3">✓ {t('about.primeLocations')}</h3>
              <p className="text-gray-600">{t('about.primeLocationsDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-3">✓ {t('about.qualityAssurance')}</h3>
              <p className="text-gray-600">{t('about.qualityAssuranceDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-3">✓ {t('about.transparentDealings')}</h3>
              <p className="text-gray-600">{t('about.transparentDealingsDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-3">✓ {t('about.modernAmenities')}</h3>
              <p className="text-gray-600">{t('about.modernAmenitiesDesc')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-3">✓ {t('about.postSalesSupport')}</h3>
              <p className="text-gray-600">{t('about.postSalesSupportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
