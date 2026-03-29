# Deployment & CI/CD Setup Guide

## Overview

This guide covers the deployment and CI/CD setup for the Balaji Construction website. The setup uses:
- **GitLab CI/CD** for continuous integration and automated testing
- **Vercel** for frontend deployment
- **Render** for backend deployment
- **Docker** for containerization
- **GitHub** for version control

---

## Prerequisites

### Required Accounts & Credentials

1. **Vercel Account**
   - Sign up at https://vercel.com
   - Create a project for frontend
   - Generate API token: Settings → Tokens
   - Note: `VERCEL_ORG_ID` and `VERCEL_TOKEN`

2. **Render Account**
   - Sign up at https://render.com
   - Create a web service for backend
   - Generate API key: Settings → API Keys
   - Note: `RENDER_API_KEY` and `RENDER_BACKEND_SERVICE_ID`

3. **GitHub Account**
   - Repository with main branch
   - Personal access token (for deployments)

4. **GitLab Account** (if using GitLab CI/CD)
   - Project connected to GitHub via CI/CD → Integrations
   - Note the GitLab CI/CD token

5. **MongoDB Atlas** (optional but recommended)
   - Create free tier cluster at https://www.mongodb.com/cloud/atlas
   - Setup IP whitelist and database user
   - Get connection string

---

## GitLab CI/CD Setup

### Step 1: Configure GitLab Variables

1. Go to your GitLab project → Settings → CI/CD → Variables
2. Add the following variables:

```
VERCEL_ORG_ID=<your_vercel_org_id>
VERCEL_TOKEN=<your_vercel_token>
GITHUB_REPO_FRONTEND=anil4749/BalajiConstrucation
RENDER_API_KEY=<your_render_api_key>
RENDER_BACKEND_SERVICE_ID=<your_render_service_id>
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

### Step 2: Enable GitLab Runner (Optional)

If using shared runners:
1. Ensure project has access to shared runners
2. Or register a specific runner: https://docs.gitlab.com/runner/install/

### Step 3: Push to Trigger Pipeline

```bash
git push origin main
```

The pipeline will automatically:
1. Run tests (test stage)
2. Build artifacts (build stage)
3. Deploy to Vercel & Render (deploy stage)
4. Send notifications (notify stage)

---

## Local Development with Docker

### Step 1: Build Docker Images

```bash
# Build backend image
docker build -t balaji-api:latest ./backend

# Build frontend image
docker build -t balaji-web:latest ./frontend
```

### Step 2: Run with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (reset database)
docker-compose down -v
```

### Step 3: Access Services

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

### Debugging Docker Containers

```bash
# Execute command in running container
docker exec -it balaji-api npm run seed

# View container logs
docker logs balaji-api

# Interactive shell in container
docker exec -it balaji-api /bin/sh

# Health check status
docker ps | grep balaji
```

---

## Manual Deployment

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod

# Or redeploy from GitHub
# Go to Vercel Dashboard → Deploy from main branch
```

### Deploy Backend to Render

```bash
# Option 1: Connect GitHub repo to Render dashboard
# - Go to render.com/dashboard
# - New → Web Service
# - Connect GitHub repository
# - Set build command: npm ci
# - Set start command: npm start
# - Add environment variables
# - Create service

# Option 2: Use Render API
curl -X POST https://api.render.com/deploy/$RENDER_SERVICE_ID \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Environment Variables

### Backend (.env)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/balaji_construction
CORS_ORIGIN=https://yourdomain.com
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@balajiconstruction.com
```

### Frontend (.env.local)

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

### Vercel (Project Settings → Environment Variables)

```env
REACT_APP_API_URL=https://api.yourdomain.com
```

### Render (Environment → Environment Variables)

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://yourdomain.com
```

---

## Monitoring Deployments

### Vercel Dashboard
- URL: https://vercel.com/dashboard
- View deployment logs and analytics
- Rollback to previous versions if needed

### Render Dashboard
- URL: https://dashboard.render.com
- View build logs and metrics
- Monitor resource usage

### GitLab CI/CD Pipeline
- URL: https://gitlab.com/your-org/project/-/pipelines
- View build, test, and deployment logs
- Retry failed jobs

---

## Troubleshooting

### Pipeline Failures

1. **Build Failed**
   - Check GitLab CI logs: Project → CI/CD → Pipelines
   - Verify dependencies are installed: `npm ci` vs `npm install`
   - Check Node.js version compatibility (v18 recommended)

2. **Deployment Failed**
   - Verify credentials in GitLab Variables
   - Check Vercel/Render service limits
   - Ensure environment variables are set in deployment platform

3. **Health Check Failed**
   - Backend might not be running on Render
   - Database connection might be failing
   - Check Render logs for errors

### Common Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running
- Update connection string in `.env`
- Check IP whitelist in MongoDB Atlas

**Vercel Deployment Timeout**
- Frontend build is taking too long
- Check for large dependencies
- Optimize build with `NEXT_PUBLIC_` variables

**Render Deployment Failed**
- Service might be out of resources
- Check Render dashboard for errors
- Restart service manually from dashboard

---

## Performance Optimization

### Frontend
```bash
# Analyze bundle size
npm install --save-dev bundlesize
npm run analyze

# Optimize images
# Use WebP format for images
# Tree-shake unused dependencies
```

### Backend
```bash
# Monitor API performance
# Use APM tools like New Relic or Datadog
# Implement caching strategies
# Use connection pooling for MongoDB
```

### Docker
```bash
# Multi-stage builds (already implemented)
# Reduce image size with alpine images
# Use .dockerignore to exclude unnecessary files
```

---

## Scaling & High Availability

### Vercel
- Automatic scaling included
- CDN for static assets
- Edge Functions for dynamic content

### Render
- Manual scaling via Render dashboard
- Upgrade plan for more resources
- Add replicas for high availability

### Database
- Use MongoDB Atlas with replica sets
- Enable automatic backups
- Scale replica set based on usage

---

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use masked variables in GitLab CI
   - Rotate tokens regularly

2. **Dependencies**
   - Update dependencies regularly
   - Use `npm audit` to check vulnerabilities
   - Implement automated dependency updates

3. **API Security**
   - Enable HTTPS/TLS on all services
   - Implement rate limiting
   - Use CORS properly

4. **Database Security**
   - Enable authentication
   - Use IP whitelisting
   - Regular backups

---

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- GitLab CI/CD: https://docs.gitlab.com/ee/ci/
- Docker Docs: https://docs.docker.com/
- MongoDB Atlas: https://docs.atlas.mongodb.com/

---

## Next Steps

1. Set up GitLab CI/CD variables
2. Test local Docker setup: `docker-compose up`
3. Deploy frontend to Vercel
4. Deploy backend to Render
5. Configure custom domain
6. Set up SSL/TLS certificates
7. Monitor deployments and logs

