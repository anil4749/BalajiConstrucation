# Environment Configuration Guide

## Overview

The Balaji Construction project uses **environment-specific configuration** to manage different settings for local development and production deployment.

---

## Environment Files

### Backend Environment Files

| File | Usage | Committed | Purpose |
|------|-------|-----------|---------|
| `backend/.env.example` | ✅ YES | Reference template for .env files |
| `backend/.env.local` | ✅ YES (committed) | Local development config |
| `backend/.env.production` | ✅ YES (committed) | Production template - override via platform |
| `backend/.env` | ❌ NO | Deprecated - use .env.local or .env.production |

### Frontend Environment Files

| File | Usage | Committed | Purpose |
|------|-------|-----------|---------|
| `frontend/.env.example` | ✅ YES | Reference template |
| `frontend/.env.local` | ✅ YES (committed) | Local development config |
| `frontend/.env.production` | ✅ YES (committed) | Production template - override via platform |

---

## How Environment Loading Works

### Backend (Node.js/Express)

The backend automatically loads configuration based on `NODE_ENV`:

```javascript
// In server.js
if (process.env.NODE_ENV === 'production') {
  // Load .env.production values
  // Override with environment variables from deployment platform
} else {
  // Load .env.local values for development
}
```

**Loading Priority (Highest to Lowest):**
1. Environment variables from deployment platform (Render, Docker, etc.)
2. `.env.production` (if NODE_ENV=production)
3. `.env.local` (if NODE_ENV=development)
4. `.env.example` (fallback, shows available options)

### Frontend (React)

Frontend uses Create React App's built-in environment handling:

```bash
# Development - loads .env.local
npm run start

# Production - loads .env.production
npm run build
```

**Loading Priority (Highest to Lowest):**
1. Environment variables from deployment platform (Vercel)
2. `.env.production` (during build for production)
3. `.env.local` (during development)
4. `.env.example` (reference)

---

## When to Use Each Environment

### Local Development

**Backend:**
```bash
# Uses backend/.env.local automatically
npm run dev
```

**Frontend:**
```bash
# Uses frontend/.env.local automatically
npm run start
```

**Complete Setup:**
```bash
# Use docker-compose for full local development
docker-compose up -d

# Runs with .env.local files
npm run dev
```

### Production Deployment

**Render (Backend):**
1. Deployment platform automatically sets `NODE_ENV=production`
2. `.env.production` is read for defaults
3. **Important:** Override sensitive values in Render dashboard:
   - MONGODB_URI
   - SMTP_PASSWORD
   - JWT_SECRET
   - SESSION_SECRET

**Vercel (Frontend):**
1. Deployment platform automatically sets `NODE_ENV=production` during build
2. `.env.production` is read during build
3. **Important:** Set in Vercel Environment Variables:
   - REACT_APP_API_URL (must point to production backend)
   - REACT_APP_ENV=production

---

## Configuration by Environment

### Local Development Settings

**backend/.env.local:**
```
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:3000
DEBUG=true
LOG_LEVEL=debug
```

**frontend/.env.local:**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
REACT_APP_DEBUG_MODE=true
```

### Production Settings

**backend/.env.production:**
```
NODE_ENV=production
PORT=5000
API_URL=https://balaji-api-guru.onrender.com
CORS_ORIGIN=https://balaji-construcation.vercel.app
DEBUG=false
LOG_LEVEL=info
```

**frontend/.env.production:**
```
REACT_APP_API_URL=https://balaji-api-guru.onrender.com
REACT_APP_ENV=production
REACT_APP_DEBUG_MODE=false
```

---

## Setting Environment Variables on Platforms

### Render (Backend)

1. Go to https://dashboard.render.com
2. Click your service → **Settings** → **Environment**
3. Add/Override these variables:

```
NODE_ENV = production
MONGODB_URI = [Your MongoDB connection]
CORS_ORIGIN = https://balaji-construcation.vercel.app
SMTP_PASSWORD = [Your app password]
JWT_SECRET = [Generate secure key]
SESSION_SECRET = [Generate secure key]
```

These **override** the values in `.env.production`

### Vercel (Frontend)

1. Go to https://vercel.com/dashboard
2. Click your project → **Settings** → **Environment Variables**
3. Set for **Production** environment:

```
REACT_APP_API_URL = https://balaji-api-guru.onrender.com
REACT_APP_ENV = production
```

These will be baked into the production build.

---

## Development Workflow

### Starting Local Development

```bash
# 1. Ensure .env.local files exist (they do!)
ls backend/.env.local frontend/.env.local

# 2. Validate environment configuration
./validate-env.sh

# 3. Start development servers
npm run dev

# Or use Docker for isolated environment
docker-compose up -d
```

### Deploying to Production

```bash
# 1. Push to main branch
git add .
git commit -m "Production release v1.0"
git push origin main

# 2. GitLab CI/CD triggers automatically
# - Tests run with .env.local values
# - Build runs with .env.local values
# - Deploy to Render/Vercel with platform env vars

# 3. Render/Vercel use their own environment variables
# - These override .env.production values
# - You set these in their dashboards
```

---

## Environment Variables Reference

### Backend (.env.local & .env.production)

| Variable | Local | Production | Required | Sensitive |
|----------|-------|-----------|----------|-----------|
| NODE_ENV | development | production | Yes | No |
| PORT | 5000 | 5000 | Yes | No |
| API_URL | http://localhost:5000 | https://balaji-api-guru.onrender.com | Yes | No |
| CORS_ORIGIN | http://localhost:3000 | https://balaji-construcation.vercel.app | Yes | No |
| MONGODB_URI | [test connection] | [prod connection] | Yes | Yes |
| SMTP_USER | test@gmail.com | prod@gmail.com | Optional | Yes |
| SMTP_PASSWORD | test-password | prod-password | Optional | Yes |
| LOG_LEVEL | debug | info | No | No |
| DEBUG | true | false | No | No |

### Frontend (.env.local & .env.production)

| Variable | Local | Production | Required | Sensitive |
|----------|-------|-----------|----------|-----------|
| REACT_APP_API_URL | http://localhost:5000 | https://balaji-api-guru.onrender.com | Yes | No |
| REACT_APP_ENV | development | production | No | No |
| REACT_APP_DEBUG_MODE | true | false | No | No |
| REACT_APP_ENABLE_ANALYTICS | false | true | No | No |

---

## Troubleshooting

### Issue: "Cannot connect to API"

**Check:**
1. Is `REACT_APP_API_URL` in frontend .env correct?
2. Does it match `CORS_ORIGIN` in backend .env?
3. For production: Are platform env vars set?

```bash
# Test backend
curl https://balaji-api-guru.onrender.com/api/health

# Check frontend console
# Open DevTools → Console → Look for API URL
```

### Issue: "Using wrong database"

**Check:**
1. Which `.env` file is being used?
   ```bash
   echo $NODE_ENV  # Should be 'development' or 'production'
   ```
2. Is `MONGODB_URI` pointing to correct database?
3. For production: Is MongoDB whitelist configured?

### Issue: "Email not working in production"

**Check:**
1. `SMTP_PASSWORD` is set in Render dashboard (not just .env.production)
2. Gmail App Password is configured (not regular password)
3. 2FA is enabled on Gmail account
4. Check Render logs for SMTP errors

---

## Security Best Practices

### DO ✅
- ✅ Commit `.env.example` for reference
- ✅ Commit `.env.local` (it's for shared local development)
- ✅ Commit `.env.production` (it's a template)
- ✅ Set sensitive values in deployment platform dashboards
- ✅ Use different credentials per environment
- ✅ Rotate secrets regularly

### DON'T ❌
- ❌ Commit actual `.env` file with secrets
- ❌ Use production passwords in development
- ❌ Hardcode credentials in code
- ❌ Use same API key for local and production
- ❌ Share deployment platform credentials

---

## File Structure

```
backend/
├── .env.example        # Template - shows all available variables
├── .env.local          # Local development - committed to git
├── .env.production     # Production template - committed to git
├── .env                # ❌ Deprecated (use .env.local or .env.production)
└── server.js           # Reads NODE_ENV and loads appropriate config

frontend/
├── .env.example        # Template - shows all available variables
├── .env.local          # Local development - committed to git
├── .env.production     # Production template - committed to git
└── src/
    └── services/
        └── api.js      # Reads REACT_APP_API_URL from .env files
```

---

## Git Commit Notes

When you see `.env.local` and `.env.production` in git:
- This is **INTENTIONAL** - they are templates
- No sensitive data is in them (examples only)
- Actual secrets are in deployment platform dashboards
- This allows quick setup: `npm install && npm start`

---

## Quick Reference Commands

```bash
# Check which environment is loaded
echo $NODE_ENV

# Validate environment configuration
./validate-env.sh

# Start with local development config
npm run dev

# Build with production config
npm run build

# View loaded environment variables
node -e "console.log(process.env)" | grep -i "API\|ENV\|NODE"

# Test API connection
curl $REACT_APP_API_URL/api/health

# Check .env.local values
cat backend/.env.local
cat frontend/.env.local

# Check .env.production values (template)
cat backend/.env.production
cat frontend/.env.production
```

---

## Summary

| Scenario | Backend File | Frontend File | Override Via |
|----------|--------------|---------------|--------------|
| Local Development | .env.local | .env.local | Edit files locally |
| CI/CD Testing | .env.local | .env.local | GitLab CI variables |
| Production on Render | .env.production | N/A | Render dashboard |
| Production on Vercel | N/A | .env.production | Vercel dashboard |

**Key Point:** Development and production configs are **separate**.  
- Local development uses committed `.env.local` files
- Production deployment uses platform environment variables (Render/Vercel dashboards)
- `.env.production` is just a reference template

