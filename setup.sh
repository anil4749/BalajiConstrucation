#!/bin/bash

# Balaji Construction - Project Setup Script

echo ""
echo "=========================================="
echo "Balaji Construction - Setup"
echo "=========================================="
echo ""

# Step 1: Install dependencies
echo "Step 1: Installing dependencies..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

echo "✓ Dependencies installed"
echo ""

# Step 2: Verify environment files exist
echo "Step 2: Verifying environment configuration files..."

# Backend environment files
if [ -f "backend/.env.local" ]; then
  echo "  ✓ backend/.env.local exists (Local development)"
else
  echo "  ✗ backend/.env.local missing!"
  exit 1
fi

if [ -f "backend/.env.production" ]; then
  echo "  ✓ backend/.env.production exists (Production template)"
else
  echo "  ✗ backend/.env.production missing!"
  exit 1
fi

# Frontend environment files
if [ -f "frontend/.env.local" ]; then
  echo "  ✓ frontend/.env.local exists (Local development)"
else
  echo "  ✗ frontend/.env.local missing!"
  exit 1
fi

if [ -f "frontend/.env.production" ]; then
  echo "  ✓ frontend/.env.production exists (Production template)"
else
  echo "  ✗ frontend/.env.production missing!"
  exit 1
fi

echo ""

# Step 3: Validate environment
echo "Step 3: Validating environment configuration..."
if [ -f "validate-env.sh" ]; then
  chmod +x validate-env.sh
  ./validate-env.sh
else
  echo "  ⚠️  validate-env.sh not found"
fi

echo ""
echo "=========================================="
echo "Balaji Construction - Setup Complete!"
echo "=========================================="
echo ""
echo "✅ Environment Configuration:"
echo ""
echo "FOR LOCAL DEVELOPMENT:"
echo "  Backend:  backend/.env.local"
echo "  Frontend: frontend/.env.local"
echo ""
echo "FOR PRODUCTION:"
echo "  Backend:  Use Render dashboard environment variables"
echo "  Frontend: Use Vercel dashboard environment variables"
echo "  (Templates in .env.production for reference)"
echo ""
echo "=========================================="
echo ""
echo "To run the application:"
echo ""
echo "Option 1 - Run both frontend and backend (recommended):"
echo "  npm run dev"
echo ""
echo "Option 2 - Run backend only:"
echo "  npm run start-backend"
echo ""
echo "Option 3 - Run frontend only:"
echo "  npm run start-frontend"
echo ""
echo "Option 4 - Run with Docker (complete isolation):"
echo "  docker-compose up -d"
echo ""
echo "Services will run on:"
echo "  Backend:  http://localhost:5000"
echo "  Frontend: http://localhost:3000"
echo ""
echo "Documentation:"
echo "  • ENV_CONFIGURATION.md     - Environment setup guide"
echo "  • ENVIRONMENT_SETUP.md     - Detailed configuration reference"
echo "  • DEPLOYMENT.md            - Deployment and CI/CD setup"
echo "  • DEPLOYMENT_CHECKLIST.md  - Production checklist"
echo ""
echo "=========================================="
echo ""
