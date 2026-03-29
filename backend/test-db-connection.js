const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔧 Testing MongoDB Connection...');
console.log('━'.repeat(50));

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsInsecure: false,
  retryWrites: true,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000
};

console.log(`📍 Connecting to: ${MONGODB_URI.split('?')[0]}`);
console.log('⏳ Please wait...\n');

mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`  Database: ${mongoose.connection.name}`);
    console.log(`  Host: ${mongoose.connection.host}`);
    console.log(`  state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection Failed');
    console.error(`  Error Type: ${err.name}`);
    console.error(`  Message: ${err.message}`);
    console.error('\n🔍 Common Solutions:');
    console.error('1. ✓ IP Whitelist - Add your IP to MongoDB Atlas');
    console.error('   → https://cloud.mongodb.com → Network Access');
    console.error('2. ✓ Check Credentials - Verify username and password');
    console.error('3. ✓ Check Cluster Status - Ensure cluster is not paused');
    console.error('4. ✓ Network - Ensure your internet connection is active');
    process.exit(1);
  });

setTimeout(() => {
  console.error('\n❌ Connection timeout (10s exceeded)');
  console.error('  Possible causes:');
  console.error('  - IP not whitelisted in MongoDB Atlas');
  console.error('  - Network connectivity issue');
  process.exit(1);
}, 15000);
