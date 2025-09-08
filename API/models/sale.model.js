import { Schema, model } from 'mongoose';

const saleSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    purchaseDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    quantity: { type: Number, required: true, min: 1 }
}, { 
    versionKey: false,
    statics: {
        get: function () {
            return this.find().populate('product').lean();
        },
        getByUserId: function (userId) {
            return this.find({ user: userId }).populate('product').lean();
        },
        getById: function (id) {
            return this.findOne({ _id: id }).lean();
        },
        createSale: function (saleData) {
            const sale = new this(saleData);
            return sale.save();
        },
        createMany: function (sales) {
            return this.insertMany(sales);
        },
        updateById: function (id, update, options) {
            return this.findOneAndUpdate({ _id: id }, update, options);
        },
        deleteById: function (id) {
            return this.findOneAndDelete({ _id: id });
        }
    }
});

export default model('Sale', saleSchema);