# Balaji Construction - Real Estate Website

A modern, responsive full-stack web application for Balaji Construction showcasing bungalows, row houses, and construction projects.

## 📋 Features

### Core Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Project Showcase**: Display ongoing, upcoming, and completed projects
- **Inquiry Management**: Submit and track customer inquiries
- **Contact System**: Multiple contact options (Email, Phone, WhatsApp)
- **Admin Dashboard**: Manage projects and inquiries (ready for implementation)
- **Vision & Values**: Display company values and mission

### Technical Features
- Clean, modern UI with Tailwind CSS
- RESTful API with Express.js
- MongoDB database integration
- Email notifications via Nodemailer
- WhatsApp integration
- CORS enabled for cross-origin requests

## 🛠️ Technology Stack

### Frontend
- **React 18**: Full-stack JavaScript framework
- **React Router**: Navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Icons**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Nodemailer**: Email service
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variables management

## 📁 Project Structure

```
BalajiConstrucation/
├── backend/
│   ├── models/
│   │   ├── Inquiry.js
│   │   └── Project.js
│   ├── controllers/
│   │   ├── inquiryController.js
│   │   └── projectController.js
│   ├── routes/
│   │   ├── inquiries.js
│   │   ├── projects.js
│   │   └── contact.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── HeroSection.js
│   │   │   ├── VisionSection.js
│   │   │   ├── ProjectCard.js
│   │   │   └── InquiryForm.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Projects.js
│   │   │   ├── Contact.js
│   │   │   └── About.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (Local or Atlas)

### Step 1: Clone/Download the Project
```bash
cd /Users/anil/Desktop/BalajiConstrucation
```

### Step 2: Install Dependencies

Option A - Using automation script:
```bash
chmod +x setup.sh
./setup.sh
```

Option B - Manual installation:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Configure Environment Variables

#### Backend (.env)
Create/Edit `/backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/balaji-construction
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
WHATSAPP_NUMBER=919876543210
NODE_ENV=development
```

**Email Configuration (Gmail)**:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App Passwords and generate password for Mail
4. Use this password in EMAIL_PASSWORD

### Step 4: Start MongoDB
```bash
# If MongoDB is installed locally
mongod
```

Or use MongoDB Atlas (Cloud):
- Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster and get connection string
- Replace MONGODB_URI in .env

### Step 5: Run the Application

#### Option 1: Run Both Frontend and Backend
```bash
npm run dev
```

#### Option 2: Run Backend Only
```bash
npm run start-backend
```

#### Option 3: Run Frontend Only
```bash
npm run start-frontend
```

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📝 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?status=Ongoing` - Filter by status
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project (Admin)

### Inquiries
- `POST /api/inquiries` - Submit inquiry
- `GET /api/inquiries` - Get all inquiries (Admin)

### Contact
- `POST /api/contact` - Send contact message

## 🎨 Pages & Components

### Pages
1. **Home** (`/`)
   - Hero section with call-to-action
   - Featured projects
   - Vision and values
   - Inquiry form

2. **Projects** (`/projects`)
   - All projects with filtering
   - Project cards with details
   - Status-based filtering

3. **About** (`/about`)
   - Company information
   - Approach and methodology
   - Why choose us section

4. **Contact** (`/contact`)
   - Inquiry form
   - Contact information
   - WhatsApp and email options

### Components
- **Header**: Navigation bar with logo
- **Footer**: Footer with contacts and links
- **HeroSection**: Full-height banner
- **VisionSection**: Company values display
- **ProjectCard**: Individual project display
- **InquiryForm**: Contact and inquiry form

## 🔧 Development Notes

### Adding New Projects
Since MongoDB is used, projects can be added through:
1. Admin panel (to be developed)
2. API endpoint with admin authentication
3. Direct database insertion

### Customization

**Change Company Details**:
Edit the following files:
- `frontend/src/components/Header.js` - Logo and company name
- `frontend/src/components/Footer.js` - Contact information and WhatsApp
- `backend/.env` - Contact numbers and emails

**Change Colors**:
Edit `frontend/tailwind.config.js` and update the color palette

**Change Content**:
Edit individual page files in `frontend/src/pages/`

## 📧 Email Configuration

To enable email notifications:
1. Configure Gmail app password (see Step 3 above)
2. Update `.env` with EMAIL_USER and EMAIL_PASSWORD
3. System will auto-send confirmation emails on inquiry submission

## 📱 WhatsApp Integration

The website includes WhatsApp chat functionality:
- Direct messaging link in contacts
- Quick chat button in inquiry form
- Pre-filled messages for better engagement

To change WhatsApp number:
1. Update in `frontend/src/components/Footer.js`
2. Update in `frontend/src/components/InquiryForm.js`
3. Format: Country code + Number (e.g., 919876543210)

## 🔒 Security Notes

- Store sensitive data in `.env` files
- Never commit `.env` to version control
- Add authentication for admin endpoints
- Validate all user inputs on backend
- Use HTTPS in production

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Future Enhancements

- [ ] Admin panel for project management
- [ ] User authentication
- [ ] Image upload functionality
- [ ] Payment gateway integration
- [ ] Virtual property tours
- [ ] Customer reviews section
- [ ] Blog section
- [ ] Mobile app

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify firewall settings if using cloud MongoDB

### Email Not Sending
- Verify Gmail app password is correct
- Ensure 2-step verification is enabled
- Check spam folder
- Verify email configuration in `.env`

### CORS Error
- Frontend is trying to access backend incorrectly
- Ensure proxy is set in frontend `package.json`
- Backend CORS is configured in `server.js`

### Port Already in Use
```bash
# Change port in .env (Backend)
# or kill process using the port
# macOS/Linux:
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

## 📄 License

This project is proprietary software for Balaji Construction.

## 👥 Support

For issues and questions, contact the development team.

---

**Last Updated**: March 2026
**Status**: Ready for Development
