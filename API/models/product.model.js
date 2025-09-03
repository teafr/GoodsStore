import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true }
}, {
    statics: {
        getFiltered: function (query = {}) {
            const filter = {};
            if (query.name) filter.name = { $regex: query.name, $options: 'i' };
            if (query.minPrice) filter.price = { ...filter.price, $gte: query.minPrice };
            if (query.maxPrice) filter.price = { ...filter.price, $lte: query.maxPrice };
            if (query.unit) filter.unit = query.unit;

            let result = this.find(filter);
            if (query.sortBy) result = result.sort(query.sortBy);
            if (query.pageSize) result = result.limit(parseInt(query.pageSize, 10));
            if (query.currentPage && query.pageSize) {
                result = result.skip((parseInt(query.currentPage, 10) - 1) * parseInt(query.pageSize, 10));
            }

            return result.lean();
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