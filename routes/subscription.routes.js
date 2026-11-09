import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: 'Get all subscriptions'}));

subscriptionRouter.get('/:id', (req, res) => res.send({title: 'Get the details of a specific subscription'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'Update a specific user subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'Remove all subscriptions of a specific user'}));

subscriptionRouter.get('/user/:id', (req, res) => res.send({title: 'Get all subscription details of a user'}));

subscriptionRouter.put('/:id/cancellation', (req, res) => res.send({title: 'CANCEL subscriptions'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'Get upcoming renewals'}));

export default subscriptionRouter;