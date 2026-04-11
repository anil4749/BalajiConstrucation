# Environment Configuration Guide

The application uses environment variables for configuration. This ensures sensitive data and environment-specific values are not hardcoded in the source code.

## Frontend Configuration (.env.local or .env)

Create a `.env` file in the `frontend/` directory with the following variables:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000    # Change to your backend URL
REACT_APP_ENV=development                  # development or production

# Contact & Communication
REACT_APP_WHATSAPP_NUMBER=919637279798
REACT_APP_WHATSAPP_MESSAGE=Hi%20Balaji%20Construction%2C%20I%20am%20interested%20in%20your%20projects
REACT_APP_PHONE_NUMBER=+91-9637279798
REACT_APP_EMAIL=more.anil1693@gmail.com
REACT_APP_ADDRESS=Parola, district jalgaon, Maharashtra, India
REACT_APP_COMPANY_NAME=Balaji Construction
```

## Backend Configuration (.env.local or .env)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Environment
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/balaji_construction
MONGO_USERNAME=root
MONGO_PASSWORD=your_password

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Email Configuration (Nodemailer)
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@balajiconstruction.com

# Application URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

## For Development

1. Copy `.env.example` to understand the available variables
2. Create `.env.local` files in both `frontend/` and `backend/` directories
3. Fill in the appropriate values for your local environment

## For Production (Vercel/Render)

Set the same variables in your hosting platform's environment settings:

- **Vercel:** Project Settings → Environment Variables
- **Render:** Environment → Environment Variables

## Important Notes

- Never commit `.env` files to version control
- Use `.env.local` for local development to avoid overwriting shared configs
- The `.env.example` file shows all available variables and their expected format
- Some variables have sensible defaults if not provided (check `appConfig.js`)
