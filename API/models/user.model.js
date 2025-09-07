import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AppError from '../utils/AppError.js';
dotenv.config();

const userSchema = new Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    patronymic: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isLoyal: { type: Boolean, default: false },
    hashPassword: { type: String, required: true }
}, {
    versionKey: false,
    toJSON: {
        virtual: true,
        versionKey: false,
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    toObject: {
        virtual: true,
        versionKey: false,
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    statics: {
        get: function (email) {
            return this.findOne({ email });
        },
        register: function (userData) {
            const user = new this(userData);
            return user.save();
        },
        generateTokens: function (email) {
            const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
            const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            return { accessToken, refreshToken };
        },
        refreshAuthTokens: function (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const newTokens = this.generateTokens(decoded.email);
                return newTokens;
            } catch (error) {
                throw new AppError('Invalid refresh token', 401);
            }
        }
    }
});

export default model('User', userSchema);