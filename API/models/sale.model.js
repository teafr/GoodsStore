import { Schema, model } from 'mongoose';

const saleSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    purchaseDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    quantity: { type: Number, required: true, min: 1 }
});

export default model('Sale', saleSchema);