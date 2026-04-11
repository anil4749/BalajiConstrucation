/**
 * Application Configuration
 * All configurable values loaded from environment variables
 */

const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 30000,
  },

  // WhatsApp Configuration
  whatsapp: {
    number: process.env.REACT_APP_WHATSAPP_NUMBER || '919637279798',
    message: process.env.REACT_APP_WHATSAPP_MESSAGE || 'Hi%20Balaji%20Construction%2C%20I%20am%20interested%20in%20your%20projects',
    getLink: (customMessage) => {
      const message = customMessage || config.whatsapp.message;
      return `https://wa.me/${config.whatsapp.number}?text=${message}`;
    },
  },

  // Contact Information
  contact: {
    phone: process.env.REACT_APP_PHONE_NUMBER || '+91-9637279798',
    email: process.env.REACT_APP_EMAIL || 'more.anil1693@gmail.com',
    address: process.env.REACT_APP_ADDRESS || 'Parola, district jalgaon, Maharashtra, India',
  },

  // Company Information
  company: {
    name: process.env.REACT_APP_COMPANY_NAME || 'Balaji Construction',
  },

  // Environment
  env: process.env.REACT_APP_ENV || 'development',
  isDevelopment: () => config.env === 'development',
  isProduction: () => config.env === 'production',
};

// Log configuration on app start (non-sensitive values only)
if (config.isDevelopment()) {
  console.log('App Configuration Loaded:', {
    env: config.env,
    apiUrl: config.api.baseUrl,
    companyName: config.company.name,
  });
}

export default config;
