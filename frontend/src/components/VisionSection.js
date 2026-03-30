import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaUsers, FaAward, FaHeart } from 'react-icons/fa';

export default function VisionSection() {
  const { t } = useTranslation();

  const values = [
    {
      icon: <FaCheckCircle size={40} />,
      key: 'quality',
      title: t('about.quality'),
      description: t('about.qualityDescription')
    },
    {
      icon: <FaUsers size={40} />,
      key: 'team',
      title: t('about.team'),
      description: t('about.teamDescription')
    },
    {
      icon: <FaAward size={40} />,
      key: 'excellence',
      title: t('about.excellence'),
      description: t('about.excellenceDescription')
    },
    {
      icon: <FaHeart size={40} />,
      key: 'trust',
      title: t('about.trust'),
      description: t('about.trustDescription')
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{t('vision.title')}</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            {t('vision.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="text-amber-600 mb-3 sm:mb-4 flex justify-center text-3xl sm:text-4xl">
                {value.icon}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{value.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
