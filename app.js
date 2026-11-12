import express from "express";
import { PORT } from './config/env.js'

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.route.js";

const app = express();

// Trust Render's reverse proxy so req.ip and Arcjet read the real client IP
app.set('trust proxy', true);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hey! The Subscription tracker API');
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on: http://localhost:${PORT}`)
    
    await connectToDatabase();
});

process.on('uncaughtException', (err) => {
    if (err.code === 'ECONNRESET') {
        console.warn('Network connection reset by peer (ECONNRESET) - ignoring safely.');
        return;
    }
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

export default app;