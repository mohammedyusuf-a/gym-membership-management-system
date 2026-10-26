require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const { router: seedRoutes, seedDatabase } = require('./routes/seedRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request Logger in Dev
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API ${req.method}] ${req.path}`);
    }
    next();
  });
}

// API Routes
app.use('/api/status', require('./routes/statusRoutes'));
app.use('/api/init', require('./routes/initRoutes'));
app.use('/api/seed', seedRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/trainers', require('./routes/trainerRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));

// Serve Frontend Static Files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start Server and Connect DB
const startServer = async () => {
  const db = await connectDB();
  if (db) {
    try {
      const seedResult = await seedDatabase(false);
      if (seedResult.seeded) {
        console.log('[MongoDB] Auto-seeding completed:', seedResult.message);
      } else {
        console.log('[MongoDB] Database ready with existing collections.');
      }
    } catch (err) {
      console.error('[MongoDB] Seeding error:', err.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 TITAN IRON GYM - BACKEND & FRONTEND SERVER ACTIVE`);
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📡 MongoDB API active at: http://localhost:${PORT}/api/status`);
    console.log(`📁 Frontend served from: ${frontendPath}`);
    console.log(`====================================================`);
  });
};

startServer();
