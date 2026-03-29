# 🎯 VERCEL ENVIRONMENT SETUP GUIDE

## Step-by-Step Instructions for Vercel Dashboard

### 1. Go to Vercel Dashboard
   → https://vercel.com/dashboard

### 2. Select Your Project
   → Click on: balaji-construcation

### 3. Go to Settings
   → Top menu: Settings → Environment Variables

### 4. Add These Environment Variables

   For PRODUCTION environment:
   ┌─────────────────────────────────────────────────────────────────┐
   │ Variable Name: REACT_APP_API_URL                                │
   │ Value: https://balaji-api-guru.onrender.com                     │
   │ Environments: Production ✓, Preview ✓, Development ✗            │
   │ Click: "Save"                                                   │
   └─────────────────────────────────────────────────────────────────┘

   For PREVIEW/Development:
   ┌─────────────────────────────────────────────────────────────────┐
   │ Variable Name: REACT_APP_API_URL                                │
   │ Value: http://localhost:5000                                    │
   │ Environments: Production ✗, Preview ✓, Development ✓            │
   │ Click: "Save"                                                   │
   └─────────────────────────────────────────────────────────────────┘

### 5. Redeploy Your Application
   → Go to Deployments tab
   → Click the three dots (...) on latest deployment
   → Click "Redeploy"
   → Wait for deployment to complete

### 6. Verify
   → Visit: https://balaji-construcation.vercel.app
   → Open DevTools → Network tab
   → Refresh page
   → Check API calls go to: https://balaji-api-guru.onrender.com

---

## Screenshot Example

Settings → Environment Variables

[Screenshot would show:]
- REACT_APP_API_URL
- Value: https://balaji-api-guru.onrender.com
- Production ✓ checked
- Click "Save"

Then redeploy!
