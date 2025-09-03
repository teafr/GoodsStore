import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true }
}, {
    statics: {
        getFiltered: function(query = {}) {
            const filter = {};
            Object.keys(query).forEach(key => {
                if (query[key] !== undefined) filter[key] = query[key];
            });
            return this.find(filter).lean();
        },
        getById: function(id) {
            return this.findOne({ _id: id }).lean();
        },
        updateById: function(id, update, options) {
            return this.findOneAndUpdate({ _id: id }, update, options).lean();
        },
        deleteById: function(id) {
            return this.findOneAndDelete({ _id: id });
        }
    }
});

const Product = model('Product', productSchema);

export default Product;