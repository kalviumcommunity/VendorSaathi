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
