import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import bcrypt from 'bcrypt';

export async function register(req, res, next) {
    try {
        const { firstName, lastName, patronymic, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await User.register({ lastName, firstName, patronymic, email, hashPassword });
        const tokens = User.generateTokens(user.email);
        
        res.status(201).json({ ...user._doc, ...tokens });
    } catch (error) {
        next(new AppError(`Registration failed. Message: ${error.message}`, 400));
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const foundUser = await User.login(email);

        if (!foundUser || !(await bcrypt.compare(password, foundUser.hashPassword))) {
            return next(new AppError('Invalid email or password', 401));
        }

        const tokens = User.generateTokens(foundUser.email);
        res.status(200).json({ ...foundUser, ...tokens });
    } catch (error) {
        next(new AppError(`Login failed. Message: ${error.message}`, 400));
    }
}

export async function refreshTokens(req, res, next) {
    try {
        const { refreshToken } = req.body;
        const tokens = await User.refreshAuthTokens(refreshToken);
        res.status(200).json({ tokens });
    } catch (error) {
        next(new AppError(`Token refresh failed. Message: ${error.message}`, 400));
    }
}