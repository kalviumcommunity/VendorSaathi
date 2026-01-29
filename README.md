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
