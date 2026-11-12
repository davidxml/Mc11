# Mc11 ⏳️

Track recurring subscriptions, monitor renewal dates, and automate timely reminders so you never pay for forgotten services—powered by Express, MongoDB, JWT, and Upstash workflows.

**Live API Base URL:** `https://onrender.com`

## Features

- **JWT Authentication & Security:** Secure user sign-up and sign-in with Bearer token authorization and Arcjet bot/rate protection.
- **Automatic Renewal & Expiration:** Calculates renewal dates across daily, weekly, monthly, and yearly billing intervals and flips expired subscriptions automatically via Mongoose middleware hooks.
- **Durable Email Reminders:** Uses Upstash QStash workflows and Nodemailer to schedule and deliver automated email alerts at 7, 5, 2, and 1 days before renewal.

## Project Structure

```text
.
├── app.js
├── config/
│   ├── arcjet.js
│   ├── env.js
│   ├── nodemailer.js
│   └── upstash.js
├── controllers/
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   ├── user.controller.js
│   └── workflow.controller.js
├── database/
│   └── mongodb.js
├── middlewares/
│   ├── arcjet.middleware.js
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── subscription.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   ├── user.routes.js
│   └── workflow.routes.js
└── utils/
    ├── email-template.js
    └── send-email.js
```

## Communicating with the API

All protected routes require an `Authorization` header formatted as `Bearer <YOUR_JWT_TOKEN>`.

> **Note on Render Free Tier:** The live server spins down after 15 minutes of inactivity. The first request after an idle period may take **30–50 seconds** to wake up.

### Endpoints Overview

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/sign-up` | No | Register a new user account |
| `POST` | `/api/v1/auth/sign-in` | No | Authenticate user and retrieve a JWT token |
| `GET` | `/api/v1/users/:id` | Yes | Retrieve a user's profile details |
| `POST` | `/api/v1/subscriptions` | Yes | Create a subscription and trigger reminder workflow |
| `GET` | `/api/v1/subscriptions/user/:id` | Yes | Get all subscriptions belonging to a specific user |
| `GET` | `/api/v1/subscriptions/:name` | Yes | Get subscription details by name |
| `GET` | `/api/v1/subscriptions` | Yes | Retrieve all subscriptions |

### Example Requests (`curl`)

#### 1. Register a User
```bash
curl -X POST https://onrender.com/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test-Engineer",
    "email": "test@example.com",
    "password": "ExamplePassword9B"
  }'
```

#### 2. Sign In (Get JWT Token)
```bash
curl -X POST https://onrender.com/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "ExamplePassword9B"
  }'
```

#### 3. Create a Subscription
```bash
curl -X POST https://onrender.com/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "Claude-Pro",
    "price": 125000,
    "currency": "NGN",
    "frequency": "monthly",
    "category": "Technology",
    "paymentMethod": "Credit Card",
    "startDate": "2026-11-12"
  }'
```

#### 4. Get a User's Subscriptions
```bash
curl -X GET https://onrender.com/api/v1/subscriptions/user/YOUR_USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Running Locally

### 1. Clone the Repository and Install Dependencies

```bash
git clone https://github.com
cd Mc11
npm install
```

### 2. Configure Environment Variables

Create a `.env.development.local` file in the project root:

```env
PORT=5500
SERVER_URL=http://localhost:5500
NODE_ENV=development

# Database
DB_URI=your_mongodb_atlas_connection_string

# JWT Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Arcjet Security
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

# Upstash QStash
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your_local_qstash_token

# Nodemailer (Gmail)
EMAIL_PASSWORD=your_gmail_app_password
```

### 3. Start the Local QStash CLI and Express Server

In terminal 1, start the local QStash development server:
```bash
npx -y @upstash/qstash-cli@2.44.2 dev
```

In terminal 2, start the Express server:
```bash
npm run dev
```

The local API will be available at `http://localhost:5500`.

## Technologies

- **Runtime & Framework:** Node.js, Express.js
- **Database & ODM:** MongoDB Atlas, Mongoose
- **Authentication & Security:** JSON Web Tokens (JWT), bcryptjs, Arcjet
- **Workflows & Messaging:** Upstash Workflow / QStash, Nodemailer, Day.js
