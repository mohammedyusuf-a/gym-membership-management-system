require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const { seedDatabase } = require('../routes/seedRoutes');

const runSeed = async () => {
  try {
    await connectDB();
    console.log('[Seed Script] Connected to MongoDB. Seeding collections...');
    const result = await seedDatabase(true); // force reset & seed
    console.log('[Seed Script] Result:', result);
    process.exit(0);
  } catch (err) {
    console.error('[Seed Script] Failed:', err);
    process.exit(1);
  }
};

runSeed();
