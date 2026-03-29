# Get Vercel Credentials - Quick Form

## Your Vercel Information

Fill in this form by following the steps below, then save this file with your values.

### Step 1: Get VERCEL_ORG_ID

```
1. Visit: https://vercel.com/account/teams
2. Look at the page - you should see a section like:

   TEAMS
   ────────
   anil4749s-projects
   Team ID: [COPY THIS VALUE]

3. Paste the Team ID here:
   VERCEL_ORG_ID = _____________________________________
```

**Your Team from settings page:** `anil4749s-projects`

The Team ID appears right below it. Copy and paste above.

---

### Step 2: Get VERCEL_TOKEN

```
1. Visit: https://vercel.com/account/tokens
2. Click the blue "Create" button
3. Fill the form:
   - Name: GitLab-CICD
   - Expiration: No expiration
   - Scope: Full Account
4. Click "Create Token"
5. ⚠️ IMPORTANT: Copy immediately (won't show again!)
6. Paste here:
   VERCEL_TOKEN = _____________________________________
```

---

### Step 3: Render Backend Service ID

```
1. Visit: https://dashboard.render.com
2. Click on your backend service (balaji-api)
3. Look at the URL in the address bar
4. It looks like: https://dashboard.render.com/web/srv-abc123def456
5. Copy the part after /web/
   RENDER_BACKEND_SERVICE_ID = _____________________________________
```

---

### Step 4: Render API Key

```
1. Visit: https://dashboard.render.com
2. Click profile icon (bottom left)
3. Select "Settings"
4. Go to "API Keys" tab
5. Click "Create API Key"
6. Name: GitLab-CICD
7. ⚠️ IMPORTANT: Copy immediately (won't show again!)
   RENDER_API_KEY = _____________________________________
```

---

### Step 5: Frontend & Backend URLs

```
Frontend URL (from Vercel):
   FRONTEND_URL = https://your-project.vercel.app

Backend URL (from Render):
   BACKEND_URL = https://your-backend.onrender.com
```

---

## Once You Have All Values

Reply with these values and I'll add them to GitLab immediately:

```
VERCEL_ORG_ID = 
VERCEL_TOKEN = 
RENDER_API_KEY = 
RENDER_BACKEND_SERVICE_ID = 
FRONTEND_URL = 
BACKEND_URL = 
GITHUB_REPO_FRONTEND = anil4749/BalajiConstrucation
```
