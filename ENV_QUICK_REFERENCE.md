# Quick Reference - Environment Configuration

## 🚀 Quick Start

### Local Development
```bash
# Frontend (.env.local already configured)
cd frontend && npm start

# Backend (.env.local already configured)
cd backend && node server.js
```

## 📱 Configuration Values by Environment

### Balaji Construction Contact Details
```
Phone: +91-9637279798
Email: more.anil1693@gmail.com
WhatsApp: 919637279798
Address: Parola, district jalgaon, Maharashtra, India
Company: Balaji Construction
```

### Environment Variables Reference
| Variable | Value | Location |
|----------|-------|----------|
| `REACT_APP_WHATSAPP_NUMBER` | 919637279798 | frontend/.env.local |
| `REACT_APP_PHONE_NUMBER` | +91-9637279798 | frontend/.env.local |
| `REACT_APP_EMAIL` | more.anil1693@gmail.com | frontend/.env.local |
| `REACT_APP_ADDRESS` | Parola, district jalgaon, Maharashtra, India | frontend/.env.local |
| `REACT_APP_COMPANY_NAME` | Balaji Construction | frontend/.env.local |
| `REACT_APP_API_URL` | http://localhost:5000 | frontend/.env.local |
| `REACT_APP_ENV` | development | frontend/.env.local |
| `MONGODB_URI` | Configured | backend/.env.local |
| `CORS_ORIGIN` | http://localhost:3000 | backend/.env.local |

## 📝 Editing Configuration

All business logic uses values from environment variables. To change:

**WhatsApp Number:**
- Edit `frontend/.env.local`: `REACT_APP_WHATSAPP_NUMBER=<new_number>`

**Phone Number:**
- Edit `frontend/.env.local`: `REACT_APP_PHONE_NUMBER=<new_number>`

**Email:**
- Edit `frontend/.env.local`: `REACT_APP_EMAIL=<new_email>`

**Address:**
- Edit `frontend/.env.local`: `REACT_APP_ADDRESS=<new_address>`

**Company Name:**
- Edit `frontend/.env.local`: `REACT_APP_COMPANY_NAME=<new_name>`

**API URL (Production):**
- Edit `frontend/.env.local`: `REACT_APP_API_URL=https://your-api-domain.com`

## 🔍 Where Are These Values Used?

1. **InquiryForm.js** - Contact form, WhatsApp button, phone/email display
2. **Footer.js** - Company info, contact details, WhatsApp link
3. **ProjectDetail.js** - WhatsApp inquiry button

## ✅ Verification

All values are loaded from `frontend/src/config/appConfig.js` which reads from environment variables. 

**Check configuration is working:**
```bash
# These strings should NOT appear in the code:
grep -r "919637279798" frontend/src/components/ frontend/src/pages/
grep -r "more.anil1693@gmail.com" frontend/src/components/ frontend/src/pages/
grep -r "9637279798" frontend/src/components/ frontend/src/pages/

# Should see config usage instead:
grep -r "config.whatsapp" frontend/src/
grep -r "config.contact" frontend/src/
```

## 🎯 Business Logic - No Code Changes Needed!

Want to change contact details? Just edit `.env.local` files - the application automatically picks up the new values!

## 📦 Production Deployment Checklist

- [ ] Set `REACT_APP_API_URL` to production backend URL
- [ ] Set `REACT_APP_ENV=production`
- [ ] Set all `REACT_APP_WHATSAPP_*` variables
- [ ] Set all `REACT_APP_PHONE_NUMBER`, `REACT_APP_EMAIL`, etc.
- [ ] Backend: Set `MONGODB_URI` to production database
- [ ] Backend: Set `CORS_ORIGIN` to production frontend domain
- [ ] Test all functionality on staging before production
