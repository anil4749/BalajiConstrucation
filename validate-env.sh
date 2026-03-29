#!/bin/bash

# Environment Configuration Validator
# Checks all required environment variables for development and production

echo "════════════════════════════════════════════════████════════════════════"
echo "  🔍 Environment Configuration Validator"
echo "════════════════════════════════════════════════════════════════════════"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
REQUIRED_MISSING=0
OPTIONAL_MISSING=0
CHECKS_PASSED=0

# Function to check variable
check_var() {
  local var_name=$1
  local var_value=$2
  local is_required=$3
  local is_sensitive=$4
  local file_location=$5

  if [ -z "$var_value" ]; then
    if [ "$is_required" = "required" ]; then
      echo -e "${RED}✗ ${NC}${var_name} (${file_location}) - ${RED}MISSING (Required)${NC}"
      ((REQUIRED_MISSING++))
    else
      echo -e "${YELLOW}⚠ ${NC}${var_name} (${file_location}) - ${YELLOW}MISSING (Optional)${NC}"
      ((OPTIONAL_MISSING++))
    fi
  else
    if [ "$is_sensitive" = "sensitive" ]; then
      echo -e "${GREEN}✓ ${NC}${var_name} (${file_location}) - ${GREEN}SET (●●●●●●●●)${NC}"
    else
      echo -e "${GREEN}✓ ${NC}${var_name} (${file_location}) - ${GREEN}${var_value}${NC}"
    fi
    ((CHECKS_PASSED++))
  fi
}

# ========================
# BACKEND CONFIGURATION
# ========================
echo -e "${BLUE}📋 Backend Configuration (backend/.env)${NC}"
echo "────────────────────────────────────────────────────────"

# Load backend .env if it exists
if [ -f "backend/.env" ]; then
  source backend/.env 2>/dev/null
  
  check_var "NODE_ENV" "$NODE_ENV" "required" "non-sensitive" "backend/.env"
  check_var "PORT" "$PORT" "required" "non-sensitive" "backend/.env"
  check_var "API_URL" "$API_URL" "optional" "non-sensitive" "backend/.env"
  check_var "MONGODB_URI" "$MONGODB_URI" "required" "sensitive" "backend/.env"
  check_var "CORS_ORIGIN" "$CORS_ORIGIN" "required" "non-sensitive" "backend/.env"
  check_var "SMTP_SERVICE" "$SMTP_SERVICE" "optional" "non-sensitive" "backend/.env"
  check_var "SMTP_USER" "$SMTP_USER" "optional" "sensitive" "backend/.env"
  check_var "SMTP_PASSWORD" "$SMTP_PASSWORD" "optional" "sensitive" "backend/.env"
  check_var "SMTP_FROM" "$SMTP_FROM" "optional" "non-sensitive" "backend/.env"
  check_var "WHATSAPP_NUMBER" "$WHATSAPP_NUMBER" "optional" "non-sensitive" "backend/.env"
else
  echo -e "${RED}✗ backend/.env file not found!${NC}"
  echo "   → Run: cp backend/.env.example backend/.env"
fi

echo ""

# ========================
# FRONTEND CONFIGURATION
# ========================
echo -e "${BLUE}📋 Frontend Configuration (frontend/.env.local)${NC}"
echo "────────────────────────────────────────────────────────"

# Load frontend .env.local if it exists
if [ -f "frontend/.env.local" ]; then
  source frontend/.env.local 2>/dev/null
  
  check_var "REACT_APP_API_URL" "$REACT_APP_API_URL" "required" "non-sensitive" "frontend/.env.local"
  check_var "REACT_APP_ENV" "$REACT_APP_ENV" "optional" "non-sensitive" "frontend/.env.local"
else
  echo -e "${YELLOW}⚠ frontend/.env.local file not found${NC}"
  echo "   → Run: cp frontend/.env.example frontend/.env.local"
  echo "   → Then fill in REACT_APP_API_URL"
fi

echo ""

# ========================
# CONNECTIVITY CHECKS
# ========================
echo -e "${BLUE}🔗 Connectivity Checks${NC}"
echo "────────────────────────────────────────────────────────"

# Check if backend is running
if [ ! -z "$BACKEND_URL" ] || [ ! -z "http://localhost:5000" ]; then
  BACKEND_CHECK="${BACKEND_URL:-http://localhost:5000}"
  if curl -s "$BACKEND_CHECK/api/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ ${NC}Backend health check passed: ${BACKEND_CHECK}/api/health"
  else
    echo -e "${YELLOW}⚠ ${NC}Backend not responding at ${BACKEND_CHECK}/api/health"
    echo "   → Start backend first: npm run dev"
  fi
else
  echo -e "${YELLOW}⚠ ${NC}Cannot test backend connectivity (BACKEND_URL not set)"
fi

echo ""

# ========================
# SUMMARY
# ========================
echo -e "${BLUE}📊 Summary${NC}"
echo "────────────────────────────────────────────────────────"
echo -e "  Checks Passed:  ${GREEN}${CHECKS_PASSED}${NC}"
echo -e "  Required Missing: ${RED}${REQUIRED_MISSING}${NC}"
echo -e "  Optional Missing: ${YELLOW}${OPTIONAL_MISSING}${NC}"
echo ""

if [ $REQUIRED_MISSING -eq 0 ]; then
  echo -e "${GREEN}✓ All required environment variables are configured!${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Run: npm run dev (to start development)"
  echo "  2. Or check: cat ENVIRONMENT_SETUP.md (for production setup)"
else
  echo -e "${RED}✗ Missing ${REQUIRED_MISSING} required environment variable(s)${NC}"
  echo ""
  echo "Setup Instructions:"
  echo "  1. Copy example files:"
  echo "     - cp backend/.env.example backend/.env"
  echo "     - cp frontend/.env.example frontend/.env.local"
  echo "  2. Fill in required values"
  echo "  3. Run this script again to verify: ./validate-env.sh"
fi

echo ""
echo "════════════════════════════════════════════════════════════════════════"
