Content Broadcasting System

A production-grade backend system for schools and educational institutions where teachers upload subject-based content, principals approve or reject submissions, and students access live rotating approved content through public APIs.

⸻

# Features

## Authentication & RBAC

* JWT-based authentication
* Role-based access control
* Roles:
    * Principal
    * Teacher

## Teacher Features

* Register / Login
* Upload content
* Add scheduling window
* Set rotation duration
* View own uploaded content status

## Principal Features

* View all uploaded content
* View pending content
* Approve content
* Reject content with reason

## Student / Public Features

* Access currently active content via public API
* Teacher-specific live endpoint
* Optional subject filtering
* Rotation scheduling logic

## Engineering Features

* TypeScript
* Prisma ORM
* PostgreSQL
* Swagger / OpenAPI Docs
* Centralized Error Middleware
* API Versioning (/api/v1)
* Local File Upload Storage

⸻

# Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma
* JWT
* bcrypt
* Multer
* Zod
* Swagger UI

⸻

# Project Structure

src/
  config/
  common/
    middleware/
    utils/
    upload/
  modules/
    auth/
    users/
    content/
    admin/
    live/
  routes/v1/
  docs/
prisma/
uploads/

⸻

# Setup Instructions

## 1. Clone Repository

```
git clone <your-github-repo-url>

cd content-broadcast-system
```

## 2. Install Dependencies

``` npm install ```

## 3. Configure Environment Variables

``` Create .env ```

```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/contentdb
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```

## 4. Run Database

Using Docker:

```
docker run --name postgres-container -e POSTGRES_DB=contentdb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

## 5. Run Prisma Migration

``` npx prisma migrate dev ```

## 6. Seed Principal Account

``` npm run seed ```

## 7. Start Server

``` npm run dev ```

⸻

## Default Principal Login

``` 
Email: principal@school.com
Password: password123
```

(Replace with your seeded credentials if different)

⸻

## API Base URL

``` http://localhost:3000/api/v1 ```

⸻

## Swagger API Docs

``` http://localhost:3000/api-docs ```

⸻

# Main APIs

## Auth

### Register Teacher

``` POST /api/v1/auth/register ```

### Login

``` POST /api/v1/auth/login ```

⸻

## Users

### Get My Profile

```
GET /api/v1/users/me
Authorization: Bearer <token>
```

### Get Teachers List

``` GET /api/v1/users/teachers ```

⸻

## Content

### Upload Content (Teacher Only)

```
POST /api/v1/content/upload
Authorization: Bearer <teacher-token>
Content-Type: multipart/form-data


### Fields:

* title
* subject
* file
* description (optional)
* startTime (optional)
* endTime (optional)
* rotationDurationMin (optional)

```

### View My Uploaded Content

```
GET /api/v1/content/my
Authorization: Bearer <teacher-token>
```
⸻

## Admin

### View All Uploaded Content

```
GET /api/v1/admin/content
Authorization: Bearer <principal-token>

Optional Query Params:

* status
* subject
* teacherId

```

### View Pending Content

``` GET /api/v1/admin/content/pending ```

### Approve Content

``` PATCH /api/v1/admin/content/:id/approve ```

### Reject Content

``` PATCH /api/v1/admin/content/:id/reject

Body:

{
  "reason": "Incorrect file uploaded"
}

```

⸻

## Public Live Broadcasting

### Teacher Live Content

``` GET /api/v1/content/live/:teacherId ```

### Subject Filtered

``` GET /api/v1/content/live/:teacherId?subject=Maths  ```

⸻

## Scheduling Logic

Only content satisfying:

status = approved
startTime <= now <= endTime

is eligible.

Then content rotates based on rotationDurationMin.

Example:

A -> 5 min
B -> 5 min
C -> 10 min

Total cycle = 20 minutes, repeats continuously.

⸻

Supported Upload Formats

* JPG
* PNG
* GIF

Max file size:

10 MB

⸻

Response Format

Success

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

Error

{
  "success": false,
  "message": "Unauthorized"
}

⸻

Assumptions

* Principal account is seeded initially.
* Local disk storage used for uploads.
* Scheduler is computed dynamically on API request.
* No cron jobs required.
* Subject filter supported in live API.

⸻


Deployment

