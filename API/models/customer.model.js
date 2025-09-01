const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    patronymic: { type: String },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isLoyal: { type: Boolean, default: false }
});

module.exports = mongoose.model('Customer', customerSchema);