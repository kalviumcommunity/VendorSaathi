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
