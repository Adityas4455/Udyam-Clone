# Udyam Clone Assignment

This project replicates the **first two steps** of the Udyam Registration process:
1. Aadhaar + OTP validation
2. PAN validation

It consists of:
- **Scraper** (`scrape/`) – Extracts form fields and validation rules from the Udyam site.
- **Frontend** (`frontend/`) – Next.js + Tailwind responsive UI rendering based on scraped JSON schema.
- **Backend** (`backend/`) – Node.js + Express + Prisma + PostgreSQL REST API for validation & storage.

---

## Project Structure
Udyam-Clone/
├─ scrape/
│  ├─ package.json
│  └─ scrape-udyam.js
├─ backend/
│  ├─ package.json
│  ├─ prisma/
│  │  └─ schema.prisma
│  ├─ src/
│  │  ├─ server.ts
│  │  ├─ routes.ts
│  │  ├─ validators.ts
│  │  └─ db.ts
│  ├─ .env.example
│  └─ Dockerfile
├─ frontend/
│  ├─ package.json
│  ├─ next.config.js
│  ├─ tailwind.config.js
│  ├─ postcss.config.js
│  ├─ tsconfig.json
│  ├─ public/
│  └─ src/
│     ├─ pages/_app.tsx
│     ├─ pages/index.tsx
│     ├─ components/DynamicForm.tsx
│     ├─ lib/schema.ts
│     └─ styles/globals.css
├─ docker-compose.yml
└─ README.md
