#!/usr/bin/env node

/**
 * Automated Production Environment Setup
 * Configures Vercel and Render environment variables via their APIs
 */

import https from 'https';
import { URL } from 'url';

class EnvironmentSetup {
  constructor() {
    this.vercelToken = process.env.VERCEL_TOKEN;
    this.renderApiKey = process.env.RENDER_API_KEY;
    this.renderServiceId = process.env.RENDER_BACKEND_SERVICE_ID;
    this.vercelProjectId = 'balaji-construcation';
    this.apiUrl = 'https://balaji-api-guru.onrender.com';
    this.frontendUrl = 'https://balaji-construcation.vercel.app';
  }

  printStep(title) {
    console.log(`\n\x1b[34m${title}\x1b[0m`);
    console.log('═'.repeat(60));
    console.log();
  }

  printSuccess(message) {
    console.log(`\x1b[32m✓ ${message}\x1b[0m`);
  }

  printError(message) {
    console.log(`\x1b[31m❌ ${message}\x1b[0m`);
  }

  printInfo(message) {
    console.log(`📍 ${message}`);
  }

  printAction(message) {
    console.log(`📝 ${message}`);
  }

  validateCredentials() {
    this.printStep('Step 1: Validating Credentials');

    if (!this.vercelToken) {
      this.printError('VERCEL_TOKEN not set');
      process.exit(1);
    }
    this.printSuccess('VERCEL_TOKEN received');

    if (!this.renderApiKey) {
      this.printError('RENDER_API_KEY not set');
      process.exit(1);
    }
    this.printSuccess('RENDER_API_KEY received');

    if (!this.renderServiceId) {
      this.printError('RENDER_BACKEND_SERVICE_ID not set');
      process.exit(1);
    }
    this.printSuccess('RENDER_BACKEND_SERVICE_ID received');

    console.log();
    this.printSuccess('All credentials received');
  }

  makeRequest(url, method, headers, body = null) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: method,
        headers: {
          'User-Agent': 'Node.js Setup Script',
          ...headers
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, data: data });
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  }

  async setupVercel() {
    this.printStep('Step 2: Configuring Vercel');

    this.printInfo('Fetching Vercel project information...');

    const headers = {
      'Authorization': `Bearer ${this.vercelToken}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await this.makeRequest(
        'https://api.vercel.com/v1/projects',
        'GET',
        headers
      );

      if (!response.data.projects) {
        this.printError('Could not fetch projects from Vercel');
        return false;
      }

      const project = response.data.projects.find(p => p.name === this.vercelProjectId);
      if (!project) {
        this.printError(`Project '${this.vercelProjectId}' not found`);
        return false;
      }

      const projectId = project.id;
      this.printSuccess(`Found project: ${this.vercelProjectId} (${projectId})`);
      console.log();

      this.printAction('Setting environment variables...');

      const envVars = [
        { key: 'REACT_APP_API_URL', value: this.apiUrl, target: 'production' },
        { key: 'REACT_APP_ENV', value: 'production', target: 'production' },
        { key: 'REACT_APP_API_URL', value: 'http://localhost:5000', target: 'preview' },
        { key: 'REACT_APP_ENV', value: 'development', target: 'preview' }
      ];

      for (const envVar of envVars) {
        process.stdout.write(`  Setting ${envVar.key} for ${envVar.target}... `);

        try {
          await this.makeRequest(
            `https://api.vercel.com/v2/projects/${projectId}/env`,
            'POST',
            headers,
            { key: envVar.key, value: envVar.value, target: [envVar.target] }
          );
          console.log('\x1b[32m✓\x1b[0m');
        } catch (e) {
          console.log('\x1b[33m⚠\x1b[0m');
        }
      }

      console.log();
      this.printSuccess('Vercel configured');
      return true;
    } catch (error) {
      this.printError(`Vercel setup failed: ${error.message}`);
      return false;
    }
  }

  async setupRender() {
    this.printStep('Step 3: Configuring Render');

    this.printInfo('Fetching Render service information...');

    const headers = {
      'Authorization': `Bearer ${this.renderApiKey}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await this.makeRequest(
        `https://api.render.com/v1/services/${this.renderServiceId}`,
        'GET',
        headers
      );

      if (!response.data.name) {
        this.printError('Could not fetch service from Render');
        return false;
      }

      const serviceName = response.data.name;
      this.printSuccess(`Found service: ${serviceName}`);
      console.log();

      this.printAction('Setting environment variables...');

      const envVars = [
        { key: 'NODE_ENV', value: 'production' },
        { key: 'PORT', value: '5000' },
        { key: 'API_URL', value: 'https://balaji-api-guru.onrender.com' },
        { key: 'CORS_ORIGIN', value: this.frontendUrl },
        {
          key: 'MONGODB_URI',
          value: process.env.MONGODB_URI || 'mongodb+srv://jagruti3945_db_user:K63ZRg7pCUewXurj@balajiconstruction.leuhgrj.mongodb.net/balaji-construction?retryWrites=true&w=majority&appName=BalajiConstruction'
        },
        { key: 'SMTP_SERVICE', value: 'gmail' },
        { key: 'SMTP_USER', value: 'more.anil1693@gmail.com' },
        { key: 'SMTP_FROM', value: 'noreply@balajiconstruction.com' },
        { key: 'BUSINESS_EMAIL', value: 'more.anil1693@gmail.com' },
        { key: 'BUSINESS_PHONE', value: '+91-9637279798' },
        { key: 'LOG_LEVEL', value: 'info' }
      ];

      const payload = {
        envVars: envVars
      };

      const response2 = await this.makeRequest(
        `https://api.render.com/v1/services/${this.renderServiceId}`,
        'PATCH',
        headers,
        payload
      );

      if (response2.status !== 200) {
        this.printError(`API error: ${response2.status}`);
        return false;
      }

      this.printSuccess('Environment variables updated');
      console.log();

      console.log('📋 Variables Set:');
      for (const envVar of envVars) {
        const displayValue = envVar.value.length > 40
          ? envVar.value.substring(0, 40) + '...'
          : envVar.value;
        console.log(`  ✓ ${envVar.key} = ${displayValue}`);
      }

      console.log();
      this.printSuccess('Render configured');
      return true;
    } catch (error) {
      this.printError(`Render setup failed: ${error.message}`);
      return false;
    }
  }

  printSummary(vercelSuccess, renderSuccess) {
    this.printStep('Step 4: Verification & Next Steps');

    if (vercelSuccess && renderSuccess) {
      this.printSuccess('Configuration Complete!');
    } else {
      this.printError('Configuration incomplete - check errors above');
      return;
    }

    console.log();
    console.log('📋 Summary:');
    console.log(`  • Vercel: ${this.vercelProjectId}`);
    console.log(`    - REACT_APP_API_URL = ${this.apiUrl} (Production)`);
    console.log(`    - REACT_APP_ENV = production (Production)`);
    console.log();
    console.log(`  • Render: balaji-api-guru`);
    console.log(`    - NODE_ENV = production`);
    console.log(`    - CORS_ORIGIN = ${this.frontendUrl}`);
    console.log(`    - API_URL = ${this.apiUrl}`);
    console.log();

    console.log('🔄 Next Steps:');
    console.log();
    console.log('1. Redeploy Vercel Frontend:');
    console.log('   \x1b[33mvercel redeploy\x1b[0m');
    console.log('   OR visit Vercel dashboard and redeploy manually');
    console.log();
    console.log('2. Wait for Render Auto-Deploy:');
    console.log(`   Visit: https://dashboard.render.com/services/${this.renderServiceId}`);
    console.log('   Wait for status: ✓ Live');
    console.log();
    console.log('3. Hard Refresh Browser:');
    console.log('   \x1b[33mCmd+Shift+R\x1b[0m (Mac) or \x1b[33mCtrl+Shift+R\x1b[0m (Windows)');
    console.log(`   Then visit: \x1b[34mhttps://balaji-construcation.vercel.app\x1b[0m`);
    console.log();
    console.log('4. Verify Everything Works:');
    console.log('   • Check DevTools Console for API calls');
    console.log('   • Projects should load from production backend');
    console.log('   • No CORS errors!');
    console.log();
    console.log('\x1b[32m✨ You\'re all set! 🚀\x1b[0m');
    console.log();
  }

  async run() {
    console.log();
    console.log('╔' + '═'.repeat(58) + '╗');
    console.log('║   \x1b[32m🚀 Balaji Construction - Production Setup\x1b[0m      ║');
    console.log('╚' + '═'.repeat(58) + '╝');

    this.validateCredentials();

    const vercelSuccess = await this.setupVercel();
    if (!vercelSuccess) {
      process.exit(1);
    }

    const renderSuccess = await this.setupRender();
    if (!renderSuccess) {
      process.exit(1);
    }

    this.printSummary(vercelSuccess, renderSuccess);
  }
}

const setup = new EnvironmentSetup();
setup.run().catch(err => {
  console.error('\x1b[31m❌ Error:\x1b[0m', err);
  process.exit(1);
});
