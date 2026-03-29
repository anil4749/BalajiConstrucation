# Environment Variables Setup Guide

## Overview

This guide explains all environment variables used in the Balaji Construction project and how to configure them for different environments (development, production, etc.).

---

## Backend Environment Variables

### Location
- **File:** `backend/.env`
- **Example:** `backend/.env.example`
- **DO NOT commit** `backend/.env` to git (it contains secrets!)

### Required Variables

#### Server Configuration
```
NODE_ENV=production          # development, production, staging
PORT=5000                    # Port to run the server on (Render assigns automatically)
API_URL=https://api.yourdomain.com  # Public URL of the API (used internally)
```

#### Database Configuration
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**How to get MongoDB URI:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster → Create user → Copy connection string
3. Replace `<password>` with your password
4. Replace `myFirstDatabase` with `balaji-construction`

#### CORS Configuration
```
CORS_ORIGIN=https://yourdomain.com
```

⚠️ **CRITICAL:** Must match your frontend URL exactly!
- For Vercel: `https://balaji-construcation.vercel.app`
- For custom domain: `https://yourdomain.com`

#### Email Configuration (Nodemailer)
```
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-password-here
SMTP_FROM=noreply@balajiconstruction.com
```

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Click "Generate"
4. Copy the 16-character password
5. Use this in `SMTP_PASSWORD` (NOT your Gmail password!)

#### Business Configuration
```
WHATSAPP_NUMBER=919637279798
BUSINESS_EMAIL=contact@balajiconstruction.com
BUSINESS_PHONE=+91-XXXXXXXXXX
```

---

## Frontend Environment Variables

### Location
- **File:** `frontend/.env.local`
- **Example:** `frontend/.env.example`
- **Git:** Files starting with `.env` are in `.gitignore` (safe to commit example only)

### Required Variables

#### API Configuration
```
REACT_APP_API_URL=https://api.yourdomain.com
```

⚠️ **IMPORTANT:** 
- NO `/api` suffix - it's added automatically by `src/services/api.js`
- For development: `http://localhost:5000`
- For production: Your Render backend URL

#### Environment Designation
```
REACT_APP_ENV=production
```

#### Optional: Analytics
```
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
REACT_APP_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## Environment-Specific Configurations

### Local Development

**backend/.env**
```
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/balaji-construction
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@test.com
WHATSAPP_NUMBER=919637279798
```

**frontend/.env.local**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
REACT_APP_DEBUG_MODE=true
```

### Production (Vercel + Render)

**Backend (Set in Render Dashboard)**
```
NODE_ENV=production
PORT=5000
API_URL=https://balaji-api-guru.onrender.com
CORS_ORIGIN=https://balaji-construcation.vercel.app
MONGODB_URI=mongodb+srv://...
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-password
SMTP_FROM=noreply@balajiconstruction.com
WHATSAPP_NUMBER=919637279798
BUSINESS_EMAIL=contact@balajiconstruction.com
BUSINESS_PHONE=+91-XXXXXXXXXX
```

**Frontend (Set in Vercel Dashboard)**
```
REACT_APP_API_URL=https://balaji-api-guru.onrender.com
REACT_APP_ENV=production
REACT_APP_VERSION=1.0.0
```

---

## Setting Environment Variables on Deployment Platforms

### Render (Backend)

1. Go to https://dashboard.render.com
2. Click your backend service → **Settings**
3. Scroll to **Environment**
4. Click **Add Environment Variable** for each variable
5. Or use the Raw Env Editor (paste all at once)

**Example Raw Format:**
```
NODE_ENV=production
PORT=5000
API_URL=https://balaji-api-guru.onrender.com
CORS_ORIGIN=https://balaji-construcation.vercel.app
MONGODB_URI=mongodb+srv://...
SMTP_SERVICE=gmail
SMTP_USER=...
SMTP_PASSWORD=...
```

### Vercel (Frontend)

1. Go to https://vercel.com/dashboard
2. Click your project → **Settings**
3. Go to **Environment Variables**
4. Add variables for each environment:
   - **Production** (main branch)
   - **Preview** (pull requests)
   - **Development** (local development)

**Recommended Setup:**
```
REACT_APP_API_URL = https://balaji-api-guru.onrender.com (Production)
REACT_APP_API_URL = http://localhost:5000 (Development)
REACT_APP_ENV = production (Production)
REACT_APP_ENV = development (Development)
```

---

## Checking Configuration

### Backend Health Check
```bash
curl https://balaji-api-guru.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "environment": "production",
  "timestamp": "2026-03-29T12:00:00.000Z"
}
```

### Frontend Configuration
Open browser console (F12) and check:
- Frontend app should load
- API requests should go to correct backend URL
- Check browser console for API configuration logs

### Verify CORS Configuration
If frontend can't reach backend, check:
1. ✅ `CORS_ORIGIN` in backend .env matches `REACT_APP_API_URL` in frontend
2. ✅ Frontend URL has `https://` prefix
3. ✅ Backend is running and accessible

---

## Troubleshooting

### "No CORS header" Error
**Issue:** Frontend can't call backend API
**Fix:** 
- Check `CORS_ORIGIN` in backend .env matches frontend URL exactly
- Ensure both use `https://` in production
- Restart backend after changing CORS_ORIGIN

### "Cannot reach database"
**Issue:** Backend can't connect to MongoDB
**Fix:**
- Verify `MONGODB_URI` is correct
- Check IP whitelist allows your server's IP in MongoDB Atlas
- In development, enable "Allow Access from Anywhere"

### "Email not sending"
**Issue:** Contact form emails not working
**Fix:**
- Verify Gmail App Password (not regular password)
- Enable 2FA on Gmail before creating App Password
- Check `SMTP_USER` and `SMTP_PASSWORD` are correct

### "API returns different errors on frontend vs backend"
**Issue:** Environment configuration mismatch
**Fix:**
- Verify all variables match between `.env` files and cloud dashboards
- Use `curl` to test backend directly
- Check browser DevTools Network tab for CORS errors

---

## Security Best Practices

### Never Commit Secrets
```bash
# Good - ignored by git
backend/.env
frontend/.env.local

# Make sure .gitignore includes:
*.env
*.env.local
.env.production.local
```

### Use Different Credentials Per Environment
- Development: Can use test email
- Production: Use production email
- Never use production passwords in development

### Rotate Secrets Regularly
- Change MongoDB password: Monthly
- Change Gmail App Password: Quarterly
- Change other secrets: As needed

### Use Environment-Specific URLs
- Development: `localhost:3000` ↔ `localhost:5000`
- Staging: Your staging domain
- Production: Your production domain

---

## Quick Reference

| Variable | Backend | Frontend | Required | Example |
|----------|---------|----------|----------|---------|
| NODE_ENV | ✓ | ✗ | Yes | `production` |
| PORT | ✓ | ✗ | Yes | `5000` |
| API_URL | ✓ | ✗ | Yes (prod) | `https://api.domain.com` |
| MONGODB_URI | ✓ | ✗ | Yes | `mongodb+srv://...` |
| CORS_ORIGIN | ✓ | ✗ | Yes | `https://domain.com` |
| REACT_APP_API_URL | ✗ | ✓ | Yes | `https://api.domain.com` |
| REACT_APP_ENV | ✗ | ✓ | No | `production` |
| SMTP_USER | ✓ | ✗ | Yes (for emails) | `email@gmail.com` |
| SMTP_PASSWORD | ✓ | ✗ | Yes (for emails) | `16-char app password` |

---

## Additional Resources

- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Render Environment Variables: https://render.com/docs/environment-variables
- Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
