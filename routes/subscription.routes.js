import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createSubscription, getAllSubscriptions, getSubscriptionInfo, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscriptionInfo);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'Update a specific user subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'Remove all subscriptions of a specific user'}));

subscriptionRouter.get('/ user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancellation', (req, res) => res.send({title: 'CANCEL subscriptions'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'Get upcoming renewals'}));

export default subscriptionRouter;