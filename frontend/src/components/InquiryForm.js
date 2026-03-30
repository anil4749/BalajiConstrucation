import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { submitInquiry } from '../services/api';

export default function InquiryForm({ projectData }) {
  const { t } = useTranslation();
  const isProjectInquiry = !!projectData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectInterest: '',
    message: '',
    budget: '',
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initialize form when projectData is available
  useEffect(() => {
    if (projectData) {
      setFormData(prev => ({
        ...prev,
        projectInterest: projectData.projectId || projectData.projectTitle || ''
      }));
    }
  }, [projectData]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // 10-digit Indian phone number starting with 6-9
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (isProjectInquiry) {
      // Project inquiry - only validate email and phone
      if (!formData.email || !formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.phone || !formData.phone.trim()) {
        newErrors.phone = 'Mobile number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number (starting with 6-9)';
      }
    } else {
      // Standard inquiry - validate all fields
      if (!formData.name || !formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.email || !formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.phone || !formData.phone.trim()) {
        newErrors.phone = 'Mobile number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number (starting with 6-9)';
      }

      if (!formData.projectInterest) {
        newErrors.projectInterest = 'Project type is required';
      }

      if (!formData.budget) {
        newErrors.budget = 'Budget is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await submitInquiry(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectInterest: isProjectInquiry ? (projectData?.projectId || projectData?.projectTitle || '') : '',
        message: '',
        budget: '',
        preferredContact: 'email'
      });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setErrors({ submit: t('inquiry.inquiryError') || 'Error submitting inquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = '919637279798';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Balaji%20Construction%2C%20I%20am%20interested%20in%20your%20projects`;

  // Project Inquiry Form - Simplified
  if (isProjectInquiry) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{t('inquiry.inquiryFor')} {projectData.projectTitle}</h2>
            <p className="text-xs sm:text-sm md:text-lg text-gray-600">
              {t('inquiry.projectInquiryDesc')}
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
            {submitted && (
              <div className="mb-4 p-3 sm:p-4 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm">
                Thank you! Your inquiry has been submitted successfully. We'll contact you soon.
              </div>
            )}

            {errors.submit && (
              <div className="mb-4 p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm">
                {errors.submit}
              </div>
            )}

            {/* Project Info Display */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Project</p>
              <p className="text-base sm:text-lg font-bold text-amber-900">{projectData.projectTitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-700 font-semibold mb-1 sm:mb-2">
                  {t('contact.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none text-sm ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-300 focus:border-amber-600'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-700 font-semibold mb-1 sm:mb-2">
                  {t('contact.phone')} <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="px-2 sm:px-4 py-2 sm:py-3 bg-gray-200 border border-gray-300 rounded-l-lg font-semibold text-gray-700 text-xs sm:text-sm">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-l-0 rounded-r-lg focus:outline-none text-sm ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-gray-300 focus:border-amber-600'
                    }`}
                    placeholder="9999999999"
                    maxLength="10"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">Enter a 10-digit mobile number</p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition text-sm sm:text-base"
                >
                  {loading ? 'Sending...' : t('inquiry.sendInquiry')}
                </button>
              </div>
            </form>

            {/* Alternative Contact Methods */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{t('inquiry.contactDirectly')}</p>
              <div className="flex justify-center w-full">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-lg transition text-xs sm:text-base whitespace-nowrap"
                >
                  <FaWhatsapp className="mr-2 flex-shrink-0" /> {t('inquiry.chatOnWhatsApp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Standard Contact Form
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{t('inquiry.submitInquiry')}</h2>
          <p className="text-xs sm:text-sm md:text-lg text-gray-600">
            {t('contact.form')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-9 md:gap-12">
          {/* Form */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
            {submitted && (
              <div className="mb-4 p-3 sm:p-4 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm">
                {t('inquiry.inquirySuccess')}
              </div>
            )}

            {errors.submit && (
              <div className="mb-4 p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-700 font-semibold mb-1 sm:mb-2">
                  {t('contact.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none text-sm ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-300 focus:border-amber-600'
                  }`}
                  placeholder={t('contact.name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('contact.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-300 focus:border-amber-600'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('contact.phone')} <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-l-lg font-semibold text-gray-700">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-2 border border-l-0 rounded-r-lg focus:outline-none ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-gray-300 focus:border-amber-600'
                    }`}
                    placeholder="9999999999"
                    maxLength="10"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('inquiry.projectType')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="projectInterest"
                  value={formData.projectInterest}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.projectInterest 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-300 focus:border-amber-600'
                  }`}
                >
                  <option value="">{t('inquiry.selectOption')}</option>
                  <option value="residential">{t('inquiry.residential')}</option>
                  <option value="commercial">{t('inquiry.commercial')}</option>
                  <option value="industrial">{t('inquiry.industrial')}</option>
                  <option value="other">{t('inquiry.other')}</option>
                </select>
                {errors.projectInterest && (
                  <p className="text-red-500 text-sm mt-1">{errors.projectInterest}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('inquiry.budget')} <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none ${
                      errors.budget 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-gray-300 focus:border-amber-600'
                    }`}
                    placeholder="50"
                    min="0"
                  />
                  <span className="px-4 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg font-semibold text-gray-700">Lakh</span>
                </div>
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 font-semibold mb-1 sm:mb-2">{t('contact.message')} <span className="text-gray-500 text-xs">(Optional)</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 text-sm"
                  placeholder={t('inquiry.submitInquiry')}
                ></textarea>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 font-semibold mb-1 sm:mb-2">Preferred Contact Method</label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 text-sm"
                >
                  <option value="email">{t('contact.email')}</option>
                  <option value="phone">{t('contact.phone')}</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition text-sm sm:text-base"
              >
                {loading ? t('contact.sending') : t('inquiry.submit')}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">{t('contact.getInTouch')}</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <FaPhone className="text-amber-600 text-lg sm:text-2xl mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-base text-gray-800">{t('contact.phone')}</h4>
                    <p className="text-xs sm:text-base text-gray-600">+91-9637279798</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <FaEnvelope className="text-amber-600 text-lg sm:text-2xl mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-base text-gray-800">{t('contact.email')}</h4>
                    <p className="text-xs sm:text-base text-gray-600 break-all">more.anil1693@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <FaWhatsapp className="text-amber-600 text-lg sm:text-2xl mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-base text-gray-800">WhatsApp</h4>
                    <a 
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 font-semibold text-xs sm:text-base"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 sm:p-6 md:p-8 rounded-lg border border-amber-200">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Quick Chat Options</h3>
              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition text-xs sm:text-sm"
                >
                  <FaWhatsapp className="mr-2" /> Chat on WhatsApp
                </a>
                <a
                  href="mailto:more.anil1693@gmail.com"
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition text-xs sm:text-sm"
                >
                  <FaEnvelope className="mr-2" /> {t('contact.send')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
