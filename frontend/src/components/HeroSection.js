import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative h-screen bg-cover bg-center" 
      style={{backgroundImage: 'url(https://picsum.photos/1200/600?random=hero)'}}>
      
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto h-full flex items-center justify-center px-4">
        <div className="text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">{t('hero.title')}</h2>
          <p className="text-xl md:text-2xl mb-8">{t('hero.subtitle')}</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => navigate('/projects')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition">
              {t('hero.cta')}
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white hover:bg-gray-200 text-amber-700 font-bold py-3 px-8 rounded-lg transition">
              {t('inquiry.submitInquiry')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
