# 🚀 Mohamed Haytham — Portfolio

A full-stack personal portfolio website built with **Next.js 16**, featuring a dynamic project showcase, admin dashboard, Cloudinary image hosting, and MongoDB database — all deployed with a single command.

---

## ✨ Features

- **Responsive Design** — looks great on all screen sizes (mobile, tablet, desktop)
- **Dynamic Projects** — projects are fetched from MongoDB and rendered server-side
- **Admin Dashboard** — protected route to create, edit, and delete projects
- **Cloudinary Image Upload** — project cover images are uploaded to Cloudinary and the URL is stored in the database
- **JWT Authentication** — secure cookie-based login for the admin panel
- **Contact Form** — powered by EmailJS, no backend required
- **Smooth Animations** — micro-animations and hover effects throughout
- **Dark Mode Design** — modern glassmorphism aesthetic with a curated dark palette

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|------------------------------------|
| Framework    | Next.js 16 (App Router)            |
| Styling      | Tailwind CSS v4                    |
| Database     | MongoDB + Mongoose                 |
| Auth         | JWT + HTTP-only cookies            |
| Image Hosting| Cloudinary                         |
| Email        | EmailJS                            |
| Icons        | React Icons                        |
| Notifications| React Toastify                     |

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── admin/                  # Admin dashboard (protected)
│   │   ├── Dashboard.jsx       # Full CRUD dashboard UI
│   │   ├── page.jsx            # Server component — auth guard + data fetch
│   │   └── login/             # Login page
│   ├── api/
│   │   ├── admin/
│   │   │   ├── projects/       # GET, POST projects
│   │   │   │   └── [id]/       # PUT, DELETE project by ID
│   │   │   └── upload/         # POST — upload image to Cloudinary
│   │   └── auth/
│   │       ├── login/          # POST — verify credentials, set JWT cookie
│   │       └── logout/         # POST — clear JWT cookie
│   ├── models/
│   │   ├── Project.js          # Mongoose schema (title, image URL, github, site)
│   │   ├── Service.js
│   │   ├── Skill.js
│   │   └── User.js
│   ├── components/             # Shared components (Navbar, Footer, etc.)
│   ├── HomePage/
│   ├── AboutPage/
│   ├── ProjectsPage/
│   ├── ServicesPage/
│   ├── SkillsPage/
│   └── ContactPage/
├── lib/
│   ├── auth.js                 # verifyAuth() — reads and verifies JWT from cookie
│   └── connectDB.js            # Mongoose connection helper
├── public/
│   └── assets/                 # Static assets (local images, bg textures)
├── .env                        # Environment variables (see below)
└── next.config.mjs             # Remote image patterns (Cloudinary, Google Drive)
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_KEY_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# JWT (optional — defaults to a fallback key, change in production!)
JWT_SECRET=your_super_secret_jwt_key
```

> **Note:** Never commit your `.env` file to version control. It is already listed in `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas cluster (or local MongoDB)
- A Cloudinary account (free tier is enough)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MedoHaytham/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# then fill in your values in .env

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Panel

The admin dashboard is available at `/admin`.

| Action        | Route                         | Method |
|---------------|-------------------------------|--------|
| Login         | `/admin/login`                | UI     |
| Dashboard     | `/admin`                      | UI     |
| Create project| `/api/admin/projects`         | POST   |
| Update project| `/api/admin/projects/:id`     | PUT    |
| Delete project| `/api/admin/projects/:id`     | DELETE |
| Upload image  | `/api/admin/upload`           | POST   |
| Logout        | `/api/auth/logout`            | POST   |

> All admin API routes are protected by JWT verification. Unauthenticated requests return `401 Unauthorized`.

### How Image Upload Works

1. Admin selects an image in the dashboard form
2. Image is sent via `multipart/form-data` to `/api/admin/upload`
3. The API converts it to a base64 data URI and uploads it to **Cloudinary** (under the `portfolio/projects` folder)
4. Cloudinary returns a `secure_url`
5. The URL is saved in MongoDB as the project's `image` field

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server (webpack mode)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🌐 Deployment

This project is ready to deploy on **Vercel**:

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add all environment variables from your `.env` file in the Vercel dashboard
4. Deploy — Vercel handles the rest ✅

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/MedoHaytham">Mohamed Haytham</a>
</div>
