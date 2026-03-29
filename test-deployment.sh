#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}  Balaji Construction - Deployment Verification${NC}"
echo -e "${BLUE}==================================================${NC}\n"

FRONTEND_URL="https://balaji-construction-drab.vercel.app"
BACKEND_URL="https://balaji-api-guru.onrender.com"
HEALTH_ENDPOINT="${BACKEND_URL}/api/health"
PROJECTS_ENDPOINT="${BACKEND_URL}/api/projects"

# Function to print test result
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
    fi
}

# Test 1: Backend Health Check
echo -e "${YELLOW}Test 1: Backend Health Check${NC}"
echo "  Checking: $HEALTH_ENDPOINT"
RESPONSE=$(curl -s -w "\n%{http_code}" "${HEALTH_ENDPOINT}" 2>/dev/null)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    print_result 0 "Backend is responding (HTTP $HTTP_CODE)"
    echo "  Response: $BODY" | head -c 100
    echo "..."
else
    print_result 1 "Backend returned HTTP $HTTP_CODE"
fi
echo ""

# Test 2: CORS Headers
echo -e "${YELLOW}Test 2: CORS Headers from New Frontend${NC}"
echo "  Testing CORS from: $FRONTEND_URL"
CORS_RESPONSE=$(curl -s \
    -H "Origin: ${FRONTEND_URL}" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: content-type" \
    -X OPTIONS "${HEALTH_ENDPOINT}" \
    -w "\nHTTP_CODE:%{http_code}" -v 2>&1 | grep -i "access-control-allow-origin")

if echo "$CORS_RESPONSE" | grep -q "${FRONTEND_URL}"; then
    print_result 0 "CORS headers allow $FRONTEND_URL"
    echo "  Header: $CORS_RESPONSE"
else
    print_result 1 "CORS headers do not allow $FRONTEND_URL"
    echo "  ${RED}Make sure CORS_ORIGIN environment variable is set to: ${FRONTEND_URL}${NC}"
fi
echo ""

# Test 3: Projects Endpoint
echo -e "${YELLOW}Test 3: Projects API Endpoint${NC}"
echo "  Checking: $PROJECTS_ENDPOINT"
PROJECTS_RESPONSE=$(curl -s -w "\n%{http_code}" "${PROJECTS_ENDPOINT}" 2>/dev/null)
HTTP_CODE=$(echo "$PROJECTS_RESPONSE" | tail -n1)
BODY=$(echo "$PROJECTS_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    print_result 0 "Projects endpoint is working (HTTP $HTTP_CODE)"
else
    print_result 1 "Projects endpoint returned HTTP $HTTP_CODE"
fi
echo ""

# Test 4: Frontend Accessibility
echo -e "${YELLOW}Test 4: Frontend Accessibility${NC}"
echo "  Checking: $FRONTEND_URL"
FRONTEND_RESPONSE=$(curl -s -w "\n%{http_code}" "${FRONTEND_URL}" 2>/dev/null | tail -n1)

if [ "$FRONTEND_RESPONSE" = "200" ]; then
    print_result 0 "Frontend is accessible (HTTP $FRONTEND_RESPONSE)"
else
    print_result 1 "Frontend returned HTTP $FRONTEND_RESPONSE"
fi
echo ""

# Summary
echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}  Configuration Summary${NC}"
echo -e "${BLUE}==================================================${NC}"
echo -e "Frontend URL:       ${FRONTEND_URL}"
echo -e "Backend API URL:    ${BACKEND_URL}"
echo -e "CORS Origin Set:    ${FRONTEND_URL}"
echo -e "Regex Pattern:      /^https:\\/\\/balaji-construction.*\\.vercel\\.app\$/"
echo -e "${BLUE}==================================================${NC}\n"

echo -e "${YELLOW}Manual Testing Steps:${NC}"
echo "1. Open DevTools (F12 or Cmd+Option+I)"
echo "2. Go to Network tab"
echo "3. Visit $FRONTEND_URL"
echo "4. Try submitting a form or loading projects"
echo "5. Look for CORS errors in Console"
echo ""

echo -e "${YELLOW}If CORS errors still appear:${NC}"
echo "1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
echo "2. Clear cookies: DevTools → Application → Storage → Clear All"
echo "3. Verify backend CORS_ORIGIN: https://dashboard.render.com"
echo "4. Check frontend REACT_APP_API_URL: https://vercel.com/dashboard"
echo ""

