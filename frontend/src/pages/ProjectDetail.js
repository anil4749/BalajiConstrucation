import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProjectDetail } from '../services/api';
import { FaMapMarkerAlt, FaRuler, FaCheckCircle, FaDownload } from 'react-icons/fa';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectDetail(id);
        setProject(data);
        if (data.image) {
          setSelectedImage(data.image);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-600">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-600">Project not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
            {project.reraNumber && (
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">RERA Number</p>
                <p className="text-lg font-bold">{project.reraNumber}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Gallery Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="aspect-video bg-gray-200 relative">
            <img 
              src={selectedImage || 'https://picsum.photos/1200/600?random=detail'} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              Development: {project.developmentStage || 'N/A'}
            </div>
          </div>

          {/* Image Gallery Tabs */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Project Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Main image */}
              <button
                onClick={() => setSelectedImage(project.image)}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-gray-300"
              >
                <img src={project.image || 'https://picsum.photos/150/150?random=1'} alt="Main" className="w-full h-full object-cover" />
              </button>

              {/* Planning Pictures */}
              {project.planningPictures && project.planningPictures.map((img, i) => (
                <button
                  key={`plan-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-gray-300"
                  title="Planning"
                >
                  <img src={img} alt={`Planning ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Layout Images */}
              {project.layoutImages && project.layoutImages.map((img, i) => (
                <button
                  key={`layout-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-blue-300"
                  title="Floor Layout"
                >
                  <img src={img} alt={`Layout ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Before Development */}
              {project.beforeDevelopmentImages && project.beforeDevelopmentImages.map((img, i) => (
                <button
                  key={`before-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-yellow-300"
                  title="Before Development"
                >
                  <img src={img} alt={`Before ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Current Site */}
              {project.currentSiteImages && project.currentSiteImages.map((img, i) => (
                <button
                  key={`current-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-orange-300"
                  title="Current Construction"
                >
                  <img src={img} alt={`Current ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Completion Renders */}
              {project.completionRenderImages && project.completionRenderImages.map((img, i) => (
                <button
                  key={`render-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-green-300"
                  title="After Completion"
                >
                  <img src={img} alt={`Completion ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Inside Views */}
              {project.insideViewImages && project.insideViewImages.map((img, i) => (
                <button
                  key={`inside-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-purple-300"
                  title="Inside View"
                >
                  <img src={img} alt={`Inside ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Outside Views */}
              {project.outsideViewImages && project.outsideViewImages.map((img, i) => (
                <button
                  key={`outside-${i}`}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition border-2 border-teal-300"
                  title="Outside View"
                >
                  <img src={img} alt={`Outside ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {['overview', 'specifications', 'timeline', 'pricing', 'amenities', 'documents'].map(tab => {
            const tabLabels = {
              'overview': t('projectDetail.tabOverview'),
              'specifications': t('projectDetail.tabSpecifications'),
              'timeline': t('projectDetail.tabTimeline'),
              'pricing': t('projectDetail.tabPricing'),
              'amenities': t('projectDetail.tabAmenities'),
              'documents': t('projectDetail.tabDocuments')
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === tab
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tabLabels[tab]}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-40">Project Type:</span>
                  <span className="text-gray-600">{project.type}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-40">Total Units:</span>
                  <span className="text-gray-600">{project.totalUnits}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-40">Available Units:</span>
                  <span className="text-green-600 font-bold">{project.availableUnits}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-40">Sold Units:</span>
                  <span className="text-amber-600 font-bold">{project.soldUnits || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Highlights</h3>
              {project.amenities && project.amenities.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center text-gray-600">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FaRuler className="mr-2 text-amber-600" />
                  Area Details
                </h4>
                <div className="space-y-3">
                  {project.totalArea && (
                    <div>
                      <p className="text-gray-600 text-sm">Total Area</p>
                      <p className="text-lg font-semibold text-gray-800">{project.totalArea}</p>
                    </div>
                  )}
                  {project.carpetArea && (
                    <div>
                      <p className="text-gray-600 text-sm">Carpet Area</p>
                      <p className="text-lg font-semibold text-gray-800">{project.carpetArea}</p>
                    </div>
                  )}
                  {project.builtUpArea && (
                    <div>
                      <p className="text-gray-600 text-sm">Built-up Area</p>
                      <p className="text-lg font-semibold text-gray-800">{project.builtUpArea}</p>
                    </div>
                  )}
                  {project.balconyArea && (
                    <div>
                      <p className="text-gray-600 text-sm">Balcony Area</p>
                      <p className="text-lg font-semibold text-gray-800">{project.balconyArea}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Unit Details</h4>
                <div className="space-y-3">
                  {project.noOfFloors && (
                    <div>
                      <p className="text-gray-600 text-sm">Number of Floors</p>
                      <p className="text-lg font-semibold text-gray-800">{project.noOfFloors}</p>
                    </div>
                  )}
                  {project.noOfBedrooms && (
                    <div>
                      <p className="text-gray-600 text-sm">Bedrooms</p>
                      <p className="text-lg font-semibold text-gray-800">{project.noOfBedrooms}</p>
                    </div>
                  )}
                  {project.noOfBathrooms && (
                    <div>
                      <p className="text-gray-600 text-sm">Bathrooms</p>
                      <p className="text-lg font-semibold text-gray-800">{project.noOfBathrooms}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Price Details</h4>
                <div className="space-y-3">
                  {project.pricePerSqft && (
                    <div>
                      <p className="text-gray-600 text-sm">Price per Sq.ft</p>
                      <p className="text-lg font-semibold text-gray-800">{project.pricePerSqft}</p>
                    </div>
                  )}
                  {project.currentPrice && (
                    <div>
                      <p className="text-gray-600 text-sm">Current Price Range</p>
                      <p className="text-lg font-semibold text-amber-600">{project.currentPrice}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.startDate && (
                <div className="border-l-4 border-amber-600 pl-4">
                  <p className="text-gray-600 text-sm mb-1">Project Started</p>
                  <p className="text-xl font-bold text-gray-800">{project.startDate}</p>
                </div>
              )}
              {project.developmentStage && (
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-600 text-sm mb-1">Current Progress</p>
                  <p className="text-xl font-bold text-gray-800">{project.developmentStage}</p>
                </div>
              )}
              {project.completionDate && (
                <div className="border-l-4 border-green-600 pl-4">
                  <p className="text-gray-600 text-sm mb-1">Expected Completion</p>
                  <p className="text-xl font-bold text-gray-800">{project.completionDate}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Price Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-amber-200 rounded-lg p-6 bg-amber-50">
                <h4 className="font-bold text-amber-900 mb-4">Current Pricing</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm">Price Range</p>
                    <p className="text-2xl font-bold text-amber-600">{project.priceRange}</p>
                  </div>
                  {project.currentPrice && (
                    <div>
                      <p className="text-gray-600 text-sm">Current Price</p>
                      <p className="text-xl font-semibold text-amber-700">{project.currentPrice}</p>
                    </div>
                  )}
                  {project.pricePerSqft && (
                    <div>
                      <p className="text-gray-600 text-sm">Per Sq.ft</p>
                      <p className="text-lg font-semibold text-amber-700">{project.pricePerSqft}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                <h4 className="font-bold text-green-900 mb-4">Future Pricing</h4>
                {project.futurePrice ? (
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Expected Future Price</p>
                    <p className="text-2xl font-bold text-green-600">{project.futurePrice}</p>
                    <p className="text-sm text-green-700 mt-4">
                      Prices subject to change based on project progress and market conditions
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">Future pricing details coming soon</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === 'amenities' && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Amenities & Features</h3>
            {project.amenities && project.amenities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaCheckCircle className="text-green-500 mr-3 text-xl" />
                    <span className="text-gray-700 font-semibold">{amenity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Amenities details coming soon</p>
            )}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Legal Documents</h3>
            <div className="space-y-4">
              {project.reraNumber && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">RERA Registration Number</p>
                  <p className="text-lg font-bold text-blue-800">{project.reraNumber}</p>
                </div>
              )}
              {project.legalDocuments && project.legalDocuments.length > 0 ? (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Available Documents</h4>
                  <div className="space-y-2">
                    {project.legalDocuments.map((doc, i) => (
                      <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <FaDownload className="text-amber-600 mr-3" />
                        <a href={doc} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold flex-1">
                          Document {i + 1}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Legal documents will be available soon</p>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-lg p-8 text-white mb-12">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">{t('projectDetail.interestedTitle')}</h3>
              <p className="text-amber-100 text-lg">{t('projectDetail.interestedDesc')}</p>
            </div>
            <div className="space-x-4">
              <button 
                onClick={() => navigate('/contact', { state: { projectId: project._id, projectTitle: project.title } })}
                className="inline-block bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
              >
                {t('projectDetail.inquireNow')}
              </button>
              <a href="https://wa.me/919637279798" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition">
                {t('inquiry.chatOnWhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
