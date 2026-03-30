import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.status === statusFilter));
    }
  }, [statusFilter, projects]);

  const statuses = [
    { key: 'all', value: 'All', label: t('common.all') },
    { key: 'ongoing', value: 'Ongoing', label: t('common.ongoing') },
    { key: 'upcoming', value: 'Upcoming', label: t('common.upcoming') },
    { key: 'completed', value: 'Completed', label: t('common.completed') }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('projects.title')}</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            {t('projects.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* Filters */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{t('projects.category')}</h3>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {statuses.map(status => (
                <button
                  key={status.key}
                  onClick={() => setStatusFilter(status.value)}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
                    statusFilter === status.value
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-300 hover:border-amber-600'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('common.loading')}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map(project => (
                    <ProjectCard key={project._id} project={project} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-600 text-lg">{t('projects.noProjects')}</p>
                  </div>
                )}
              </div>

              {filteredProjects.length > 0 && (
                <div className="text-center text-gray-600">
                  <p>Showing {filteredProjects.length} project(s)</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
