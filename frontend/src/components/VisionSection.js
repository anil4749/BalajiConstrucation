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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('vision.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('vision.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="text-amber-600 mb-4 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
