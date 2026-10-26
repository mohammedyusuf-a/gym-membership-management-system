const express = require('express');
const router = express.Router();
const ClassModel = require('../models/Class');

// GET all classes
router.get('/', async (req, res) => {
  try {
    const classes = await ClassModel.find({});
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
