# ⚡ QUICK START: Update Render Environment (5 Minutes)

## 🎯 Goal
Update the `CORS_ORIGIN` environment variable on Render so your new Vercel frontend can talk to the backend.

---

## 🚀 Step-by-Step (Copy & Paste)

### Step 1: Open Render Dashboard
👉 Visit: https://dashboard.render.com

### Step 2: Find Your Backend Service
- Look at the list of services/projects
- Find the one named: **balaji-api-guru** (or similar)
- Click on it

### Step 3: Go to Environment Variables
- In the left sidebar, look for: **Environment** (or **Settings**)
- Click it

### Step 4: Find CORS_ORIGIN Variable
- Scroll through the environment variables list
- Look for: **CORS_ORIGIN**
- You should see it currently set to: `https://balaji-construcation.vercel.app`

### Step 5: Click Edit (or the pencil icon)
- Click the edit button next to CORS_ORIGIN
- Or double-click the value to edit it

### Step 6: Replace with New URL
**Delete:**
```
https://balaji-construcation.vercel.app
```

**Type:**
```
https://balaji-construction-drab.vercel.app
```

**Check:**
- ✅ No typos
- ✅ Correct spelling: `construction` (not `construcation`)
- ✅ Includes: `-drab` suffix
- ✅ No trailing slash
- ✅ Starts with: `https://`

### Step 7: Save Changes
- Click **Save** button (or **Update**)
- Backend will restart automatically (takes 30-60 seconds)
- You'll see status change to redeploying, then back to "Live" ✅

### Step 8: Verify It Worked
Wait 1 minute, then:

```bash
# From your project folder
./test-deployment.sh
```

Or manually test:
```bash
curl https://balaji-api-guru.onrender.com/api/health
```

---

## ✅ Expected Result

After saving, Render logs should show:
```
✓ Server Configuration:
   Environment: production
   CORS Origin: https://balaji-construction-drab.vercel.app
   ...
```

And when you run test script, you should see:
```
✓ PASS: CORS headers allow https://balaji-construction-drab.vercel.app
```

---

## 🔍 Double-Check Checklist

After updating on Render, verify:

- [ ] Variable name: `CORS_ORIGIN` (exact case)
- [ ] Variable value: `https://balaji-construction-drab.vercel.app`
- [ ] No extra spaces before or after
- [ ] Status shows "Live" (green checkmark)
- [ ] Been at least 1 minute since save

---

## 🧪 Test Immediately After

### Test 1: Browser
1. Visit: https://balaji-construction-drab.vercel.app
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Refresh page
5. **Should see NO red errors**

### Test 2: Terminal
```bash
./test-deployment.sh
```

### Test 3: Contact Form
1. Fill out the contact form on the website
2. Click Submit
3. Should complete without error

---

## If It Doesn't Work

### Check 1: Domain Spelling
Make sure it's exactly:
```
https://balaji-construction-drab.vercel.app
```

NOT ~~balaji-construcation~~ (that's the old misspelling!)

### Check 2: Render Status
- Go back to Render dashboard
- Check service status is "Live" ✅
- Check there are no error notifications

### Check 3: Browser Cache
- Press: Cmd+Shift+Delete (Mac) or Ctrl+Shift+Delete (Windows)
- Select: All time
- Click: Clear Data
- Then hard refresh the website

### Check 4: Verify Environment Variable
- Go back to Render
- It should still show the value you just saved
- If it reverted, save it again

---

## 📞 That's It!

You've successfully:
1. ✅ Fixed backend CORS configuration
2. ✅ Updated environment variable on Render
3. ✅ Your new Vercel frontend can now communicate with backend

---

## 🎉 Success Signs

After Render is updated, you'll see:
- ✅ Contact form submissions work
- ✅ Projects page loads data
- ✅ No CORS errors in browser console
- ✅ Tests pass with green checkmarks

---

## 📚 Need More Help?

- **Detailed guide:** Read `CORS_FIX_CHECKLIST.md`
- **Full setup:** Read `VERCEL_DEPLOYMENT_SETUP.md`
- **Test your setup:** Run `./test-deployment.sh`

