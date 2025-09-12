# GoodsStore-Backend

Backend for the GoodsStore e‑commerce (Express + Mongoose + JWT auth).

## Table of Contents

* [Project overview](#project-overview)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Quick start](#quick-start)
* [Environment variables (.env)](#environment-variables-env)
* [Recommended `package.json` scripts](#recommended-packagejson-scripts)
* [Run the app](#run-the-app)
* [API documentation (Swagger / OpenAPI)](#api-documentation-swagger--openapi)
* [Database seeding](#database-seeding)
* [Authentication flow (JWT + refresh cookie)](#authentication-flow-jwt--refresh-cookie)
* [Main endpoints (summary)](#main-endpoints-summary)
* [Models overview](#models-overview)
* [Error handling](#error-handling)
* [Cookies troubleshooting](#cors--cookies-troubleshooting)

## Project overview

This is an Express.js REST API using MongoDB (via Mongoose) for a simple online shop. It exposes endpoints for:

* Products (CRUD + filtering + pagination)
* Sales (create single, bulk insert, list by user)
* Authentication and user management (register, login, get user, update user, refresh tokens, logout)

Authentication uses short-lived **access tokens** (JWT returned in JSON) and long-lived **refresh tokens** stored in an **httpOnly** cookie. The backend sets and clears the refresh cookie.

## Features

* JWT-based authentication with refresh token stored in `httpOnly` cookie
* Mongoose models and static model helper methods
* Server-side pagination / filtering for products
* Bulk create endpoint for sales (`POST /sales/many`)
* Error middleware with `AppError` helper
* Swagger/OpenAPI documentation (docs/swagger.yaml)

## Prerequisites

* Node.js (>= 18 recommended)
* npm or yarn
* MongoDB (Atlas or local). If using Atlas, you will use a connection string in `.env`.

## Quick start

1. Clone repository

```bash
git clone https://github.com/teafr/GoodsStore-Backend.git
cd GoodsStore-Backend/API
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` in the project root (see next section for examples)
4. Run dev server (example uses `nodemon`)

```bash
npm run dev
```

## Environment variables (.env)

Create `.env` in the repo root with values like below:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<pw>@cluster0.mongodb.net
MONGO_DATABASE=store
ACCESS_TOKEN_SECRET=some_long_random_secret_here
REFRESH_TOKEN_SECRET=another_long_random_secret
```

**Security notes**

* Use long cryptographically random secrets for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.
* Never commit `.env` to the repo.

## Run the app

* Development (auto-reload with nodemon):

```bash
npm run dev
```

* Production:

```bash
npm start
```

Open [http://localhost:5000](http://localhost:5000) (or the `PORT` you set). 

## API documentation (Swagger / OpenAPI)

Project includes `docs/swagger.yaml`. To serve the documentation via Swagger UI, visit `http://localhost:5000/docs` to view and try API endpoints. 

## Database seeding

There is a seeding script that connects to the DB and populates sample products. Run it with:

```bash
npm run seed
```

## Authentication flow (JWT + refresh cookie)

* **Register**: `POST /auth/register` → returns an access token (in response body) and sets a `refreshToken` cookie (httpOnly).
* **Login**: `POST /auth/login` → returns an access token and sets `refreshToken` cookie.
* **Get current user**: `GET /auth` (protected, Authorization: `Bearer <accessToken>`)
* **Refresh**: `POST /auth/refresh` → should be called with `withCredentials: true` (browser sends cookie) and returns a new access token and sets a new refresh cookie.
* **Logout**: `POST /auth/logout` → clears refresh cookie server side.

### Client-side notes

* When calling login/refresh/logout from the browser, use `fetch`/`HttpClient` with `credentials: 'include'` / `{ withCredentials: true }` so cookies are sent.
* Include `Authorization: Bearer <token>` header for protected endpoints.
* Implement interceptor logic that: on 401 → try refresh once → if refresh fails → logout user and redirect to login.

## Main endpoints (summary)

**Auth**

* `GET /auth` — get current user (protected)
* `POST /auth/register` — register user
* `POST /auth/login` — login
* `POST /auth/refresh` — refresh access token (expects refresh cookie)
* `POST /auth/logout` — logout and clear cookie
* `PUT /auth` — update current user (protected)
* `PUT /auth/mark/:id` — mark a user as loyal (protected)

**Products**

* `GET /products` — get products (supports filtering & pagination via query string)
* `POST /products` — create product
* `GET /products/:id` — get by id
* `PUT /products/:id` — update product
* `DELETE /products/:id` — delete product

**Sales**

* `GET /sales` — get all sales
* `GET /sales/:id` — get sale by id
* `GET /sales/user/:id` — get sales by user id
* `POST /sales` — create a single sale
* `POST /sales/many` — create multiple sales (bulk insert)
* `PUT /sales/:id` — update sale
* `DELETE /sales/:id` — delete sale

## Models overview

The project uses Mongoose models. Key fields (simplified):

**Product**

```js
{ name: String, price: Number, unit: String, imageUrl: String }
```

**User**

```js
{ email, firstName, lastName, patronymic?, phone, address, isLoyal, hashPassword }
```

**Sale**

```js
{ product: ObjectId(ref:'Product'), user: ObjectId(ref:'User'), purchaseDate: Date, deliveryDate?: Date, quantity: Number, discount?: Number }
```

Note: model `toJSON`/`toObject` transforms can map `_id` → `id` for client friendliness.

## Error handling

The project uses an `AppError` class and an `errorMiddleware` which standardizes error responses. 

## Cookies troubleshooting

If you see `No refresh token` on `/auth/refresh` calls:

* Ensure frontend sends requests with credentials: `fetch(..., { credentials: 'include' })` or Angular `{ withCredentials: true }`.
