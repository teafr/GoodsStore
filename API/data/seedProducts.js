import Product from '../models/product.model.js';
import connectDB from '../config/database.js';

const sampleProducts = [
  { name: 'Apple', price: 1.2, unit: 'kg' },
  { name: 'Banana', price: 0.8, unit: 'kg' },
  { name: 'Milk', price: 1.5, unit: 'liter' },
  { name: 'Bread', price: 1.0, unit: 'loaf' },
  { name: 'Cheese', price: 3.5, unit: 'block' }
];

async function seed() {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('Old products removed');

    await Product.insertMany(sampleProducts);
    console.log('Sample products added ✅');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
