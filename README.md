# 🏢 Prakash Agency — Full Stack Business Website

A premium full-stack business website for Prakash Agency, an FMCG distributor and real estate company in Jharkhand.

## 🗂️ Project Structure

```
prakash-agency/
├── frontend/          # Next.js 14 + React + Tailwind + Framer Motion
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── about/page.tsx        # About page
│   │   │   ├── products/page.tsx     # Products page
│   │   │   ├── apartment/page.tsx    # Apartment page
│   │   │   ├── gallery/page.tsx      # Gallery page
│   │   │   ├── contact/page.tsx      # Contact page
│   │   │   └── admin/
│   │   │       ├── login/page.tsx    # Admin login
│   │   │       ├── dashboard/        # Dashboard
│   │   │       ├── products/         # Manage products
│   │   │       └── inquiries/        # View inquiries
│   │   ├── components/
│   │   │   ├── layout/Navbar.tsx
│   │   │   ├── layout/Footer.tsx
│   │   │   └── ui/ThemeProvider.tsx
│   │   └── lib/api.ts               # API client
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── .env.local
│
└── backend/           # Node.js + Express + MongoDB
    ├── src/
    │   ├── server.js
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Product.js
    │   │   ├── Category.js
    │   │   ├── Inquiry.js
    │   │   ├── Apartment.js
    │   │   └── Gallery.js
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── products.js
    │   │   ├── categories.js
    │   │   ├── inquiries.js
    │   │   ├── apartment.js
    │   │   └── gallery.js
    │   ├── middleware/
    │   │   ├── auth.js               # JWT authentication
    │   │   └── upload.js             # Multer file upload
    │   └── config/
    │       └── seed.js               # Database seeder
    └── .env.example
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

---

### 1. Clone / Extract the project

```bash
cd prakash-agency
```

---

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and set your MONGODB_URI and JWT_SECRET

# Seed the database (creates admin + sample data)
npm run seed

# Start backend server
npm run dev
# Server runs at http://localhost:5000
```

---

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local (already configured for localhost)
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start frontend
npm run dev
# Website runs at http://localhost:3000
```

---

## 🔐 Admin Access

| Field | Value |
|-------|-------|
| URL | http://localhost:3000/admin/login |
| Email | admin@prakashagency.com |
| Password | Admin@123456 |

> **Security**: Change the admin password immediately in production!

---

## 📱 Pages

| Page | URL |
|------|-----|
| Home | / |
| About | /about |
| Products | /products |
| Apartment | /apartment |
| Gallery | /gallery |
| Contact | /contact |
| Admin Login | /admin/login |
| Admin Dashboard | /admin/dashboard |
| Admin Products | /admin/products |
| Admin Inquiries | /admin/inquiries |

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products (with filters) |
| GET | /api/products/:id | Get single product |
| GET | /api/categories | Get all categories |
| GET | /api/apartment | Get apartment info |
| GET | /api/gallery | Get gallery images |
| POST | /api/inquiries | Submit inquiry/contact form |

### Admin (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Admin login |
| GET | /api/auth/me | Get current user |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| POST | /api/categories | Create category |
| PUT | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |
| GET | /api/inquiries | Get all inquiries |
| PUT | /api/inquiries/:id/status | Update inquiry status |
| DELETE | /api/inquiries/:id | Delete inquiry |
| PUT | /api/apartment | Update apartment info |

---

## 🌐 Deployment

### Backend (Railway / Render / VPS)
```bash
# Set environment variables:
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_very_secure_secret_key
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production

npm start
```

### Frontend (Vercel — Recommended)
```bash
# Set environment variable in Vercel dashboard:
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api

npm run build
```

---

## 👨‍💼 Company Information (Placeholder)

| Field | Value |
|-------|-------|
| CEO | Mr. Prakash Kumar |
| Phone | +91 98765 43210 |
| Email | info@prakashagency.com |
| CEO Email | ceo@prakashagency.com |
| Address | Prakash Nagar, Main Road, Latehar, Jharkhand - 829206 |
| Coordinates | Lat: 23.7449, Long: 84.4833 |
| WhatsApp | https://wa.me/919876543210 |

> Replace all placeholder info with real company data before going live.

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| HTTP Client | Axios |
| Toast Notifications | React Hot Toast |
| Icons | Lucide React |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken) |
| File Uploads | Multer |
| Security | Helmet + Rate Limiting |

---

## ✨ Features

- ✅ Premium dark-mode UI with glassmorphism
- ✅ Framer Motion scroll animations throughout
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark/light mode toggle
- ✅ SEO-optimized with Next.js metadata
- ✅ Product catalog with search + category filter + pagination
- ✅ Apartment showcase with gallery, room details, inquiry form
- ✅ Contact form connected to backend API
- ✅ Admin dashboard with product CRUD
- ✅ Admin inquiry management
- ✅ JWT authentication for admin
- ✅ Image upload with Multer
- ✅ Database seeder with sample data
- ✅ Google Maps embeds
- ✅ WhatsApp contact button
