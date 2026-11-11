import Subscription from "../models/subscription.model.js"
import { workflowClient } from  "../config/upstash.js"
import { SERVER_URL } from "../config/env.js";
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        await  workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

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

        if(req.user.id.toString() !== req.params.id.toString()) {
            // checks if user is the right person to access details 
            const error = new Error("Forbidden: User not authorized to get details");
            error.status = 403;
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
        const subscription = await Subscription.find({ name: req.params.name, user: req.user._id });

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
        const subscriptions = await Subscription.find({}).populate('user', 'name email');

        if(!subscriptions || subscriptions.length === 0) {
            const error = new Error(`Subscription matching ${req.params.name} not found`);
            error.statusCode = 404;
            throw error;
        };

        res.status(200).json({ 
            success: true,
            message: 'All subscriptions retrieved successfully',
            data: subscriptions,
            count: subscriptions.length
        });

    } catch (error) {
        next(error);
    }
}