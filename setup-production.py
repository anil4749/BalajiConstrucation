#!/usr/bin/env python3

"""
Automated Production Environment Setup
Configures Vercel and Render environment variables via their APIs
"""

import os
import sys
import json
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

class EnvironmentSetup:
    def __init__(self):
        self.vercel_token = os.getenv('VERCEL_TOKEN')
        self.render_api_key = os.getenv('RENDER_API_KEY')
        self.render_service_id = os.getenv('RENDER_BACKEND_SERVICE_ID')
        self.vercel_project_id = "balaji-construcation"
        self.api_url = "https://balaji-api-guru.onrender.com"
        self.frontend_url = "https://balaji-construcation.vercel.app"

    def print_step(self, step, message):
        print(f"\n\033[0;34m{message}\033[0m")
        print("═" * 60)
        print()

    def print_success(self, message):
        print(f"\033[0;32m✓ {message}\033[0m")

    def print_error(self, message):
        print(f"\033[0;31m❌ {message}\033[0m")

    def print_info(self, message):
        print(f"📍 {message}")

    def print_action(self, message):
        print(f"📝 {message}")

    def validate_credentials(self):
        self.print_step("Step 1", "Validating Credentials")
        
        if not self.vercel_token:
            self.print_error("VERCEL_TOKEN not set")
            sys.exit(1)
        self.print_success("VERCEL_TOKEN received")
        
        if not self.render_api_key:
            self.print_error("RENDER_API_KEY not set")
            sys.exit(1)
        self.print_success("RENDER_API_KEY received")
        
        if not self.render_service_id:
            self.print_error("RENDER_BACKEND_SERVICE_ID not set")
            sys.exit(1)
        self.print_success("RENDER_BACKEND_SERVICE_ID received")
        
        print()
        self.print_success("All credentials received")

    def make_request(self, method, url, headers, data=None):
        try:
            headers_obj = {**headers}
            if data:
                data = json.dumps(data).encode('utf-8')
            
            req = Request(url, data=data, headers=headers_obj, method=method)
            with urlopen(req) as response:
                return json.loads(response.read().decode('utf-8'))
        except HTTPError as e:
            error_data = e.read().decode('utf-8')
            try:
                return json.loads(error_data)
            except:
                return {"error": error_data}
        except URLError as e:
            self.print_error(f"Network error: {e}")
            return None

    def setup_vercel(self):
        self.print_step("Step 2", "Configuring Vercel")
        
        self.print_info("Fetching Vercel project information...")
        
        # Get projects
        headers = {
            "Authorization": f"Bearer {self.vercel_token}",
            "Content-Type": "application/json"
        }
        
        projects_data = self.make_request(
            "GET",
            "https://api.vercel.com/v1/projects",
            headers
        )
        
        if not projects_data or 'projects' not in projects_data:
            self.print_error("Could not fetch projects from Vercel")
            return False
        
        project = None
        for p in projects_data['projects']:
            if p['name'] == self.vercel_project_id:
                project = p
                break
        
        if not project:
            self.print_error(f"Project '{self.vercel_project_id}' not found")
            return False
        
        project_id = project['id']
        self.print_success(f"Found project: {self.vercel_project_id} ({project_id})")
        print()
        
        self.print_action("Setting environment variables...")
        
        env_vars = [
            ("REACT_APP_API_URL", self.api_url, "production"),
            ("REACT_APP_ENV", "production", "production"),
            ("REACT_APP_API_URL", "http://localhost:5000", "preview"),
            ("REACT_APP_ENV", "development", "preview"),
        ]
        
        for key, value, target in env_vars:
            print(f"  Setting {key} for {target}... ", end="", flush=True)
            
            payload = {
                "key": key,
                "value": value,
                "target": [target]
            }
            
            result = self.make_request(
                "POST",
                f"https://api.vercel.com/v2/projects/{project_id}/env",
                headers,
                payload
            )
            
            if result and ('id' in result or 'key' in result):
                print(f"\033[0;32m✓\033[0m")
            else:
                print(f"\033[1;33m⚠\033[0m")
        
        print()
        self.print_success("Vercel configured")
        return True

    def setup_render(self):
        self.print_step("Step 3", "Configuring Render")
        
        self.print_info("Fetching Render service information...")
        
        headers = {
            "Authorization": f"Bearer {self.render_api_key}",
            "Content-Type": "application/json"
        }
        
        service_data = self.make_request(
            "GET",
            f"https://api.render.com/v1/services/{self.render_service_id}",
            headers
        )
        
        if not service_data or 'name' not in service_data:
            self.print_error("Could not fetch service from Render")
            return False
        
        service_name = service_data['name']
        self.print_success(f"Found service: {service_name}")
        print()
        
        self.print_action("Setting environment variables...")
        
        env_vars = [
            ("NODE_ENV", "production"),
            ("PORT", "5000"),
            ("API_URL", "https://balaji-api-guru.onrender.com"),
            ("CORS_ORIGIN", self.frontend_url),
            ("MONGODB_URI", os.getenv('MONGODB_URI', 'mongodb+srv://jagruti3945_db_user:K63ZRg7pCUewXurj@balajiconstruction.leuhgrj.mongodb.net/balaji-construction?retryWrites=true&w=majority&appName=BalajiConstruction')),
            ("SMTP_SERVICE", "gmail"),
            ("SMTP_USER", "more.anil1693@gmail.com"),
            ("SMTP_FROM", "noreply@balajiconstruction.com"),
            ("BUSINESS_EMAIL", "more.anil1693@gmail.com"),
            ("BUSINESS_PHONE", "+91-9637279798"),
            ("LOG_LEVEL", "info"),
        ]
        
        payload = {
            "envVars": [{"key": k, "value": v} for k, v in env_vars]
        }
        
        result = self.make_request(
            "PATCH",
            f"https://api.render.com/v1/services/{self.render_service_id}",
            headers,
            payload
        )
        
        if not result or 'error' in result and result.get('error'):
            self.print_error(f"Error: {result.get('errorMessage', 'Unknown error')}")
            return False
        
        self.print_success("Environment variables updated")
        print()
        
        print("📋 Variables Set:")
        for key, value in env_vars:
            display_value = value[:40] + "..." if len(value) > 40 else value
            print(f"  ✓ {key} = {display_value}")
        
        print()
        self.print_success("Render configured")
        return True

    def print_summary(self):
        print()
        self.print_step("Step 4", "Verification & Next Steps")
        
        self.print_success("Configuration Complete!")
        print()
        
        print("📋 Summary:")
        print(f"  • Vercel: {self.vercel_project_id}")
        print(f"    - REACT_APP_API_URL = {self.api_url} (Production)")
        print(f"    - REACT_APP_ENV = production (Production)")
        print()
        print(f"  • Render: balaji-api-guru")
        print(f"    - NODE_ENV = production")
        print(f"    - CORS_ORIGIN = {self.frontend_url}")
        print(f"    - API_URL = {self.api_url}")
        print()
        
        print("🔄 Next Steps:")
        print()
        print("1. Redeploy Vercel Frontend:")
        print(f"   \033[1;33mvercel redeploy\033[0m")
        print("   OR visit Vercel dashboard and redeploy manually")
        print()
        print("2. Wait for Render Auto-Deploy:")
        print(f"   Visit: https://dashboard.render.com/services/{self.render_service_id}")
        print("   Wait for status: ✓ Live")
        print()
        print("3. Hard Refresh Browser:")
        print("   \033[1;33mCmd+Shift+R\033[0m (Mac) or \033[1;33mCtrl+Shift+R\033[0m (Windows)")
        print(f"   Then visit: \033[0;34mhttps://balaji-construcation.vercel.app\033[0m")
        print()
        print("4. Verify Everything Works:")
        print("   • Check DevTools Console for API calls")
        print("   • Projects should load from production backend")
        print("   • No CORS errors!")
        print()
        print("\033[0;32m✨ You're all set! 🚀\033[0m")
        print()

    def run(self):
        print()
        print("╔" + "═" * 58 + "╗")
        print("║   \033[0;32m🚀 Balaji Construction - Production Setup\033[0m      ║")
        print("╚" + "═" * 58 + "╝")
        
        self.validate_credentials()
        
        if not self.setup_vercel():
            sys.exit(1)
        
        if not self.setup_render():
            sys.exit(1)
        
        self.print_summary()

if __name__ == "__main__":
    setup = EnvironmentSetup()
    setup.run()
