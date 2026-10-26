const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');
const Member = require('../models/Member');

// GET all trainers with dynamic client count
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find({});
    const members = await Member.find({ status: 'Active' });

    const results = trainers.map(t => {
      const count = members.filter(m => m.trainerId === t.id).length;
      const obj = t.toObject();
      return { ...obj, activeClients: count };
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single trainer
router.get('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ id: req.params.id });
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
