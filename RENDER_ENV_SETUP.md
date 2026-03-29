# 🎯 RENDER ENVIRONMENT SETUP GUIDE

## Step-by-Step Instructions for Render Dashboard

### 1. Go to Render Dashboard
   → https://dashboard.render.com

### 2. Select Your Backend Service
   → Click on: balaji-api-guru (Backend Service)

### 3. Go to Environment
   → Top menu: Environment (or Settings → Environment)

### 4. Add/Update These Environment Variables

   ┌──────────────────────────────────────────────────┐
   │ Current Variables to VERIFY/UPDATE:              │
   └──────────────────────────────────────────────────┘

   Variable 1:
   ┌──────────────────────────────────────────────────┐
   │ Name: CORS_ORIGIN                                │
   │ Value: https://balaji-construcation.vercel.app   │
   │ Click: "Save"                                    │
   └──────────────────────────────────────────────────┘

   Variable 2:
   ┌──────────────────────────────────────────────────┐
   │ Name: NODE_ENV                                   │
   │ Value: production                                │
   │ Click: "Save"                                    │
   └──────────────────────────────────────────────────┘

   Variable 3:
   ┌──────────────────────────────────────────────────┐
   │ Name: API_URL                                    │
   │ Value: https://balaji-api-guru.onrender.com      │
   │ Click: "Save"                                    │
   └──────────────────────────────────────────────────┘

   Variable 4:
   ┌──────────────────────────────────────────────────┐
   │ Name: MONGODB_URI                                │
   │ Value: mongodb+srv://[user]:[pass]@...          │
   │ Click: "Save"                                    │
   └──────────────────────────────────────────────────┘

### 5. Auto-Redeploy
   → Render will automatically redeploy when you save
   → Wait for deployment status to show "Live"
   → Check the Logs for any errors

### 6. Test the Connection
   
   Run in your terminal:
   ```bash
   curl -X GET https://balaji-api-guru.onrender.com/api/health
   ```

   Expected response:
   ```json
   {
     "status": "OK",
     "message": "Server is running",
     "environment": "production"
   }
   ```

### 7. Test CORS from Frontend

   Visit: https://balaji-construcation.vercel.app
   Open DevTools → Console
   Should see NO CORS errors!

---

## Common Issues & Fixes

### Issue: "Access-Control-Allow-Origin missing"
**Solution:** Verify CORS_ORIGIN is set correctly in Render

### Issue: "Database connection timeout"
**Solution:** Ensure MONGODB_URI has proper IP whitelist

### Issue: Environment variables not updating
**Solution:** Check Render > Service > Environment > refresh

### Issue: Still getting localhost error
**Solution:** 
1. Check Vercel REACT_APP_API_URL is set to https://balaji-api-guru.onrender.com
2. Redeploy on Vercel
3. Wait 2-3 minutes for cache to clear
4. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
