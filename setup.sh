#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

echo ""
echo "=========================================="
echo "Balaji Construction - Setup Complete!"
echo "=========================================="
echo ""
echo "To run the application:"
echo ""
echo "Option 1 - Run both frontend and backend:"
echo "  npm run dev"
echo ""
echo "Option 2 - Run backend only:"
echo "  npm run start-backend"
echo ""
echo "Option 3 - Run frontend only:"
echo "  npm run start-frontend"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "=========================================="
