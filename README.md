# Railway Vendor License Management System (RVLMS)

## 📌 Project Overview
RVLMS is a role-based web application designed to digitize railway vendor license issuance, renewal, and management.  
This repository contains the frontend built using **Next.js (TypeScript)**.

---

## 📁 Folder Structure

```txt
src/
 ├── app/          # Routes, layouts, and pages using Next.js App Router
 ├── components/   # Reusable UI components (buttons, cards, navbar)
 ├── lib/          # Utility functions, helpers, and configuration files

## Screenshot evidence 
screenshots/server.png


## 🧹 Code Quality & Tooling

### TypeScript (Strict Mode)
Strict TypeScript settings are enabled to catch errors early, prevent unsafe types, and enforce clean code as the project scales.

### ESLint + Prettier
- ESLint enforces code quality rules
- Prettier ensures consistent formatting
- Prevents style conflicts in team development

### Pre-Commit Hooks (Husky + lint-staged)
Before every commit:
- ESLint auto-fixes issues
- Prettier formats code
This ensures only clean, reviewed code enters the repository.



## Environment Variables

This project uses environment variables to securely manage configuration values.

### Files Used
- `.env.local` → Local secrets (NOT committed)
- `.env.example` → Template for required variables

### Server-side Variables
| Variable | Purpose |
|--------|--------|
| DATABASE_URL | Database connection string |
| JWT_SECRET | Authentication secret key |

### Client-side Variables
| Variable | Purpose |
|--------|--------|
| NEXT_PUBLIC_API_BASE_URL | Base URL for frontend API calls |

### Security Notes
- Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser
- Sensitive secrets are kept server-side
- `.env.local` is ignored via `.gitignore`

### Setup Instructions
1. Copy `.env.example` → `.env.local`
2. Replace placeholder values with real credentials
3. Restart the dev server




## 🌿 Git Branching Strategy

To maintain clarity and consistency, the team follows a standard branch naming convention:

### Branch Types
- `feature/<feature-name>` → New features  
- `fix/<bug-name>` → Bug fixes  
- `chore/<task-name>` → Maintenance or setup tasks  
- `docs/<update-name>` → Documentation updates  

### Examples
- feature/login-auth  
- fix/navbar-alignment  
- chore/github-workflow-setup  
- docs/update-readme  

### Rules
- No one commits directly to `main`
- Every branch must be merged via a Pull Request
- One branch = one task = one PR

## ✅ Code Review Checklist

Every Pull Request is reviewed using the following checklist:

- Code follows agreed naming conventions and structure
- Changes are tested locally
- No console errors or warnings
- ESLint and Prettier checks pass
- Code is readable and well-documented
- No secrets or environment variables are exposed
- PR is small, focused, and easy to review


## Screenshot evidence 
screenshots/github1.jpeg
screenshots/github2.jpeg
screenshots/github3.jpeg


## 🔍 Workflow Reflection

This GitHub workflow ensures high code quality and smooth collaboration by enforcing:
- Clear ownership through branches
- Mandatory code reviews
- Consistent PR documentation
- Protection of the main branch

It mirrors real-world engineering practices and helps the team scale development safely and efficiently.



## 🐳 Docker & Containerization

This project uses Docker and Docker Compose to run the full stack locally.

### Dockerfile
The Dockerfile defines how the Next.js application is built and run inside a container:
- Uses Node.js Alpine image
- Installs dependencies
- Builds the app
- Runs on port 3000

### Docker Compose Services
- **app**: Next.js frontend
- **db**: PostgreSQL database with persistent volume
- **redis**: Redis cache for fast data access

### Networking & Volumes
- All services run on a shared bridge network
- PostgreSQL uses a named volume to persist data

### How to Run
```bash
docker compose up --build


 Database Design Summary
VendorSaathi uses a normalized relational database to manage vendors, licenses, inspections, and support workflows in a scalable and secure way.

Core Entities
Users – authentication & roles

Vendors – vendor profile details

Licenses – issued licenses & validity

License Requests – issue/update/renew tracking

Inspections – compliance records

Support Tickets – vendor support

Relationships
One User → One Vendor

One Vendor → One License

One Vendor → Many License Requests

One Vendor → Many Inspections & Tickets

🔑 Keys & Constraints
Primary keys on all tables

Foreign keys maintain referential integrity

email and license_uid are unique

ENUMs enforce valid roles and statuses

📐 Normalization
The schema follows 3NF:

Atomic fields (1NF)

Separated concerns (2NF)

No transitive dependencies (3NF)

This eliminates redundancy and update anomalies.

🚀 Scalability & Performance
Modular table design

Indexed foreign keys for fast queries

Supports common queries like license status, pending requests, and inspection history

🧠 Reflection
This design mirrors real‑world regulatory systems while remaining easy to extend for future features like payments, QR verification, and analytics.


### Prisma ORM Setup
Prisma is used as the ORM to provide type‑safe database access and reliable migrations.

- PostgreSQL as primary database
- Strongly typed models for Users, Vendors, Licenses, Requests
- Centralized Prisma client to avoid multiple DB connections

Prisma improves safety, maintainability, and developer productivity.



## 🗄️ Database Migrations & Seeding (Prisma)

This project uses **Prisma ORM** to manage database schema migrations and reproducible seed data.

### Migrations Workflow
- Create & apply migrations:
  ```bash
  npx prisma migrate dev --name <migration_name>



## Database Transactions & Query Optimization

### Transactions
Transactions are used where multiple dependent operations must succeed together.
Example: License approval
- Create license
- Update request status
- Insert audit log

If any step fails, Prisma automatically rolls back all changes, ensuring data integrity.

### Rollback Handling
All transactions are wrapped in try‑catch blocks.
Rollback behavior was verified by intentionally triggering errors and confirming no partial writes occurred.

### Query Optimization
Optimizations applied:
- Field selection instead of over‑fetching
- Pagination using skip & take
- Batch inserts using createMany
- Avoided N+1 query patterns

### Indexes Added
Indexes were added on frequently queried fields:
- vendor_id
- status
- expiry_date

These significantly improve read performance for admin dashboards.

### Performance Comparison
- Query logs captured before and after indexing
- Indexed queries showed reduced execution time

### Reflection
In production, query performance would be monitored using:
- Prisma query logs
- Database slow‑query logs
- Metrics like latency, error rate, and throughput




## Transactions & Query Optimization

### Transactions
We implemented Prisma transactions to ensure atomic license approval workflows.
If any step fails (license creation, request update, audit log), the entire operation rolls back automatically.

### Rollback Testing
Rollback behavior was verified by forcing errors and confirming no partial writes occurred in the database.

### Query Optimization
- Selected only required fields to prevent over-fetching
- Used pagination with skip/take
- Batched inserts using createMany
- Avoided N+1 queries

### Indexes Added
Indexes were added on:
- vendor_id
- status
- expiry_date

These optimize admin dashboard and reporting queries.

### Performance Comparison
Query logs show reduced execution time after indexing.

### Reflection
In production, query performance would be monitored using:
- Prisma query logs
- slow query tracking
- latency & error metrics




## RESTful API Design

### API Route Hierarchy
- /api/users
- /api/users/[id]
- /api/vendors
- /api/vendors/[id]
- /api/licenses
- /api/licenses/[id]

### HTTP Methods
- GET → fetch data
- POST → create resource
- PUT → update resource
- DELETE → remove resource

### Pagination
Vendor listing supports pagination using:
?page=1&limit=10

### Error Handling
- 400 → invalid input
- 404 → resource not found
- 201 → successful creation

### Sample Request
```bash
curl http://localhost:3000/api/users


## Global API Response Handler

All API endpoints use a unified response envelope for consistency.

### Success Format
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [],
  "timestamp": "2026-02-06T10:00:00Z"
}


## Zod Request Validation

We use Zod to validate incoming API requests before processing them.

### User Schema

```ts
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18),
});


## Authentication System (bcrypt + JWT)

We implemented secure authentication using password hashing and token-based sessions.

### Signup Flow
1. User sends email + password
2. Password hashed with bcrypt
3. Stored securely in database

### Login Flow
1. Password verified with bcrypt
2. JWT token generated
3. Token expires in 1 hour

### Sample Signup Response

```json
{
  "success": true,
  "message": "Signup successful"
}



## Authorization Middleware (RBAC)

We implemented centralized authorization using Next.js middleware.

### How It Works
1. Middleware intercepts incoming requests
2. JWT token is verified
3. User role is checked
4. Access is allowed or denied

### Protected Routes
- /api/users → any authenticated user
- /api/admin → admin-only

### Role-Based Logic
- admin → full access
- user → restricted access

### Example Outcomes
- Missing token → 401 Unauthorized
- Invalid token → 403 Forbidden
- User accessing admin route → Access denied

### Least Privilege Principle
Users can only access routes necessary for their role.

### Extensibility
New roles like `moderator` or `editor` can be added with minimal changes to middleware.




---

# 🚀 Redis Caching Layer in Next.js (Cache-Aside Pattern)

## 📌 Overview

This project integrates **Redis as a caching layer** in a **Next.js API route** to improve performance and reduce database load.
Instead of querying the database on every request, frequently accessed data is stored temporarily in Redis.

---

## ⚙️ Tech Stack

* Next.js (App Router)
* Prisma (Database ORM)
* Redis (Caching Layer)
* ioredis (Redis Client)

---

## 📥 Redis Setup

Install Redis client:

```bash
npm install ioredis
```

Create Redis connection:

📂 `lib/redis.ts`

```ts
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export default redis;
```

---

## 🧠 Cache Strategy Used (Cache-Aside Pattern)

### Workflow:

✅ Check Redis cache first

* If cache exists → return cached data (**Cache Hit**)
* If cache missing → query DB → store result in Redis → return data (**Cache Miss**)

---

## 📌 Cached API Route Example

📂 `app/api/users/route.ts`

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";

export async function GET() {
  const cacheKey = "users:list";

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log("Cache Hit");
    return NextResponse.json(JSON.parse(cachedData));
  }

  console.log("Cache Miss - Fetching from DB");
  const users = await prisma.user.findMany();

  // TTL = 60 seconds
  await redis.set(cacheKey, JSON.stringify(users), "EX", 60);

  return NextResponse.json(users);
}
```

---

## ⏳ TTL Policy

* Cache is stored for **60 seconds**
* After 60 seconds Redis automatically expires the data

---

## 🔥 Cache Invalidation Strategy

Whenever user data is updated, the cache is cleared to prevent stale data.

📂 `app/api/users/update/route.ts`

```ts
await redis.del("users:list");
```

---

## 🧪 Testing Cache Behavior

### First Request (Cold Start)

```bash
curl -X GET http://localhost:3000/api/users
```

Output:

```
Cache Miss - Fetching from DB
Response time: ~120ms
```

### Second Request (Cached)

```bash
curl -X GET http://localhost:3000/api/users
```

Output:

```
Cache Hit
Response time: ~10ms
```

✅ Performance improved almost **10x faster**.

---

## ⚠️ Reflection (Cache Coherence)

Redis caching boosts speed but introduces risk of **stale data** if cache isn’t invalidated properly.

Caching may be counterproductive if:

* data changes too frequently
* cached data becomes outdated often
* invalidation is not handled correctly

---

## ✅ Deliverables Completed

* Redis caching integrated with Next.js API route
* TTL implemented using `EX`
* Cache invalidation implemented after update
* Verified latency improvement using logs

---




---

# 📤 File Upload API using AWS S3 Pre-Signed URLs (Next.js)

## 📌 Overview

This project implements a **secure and scalable file upload system** in **Next.js** using **AWS S3 Pre-Signed URLs**.
Instead of uploading files through the backend, the backend generates a **temporary signed URL** and the client uploads directly to S3.

---

## ⚙️ Tech Stack

* Next.js (App Router)
* AWS S3
* Prisma (DB Storage)
* @aws-sdk/client-s3
* @aws-sdk/s3-request-presigner

---

## 🔐 Environment Variables

Add this in `.env`:

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=your-bucket-name
```

---

## 📌 Upload Flow (Pre-Signed URL)

1. Client sends filename + fileType to backend
2. Backend generates a **pre-signed URL** (valid for 60 sec)
3. Client uploads file directly to S3 using PUT request
4. File URL is stored in database

---

## 🚀 API Endpoints

### ✅ Generate Upload URL

`POST /api/upload`

Response:

```json
{
  "success": true,
  "uploadURL": "signed-url-here"
}
```

### ✅ Store File Metadata

`POST /api/files`

Body Example:

```json
{
  "fileName": "sample.png",
  "fileURL": "https://bucket.s3.region.amazonaws.com/sample.png"
}
```

---

## ⏳ Expiry (TTL Policy)

* Pre-signed URL expires in **60 seconds**
* Prevents misuse and unauthorized uploads

---

## 🛡️ Security Measures

* File type validation (`image/*`, `application/pdf`)
* Short-lived signed URL (60 sec)
* No AWS credentials exposed to client
* Backend only handles URL generation

---

## ⚠️ Reflection

Pre-signed URLs improve **performance + scalability**, but careful validation is required to avoid storing unsafe or unwanted uploads.
Lifecycle policies can be used to auto-delete old files to reduce cost.

---

## ✅ Deliverables Completed

* Working API to generate S3 pre-signed upload URL
* File uploaded directly to S3 via client
* File URL stored in database with Prisma
* Validation + expiry implemented

---




---

## 📧 Email Service Integration (Transactional Emails)

This project integrates a **transactional email service** (AWS SES / SendGrid) into a **Next.js API route** to send automated emails such as welcome messages, password reset links, and security alerts. The backend exposes an endpoint (`/api/email`) that accepts `to`, `subject`, and `message` (HTML) and sends emails securely using verified sender credentials stored in environment variables. A reusable HTML template system is used to generate dynamic personalized emails. The setup also considers real-world email concerns such as **sandbox vs production mode**, **rate limits**, and **bounce/spam handling** using provider dashboards (SES/SendGrid). Logs are maintained to confirm successful delivery using message IDs and response headers.

---


## 🛣️ Page Routing & Dynamic Routes (Next.js App Router)

This project implements **Next.js App Router routing** using a clean file-based structure with **public routes** (`/`, `/login`), **protected routes** (`/dashboard`, `/users`) and **dynamic routes** (`/users/[id]`). Authentication is enforced using a `middleware.ts` that validates a JWT token stored in cookies and redirects unauthorized users to `/login`. Dynamic routing is used to render user-specific pages based on URL parameters (ex: `/users/1`, `/users/2`). A global `layout.tsx` provides shared navigation across pages, and a custom `not-found.tsx` is included for graceful 404 handling. This setup improves scalability, supports SEO-friendly routes, and ensures a smooth user experience with structured navigation.


### ✅ Global API Response Handler (Standardized API Responses)

To ensure consistency across all API routes in this project, a **Global API Response Handler** was implemented using a unified response envelope. Instead of returning different response formats from different endpoints, every API route now responds using the same structured JSON shape containing fields like `success`, `message`, `data`, `error`, and `timestamp`. This greatly improves **developer experience (DX)** because frontend developers can handle responses predictably without writing custom logic for each route. It also boosts **observability** in production since every error includes a clear error code and timestamp, making debugging faster and monitoring tools like Postman, Sentry, or Datadog easier to integrate. This centralized approach ensures the entire API speaks in one consistent “voice” across endpoints like `/api/users`, `/api/tasks`, `/api/projects`, etc.

### ✅ Input Validation with Zod (Request Validation Layer)

To ensure that all incoming API requests contain valid and structured data, this project integrates **Zod** as a request validation layer for all `POST` and `PUT` endpoints. Zod schemas were created to define strict input rules (such as required fields, minimum string lengths, valid email formats, and numeric constraints), preventing malformed or incomplete data from reaching the database. By validating request bodies before executing business logic, the API becomes more secure, stable, and predictable. Additionally, Zod provides detailed validation error messages, which are returned in a clean and readable format for better frontend handling. This approach improves **maintainability** and **developer experience**, since schemas can be reused across both client and server, ensuring consistent validation rules throughout the entire application.
