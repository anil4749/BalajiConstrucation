# Production Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] All tests pass: `npm run test`
- [ ] No console errors: `npm run build`
- [ ] No security vulnerabilities: `npm audit`
- [ ] Code is committed to `main` branch

### Environment Configuration
- [ ] Backend `.env` is properly configured
- [ ] Frontend `.env.local` is properly configured
- [ ] All sensitive values are secrets (not in git)
- [ ] Credentials are stored in Render/Vercel dashboards

---

## Render Backend Deployment

### Create Service
- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository: `anil4749/BalajiConstrucation`
- [ ] Service name: `balaji-api`
- [ ] Root directory: `backend`

### Configuration
- [ ] Build command: `npm ci`
- [ ] Start command: `npm start`
- [ ] Environment: Node

### Environment Variables (Set in Render)

```
NODE_ENV = production
PORT = 5000
API_URL = https://balaji-api-guru.onrender.com
REACT_APP_API_URL = https://balaji-construcation.vercel.app
MONGODB_URI = [Your MongoDB connection string]
CORS_ORIGIN = https://balaji-construcation.vercel.app
SMTP_SERVICE = gmail
SMTP_USER = [Your email]
SMTP_PASSWORD = [Gmail app password]
SMTP_FROM = noreply@balajiconstruction.com
WHATSAPP_NUMBER = 919637279798
BUSINESS_EMAIL = contact@balajiconstruction.com
BUSINESS_PHONE = +91-XXXXXXXXXX
```

### Deployment
- [ ] Region selected: Closest to you
- [ ] Health check configured (should be automatic)
- [ ] Auto-deploy from GitHub enabled
- [ ] Service deployed successfully
- [ ] Health check passing: `https://balaji-api-guru.onrender.com/api/health`

---

## Vercel Frontend Deployment

### Create Project
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Import GitHub repository: `anil4749/BalajiConstrucation`
- [ ] Project name: `balaji-construction`

### Configuration
- [ ] Framework detected: Create React App
- [ ] Root directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`

### Environment Variables (Set in Vercel)

**Production:**
```
REACT_APP_API_URL = https://balaji-api-guru.onrender.com
REACT_APP_ENV = production
```

**Development (optional):**
```
REACT_APP_API_URL = http://localhost:5000
REACT_APP_ENV = development
```

### Deployment
- [ ] Deployment successful
- [ ] Site accessible: `https://balaji-construcation.vercel.app`
- [ ] Builds run automatically on push

---

## GitLab CI/CD Setup

### Variables Setup
- [ ] Go to GitLab project → Settings → CI/CD → Variables
- [ ] Add variable: `VERCEL_ORG_ID` = `anil4749`
- [ ] Add variable: `VERCEL_TOKEN` = `vcp_...`
- [ ] Add variable: `RENDER_API_KEY` = `rnd_...`
- [ ] Add variable: `RENDER_BACKEND_SERVICE_ID` = `srv_...`
- [ ] Add variable: `FRONTEND_URL` = `https://balaji-construcation.vercel.app`
- [ ] Add variable: `BACKEND_URL` = `https://balaji-api-guru.onrender.com`
- [ ] Add variable: `GITHUB_REPO_FRONTEND` = `anil4749/BalajiConstrucation`

### Pipeline Verification
- [ ] `.gitlab-ci.yml` exists
- [ ] Push to main triggers pipeline
- [ ] Test stage passes
- [ ] Build stage passes
- [ ] Deploy stage triggers
- [ ] Notify stage completes

---

## Post-Deployment Testing

### Backend Tests
- [ ] Health check works: `curl https://balaji-api-guru.onrender.com/api/health`
- [ ] CORS headers present for frontend URL
- [ ] Database connection working
- [ ] Email sending works (test with contact form)
- [ ] WhatsApp integration functional

### Frontend Tests
- [ ] Frontend loads: `https://balaji-construcation.vercel.app`
- [ ] API calls successful (check DevTools Network)
- [ ] No CORS errors in browser console
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Language switcher works
- [ ] All pages accessible

### Integration Tests
- [ ] Contact form → Email received ✓
- [ ] Inquiry form → Data saved to database ✓
- [ ] Project listing → Loads from API ✓
- [ ] Project detail → Loads specific project ✓
- [ ] Responsive design → Works on mobile ✓

---

## Monitoring & Maintenance

### Daily
- [ ] Check deployment status in Render dashboard
- [ ] Check deployment status in Vercel dashboard
- [ ] Monitor error logs
- [ ] Check uptime status

### Weekly
- [ ] Review error logs for patterns
- [ ] Test contact form to verify email
- [ ] Check analytics/traffic

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Review database backup status
- [ ] Review SSL certificate expiry

---

## Troubleshooting

### Build Fails
```bash
# Check logs in Render dashboard
# Common issues:
- Missing environment variables
- Dependency conflicts
- Node version mismatch
```

### Frontend Can't Reach Backend
```bash
# Check CORS_ORIGIN in backend
# Verify REACT_APP_API_URL in frontend
# Test: curl https://backend-url/api/health
```

### Email Not Working
```bash
# Verify SMTP credentials
# Check Gmail App Password (not regular password)
# Verify 2FA enabled on Gmail
# Check SMTP_FROM address
```

### Database Connection Error
```bash
# Verify MONGODB_URI is correct
# Check IP whitelist in MongoDB Atlas
# Verify credentials are correct
# Check database exists
```

---

## Rollback Plan

If production breaks:

### Frontend (Vercel)
1. Go to https://vercel.com/dashboard
2. Find deployment with issue
3. Click "Rollback"
4. Select previous successful deployment

### Backend (Render)
1. Go to https://dashboard.render.com
2. Find service with issue
3. Click "Manual Deploy"
4. Deploy previous working commit

---

## Documentation Locations

Review these files for detailed setup:

- **DEPLOYMENT.md** - Full deployment guide
- **ENVIRONMENT_SETUP.md** - Environment variables documentation
- **CREDENTIALS_SETUP.md** - Credential collection guide
- **CREDENTIALS_FORM.md** - Quick credential form
- **backend/.env.example** - Backend environment template
- **frontend/.env.example** - Frontend environment template

---

## Support & Resources

- Render Logs: https://dashboard.render.com
- Vercel Logs: https://vercel.com/dashboard
- GitLab Pipelines: https://gitlab.com/your-org/project/-/pipelines
- MongoDB Atlas: https://cloud.mongodb.com
- Gmail App Passwords: https://myaccount.google.com/apppasswords

---

## Sign-Off

- **Deployment Date:** _______________
- **Deployed By:** _______________
- **Verified By:** _______________
- **Status:** ☐ Successful ☐ Unsuccessful

### Notes:
```
_____________________________________________________________________________
_____________________________________________________________________________
_____________________________________________________________________________
```
