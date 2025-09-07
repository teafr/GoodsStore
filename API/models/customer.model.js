import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    isLoyal: { type: Boolean, default: false }
}, {
    versionKey: false,
    statics: {
        get: function () {
            return this.find().lean();
        },
        getById: function (id) {
            return this.findOne({ _id: id }).lean();
        },
        getSales: function (customerId) {
          return model('Sale').find({ customer: customerId}).populate('product').populate('customer').lean();
        },
        create: function (customerData) {
          const customer = new this(customerData);
          return customer.save();
        },
        updateById: function (id, update, options) {
            return this.findOneAndUpdate({ _id: id }, update, options).lean();
        },
        deleteById: function (id) {
            return this.findOneAndDelete({ _id: id });
        }
    }
});

export default model('Customer', customerSchema);