const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    purchaseDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    quantity: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model('Sale', saleSchema);