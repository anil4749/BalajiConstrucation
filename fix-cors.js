#!/usr/bin/env node

/**
 * Simple CORS Fix Script - Configure Vercel & Render in under 30 seconds
 */

const https = require('https');

const vercelToken = process.env.VERCEL_TOKEN;
const renderApiKey = process.env.RENDER_API_KEY;
const renderServiceId = process.env.RENDER_BACKEND_SERVICE_ID;

if (!vercelToken || !renderApiKey || !renderServiceId) {
  console.error('  ❌ Missing credentials');
  console.error('  Set: VERCEL_TOKEN, RENDER_API_KEY, RENDER_BACKEND_SERVICE_ID');
  process.exit(1);
}

console.log('\n🚀 Setting up production environment...\n');

// Helper to make HTTPS requests
function request(host, path, method, headers, body = null) {
  return new Promise((resolve, reject) => {
    const options = { hostname: host, path, method, headers };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  try {
    // Step 1: Get Vercel Project ID
    console.log('1️⃣ Configuring Vercel...');
    const projectsRes = await request('api.vercel.com', '/v1/projects', 'GET', {
      'Authorization': `Bearer ${vercelToken}`,
      'Content-Type': 'application/json'
    });

    let projectId = null;
    if (Array.isArray(projectsRes.data)) {
      // API returns array directly
      const project = projectsRes.data.find(p => p.name === 'balaji-construcation');
      if (project) projectId = project.id;
    } else if (projectsRes.data.projects) {
      // API returns object with projects array
      const project = projectsRes.data.projects.find(p => p.name === 'balaji-construcation');
      if (project) projectId = project.id;
    }

    if (!projectId) {
      console.error('   ❌ Project not found');
      process.exit(1);
    }
    console.log(`   ✓ Found project: ${projectId}`);

    // Step 2: Set Vercel environment variables
    const vercelEnv = [
      { key: 'REACT_APP_API_URL', value: 'https://balaji-api-guru.onrender.com', target: 'production' },
      { key: 'REACT_APP_ENV', value: 'production', target: 'production' }
    ];

    for (const env of vercelEnv) {
      process.stdout.write(`   Setting ${env.key}... `);
      await request('api.vercel.com', `/v2/projects/${projectId}/env`, 'POST', {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json'
      }, { key: env.key, value: env.value, target: [env.target] });
      console.log('✓');
    }

    // Step 3: Configure Render
    console.log('\n2️⃣ Configuring Render...');
    const serviceRes = await request('api.render.com', `/v1/services/${renderServiceId}`, 'GET', {
      'Authorization': `Bearer ${renderApiKey}`,
      'Content-Type': 'application/json'
    });

    if (!serviceRes.data.name) {
      console.error('   ❌ Service not found');
      console.error(`   Response status: ${serviceRes.status}`);
      if (serviceRes.status === 401) {
        console.error('   ⚠️ Render API key appears to be invalid or expired');
        console.error('   Get a new key from: https://dashboard.render.com/account/api-tokens');
      }
      process.exit(1);
    }
    console.log(`   ✓ Found service: ${serviceRes.data.name}`);

    // Step 4: Set Render environment variables
    const renderEnv = {
      envVars: [
        { key: 'NODE_ENV', value: 'production' },
        { key: 'PORT', value: '5000' },
        { key: 'API_URL', value: 'https://balaji-api-guru.onrender.com' },
        { key: 'CORS_ORIGIN', value: 'https://balaji-construcation.vercel.app' },
        { key: 'MONGODB_URI', value: process.env.MONGODB_URI || 'mongodb+srv://jagruti3945_db_user:K63ZRg7pCUewXurj@balajiconstruction.leuhgrj.mongodb.net/balaji-construction?retryWrites=true&w=majority&appName=BalajiConstruction' },
        { key: 'SMTP_SERVICE', value: 'gmail' },
        { key: 'SMTP_USER', value: 'more.anil1693@gmail.com' },
        { key: 'SMTP_FROM', value: 'noreply@balajiconstruction.com' },
        { key: 'BUSINESS_EMAIL', value: 'more.anil1693@gmail.com' },
        { key: 'BUSINESS_PHONE', value: '+91-9637279798' },
        { key: 'LOG_LEVEL', value: 'info' }
      ]
    };

    process.stdout.write('   Setting environment variables... ');
    const renderRes = await request('api.render.com', `/v1/services/${renderServiceId}`, 'PATCH', {
      'Authorization': `Bearer ${renderApiKey}`,
      'Content-Type': 'application/json'
    }, renderEnv);

    if (renderRes.status !== 200) {
      console.error(`\n   ❌ Error: ${renderRes.status}`);
      process.exit(1);
    }
    console.log('✓');

    // Success!
    console.log('\n✅ Configuration Complete!\n');
    console.log('📋 What was configured:');
    console.log('   • Vercel: REACT_APP_API_URL → https://balaji-api-guru.onrender.com');
    console.log('   • Render: CORS_ORIGIN → https://balaji-construcation.vercel.app');
    console.log('   • Render: NODE_ENV → production');
    console.log('\n🔄 Next Steps:');
    console.log('   1. Redeploy Vercel: vercel redeploy');
    console.log('   2. Render auto-redeploys (wait for "Live" status)');
    console.log('   3. Hard refresh browser: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)');
    console.log('   4. Visit: https://balaji-construcation.vercel.app');
    console.log('   5. Check DevTools → No CORS errors! ✨\n');

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
