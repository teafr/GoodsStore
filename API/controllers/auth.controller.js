import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import bcrypt from 'bcrypt';
import { setRefreshTokenCookie } from '../utils/setRefreshTokenCookie.js'

export async function getUser(req, res, next) {
    try {
        const foundUser = await User.get(req.user.email);
        res.status(200).json(foundUser);
    } catch (error) {
        next(new AppError(`User wasn't found. Message: ${error.message}`, 401));
    }
}

export async function updateUser(req, res, next) {
    try {
        const foundUser = await User.update(req.body, { new: true, lean: true });
        if (!foundUser) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json(foundUser);
    } catch (error) {
        next(new AppError(`User wasn't updated. Message: ${error.message}`, 400));
    }
}

export async function markUser(req, res, next) {
    try {
        const foundUser = await User.markAsLoyal(req.params.id, { new: true, lean: true });
        if (!foundUser) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json(foundUser);
    } catch (error) {
        next(new AppError(`User wasn't updated. Message: ${error.message}`, 400));
    }
}

export async function register(req, res, next) {
    try {
        const { firstName, lastName, patronymic, email, phone, address, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await User.register({ lastName, firstName, patronymic, email, phone, address, hashPassword });

        const tokens = User.generateTokens(user.email);
        setRefreshTokenCookie(res, tokens.refreshToken);

        res.status(201).json(tokens.accessToken);
    } catch (error) {
        next(new AppError(`Registration failed. Message: ${error.message}`, 400));
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const foundUser = await User.get(email);

        if (!foundUser || !(await bcrypt.compare(password, foundUser.hashPassword))) {
            return next(new AppError('Invalid email or password', 401));
        }

        const tokens = User.generateTokens(foundUser.email);
        setRefreshTokenCookie(res, tokens.refreshToken);

        res.status(200).json(tokens.accessToken);
    } catch (error) {
        next(new AppError(`Login failed. Message: ${error.message}`, 401));
    }
}

export async function logout(req, res, next) {
  try {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(new AppError(`Logout failed. Message: ${error.message}`, 400));
  }
}


export async function refreshTokens(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken; 
        if (!refreshToken) {
            return next(new AppError("No refresh token", 401));
        }

        const tokens = await User.refreshAuthTokens(refreshToken);
        setRefreshTokenCookie(res, tokens.refreshToken);

        res.status(200).json(tokens.accessToken);
    } catch (error) {
        next(new AppError(`Token refresh failed. Message: ${error.message}`, 401));
    }
}