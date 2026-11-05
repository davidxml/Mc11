import mongoose from 'mongoose';
import User from './models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import userRouter from './routes/user.route.js'
import {JWT_EXPIRES_IN, JWT_SECRET} from './config/env.js'

export const signUp  = async (req, res, next) => {
    /* a req body ->  a req.body is an object containing 
        data from the client (POST request)
    */

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        // Check if a user already exists
        const existingUser = await User.findOne( {email } );

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await userRouter.create([{ name, email, password: hashedPassword }, { session }])
        const token = jwt.sign({userid: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0]
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
        
    }
};

export const signIn = async (req, res, next) => {};
export const signOut = async (req, res, next) => {};