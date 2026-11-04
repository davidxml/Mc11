# Mc11 ⏳️

A RESTful API built with Node.js, Express, and Mongoose for managing user subscriptions. It handles subscription tracking, renewal date calculations, and automatic status updates when subscriptions expire.

## Features

- **Automatic Expiration:** Updates subscription status to `expired` when the renewal date passes.
- **Renewal Date Calculation:** Supports daily, weekly, monthly, and yearly billing intervals.
- **Database Hooks:** Uses Mongoose middleware to handle subscription-related operations.
- **Development Tools:** Uses Node.js `--watch` for automatic server restarts and ESLint for code quality.

## Project Structure

```text
.
├── app.js
├── config/
│   └── env.js
├── database/
│   └── mongodb.js
├── models/
│   ├── user.model.js
│   └── subscription.js
└── routes/
    ├── auth.route.js
    ├── user.route.js
    └── subscription.routes.js
```

## Getting Started

### 1. Clone the Repository and Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.development.local` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/subscription_tracker
NODE_ENV=development
```

### 3. Start the Server

```bash
node --watch app.js
```

The API will be available at:

```text
http://localhost:3000
```

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
