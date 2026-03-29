# 🔧 Production CORS & API Configuration Troubleshooting

## 🎯 Problem Identified

Your frontend (Vercel) is still calling `http://localhost:5000` instead of the production backend (`https://balaji-api-guru.onrender.com`).

This happens because:
1. ✗ Frontend environment variable `REACT_APP_API_URL` is NOT set in Vercel dashboard
2. ✗ Build time uses `.env.production` file, but Vercel overrides this at runtime
3. Result: Falls back to hardcoded localhost fallback

---

## 🛠️ Quick Fix Checklist

### Frontend (Vercel)
- [ ] Go to Vercel Dashboard → Project → Settings → Environment Variables
- [ ] Add: `REACT_APP_API_URL = https://balaji-api-guru.onrender.com`
- [ ] Set for: Production ✓, Preview ✓
- [ ] Redeploy the application
- [ ] Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Backend (Render)
- [ ] Go to Render Dashboard → Service → Environment
- [ ] Update: `CORS_ORIGIN = https://balaji-construcation.vercel.app`
- [ ] Verify: `NODE_ENV = production`
- [ ] Verify: `API_URL = https://balaji-api-guru.onrender.com`
- [ ] Render auto-redeploys when you save
- [ ] Wait for status to show "Live"

---

## 🔍 Verification Steps

### 1. Check Frontend API URL

Open your browser's DevTools at https://balaji-construcation.vercel.app:

```javascript
// In DevTools Console, paste this:
console.log(process.env.REACT_APP_API_URL);
```

**Expected output:**
```
https://balaji-api-guru.onrender.com
```

**If you see `undefined` or `http://localhost:5000`:**
> Your Vercel environment variables are not set!

---

### 2. Check Backend CORS

In DevTools Console, paste:

```javascript
// Test CORS
fetch('https://balaji-api-guru.onrender.com/api/health', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log('✅ CORS OK:', data))
.catch(err => console.error('❌ CORS Error:', err));
```

**Expected output:**
```json
✅ CORS OK: {
  "status": "OK",
  "message": "Server is running",
  "environment": "production"
}
```

**If you see CORS error:**
> Backend `CORS_ORIGIN` not set correctly!

---

### 3. Check Network Tab

DevTools → Network tab → Refresh page

Look for API calls:
- ✓ **Good:** `https://balaji-api-guru.onrender.com/api/projects` (Status 200)
- ✗ **Bad:** `http://localhost:5000/api/projects` (CORS Error, Status 0)

---

## 🚀 Environment Variables Reference

### Vercel (Frontend) - Settings → Environment Variables

| Variable | Value | Environments |
|----------|-------|--------------|
| `REACT_APP_API_URL` | `https://balaji-api-guru.onrender.com` | Production, Preview |
| `REACT_APP_ENV` | `production` | Production, Preview |

### Render (Backend) - Environment Variables

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `API_URL` | `https://balaji-api-guru.onrender.com` |
| `CORS_ORIGIN` | `https://balaji-construcation.vercel.app` |
| `MONGODB_URI` | `mongodb+srv://jagruti3945_db_user:K63ZRg7pCUewXurj@balajiconstruction.leuhgrj.mongodb.net/balaji-construction?retryWrites=true&w=majority&appName=BalajiConstruction` |

---

## 🔄 Deployment Process

1. **Update Code**
   ```bash
   git commit -m "Update environment configuration"
   git push origin main
   ```

2. **GitLab CI/CD Pipeline**
   - Automatically triggers on git push
   - Tests → Builds → Deploys to Vercel & Render

3. **Vercel Auto-Deploy**
   - Vercel webhooks trigger on git push
   - OR manually redeploy from dashboard

4. **Render Auto-Deploy**
   - Same git webhook triggers deployment
   - OR set environment variables → auto-redeploy
   - OR manually deploy from dashboard

---

## 🎭 How It Works

```
USER BROWSER
    ↓
https://balaji-construcation.vercel.app (Frontend)
    ↓
fetch('https://balaji-api-guru.onrender.com/api/projects', {
  headers: { 'Origin': 'https://balaji-construcation.vercel.app' }
})
    ↓
Render Backend receives request
    ↓
Checks: Does Origin match CORS_ORIGIN environment variable?
    ↓
YES → Returns data with CORS headers
    ↓
NO → Blocks request (CORS error)
```

---

## ⚠️ Common Mistakes

| Mistake | Impact | Solution |
|---------|--------|----------|
| `.env.production` instead of dashboard | Variables not loaded | Set in platform dashboard |
| CORS_ORIGIN doesn't match frontend URL | CORS blocked | Use exact URL with https:// |
| Forgot to redeploy | Changes not live | Redeploy after changing vars |
| Cache not cleared | Old values cached | Hard refresh: Cmd+Shift+R |
| Still calling localhost | Fallback triggered | Verify env var in console |

---

## 📱 Test from Your Phone

To test from phone while on same WiFi:

1. **Get your machine's IP:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Test local API:**
   ```
   http://192.168.x.x:5000/api/projects
   ```

3. **Test production API:**
   ```
   https://balaji-api-guru.onrender.com/api/projects
   ```

---

## ✅ Full Verification Checklist

After making all changes, verify:

- [ ] Vercel dashboard shows `REACT_APP_API_URL` environment variable
- [ ] Render dashboard shows `CORS_ORIGIN` environment variable
- [ ] Vercel shows latest deployment (check timestamp)
- [ ] Render shows "Live" status
- [ ] `console.log(process.env.REACT_APP_API_URL)` shows production URL
- [ ] Network tab shows calls to production backend
- [ ] Console shows no CORS errors
- [ ] Projects page loads with data
- [ ] Forms submit without errors
- [ ] No localhost references in browser console

---

## 🆘 Still Having Issues?

Try these steps in order:

1. **Hard clear cache:**
   - Browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Or: Incognito/Private window

2. **Check Vercel deployment:**
   - Vercel → Deployments tab
   - Click latest deployment → check "Build & Development Logs"

3. **Check Render logs:**
   - Render → Service → Logs tab
   - Look for errors like "CORS blocked" or "ECONNREFUSED"

4. **Verify credentials:**
   - MongoDD connection working?
   - Run: `https://balaji-api-guru.onrender.com/api/health`

5. **Check network:**
   - Try from different WiFi or cellular
   - Ensure no firewall blocking

6. **Contact Support:**
   - Vercel: https://vercel.com/support
   - Render: https://render.com/support
   - MongoDB: https://www.mongodb.com/support
