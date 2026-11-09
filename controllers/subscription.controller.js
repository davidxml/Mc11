import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({ 
            success: true,
            data: subscription,
        });

    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        
        if(req.user.id !== req.params.id) {
            // checks if user is the right person to access details 
            const error = new Error("User not authorized to get details");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ 
            success: true, 
            data: subscriptions
        })
    } catch (error) {
        next(error);
    }
}

export const getSubscriptionInfo = async (req, res, next) => {
    try {
        const subscription = await Subscription.find({ name: req.params.name });

        res.status(200).json({ 
            success: true, 
            data: subscription
        })
    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({});

        res.status(200).json({ 
            success: true,
            message: 'All subscriptions retrieved successfully',
            data: subscriptions
        });

    } catch (error) {
        next(error);
    }
}