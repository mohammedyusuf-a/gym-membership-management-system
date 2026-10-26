const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, default: 'Whey Protein' },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 100 },
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 20 },
  isVeg: { type: Boolean, default: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  flavors: [{ type: String }],
  sizes: [{ type: String }],
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
