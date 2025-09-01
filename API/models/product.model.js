import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true }
});

const Product = model('Product', productSchema);

export default Product;