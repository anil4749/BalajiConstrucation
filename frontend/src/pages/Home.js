import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import VisionSection from '../components/VisionSection';
import ProjectCard from '../components/ProjectCard';
import InquiryForm from '../components/InquiryForm';
import { getProjects } from '../services/api';

export default function Home() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.slice(0, 6)); // Show first 6 projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeroSection />

      <VisionSection />

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('projects.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('common.loading')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length > 0 ? (
                projects.map(project => (
                  <ProjectCard key={project._id} project={project} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">{t('projects.noProjects')}</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <a 
              href="/projects"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              {t('projects.title')}
            </a>
          </div>
        </div>
      </section>

      <InquiryForm />

      <Footer />
    </div>
  );
}
