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
    hashPassword: { type: String, required: true }
}, {
    versionKey: false,
    statics: {
        login: function (email) {
            return this.findOne({ email }).lean();
        },
        register: function (userData) {
            const user = new this(userData);
            return user.save();
        },
        generateTokens: function (userId) {
            const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
            const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            return { accessToken, refreshToken };
        },
        refreshAuthTokens: function (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const newTokens = this.generateTokens(decoded.userId);
                return newTokens;
            } catch (error) {
                throw new AppError('Invalid refresh token', 401);
            }
        }
    }
});

export default model('User', userSchema);