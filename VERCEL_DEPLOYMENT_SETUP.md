# Vercel Deployment Setup - Correct Domain Configuration

## 🎯 New Deployment Details

- **New Frontend Domain**: https://balaji-construction-drab.vercel.app
- **Backend API**: https://balaji-api-guru.onrender.com
- **Spelling Fixed**: `construction` (was incorrectly `construcation`)

---

## ✅ What's Been Fixed

1. ✓ **CORS Regex Pattern** - Updated in `backend/server.js`
   - Old: `/^https:\/\/balaji-construcation.*\.vercel\.app$/`
   - New: `/^https:\/\/balaji-construction.*\.vercel\.app$/`

2. ✓ **Backend Environment** - Updated `backend/.env.production`
   - `CORS_ORIGIN=https://balaji-construction-drab.vercel.app`

3. ✓ **Frontend Environment** - Updated `frontend/.env.production`
   - `CORS_ORIGIN=https://balaji-construction-drab.vercel.app`

---

## 🚀 Step-by-Step Vercel Configuration

### Step 1: Configure Frontend in Vercel

Go to [Vercel Dashboard](https://vercel.com/dashboard) > Select your new project `balaji-construction-drab`

#### Settings → Environment Variables

Add the following environment variables:

| Variable Name | Value | Environment |
|---|---|---|
| `REACT_APP_API_URL` | `https://balaji-api-guru.onrender.com` | Production |
| `REACT_APP_ENV` | `production` | Production |
| `NODE_ENV` | `production` | Production |
| `REACT_APP_VERSION` | `1.0.0` | Production |
| `REACT_APP_NAME` | `Balaji Construction` | Production |
| `REACT_APP_DEBUG_MODE` | `false` | Production |

**Steps:**
1. Go to **Settings** tab
2. Click **Environment Variables** (left sidebar)
3. Add each variable with scope: **Production**
4. Save changes

---

### Step 2: Configure Backend (Render) to Accept New Frontend

Since your backend is on Render (https://balaji-api-guru.onrender.com):

1. **Render Dashboard** → Select your backend service
2. **Environment** (in left sidebar)
3. Update the environment variable:
   - Key: `CORS_ORIGIN`
   - Value: `https://balaji-construction-drab.vercel.app`
4. **Save** and service will restart

---

## 🔍 CORS Configuration Summary

### Backend (Render) - `.env.production`
```env
CORS_ORIGIN=https://balaji-construction-drab.vercel.app
```

### Backend Code (`server.js`) - Already Updated ✓
```javascript
const allowedOrigins = [
  BASE_CORS_ORIGIN,
  'http://localhost:3000',
  'http://localhost:3001',
  /^https:\/\/balaji-construction.*\.vercel\.app$/,  // ✓ Fixed spelling
];
```

### Frontend (Vercel) - `.env.production`
```env
REACT_APP_API_URL=https://balaji-api-guru.onrender.com
CORS_ORIGIN=https://balaji-construction-drab.vercel.app
```

---

## ✨ Testing the Setup

### 1. **Health Check**
```bash
curl https://balaji-api-guru.onrender.com/api/health
```
Expected response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "environment": "production"
}
```

### 2. **Test CORS Headers**
```bash
curl -H "Origin: https://balaji-construction-drab.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: content-type" \
     -X OPTIONS https://balaji-api-guru.onrender.com/api/health -v
```

Should see:
```
Access-Control-Allow-Origin: https://balaji-construction-drab.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
```

### 3. **Frontend Test**
1. Visit: https://balaji-construction-drab.vercel.app
2. Open **Browser DevTools** → **Network** tab
3. Test form submission or project load
4. Should see **200 OK** response, NOT CORS errors

---

## 🛠️ Quick Troubleshooting

### CORS Error Still Appearing?

**If you see**: `Access to XMLHttpRequest blocked by CORS policy`

**Do this**:
1. Clear browser cache (Cmd+Shift+Delete on Mac)
2. Hard refresh (Cmd+Shift+R on Mac)
3. Check that environment variables match EXACTLY:
   - Frontend must send requests to: `https://balaji-api-guru.onrender.com`
   - Backend must have: `CORS_ORIGIN=https://balaji-construction-drab.vercel.app`

### API Not Found (404)?

Check that `REACT_APP_API_URL` in Vercel environment variables is:
```
https://balaji-api-guru.onrender.com
```
NOT `https://balaji-api-guru.onrender.com/api` (the `/api` is added by frontend code)

### Backend Coming Back as 5XX Error?

1. Check Render logs: https://dashboard.render.com
2. Verify `MONGODB_URI` is correct in Render environment
3. Verify `CORS_ORIGIN` matches exactly

---

## 📋 Checklist Before Going Live

- [ ] CORS_ORIGIN in backend = `https://balaji-construction-drab.vercel.app`
- [ ] REACT_APP_API_URL in frontend = `https://balaji-api-guru.onrender.com`
- [ ] Test health endpoint: `/api/health`
- [ ] Test form submission
- [ ] Test project loading
- [ ] Check browser console for errors
- [ ] Verify no CORS errors appear
- [ ] Test on mobile device
- [ ] Verify database connection is working

---

## 🔗 Useful Links

- **Frontend**: https://balaji-construction-drab.vercel.app
- **Backend Health**: https://balaji-api-guru.onrender.com/api/health
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com

---

## 📝 Notes

- All environment files have been updated with correct domain
- CORS regex pattern in backend/server.js supports all Vercel preview URLs
- Development environment (localhost) still works with local settings
- MongoDB connection timing out? Check: IP whitelist in MongoDB Atlas includes both Vercel IPs and Render IPs

